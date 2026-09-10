import React from 'react';
import { motion } from 'framer-motion';
import VideoSection from '../components/VideoSection';
import conferenceLargeImg from '../assets/Gallery/Large_Img_conference.png';
import pamexLargeImg from '../assets/Gallery/Large_Img_Pamex.jpeg';
import pamexSmallImg1 from '../assets/Gallery/small_pamex_img1.jpeg';
import pamexSmallImg2 from '../assets/Gallery/small_pamex_img2.jpeg';
import pamexSmallImg3 from '../assets/Gallery/small_pamex_img3.jpeg';
import pamexSmallImg4 from '../assets/Gallery/small_pamex_img4.jpeg';
import pamexSmallImg5 from '../assets/Gallery/small_pamex_img5.jpeg';
import conferenceSmallImg1 from '../assets/Gallery/small_conference_img1.png';
import conferenceSmallImg2 from '../assets/Gallery/small_conference_img2.png';
import conferenceSmallImg3 from '../assets/Gallery/small_conference_img3.png';
import conferenceSmallImg4 from '../assets/Gallery/small_conference_img4.png';
import conferenceSmallImg5 from '../assets/Gallery/small_conference_img5.png';
import portfolioLargeImg from '../assets/Gallery/Large_Img_Abstart.png';
import portfolioSmallImg1 from '../assets/Gallery/small_abstart_img1.png';
import portfolioSmallImg2 from '../assets/Gallery/small_abstart_img2.png';
import portfolioSmallImg3 from '../assets/Gallery/small_abstart_img3.png';
import portfolioSmallImg4 from '../assets/Gallery/small_abstart_img4.png';
import portfolioSmallImg5 from '../assets/Gallery/small_abstart_img5.png';
import sgaiLargeImg from '../assets/Gallery/sgai_seminar1.jpg';
import sgaiSmallImg1 from '../assets/Gallery/sgai_seminar2.jpg';
import sgaiSmallImg2 from '../assets/Gallery/sgai_seminar3.jpg';
import sgaiSmallImg3 from '../assets/Gallery/sgai_seminar4.jpg';
import sgaiSmallImg4 from '../assets/Gallery/sgai_seminar5.jpg';
import sgaiSmallImg5 from '../assets/Gallery/sgai_seminar1.jpg';
import waveLeft from '../assets/shapes/wave-left.svg';
import waveRight from '../assets/shapes/wave-right.svg';
//nothing to see here

const marqueeItems = [
  'Smart ERP Implementations',
  'Enterprise Software Delivery',
  'Client Collaboration Moments',
  'Product Showcase Highlights',
  'Engineering & Innovation',
  'Connected Business Operations',
];

const stickyImages = [
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=70&auto=format&fit=crop',
    alt: 'ERP dashboard walkthrough and analytics view',
    title: 'ERP Dashboard Insights',
    detail: 'Live visibility into business metrics, workflows, and enterprise performance data.',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=70&auto=format&fit=crop',
    alt: 'Software team working on enterprise solutions',
    title: 'Engineering Collaboration',
    detail: 'Cross-functional teams planning and delivering scalable modules for enterprise clients.',
  },
  {
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=70&auto=format&fit=crop',
    alt: 'Client meeting and strategy session',
    title: 'Client Strategy Sessions',
    detail: 'Requirement discussions and roadmap alignment with customer stakeholders.',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=70&auto=format&fit=crop',
    alt: 'Office collaboration and teamwork',
    title: 'Team Coordination',
    detail: 'Internal collaboration moments that drive quality and execution consistency.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=70&auto=format&fit=crop',
    alt: 'Product demo and presentation session',
    title: 'Product Demonstrations',
    detail: 'Showcase sessions focused on practical ERP outcomes and user adoption.',
  },
];

const bentoCards = [
  {
    title: 'Smart ERP Implementations',
    subtitle: 'Product demos and enterprise workflows',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=70&auto=format&fit=crop',
    className: 'lg:col-span-12 lg:row-span-1 h-[400px]',
  },
  {
    title: 'Client Collaboration',
    subtitle: 'Meetings and planning sessions',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=70&auto=format&fit=crop',
    className: 'lg:col-span-6',
  },
  {
    title: 'Product Showcases',
    subtitle: 'Platform walkthroughs',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=70&auto=format&fit=crop',
    className: 'lg:col-span-6',
  },
];

const archiveGallery = {
  featured: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=70&auto=format&fit=crop',
  grid: [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=70&auto=format&fit=crop',
  ],
  links: ['Implementations', 'Workshops', 'Conferences', 'Awards', 'Culture', 'Recognition']
};

