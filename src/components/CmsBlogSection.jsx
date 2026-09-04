import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchBlogList } from '../api/publicCms.js';

export default function CmsBlogSection() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchBlogList();
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : 'Could not load posts');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (err || posts.length === 0) return null;

  return (
    <section className="border-b border-slate-200/80 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-345">
        <p className="font-noto-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#2555eb]">From the CMS</p>
        <h2 className="mt-2 font-noto-sans text-[clamp(22px,2.4vw,30px)] font-semibold tracking-tight text-[#122a66]">
          Latest posts
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="overflow-hidden rounded-[5px] border border-slate-200 bg-[#fafafa] shadow-sm"
            >
              <Link to={`/blog/${post._id}`} className="block">
                {post.image ? (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img src={post.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-noto-sans text-[17px] font-semibold leading-snug text-[#122a66]">{post.title}</h3>
                  {post.createdAt ? (
                    <p className="mt-2 text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                  ) : null}
                  <p className="mt-2 line-clamp-3 font-noto-sans text-[14px] leading-relaxed text-slate-600">{post.content}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-[#2555eb]">Read more →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
