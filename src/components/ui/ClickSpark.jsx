import { useRef, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/** @returns {{ r: number, g: number, b: number, a: number } | null} sRGB 0–1 */
function parseCssRgb(css) {
  if (!css || css === 'transparent') return null;
  const s = css.trim();
  let m = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.%]+))?\s*\)/i);
  if (m) {
    const a = m[4] !== undefined ? (m[4].endsWith('%') ? Number(m[4]) / 100 : Number(m[4])) : 1;
    return {
      r: Number(m[1]) / 255,
      g: Number(m[2]) / 255,
      b: Number(m[3]) / 255,
      a: Number.isFinite(a) ? a : 1,
    };
  }
  m = s.match(/rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.%]+))?\s*\)/i);
  if (m) {
    const a = m[4] !== undefined ? (m[4].endsWith('%') ? Number(m[4]) / 100 : Number(m[4])) : 1;
    return {
      r: Number(m[1]) / 255,
      g: Number(m[2]) / 255,
      b: Number(m[3]) / 255,
      a: Number.isFinite(a) ? a : 1,
    };
  }
  return null;
}

function channelToLinear(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance({ r, g, b }) {
  const R = channelToLinear(r);
  const G = channelToLinear(g);
  const B = channelToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function sparkColorForTarget(element, lightSpark, darkSpark, luminanceThreshold = 0.55) {
  let node = element instanceof Element ? element : null;

  const maxDepth = 28;
  let depth = 0;
  while (node && depth < maxDepth) {
    const bg = parseCssRgb(getComputedStyle(node).backgroundColor);
    if (bg && bg.a >= 0.12) {
      const lum = relativeLuminance(bg);
      return lum >= luminanceThreshold ? lightSpark : darkSpark;
    }
    node = node.parentElement;
    depth += 1;
  }

  return darkSpark;
}

const LINE_WIDTH = 2;
/** Cap backing-store longest edge to limit fill cost on 4K / ultrawide */
const MAX_CANVAS_EDGE = 2560;

const ClickSpark = ({
  sparkOnLightBackground = '#00b3ff',
  sparkOnDarkBackground = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  className = '',
  children,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animationIdRef = useRef(0);
  const drawRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const viewportRef = useRef({ cssW: 0, cssH: 0, bw: 0, bh: 0 });
  const paramsRef = useRef({ sparkSize, sparkRadius, duration, extraScale });
  paramsRef.current = { sparkSize, sparkRadius, duration, extraScale };

  const easeFunc = useCallback((t) => {
    switch (easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t * (2 - t);
    }
  }, [easing]);
  const easeFuncRef = useRef(easeFunc);
  easeFuncRef.current = easeFunc;

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      let bw = cssW;
      let bh = cssH;
      const longest = Math.max(cssW, cssH);
      if (longest > MAX_CANVAS_EDGE) {
        const s = MAX_CANVAS_EDGE / longest;
        bw = Math.round(cssW * s);
        bh = Math.round(cssH * s);
      }
      viewportRef.current = { cssW, cssH, bw, bh };
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.visualViewport?.addEventListener('resize', handleResize, { passive: true });
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = null;
    try {
      ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    } catch {
      ctx = canvas.getContext('2d', { alpha: true });
    }
    if (!ctx) return;

    const draw = (timestamp) => {
      const { cssW, cssH, bw, bh } = viewportRef.current;
      const w = cssW || canvas.width;
      const h = cssH || canvas.height;

      if (bw && bh && w && h) {
        ctx.setTransform(bw / w, 0, 0, bh / h, 0, 0);
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      ctx.clearRect(0, 0, w, h);

      const { duration: dur, sparkRadius: radius, extraScale: scale, sparkSize: size } =
        paramsRef.current;
      const ease = easeFuncRef.current;
      const sparks = sparksRef.current;

      const segmentsByColor = new Map();
      let write = 0;

      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= dur) continue;

        const progress = elapsed / dur;
        const eased = ease(progress);
        const distance = eased * radius * scale;
        const lineLength = size * (1 - eased);
        const cos = Math.cos(spark.angle);
        const sin = Math.sin(spark.angle);
        const x1 = spark.x + distance * cos;
        const y1 = spark.y + distance * sin;
        const x2 = spark.x + (distance + lineLength) * cos;
        const y2 = spark.y + (distance + lineLength) * sin;

        sparks[write++] = spark;

        let list = segmentsByColor.get(spark.color);
        if (!list) {
          list = [];
          segmentsByColor.set(spark.color, list);
        }
        list.push(x1, y1, x2, y2);
      }
      sparks.length = write;

      ctx.lineWidth = LINE_WIDTH;
      for (const [color, coords] of segmentsByColor) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        for (let j = 0; j < coords.length; j += 4) {
          ctx.moveTo(coords[j], coords[j + 1]);
          ctx.lineTo(coords[j + 2], coords[j + 3]);
        }
        ctx.stroke();
      }

      if (sparks.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        animationIdRef.current = 0;
      }
    };

    drawRef.current = draw;

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = 0;
      }
      drawRef.current = null;
    };
  }, []);

  const handleClick = (e) => {
    if (reducedMotionRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas || !drawRef.current) return;

    const x = e.clientX;
    const y = e.clientY;

    const now = performance.now();
    const hit =
      e.target instanceof Element ? e.target : document.elementFromPoint(e.clientX, e.clientY);
    const color = sparkColorForTarget(hit, sparkOnLightBackground, sparkOnDarkBackground);

    const sparks = sparksRef.current;
    const n = sparkCount;
    const twoPiOverN = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      sparks.push({
        x,
        y,
        angle: i * twoPiOverN,
        startTime: now,
        color,
      });
    }

    if (!animationIdRef.current) {
      animationIdRef.current = requestAnimationFrame((t) => drawRef.current?.(t));
    }
  };

  return (
    <>
      <div
        className={`relative w-full ${className}`.trim()}
        onClick={handleClick}
      >
        {children}
      </div>
      {typeof document !== 'undefined' &&
        createPortal(
          <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[110] block h-[100vh] w-[100vw] max-w-[100vw] select-none"
            style={{ top: 0, left: 0 }}
            aria-hidden
          />,
          document.body
        )}
    </>
  );
};

export default ClickSpark;
