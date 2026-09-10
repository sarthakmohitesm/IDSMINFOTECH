import React from 'react';
import { motion } from 'framer-motion';

/* ─── Tech rows matching reference image ──────────────────────── */
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const rows = [
  {
    id: 'backend',
    label: 'Backend',
    labelAccent: 'technologies',
    items: [
      { name: 'Node.js',  logo: `${CDN}/nodejs/nodejs-original.svg` },
      { name: 'MongoDB',  logo: `${CDN}/mongodb/mongodb-original.svg` },
      { name: 'Express.js', logo: `${CDN}/express/express-original.svg` },
    ],
  },
  {
    id: 'frontend',
    label: 'Front-end',
    labelAccent: 'technologies',
    items: [
      { name: 'React',   logo: `${CDN}/react/react-original.svg` },
      { name: 'Angular', logo: `${CDN}/angularjs/angularjs-original.svg` },
      { name: 'Vue',     logo: `${CDN}/vuejs/vuejs-original.svg` },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    labelAccent: null,
    items: [
      { name: 'Azure',        logo: `${CDN}/azure/azure-original.svg` },
      { name: 'AWS',          logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
      { name: 'Google Cloud', logo: `${CDN}/googlecloud/googlecloud-original.svg` },
    ],
  },
  {
    id: 'aiml',
    label: 'AI/ML',
    labelAccent: null,
    items: [
      { name: 'Python',     logo: `${CDN}/python/python-original.svg` },
      { name: 'TensorFlow', logo: `${CDN}/tensorflow/tensorflow-original.svg` },
      { name: 'PyTorch',    logo: `${CDN}/pytorch/pytorch-original.svg` },
      { name: 'OpenAI',     logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
      { name: 'Pandas',     logo: `${CDN}/pandas/pandas-original.svg` },
    ],
  },
  {
    id: 'qa',
    label: 'QA',
    labelAccent: null,
    items: [
      { name: 'Postman', logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
    ],
  },
  {
    id: 'uiux',
    label: 'UI/UX',
    labelAccent: null,
    items: [
      { name: 'Figma',      logo: `${CDN}/figma/figma-original.svg` },
      { name: 'Adobe XD',   logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg' },
      { name: 'Tailwind CSS', logo: `${CDN}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
];

const CELL_BORDER = '1px solid #e8e4df';

/* ─── Logo cell (grid child: equal width columns site-wide) ───── */
function LogoCell({ name, logo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, backgroundColor: '#ffffff', zIndex: 10, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '18px 12px',
        borderRight: CELL_BORDER,
        minWidth: 0,
        boxSizing: 'border-box',
        cursor: 'default',
        position: 'relative'
      }}
    >
      <img
        src={logo}
        alt={name}
        style={{ height: 44, width: 'auto', maxWidth: 90, objectFit: 'contain', opacity: 0.88 }}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
      />
    </motion.div>
  );
}

/* ─── Table row ───────────────────────────────────────────────── */
function TechRow({ row, index, isLast }) {
  /* Split items into groups of 3 for two sub-rows if > 3 */
  const chunks = [];
  for (let i = 0; i < row.items.length; i += 3) {
    chunks.push(row.items.slice(i, i + 3));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: isLast ? 'none' : CELL_BORDER,
      }}
    >
      {/* Left: Label column */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          borderRight: CELL_BORDER,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: 14,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            <span style={{ fontWeight: 500, color: '#2d2620' }}>
              {row.label}
            </span>
            {row.labelAccent && (
              <span style={{ fontWeight: 400, color: '#2d2620', marginLeft: '4px' }}>
                {row.labelAccent}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Right: 3 equal columns per sub-row (grid aligns with backend row) */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {chunks.map((chunk, ci) => {
          const slots = [...chunk];
          while (slots.length < 3) slots.push(null);
          return (
            <div
              key={ci}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                borderBottom: ci < chunks.length - 1 ? CELL_BORDER : 'none',
              }}
            >
              {slots.map((item, si) =>
                item ? (
                  <LogoCell key={item.name} name={item.name} logo={item.logo} />
                ) : (
                  <div
                    key={`empty-${ci}-${si}`}
                    style={{
                      borderRight: CELL_BORDER,
                      minWidth: 0,
                      minHeight: 88,
                      boxSizing: 'border-box',
                    }}
                  />
                ),
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export default function TechnologyLogosRow() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '48px 80px 80px',
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <h2
          style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: 'clamp(28px, 3vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#122a66',
            margin: 0,
          }}
        >
          Technologies
        </h2>
        <p
          style={{
            marginTop: 10,
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: 15,
            color: '#8a7f74',
            lineHeight: 1.6,
          }}
        >
          Platforms and tools used across our engineering stack
        </p>
      </motion.div>

      {/* Table card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: '#f8f9fa',
          borderRadius: 4,
          border: '1px solid #e0d9d0',
          overflow: 'hidden',
          boxShadow: '0 2px 24px rgba(60,40,20,0.06)',
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        {rows.map((row, index) => (
          <TechRow
            key={row.id}
            row={row}
            index={index}
            isLast={index === rows.length - 1}
          />
        ))}
      </motion.div>
    </section>
  );
}
