import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Calendar, ChevronRight,
  Share2, Linkedin, Twitter, Link2,
  Facebook, Mail, ArrowRight, MessageSquare,
  Eye, Heart, MessageCircle, Search, MoreVertical
} from 'lucide-react';
import splashLogo from '../assets/shapes/splash_logo.svg';
import { fetchBlogById } from '../api/publicCms.js';
import { blogPosts } from '../data/blogData';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const contentRef = useRef(null);
  const shareMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Close share and search menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
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

  // Reading progress scroll logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');

      const staticPost = blogPosts.find((p) => p.slug === slug);

      if (staticPost) {
        if (!cancelled) {
          setPost(staticPost);
          setRelatedPosts(blogPosts.filter((p) => p.slug !== slug).slice(0, 3));
          setLoading(false);
          window.scrollTo(0, 0);
          setIsSearchOpen(false);
          setSearchQuery('');
        }
      } else {
        try {
          const cmsData = await fetchBlogById(slug);
          if (!cancelled && cmsData) {
            const transformedPost = {
              title: cmsData.title,
              image: cmsData.image,
              category: 'Insight',
              date: cmsData.createdAt ? new Date(cmsData.createdAt).toLocaleDateString() : 'Recent',
              readTime: '6 min read',
              content: {
                intro: cmsData.content.substring(0, 300) + '...',
                sections: [
                  { heading: 'Deep Dive', text: cmsData.content }
                ],
                impact: 'This data-driven approach ensures measurable growth and efficiency.',
                conclusion: 'Embrace innovation to stay ahead in your industry.'
              }
            };
            setPost(transformedPost);
            setRelatedPosts(blogPosts.slice(0, 3));
            window.scrollTo(0, 0);
          }
        } catch (err) {
          if (!cancelled) setError('Insight not found');
        } finally {
          if (!cancelled) setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[id^="section-"], #overview, #business-impact, #conclusion');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [post]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfcfb]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2555eb] border-t-transparent"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfcfb] pt-20">
        <h2 className="text-2xl font-semibold text-[#122a66]">Insight Not Found</h2>
        <Link to="/blog" className="mt-4 text-[#2555eb] hover:underline transition-all hover:pl-2">← Back to Insights</Link>
      </div>
    );
  }

  // Generate TOC items based on content sections
  const tocItems = [
    { id: 'overview', label: 'Overview' }
  ];
  post.content.sections.forEach((s, i) => {
    tocItems.push({ id: `section-${i}`, label: s.heading });
  });
  tocItems.push({ id: 'business-impact', label: 'Business Impact' });
  tocItems.push({ id: 'conclusion', label: 'Conclusion' });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-noto-sans text-[#1e293b]">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1.5 origin-left bg-[#2555eb]"
        style={{ scaleX }}
      />

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 lg:py-12 lg:px-[5vw]">
        <div className="mx-auto max-w-4xl">

          {/* Tabs Section above the card */}
          <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-4 relative">
            <div className="flex items-center gap-8 text-[15px] font-medium text-gray-500 whitespace-nowrap overflow-x-auto no-scrollbar pr-4">
              <Link to="/blog" className="transition-colors hover:text-[#2555eb]">All Posts</Link>
              <Link to="/blog" className="transition-colors hover:text-[#2555eb] text-[#122a66]">{post.category}</Link>
            </div>

            {/* Functional Search Bar */}
            <div className="flex items-center" ref={searchRef}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-0 top-[-8px] z-50 flex flex-col pt-2"
                  >
                    <div className="relative">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search insights..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-[5px] bg-white px-4 py-2 text-sm text-[#1e293b] shadow-lg ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2555eb]"
                      />
                      {searchResults.length > 0 && (
                        <div className="absolute top-full mt-2 w-full rounded-[5px] bg-white p-2 shadow-2xl ring-1 ring-slate-100">
                          {searchResults.map((result) => (
                            <Link
                              key={result.slug}
                              to={`/blog/${result.slug}`}
                              className="block rounded-[3px] p-3 text-sm font-medium text-[#122a66] hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                            >
                              {result.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSearchOpen && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center text-gray-400 cursor-pointer hover:text-[#2555eb] transition-colors shrink-0"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Main Card Container */}
          <div className="rounded-[5px] bg-white px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] ring-1 ring-slate-100 sm:px-10 sm:py-8 lg:px-16 lg:py-12">

            {/* Header Section (Meta + Title) */}
            <div className="mb-6 flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 text-[12px] font-bold text-[#94a3b8] uppercase tracking-[0.1em]"
              >
                <div className="flex items-center gap-2 text-[#122a66]">
                  <div className="h-7 w-auto overflow-hidden rounded-[4px] flex items-center justify-center">
                    <img src={splashLogo} alt="IDMS" className="h-full w-auto object-contain" />
                  </div>
                  <span className="text-[#122a66] hidden sm:inline">IDMS Infotech</span>
                </div>
                <span className="text-slate-200">•</span>
                <span>{post.date}</span>
                <span className="text-slate-200">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </motion.div>

              {/* More/Share Menu */}
              <div className="relative" ref={shareMenuRef}>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-1 rounded-full text-slate-400 hover:text-[#122a66] hover:bg-slate-50 transition-all"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute left-0 top-full mt-2 z-30 w-40 origin-top-left rounded-[5px] bg-white p-2 shadow-xl ring-1 ring-slate-200"
                    >
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setShowShareMenu(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-[3px] px-3 py-2 text-left text-sm font-medium text-[#122a66] hover:bg-slate-50 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        Share Post
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[30px] font-bold leading-[1.15] tracking-tight text-[#122a66]"
            >
              {post.title}
            </motion.h1>

            <div className="mt-10">
              <article ref={contentRef} className="prose prose-slate prose-lg max-w-none">
                {/* Intro Section */}
                <div id="overview" className="scroll-mt-32">
                  <p className="text-[18px] leading-[1.8] text-gray-600">
                    {post.content.intro}
                  </p>
                </div>

                {/* Main Featured Image Inside Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative my-12 overflow-hidden rounded-[5px] shadow-md"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </motion.div>

                {/* Dynamic Content Sections */}
                {post.content.sections.map((section, idx) => (
                  <div key={idx} id={`section-${idx}`} className="mt-12 scroll-mt-32 first:mt-0">
                    <h2 className="text-[28px] font-bold tracking-tight text-[#122a66]">
                      {section.heading}
                    </h2>
                    <div className="mt-6 text-[18px] leading-[1.85] text-gray-600">
                      <p>{section.text}</p>
                    </div>
                    {section.bullets && (
                      <ul className="mt-8 space-y-4">
                        {section.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-4 text-[18px] text-gray-700">
                            <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2555eb]" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Key Takeaway / Highlight - SaaS Style */}
                {post.content.highlightBox && (
                  <div className="group mt-20 scroll-mt-32 cursor-pointer border-t border-slate-100 pt-12">
                    <p className="text-[20px] font-bold text-[#2555eb] transition-all group-hover:underline sm:text-[26px] leading-tight">
                      {post.content.highlightBox.text}
                    </p>
                    <div className="mt-8 text-[18.5px] leading-relaxed text-gray-600">
                      IDMS can help businesses to a great extent for this concern. Our expert team ensures that every digital transformation journey is backed by robust strategy and seamless execution.
                    </div>
                  </div>
                )}

                {/* Impact & Conclusion */}
                <div id="business-impact" className="mt-16 scroll-mt-32">
                  <div className="text-[18px] leading-[1.85] text-gray-600">
                    <p>{post.content.impact}</p>
                  </div>
                </div>

                <div id="conclusion" className="mt-12 border-l-4 border-[#2555eb] bg-slate-50 p-10 rounded-r-[5px]">
                  <p className="text-[19px] italic leading-[1.8] text-[#122a66] font-medium">
                    {post.content.conclusion}
                  </p>
                </div>
              </article>

              {/* Footer Interactivity (Social + Metrics) */}
              <div className="space-y-6 pt-8">
                {/* Social Share Row */}
                <div className="flex items-center gap-6 border-b border-slate-50 pb-6 text-gray-400">
                  <button className="transition-colors hover:text-[#0077b5]"><Linkedin className="h-4 w-4" /></button>
                  <button className="transition-colors hover:text-[#1da1f2]"><Twitter className="h-4 w-4" /></button>
                  <button className="transition-colors hover:text-[#2555eb]"><Share2 className="h-4 w-4" /></button>
                  <button className="transition-colors hover:text-[#2555eb]"><MessageCircle className="h-4 w-4" /></button>
                </div>

                {/* Engagement Metrics Row */}
                <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-gray-400">
                  <div className="flex items-center gap-8">
                    <span className="flex items-center gap-2 transition-colors hover:text-[#2555eb] cursor-default uppercase">
                      <Eye className="h-3.5 w-3.5" /> 223 Views
                    </span>
                    <span className="flex items-center gap-2 transition-colors hover:text-[#2555eb] cursor-default uppercase">
                      <MessageCircle className="h-3.5 w-3.5" /> 0 Comments
                    </span>
                  </div>
                  <button className="flex items-center gap-2 transition-colors hover:text-red-500 group uppercase">
                    5 <Heart className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="mt-8 flex items-center justify-center">
            <Link to="/blog" className="flex items-center gap-2 font-bold text-[#64748b] transition-all hover:text-[#2555eb] uppercase text-xs tracking-widest">
              <ArrowLeft className="h-4 w-4" /> Back to all insights
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
}
