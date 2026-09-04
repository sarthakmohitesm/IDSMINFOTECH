import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Newspaper, Search } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const blogHeroImage =
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80';

const fallbackBlogImage =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';

const blogSubHeaderItems = [
  'Smart ERP',
  'HRMS',
  'Product Updates',
  'Case Studies',
];

const getBlogSectionId = (title) => `blog-section-${title.toLowerCase().replace(/\s+/g, '-')}`;

const blogSections = [
  {
    title: 'Smart ERP',
    posts: [
      {
        slug: 'how-idms-smart-erp-connects-finance-sales-and-operations',
        title: 'How IDMS Smart ERP Connects Finance, Sales, and Operations',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Unify core business functions with a single platform that improves speed, visibility, and execution.',
        date: 'March 27, 2026',
        readTime: '10 min read',
      },
      {
        slug: 'smart-erp-deployment-checklist-for-mid-sized-companies',
        title: 'Smart ERP Deployment Checklist for Mid-Sized Companies',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'A practical launch checklist to reduce implementation friction and speed up adoption.',
        date: 'March 26, 2026',
        readTime: '8 min read',
      },
      {
        slug: 'real-time-dashboards-that-improve-operational-decisions',
        title: 'Real-Time Dashboards That Improve Operational Decisions',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Turn live data into action with smart dashboards for leadership and execution teams.',
        date: 'March 12, 2026',
        readTime: '9 min read',
      },
    ],
  },
  {
    title: 'HRMS',
    posts: [
      {
        slug: 'hrms-automation-for-growing-enterprises',
        title: 'HRMS Automation for Growing Enterprises',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Simplify payroll, attendance, onboarding and employee lifecycle with IDMS HRMS.',
        date: 'March 20, 2026',
        readTime: '8 min read',
      },
      {
        slug: 'attendance-and-shift-management-for-multi-location-teams',
        title: 'Attendance and Shift Management for Multi-Location Teams',
        image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Handle shifts, leave, and approvals with policy-based automation across locations.',
        date: 'March 8, 2026',
        readTime: '7 min read',
      },
      {
        slug: 'payroll-accuracy-with-integrated-hr-and-finance-modules',
        title: 'Payroll Accuracy with Integrated HR and Finance Modules',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Eliminate reconciliation errors by connecting payroll with finance and compliance data.',
        date: 'February 18, 2026',
        readTime: '9 min read',
      },
    ],
  },
  {
    title: 'Product Updates',
    posts: [
      {
        slug: 'product-update-smart-erp-analytics-dashboard',
        title: 'Product Update: Smart ERP Analytics Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'New analytics module for performance tracking and business insights.',
        date: 'April 4, 2026',
        readTime: '6 min read',
      },
      {
        slug: 'new-mobile-workflow-for-sales-and-service-teams',
        title: 'New Mobile Workflow for Sales and Service Teams',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Approve requests, update records, and monitor KPIs from the IDMS mobile experience.',
        date: 'March 28, 2026',
        readTime: '5 min read',
      },
      {
        slug: 'enhanced-role-based-access-and-security-controls',
        title: 'Enhanced Role-Based Access and Security Controls',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Granular permissions and audit logs to strengthen governance across enterprise teams.',
        date: 'March 14, 2026',
        readTime: '7 min read',
      },
    ],
  },
  {
    title: 'Case Studies',
    posts: [
      {
        slug: 'how-manufacturer-reduced-planning-delays',
        title: 'How a Manufacturer Reduced Planning Delays by 32%',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'A real-world transformation story using IDMS ERP to optimize planning and throughput.',
        date: 'March 6, 2026',
        readTime: '12 min read',
      },
      {
        slug: 'enterprise-hrms-rollout-across-5-business-units',
        title: 'Enterprise HRMS Rollout Across 5 Business Units',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'How centralized HR operations improved compliance and employee process consistency.',
        date: 'February 27, 2026',
        readTime: '10 min read',
      },
      {
        slug: 'from-spreadsheets-to-smart-erp-in-90-days',
        title: 'From Spreadsheets to Smart ERP in 90 Days',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'A practical migration approach that delivered visibility and control in record time.',
        date: 'February 9, 2026',
        readTime: '9 min read',
      },
    ],
  },
];

