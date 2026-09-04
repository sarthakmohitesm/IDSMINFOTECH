import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchGalleryList } from '../api/publicCms.js';

export default function CmsGallerySection() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchGalleryList();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : 'Could not load gallery');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (err || items.length === 0) return null;

  return (
    <section className="border-b border-[#1f1b19]/10 bg-[#fcfcfb] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <p className="font-rajdhani text-[11px] font-bold uppercase tracking-[0.2em] text-[#2555eb]">From the CMS</p>
        <h2 className="mt-2 font-rajdhani text-[clamp(24px,3vw,36px)] font-semibold tracking-tight text-[#0a2357]">
          Featured moments
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((g, i) => (
            <motion.figure
              key={g._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-sm"
            >
              <img src={g.imageUrl} alt={g.title || 'Gallery'} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              {g.title ? (
                <figcaption className="px-3 py-2 font-rajdhani text-sm text-slate-600">{g.title}</figcaption>
              ) : null}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