function SectionSeparator() {
  return (
    <div
      className="relative z-10 pointer-events-none h-px w-full shrink-0"
      style={{
        background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
      }}
      aria-hidden
    />
  );
}

function StickyScrollGallery() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const imageRefs = React.useRef([]);
  const activeImage = stickyImages[activeIndex];

  React.useEffect(() => {
    const observers = [];
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.45 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="pt-8 w-full">
      <div className="-mx-4 border-y border-[#25324b] bg-[#111827] lg:-mx-[80px]">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:gap-14 lg:px-[80px]">
          <div className="lg:w-[340px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-48">
              <h2 className="mt-3 font-rajdhani text-[clamp(28px,3.4vw,48px)] font-semibold leading-[0.96] tracking-[-0.04em] text-white">
                Work in Motion
              </h2>
              <motion.div
                key={activeIndex}
                className="mt-4 max-w-[320px]"
              >
                <div className="font-rajdhani text-[15px] font-semibold uppercase tracking-[0.13em] text-[#93c5fd]">
                  {activeImage.title}
                </div>
                <p className="mt-2 font-rajdhani text-[17px] leading-relaxed text-white/74">
                  {activeImage.detail}
                </p>
              </motion.div>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-rajdhani text-[48px] font-bold text-[#2555eb]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="font-rajdhani text-[16px] text-white/40">
                  / {String(stickyImages.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 max-w-[720px] ml-auto">
            {stickyImages.map((img, i) => (
              <motion.div
                key={img.alt}
                ref={(el) => (imageRefs.current[i] = el)}
                className="group overflow-hidden rounded-[5px] shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-[300px] sm:h-[380px] lg:h-[440px]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="500"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryCarousel({ items, onItemClick, primaryColor = "#2555eb", gradientColor = "rgba(10, 35, 87, 0.92)" }) {
  const scrollRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const frameRef = React.useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      const currentProgress = totalScroll > 0 ? (scrollLeft / totalScroll) * 100 : 0;

      setProgress(currentProgress);
      setCanScrollLeft(scrollLeft > 20); // Small threshold for buffer
      setCanScrollRight(scrollLeft < totalScroll - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    // Initial check
    handleScroll();

    // Add resize listener to update progress on layout change
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col group/carousel">
      <div className="relative overflow-hidden rounded-[5px]">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-2 will-change-transform"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {items.map((img, index) => (
            <div
              key={index}
              onClick={() => onItemClick && onItemClick(index)}
              className="flex-shrink-0 w-[240px] lg:w-[320px] group relative h-[140px] lg:h-[180px] rounded-[5px] overflow-hidden cursor-pointer border border-[#1f1b19]/5 bg-gray-50 transition-all duration-300 will-change-transform"
            >
              <img
                src={img.src}
                loading="lazy"
                decoding="async"
                alt={img.title || "Gallery Image"}
                width="400"
                height="250"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex items-end p-4 z-10"
                style={{ background: `linear-gradient(to top, ${gradientColor} 0%, transparent 100%)` }}
              >
              </div>
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-2 w-[68px] z-30 flex items-center justify-center bg-black/55 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-500 hover:bg-black/70 md:flex hidden"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-2 w-[68px] z-30 flex items-center justify-center bg-black/55 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-500 hover:bg-black/70 md:flex hidden"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="h-[4px] w-[200px] bg-[#0a2357]/30 relative overflow-hidden rounded-full backdrop-blur-[2px]">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-300 ease-out rounded-full"
            style={{
              width: `${Math.max(12, progress)}%`,
              backgroundColor: primaryColor,
              boxShadow: `0 0 10px ${primaryColor}44`
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest tabular-nums italic" style={{ color: "transparent" }}>
            Scroll to Explore
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  // Annual Conference State
  const [conferenceHero, setConferenceHero] = React.useState({ src: conferenceLargeImg, title: "Annual Conference" });
  const [conferenceItems, setConferenceItems] = React.useState([
    { src: conferenceSmallImg1, title: "Executive Keynote" },
    { src: conferenceSmallImg2, title: "Client Networking" },
    { src: conferenceSmallImg3, title: "Leadership Forum" },
    { src: conferenceSmallImg4, title: "Innovation Panel" },
    { src: conferenceSmallImg5, title: "Global Strategy" }
  ]);

  // PAMEX State
  const [pamexHero, setPamexHero] = React.useState({ src: pamexLargeImg, title: "Digital Transformation" });
  const [pamexItems, setPamexItems] = React.useState([
    { src: pamexSmallImg1, title: "Business Strategy" },
    { src: pamexSmallImg2, title: "Global Expansion" },
    { src: pamexSmallImg3, title: "Tech Integration" },
    { src: pamexSmallImg4, title: "Operational Excellence" },
    { src: pamexSmallImg5, title: "Strategic Planning" }
  ]);

  // Portfolio State
  const [portfolioHero, setPortfolioHero] = React.useState({ src: portfolioLargeImg, title: "Enterprise Success" });
  const [portfolioItems, setPortfolioItems] = React.useState([
    { src: portfolioSmallImg1, title: "Scale Up" },
    { src: portfolioSmallImg2, title: "Global Team" },
    { src: portfolioSmallImg3, title: "Cloud Focus" },
    { src: portfolioSmallImg4, title: "Implementation" },
    { src: portfolioSmallImg5, title: "Success" }
  ]);

  // SGAI State
  const [sgaiHero, setSgaiHero] = React.useState({ src: sgaiLargeImg, title: "Industry Seminar" });
  const [sgaiItems, setSgaiItems] = React.useState([
    { src: sgaiSmallImg1, title: "Industry Leaders" },
    { src: sgaiSmallImg2, title: "Tech Trends" },
    { src: sgaiSmallImg3, title: "Innovation Growth" },
    { src: sgaiSmallImg4, title: "Collaborative Thinking" },
    { src: sgaiSmallImg5, title: "Meaningful Connections" }
  ]);

  const handleSwap = (index, section) => {
    if (section === 'conference') {
      const newHero = conferenceItems[index];
      const newItems = [...conferenceItems];
      newItems[index] = conferenceHero;
      setConferenceHero(newHero);
      setConferenceItems(newItems);
    } else if (section === 'pamex') {
      const newHero = pamexItems[index];
      const newItems = [...pamexItems];
      newItems[index] = pamexHero;
      setPamexHero(newHero);
      setPamexItems(newItems);
    } else if (section === 'portfolio') {
      const newHero = portfolioItems[index];
      const newItems = [...portfolioItems];
      newItems[index] = portfolioHero;
      setPortfolioHero(newHero);
      setPortfolioItems(newItems);
    } else if (section === 'sgai') {
      const newHero = sgaiItems[index];
      const newItems = [...sgaiItems];
      newItems[index] = sgaiHero;
      setSgaiHero(newHero);
      setSgaiItems(newItems);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-[#161312]">
      {/* 1st Section: Title + Video + Marquee - Gap before title reduced */}
      <section className="bg-white min-h-[calc(100vh-10px)] flex flex-col items-center pt-0 pb-12 px-4 overflow-hidden relative">
        <img
          src={waveLeft}
          alt=""
          className="pointer-events-none absolute -left-[30%] z-0 -top-[20%] h-[min(231%,739px)] w-auto max-w-[min(110.88vw,1040px)] select-none object-contain object-left-top"
          decoding="async"
          aria-hidden
        />
        <img
          src={waveRight}
          alt=""
          className="pointer-events-none absolute -bottom-[25%] -right-[5%] z-0 h-[min(202.4%,634px)] w-auto max-w-[min(109.12vw,986px)] select-none object-contain object-right-bottom"
          decoding="async"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 mt-10 mb-4"
        >
          <p className="text-[#122a66] text-[clamp(28px,3vw,44px)] font-bold leading-tight" style={{ fontSize: "40px", marginTop: "-10px" }}>
            Innovation in Action
          </p>
        </motion.div>

        <div className="w-full flex-1 flex items-start justify-center relative z-10 pt-2 pb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[800px] aspect-video rounded-[5px] overflow-hidden border border-gray-100 bg-black"
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/U5qbpDkXvTU?modestbranding=1&rel=0"
              title="IDMS Video Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>

        <div className="absolute bottom-[72px] left-0 w-full h-[10px] z-30">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #1E82E6 0%, #1E82E6 12.5%, #308ce8 12.5%, #308ce8 25%, #4196ea 25%, #4196ea 37.5%, #539fec 37.5%, #539fec 50%, #65a9ee 50%, #65a9ee 62.5%, #76b3f0 62.5%, #76b3f0 75%, #88bdf2 75%, #88bdf2 87.5%, #99c7f4 87.5%, #99c7f4 100%)'
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-[#1f1b19]/8 bg-white/95 backdrop-blur-md py-5 z-20"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            className="flex w-max items-center pb-1"
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center group">
                <span className="px-8 font-rajdhani text-[34px] font-bold uppercase leading-none tracking-[0.04em] text-[#0a2357]/80 hover:text-[#2555eb] transition-colors duration-300">
                  {item}
                </span>
                <span className="relative mx-3 flex h-3 w-3 items-center justify-center">
                  <span className="absolute h-3 w-3 rounded-full border border-[#2555eb]/30 bg-[#2555eb]/10" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2555eb]" />
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-[10px] z-30">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to left, #1E82E6 0%, #1E82E6 12.5%, #308ce8 12.5%, #308ce8 25%, #4196ea 25%, #4196ea 37.5%, #539fec 37.5%, #539fec 50%, #65a9ee 50%, #65a9ee 62.5%, #76b3f0 62.5%, #76b3f0 75%, #88bdf2 75%, #88bdf2 87.5%, #99c7f4 87.5%, #99c7f4 100%)'
            }}
          />
        </div>
      </section>
      <SectionSeparator />

      {/* 2nd Section: Annual Conference */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-10 pb-8 px-6 md:px-[6vw] lg:px-[8vw] bg-white relative"
      >
        <div className="flex flex-col gap-0 flex-1 min-h-0 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-10">
            <div className="flex flex-col gap-4 text-left pt-2">
              <div>
                <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-widest italic">Year 2026</span>
                <h3 className="text-[22px] font-semibold text-[#122a66] mt-1 leading-tight">Annual Conference 2026</h3>
              </div>
              <p className="text-[14px] leading-[1.6] text-[#6b7280]">
                Showcasing our precision in rolling out high-scale enterprise solutions. Our leadership sessions bring together industry experts to discuss the future of digital infrastructure.
              </p>
            </div>

            <div className="relative group/hero h-[260px] lg:h-[300px] rounded-[5px] overflow-hidden shadow-sm border border-[#1f1b19]/5 bg-gray-50">
              <motion.img
                key={conferenceHero.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={conferenceHero.src}
                alt={conferenceHero.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2357]/90 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 flex items-end p-6 transition-opacity duration-500">
                <span className="text-white font-medium text-[16px]">Annual Strategy Meet 2026 — Aligning Vision with Enterprise Innovation</span>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <GalleryCarousel
              items={conferenceItems}
              onItemClick={(idx) => handleSwap(idx, 'conference')}
              primaryColor="#2555eb"
              gradientColor="rgba(10, 35, 87, 0.8)"
            />
          </div>
        </div>
      </motion.section>
      <SectionSeparator />

      {/* 3rd Section: PAMEX 2024 */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-10 pb-8 px-6 md:px-[6vw] lg:px-[8vw] bg-[#ebebff] relative"
      >
        <div className="flex flex-col gap-0 flex-1 min-h-0 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-10">
            <div className="relative group/hero h-[260px] lg:h-[300px] rounded-[5px] overflow-hidden shadow-sm border border-[#1f1b19]/5 bg-gray-50">
              <motion.img
                key={pamexHero.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={pamexHero.src}
                alt={pamexHero.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2357]/90 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 flex items-end p-6 transition-opacity duration-500">
                <span className="text-white font-medium text-[16px]">PAMEX 2024 Showcase — Business Transformation & Excellence in Product Engineering.</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left pt-2 lg:pl-10">
              <div>
                <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-widest italic">Success Event</span>
                <h3 className="text-[22px] font-semibold text-[#122a66] mt-1 leading-tight">PAMEX 2024 Showcase</h3>
              </div>
              <p className="text-[14px] leading-[1.6] text-[#6b7280]">
                Exploring business growth through innovation. PAMEX 2024 highlighted our commitment to delivering state-of-the-art technological advancement in the printing and packaging industry.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <GalleryCarousel
              items={pamexItems}
              onItemClick={(idx) => handleSwap(idx, 'pamex')}
              primaryColor="#0a2357"
              gradientColor="rgba(10, 35, 87, 0.8)"
            />
          </div>
        </div>
      </motion.section>
      <SectionSeparator />

      {/* 4th Section: Portfolio */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-10 pb-8 px-6 md:px-[6vw] lg:px-[8vw] bg-white relative"
      >
        <div className="flex flex-col gap-0 flex-1 min-h-0 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-10">
            <div className="flex flex-col gap-4 text-left pt-2">
              <div>
                <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-widest italic">
                  Product Launch
                </span>
                <h3 className="text-[22px] font-semibold text-[#122a66] mt-1 leading-tight">
                  ABStart Platform Launch
                </h3>
              </div>
              <p className="text-[14px] leading-[1.6] text-[#6b7280]">
                We partnered with TalentCo HR Services LLP to launch ABStart — a startup-focused HR platform built through close collaboration, hands-on workshops, and shared product vision. This initiative combined HR expertise with scalable technology to deliver a practical solution for startups and MSMEs.
              </p>
            </div>

            <div className="relative group/hero h-[260px] lg:h-[300px] rounded-[5px] overflow-hidden shadow-sm border border-[#1f1b19]/5 bg-gray-50">
              <motion.img
                key={portfolioHero.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={portfolioHero.src}
                alt={portfolioHero.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2357]/90 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 flex items-end p-6 transition-opacity duration-500">
                <span className="text-white font-medium text-[16px]">ABStart Launch — Empowering startups with scalable HR technology and visionary product engineering.</span>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <GalleryCarousel
              items={portfolioItems}
              onItemClick={(idx) => handleSwap(idx, 'portfolio')}
              primaryColor="#2555eb"
              gradientColor="rgba(10, 35, 87, 0.8)"
            />
          </div>
        </div>
      </motion.section>
      <SectionSeparator />

      {/* New Section: SGAI Seminar */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-10 pb-8 px-6 md:px-[6vw] lg:px-[8vw] bg-[#ebebff] relative"
      >
        <div className="flex flex-col gap-0 flex-1 min-h-0 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-10">
            <div className="relative group/hero h-[260px] lg:h-[300px] rounded-[5px] overflow-hidden shadow-sm border border-[#1f1b19]/5 bg-gray-50">
              <motion.img
                key={sgaiHero.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={sgaiHero.src}
                alt={sgaiHero.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2357]/90 via-transparent to-transparent opacity-0 group-hover/hero:opacity-100 flex items-end p-6 transition-opacity duration-500">
                <span className="text-white font-medium text-[16px]">SGAI Seminar — Bringing together industry expertise, innovation, and collaborative growth.</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left pt-2 lg:pl-10">
              <div>
                <span className="text-[14px] font-semibold text-gray-400 uppercase tracking-widest italic">Industry Seminar</span>
                <h3 className="text-[22px] font-semibold text-[#122a66] mt-1 leading-tight">SGAI (Screenprinting & Graphics Association of India) Seminar</h3>
              </div>
              <p className="text-[14px] leading-[1.6] text-[#6b7280]">
                We were proud to be part of the SGAI (Screenprinting & Graphics Association of India) Seminar — a platform that brought together industry leaders, innovators, and professionals from the printing and graphics ecosystem. The event enabled insightful discussions on industry trends, technology advancements, and innovation-driven growth, fostering meaningful connections and collaborative thinking that continue to influence our approach toward delivering impactful and scalable solutions.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <GalleryCarousel
              items={sgaiItems}
              onItemClick={(idx) => handleSwap(idx, 'sgai')}
              primaryColor="#0a2357"
              gradientColor="rgba(10, 35, 87, 0.8)"
            />
          </div>
        </div>
      </motion.section>
      <SectionSeparator />

      {/* 5th Section – Sticky Scroll Gallery (Commented out)
      <StickyScrollGallery />
      */}

      {/* 4th Section – Gallery Highlights (Moved to last) */}
      <section className="bg-white px-4 pt-10 pb-8 lg:px-[80px]">
        <div className="mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-8">
              <h2 className="mt-3 text-[#122a66] text-[clamp(28px,3.4vw,48px)] font-bold leading-[0.96] tracking-[-0.04em]">
                Gallery Highlights
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { category: 'Product', title: 'Smart ERP Showcase', description: 'Experience the flow of enterprise workflows.', image: pamexLargeImg },
                { category: 'Clients', title: 'Collaboration Labs', description: 'On-site implementation and planning.', image: conferenceLargeImg },
                { category: 'Culture', title: 'The People Story', description: 'The engineering culture at IDMS.', image: portfolioLargeImg },
              ].map((card, i) => (
                <motion.div key={i} className="group relative h-[400px] overflow-hidden rounded border border-black/5 shadow-sm">
                  <img
                    src={card.image}
                    loading="lazy"
                    decoding="async"
                    alt={card.title}
                    width="800"
                    height="500"
                    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#93c5fd]">{card.category}</span>
                    <h3 className="mt-1 text-[22px] font-bold">{card.title}</h3>
                    <p className="text-[14px] text-white/70">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