const featuredStory = {
  slug: 'how-idms-smart-erp-helps-manufacturing-companies-automate-operations',
  label: 'IDMS Smart ERP',
  title: 'How IDMS Smart ERP Helps Manufacturing Companies Automate Operations',
  excerpt:
    'IDMS Smart ERP enables manufacturers to streamline production planning, inventory tracking, HRMS, and real-time analytics from a single unified platform.',
  image:
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80',
};

const sideStories = [
  {
    slug: 'hrms-automation-for-growing-enterprises',
    title: 'HRMS Automation for Growing Enterprises',
    excerpt: 'Simplify payroll, attendance, onboarding and employee lifecycle with IDMS HRMS',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'inventory-planning-with-idms-manufacturing-erp',
    title: 'Inventory Planning with IDMS Manufacturing ERP',
    excerpt: 'Track raw materials, production stages and dispatch with real-time visibility',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'product-update-smart-erp-analytics-dashboard',
    title: 'Product Update: Smart ERP Analytics Dashboard',
    excerpt: 'New analytics module for performance tracking and business insights',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'how-manufacturer-reduced-planning-delays',
    title: 'Case Study: Faster Decision-Making with Unified ERP Data',
    excerpt: 'How enterprises improved reporting speed and planning accuracy using IDMS Smart ERP.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
  },
];

function StoryCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex h-full w-full flex-col text-left rounded-[5px] border border-[#d6dde8] bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_22px_rgba(28,39,60,0.08)]"
      >
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackBlogImage;
            }}
            className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-4">
          <h3 className="mt-0 font-noto-sans text-[18px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#122a66]">
            {post.title}
          </h3>

          <p className="mt-2 font-noto-sans text-[13px] leading-relaxed text-[#475569]">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between border-t border-[#e2e2e2] pt-3">
              <div className="font-noto-sans text-[13px] text-[#6b7280]">
                {post.date}  |  {post.readTime}
              </div>
              <div className="text-[#46505a] transition-all duration-300">
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Blog() {
  const [activeSubHeader, setActiveSubHeader] = useState(blogSubHeaderItems[0]);
  const [animatedSection, setAnimatedSection] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = blogPosts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSubHeaderClick = (title) => {
    const sectionId = getBlogSectionId(title);
    const target = document.getElementById(sectionId);
    if (!target) return;

    setActiveSubHeader(title);

    const topOffset = 110;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });

    setAnimatedSection(sectionId);
    window.setTimeout(() => setAnimatedSection(''), 650);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] bg-[linear-gradient(120deg,rgba(255,255,255,0.98)_0%,rgba(247,249,252,0.96)_48%,rgba(252,251,248,0.97)_100%),radial-gradient(circle_at_12%_14%,rgba(70,139,239,0.06)_0%,transparent_30%),radial-gradient(circle_at_88%_12%,rgba(255,0,120,0.05)_0%,transparent_28%),radial-gradient(circle_at_50%_68%,rgba(150,0,250,0.035)_0%,transparent_34%)] bg-size-[100%_100%,100%_100%,100%_100%,100%_100%] text-[#111111]">
      <section className="pt-0">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[40vh] items-center overflow-hidden"
          >
            <img src={blogHeroImage} alt="IDMS Blog hero" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-[#050b17]/82 via-[#091327]/58 to-[#0a1730]/40" />
            <div className="absolute inset-0 bg-linear-to-t from-[#04070f]/45 via-transparent to-transparent" />

            <div className="relative z-10 flex w-full items-center px-4 lg:px-20">
              <div className="max-w-3xl text-left text-white">
                <div className="inline-flex items-center gap-2 rounded-[5px] border border-white/30 bg-white/10 px-3 py-1.5 font-noto-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                  <Newspaper className="h-3.5 w-3.5" />
                  Blog & Insights
                </div>
                <h1 className="mt-5 font-noto-sans text-[clamp(30px,5vw,58px)] font-semibold leading-[0.94] tracking-[-0.05em]">
                  Enterprise Software, ERP & HRMS Insights
                </h1>
                <p className="mt-4 max-w-3xl font-noto-sans text-[15px] leading-relaxed text-white/88 sm:text-[17px]">
                  Expert perspectives, product updates, and real-world implementations from IDMS Smart ERP and enterprise solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[linear-gradient(to_right,#2555eb,#2575eb)] px-4 py-3 lg:px-[80px]">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-10 gap-y-3 lg:flex-nowrap">
          <h2 className="shrink-0 font-noto-sans text-[clamp(26px,3vw,34px)] leading-[0.95] tracking-[-0.03em] text-white">
            Insights
          </h2>

          <nav aria-label="Blog categories" className="min-w-0 flex flex-1 justify-center overflow-x-auto scroll-smooth">
            <ul className="mx-auto flex min-w-max items-center gap-17 font-noto-sans text-[16px] text-white">
              {blogSubHeaderItems.map((item, index) => (
                <li key={item} className="whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => handleSubHeaderClick(item)}
                    className={`relative pb-1 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-200 ${activeSubHeader === item ? 'text-white after:w-1/2' : 'text-white/80 hover:text-white after:w-0 hover:after:w-1/2'}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative w-full max-w-47.5 shrink-0 lg:w-47.5 z-50" ref={searchRef}>
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim().length > 1) {
                  const filtered = blogPosts.filter(p => 
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, 5);
                  setSearchResults(filtered);
                }
              }}
              className="h-[30px] w-full rounded-[5px] border border-white/60 bg-white/95 pl-3.5 pr-10 font-noto-sans text-[16px] text-[#1a1a1a] outline-none placeholder:text-[#6b7280] focus:border-white"
            />
            <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#4b5563]" />
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-[320px] max-w-[90vw] origin-top-right rounded-[5px] bg-white p-2 shadow-2xl ring-1 ring-slate-100"
                >
                  {searchResults.map((result) => (
                    <Link
                      key={result.slug}
                      to={`/blog/${result.slug}`}
                      className="block rounded-[3px] p-3 text-sm font-medium text-[#122a66] hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                    >
                      {result.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-345 grid-cols-1 gap-10 lg:grid-cols-[1.8fr_1fr]">
          <article>
            <Link to={`/blog/${featuredStory.slug}`}>
              <p className="font-noto-sans text-[clamp(20px,2.2vw,28px)] font-semibold sm:text-[22px] lg:text-[24px] leading-[1.08] tracking-[-0.03em] text-[#0a0a0a]">
                {featuredStory.label}
              </p>
              <h2 className="mt-3 max-w-237.5 font-noto-sans text-[clamp(23px,2.4vw,34px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#122a66]">
                {featuredStory.title}
              </h2>
              <p className="mt-3 max-w-275 font-noto-sans text-[14px] leading-normal text-[#121212] sm:text-[16px]">
                {featuredStory.excerpt}
              </p>
              <div className="mt-6 overflow-hidden rounded-[5px]">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.04] sm:h-80 lg:h-96"
                />
              </div>
            </Link>
          </article>

          <aside className="pt-1 lg:pl-3">
            <h3 className="font-noto-sans text-[20px] font-semibold leading-none tracking-[-0.03em] text-[#0a0a0a] sm:text-[22px] lg:text-[24px]">
              Latest from IDMS
            </h3>

            <div className="mt-5 space-y-5">
              {sideStories.map((story, index) => (
                <article
                  key={story.title}
                  className={`${index < sideStories.length - 1 ? 'border-b border-[#cfcfcf] pb-5' : ''}`}
                >
                  <Link to={`/blog/${story.slug}`} className="grid grid-cols-[145px_1fr] gap-3.5 group">
                    <div className="overflow-hidden rounded-[5px]">
                      <img src={story.image} alt={story.title} className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-noto-sans text-[18.5px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#122a66] transition-colors group-hover:text-[#2555eb] sm:text-[19.5px] lg:text-[20.5px]">
                        {story.title}
                      </h4>
                      <p className="mt-1 font-noto-sans text-[14.5px] leading-[1.35] text-[#101010] sm:text-[14.5px]">{story.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="blog-articles" className="bg-[#ebebff] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-345 space-y-12">
          {blogSections.map((section) => {
            const sectionId = getBlogSectionId(section.title);
            return (
              <div
                id={sectionId}
                key={section.title}
                className={`space-y-5 scroll-mt-28 transition-all duration-500 ${animatedSection === sectionId ? 'rounded-[5px] bg-white/45 ring-1 ring-[#9bb7ff]' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-noto-sans text-[22px] font-semibold uppercase tracking-[0.01em] text-[#122a66]">
                    {section.title}
                  </h3>
                  <button type="button" className="font-noto-sans text-[13px] text-[#404040] transition-colors duration-200 hover:text-[#111111]">
                    All {section.title} articles
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {section.posts.map((post) => (
                    <StoryCard key={post.title} post={post} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
