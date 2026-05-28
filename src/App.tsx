import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Star, Sparkles, MapPin, Phone, Mail, ArrowRight, Gem, Book, Flower2, Heart, ExternalLink, Clock } from 'lucide-react';
import { blogPosts } from './data/blogPosts';

const FACEBOOK_URL = 'https://www.facebook.com/lunarlightawakening';
const EMAIL = 'lunarlightawakening@gmail.com';
const PHONE = '715-581-7317';
const ADDRESS_LINE_ONE = '453 Grand Ave Suites B & C';
const ADDRESS_LINE_TWO = 'Schofield, WI 54476';
const MAPS_QUERY = encodeURIComponent(`${ADDRESS_LINE_ONE}, ${ADDRESS_LINE_TWO}`);
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const CONTACT_MAILTO = `mailto:${EMAIL}`;

const scrollToSectionId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth',
    });
  }
};

const scrollToSectionLink = (e: React.MouseEvent<HTMLElement>, href: string) => {
  e.preventDefault();
  scrollToSectionId(href.replace('#', ''));
};

// --- Shared Components ---

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mx-auto mb-16 max-w-3xl text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-display text-4xl md:text-5xl mb-4 leading-tight ${light ? 'text-gold-light' : 'text-celestial-dark'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg leading-relaxed max-w-2xl mx-auto ${light ? 'text-white/72' : 'text-celestial-dark/65'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-16 h-px bg-gold/65 mx-auto mt-8" />
  </div>
);

// --- Navbar ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Offerings', href: '#offerings' },
    { name: 'Merchandise', href: '#merchandise' },
    { name: 'Practitioners', href: '#practitioners' },
    { name: 'Events', href: '#events' },
    { name: 'Blog', href: '#blog' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSectionId(href.replace('#', ''));
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'lunar-gradient-nav backdrop-blur-md py-3 shadow-xl border-b border-gold/10' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border border-gold/55 bg-celestial-dark/40 flex items-center justify-center">
            <Moon className="w-5 h-5 text-gold" />
          </div>
          <span className="font-display text-xl text-gold-light hidden sm:block">Lunar Light</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-sans text-xs uppercase tracking-[0.12em] text-white/72 hover:text-gold-light transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#practitioners"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(e, '#practitioners');
            }}
            className="min-h-11 px-6 py-3 border border-gold/55 text-gold-light hover:bg-gold hover:text-celestial-dark transition-all rounded-full text-xs uppercase tracking-[0.12em]"
          >
            Book Service
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white min-h-11 min-w-11 inline-flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full lunar-gradient-section border-t border-white/10 py-8 px-6 flex flex-col gap-6 lg:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="font-display text-2xl text-gold-light"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero ---

const Hero = () => {
  const visitDetails = [
    { icon: <MapPin className="h-4 w-4" />, label: "Schofield, WI" },
    { icon: <Clock className="h-4 w-4" />, label: "Open Tue-Sat" },
    { icon: <Sparkles className="h-4 w-4" />, label: "Shop, learn, heal" }
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 lunar-gradient-hero" />
        <div className="grain-overlay absolute inset-0 opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-14 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-celestial-dark/40 px-4 py-2 text-xs uppercase tracking-[0.12em] text-gold-light">
            <Moon className="h-4 w-4" />
            Wellness, crystals, classes, and healing arts
          </div>

          <h1 className="font-display text-5xl leading-[0.96] text-gold-light sm:text-6xl lg:text-7xl">
            A softer place to begin your wellness journey.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/76 md:text-2xl">
            Lunar Light Awakening is a Schofield crystal and wellness shop where you can browse meaningful tools, meet healing practitioners, and find support without pressure.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button 
              onClick={(e) => {
                e.preventDefault();
                scrollToSectionId('merchandise');
              }}
              className="min-h-12 px-8 py-4 bg-gold text-celestial-dark font-sans text-sm uppercase tracking-[0.12em] rounded-full hover:bg-gold-light transition-all shadow-[0_18px_60px_rgba(22,13,28,0.35)]"
            >
              Browse the Shop
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                scrollToSectionId('practitioners');
              }}
              className="min-h-12 px-8 py-4 border border-white/25 text-white font-sans text-sm uppercase tracking-[0.12em] rounded-full hover:bg-parchment hover:text-celestial-dark transition-all"
            >
              Meet Practitioners
            </button>
          </div>

          <div className="mt-12 grid gap-3 text-sm text-white/68 sm:grid-cols-3">
            {visitDetails.map((detail) => (
              <div key={detail.label} className="flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="text-gold">{detail.icon}</span>
                <span>{detail.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -left-6 top-12 hidden h-40 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent lg:block" />
          <div className="soft-card relative overflow-hidden rounded-[2rem] p-3 shadow-2xl shadow-celestial-dark/40">
            <div className="relative overflow-hidden rounded-[1.55rem]">
              <img
                src="/marketplace/crystal-sanctuary.jpg"
                alt="Crystal displays and mineral pieces at Lunar Light Awakening"
                className="aspect-[4/5] h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-celestial-dark/75 via-celestial-dark/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <img src="/logo.png" alt="" className="mb-5 h-16 w-16 object-contain" aria-hidden="true" />
                <p className="max-w-sm text-lg leading-relaxed text-parchment">
                  Stones, jewelry, herbs, workshops, and practitioner services gathered under one warm roof.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- About ---

const About = () => {
  return (
    <section className="py-24 lunar-light-section text-celestial-dark" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-2"
            >
              <img 
                src="/about/ann.png" 
                alt="Ann from Lunar Light Awakening" 
                className="rounded-2xl shadow-2xl relative z-10 w-full max-h-[620px] object-cover object-top"
              />
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold rounded-2xl z-0" />
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-gold">A real place to land</p>
            <h2 className="font-display text-4xl mb-6 text-celestial-dark md:text-5xl">Our Mission</h2>
            <div className="space-y-6 text-lg leading-relaxed text-celestial-dark/72">
              <p>
                It is our mission to empower individuals on their wellness journey by providing a variety of resources that support them in reaching their wellness goals.
              </p>
              <p>
                We have curated an expansive line of products and alternative health resources to assist our customers in improving the overall health of their body, mind, and soul.
              </p>
              <p>
                We strive to provide a peaceful, welcoming environment where customers can come to shop, learn, heal, and grow! Whether you're seeking a rare crystal for aesthetic enjoyment or looking for a transformative workshop, we are here to support your journey.
              </p>
            </div>
            <a
              href="/blog/the-heart-of-lunar-light-awakening/"
              className="mt-10 inline-flex min-h-11 items-center gap-4 text-gold hover:text-celestial-dark transition-all font-display border-b border-gold pb-2 group"
            >
              Learn More About Our Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Offerings ---

const Offerings = () => {
  const categories = [
    {
      title: "Sacred Stones",
      icon: <Gem className="w-8 h-8" />,
      description: "A large variety of stones and crystals for aesthetic enjoyment or metaphysical use.",
      items: ["Amethyst", "Rose Quartz", "Labradorite", "Moldavite"]
    },
    {
      title: "Healing Arts",
      icon: <Heart className="w-8 h-8" />,
      description: "Partnered alternative health services in our serene healing spaces.",
      items: ["Reiki & other energy healing", "Sound & crystal therapy", "Myofascial & craniosacral therapy", "Shamanic & ancestral healing"]
    },
    {
      title: "Community Learning",
      icon: <Book className="w-8 h-8" />,
      description: "Classes and workshops in our dedicated classroom space.",
      items: ["Chakras & the energy body", "Space clearing & energy protection", "Journaling & meditation", "Alternative healing methods"]
    },
    {
      title: "Artisanal Treasures",
      icon: <Flower2 className="w-8 h-8" />,
      description: "Jewelry, room decor, local art, apparel, and curated card decks.",
      items: ["Oracle & tarot decks", "Space clearing supplies", "Sacred ritual supplies", "Locally made products"]
    }
  ];

  return (
    <section className="py-24 lunar-gradient-section" id="offerings">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Resources for your body, mind, and soul" light>Our Offerings</SectionHeading>
        
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-gold/15 bg-gold/15 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="mineral-panel p-8 transition-colors group hover:bg-celestial-dark/70"
            >
              <div className="text-gold mb-6">{cat.icon}</div>
              <h3 className="font-display text-xl mb-4 text-gold-light">{cat.title}</h3>
              <p className="text-white/70 mb-6 leading-relaxed text-base">
                {cat.description}
              </p>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/54">
                    <Star className="mt-1.5 w-2.5 h-2.5 shrink-0 text-gold/45" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Blog ---

const Blog = () => {
  const categories = ["Store Stories", "Oracle Readings", "Crystals"];

  return (
    <section className="py-24 lunar-gradient-section" id="blog">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Sharing wisdom for your journey" light>Sacred Insights</SectionHeading>
        
        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <span key={i} className="px-5 py-2 rounded-full border border-gold/18 text-white/68 text-xs uppercase tracking-[0.12em] bg-celestial-dark/35">
              {cat}
            </span>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogPosts.map((post, i) => (
            <motion.a
              key={i}
              href={`/blog/${post.slug}/`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video mb-6">
                <img 
                  src={post.image} 
                  alt={post.imageAlt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-gold text-celestial-dark px-3 py-1 text-[10px] uppercase font-bold tracking-tighter rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="space-y-4">
                <time className="text-white/40 text-xs uppercase tracking-[0.12em]">{post.date}</time>
                <h3 className="font-display text-2xl text-gold-light group-hover:text-gold transition-colors leading-tight">
                  {post.shortTitle}
                </h3>
                <p className="text-white/64 text-base leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-gold text-xs uppercase tracking-[0.12em] font-bold border-t border-white/8 group-hover:gap-4 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="/blog/" className="text-white/40 hover:text-gold transition-colors uppercase tracking-[0.3em] text-xs inline-flex items-center gap-3 mx-auto">
            View All Wisdom <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Events ---

type ClassListing = {
  title: string;
  date: string;
  time: string;
  instructor?: string;
  description: string;
  registrationHref: string;
};

const Events = () => {
  const upcomingClasses: ClassListing[] = [];

  const eventPaths = [
    {
      title: "Classes & Workshops",
      description: "Class dates change as practitioners and community partners schedule new gatherings.",
      cta: "Ask About Dates",
      href: "#contact"
    },
    {
      title: "Host in the Classroom",
      description: "Lunar Light offers classroom space for aligned wellness teachers and community gatherings.",
      cta: "Ask About Space",
      href: `${CONTACT_MAILTO}?subject=Classroom%20space%20inquiry`
    },
    {
      title: "Register for an Event",
      description: "Most events have limited space, so registration is handled directly through the shop or the listed practitioner.",
      cta: "Contact the Shop",
      href: `${CONTACT_MAILTO}?subject=Event%20registration%20question`
    }
  ];

  return (
    <section className="py-24 lunar-light-section text-celestial-dark" id="events">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Shop, learn, heal, and grow together">Workshops & Classes</SectionHeading>

        <div className="mx-auto mb-16 max-w-5xl">
          {upcomingClasses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {upcomingClasses.map((classInfo, idx) => (
                <motion.article
                  key={`${classInfo.title}-${classInfo.date}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-[1.5rem] border border-celestial-dark/10 bg-parchment/70 p-8 shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="mb-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em] text-gold">
                    <span>{classInfo.date}</span>
                    <span>{classInfo.time}</span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl text-celestial-dark">{classInfo.title}</h3>
                  {classInfo.instructor && (
                    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-celestial-dark/45">{classInfo.instructor}</p>
                  )}
                  <p className="mb-7 text-base leading-relaxed text-celestial-dark/68">{classInfo.description}</p>
                  <a
                    href={classInfo.registrationHref}
                    className="inline-flex items-center gap-3 border-b border-gold/50 pb-1 text-xs uppercase tracking-[0.12em] text-gold transition-colors hover:border-celestial-dark hover:text-celestial-dark"
                  >
                    Class Details <ArrowRight className="h-3 w-3" />
                  </a>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-celestial-dark/10 bg-parchment/70 p-8 text-center shadow-sm">
              <h3 className="mb-4 font-display text-2xl text-celestial-dark">Upcoming class details are being finalized.</h3>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-celestial-dark/68">
                New workshops and class details will be posted here as soon as dates, instructors, and registration information are confirmed.
              </p>
            </div>
          )}
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventPaths.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-celestial-dark/10 rounded-[1.5rem] p-8 hover:shadow-xl transition-all group bg-parchment/65 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-8">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display text-celestial-dark mb-4 group-hover:text-gold transition-colors">{event.title}</h3>
              <p className="text-celestial-dark/68 text-base leading-relaxed mb-8 flex-grow">{event.description}</p>
              <a
                href={event.href}
                onClick={event.href.startsWith('#') ? (e) => scrollToSectionLink(e, event.href) : undefined}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-gold border-b border-gold/50 pb-1 group-hover:border-gold"
              >
                {event.cta} <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-celestial-dark/58 mb-6">Dates move quickly; contact the shop for the current class and workshop schedule.</p>
          <a href="#contact" onClick={(e) => scrollToSectionLink(e, '#contact')} className="text-gold font-display text-xs tracking-[0.14em] border-b border-gold pb-1 hover:text-celestial-dark hover:border-celestial-dark transition-all">
            Contact the Shop
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Practitioners ---

type Practitioner = {
  name: string;
  role: string;
  image?: string;
  services: string[];
  bio: string[];
  website?: string;
  websiteLabel?: string;
};

const Practitioners = () => {
  const [selectedMember, setSelectedMember] = useState<Practitioner | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedMember(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedMember]);

  const team: Practitioner[] = [
    {
      name: "Lisa Bernarde",
      role: "Graceful Guidance",
      image: "/practitioners/lisa-bernarde.png",
      services: ["Reiki", "Quantum Healing", "Hypnotherapy", "Bioresonance Healing"],
      bio: [
        "Lisa brings deep compassion to her work and supports clients through Reiki, quantum healing, hypnotherapy, bioresonance, and vibrational sound practices.",
        "Her path began with QHHT training and expanded into Usui Reiki Master Teacher work, animal Reiki, and other modalities that help people move toward peace and betterment."
      ],
      website: "https://www.gracefulguidancelisa.com",
      websiteLabel: "Graceful Guidance"
    },
    {
      name: "Heidi Kleinschmidt",
      role: "Your Love from Within",
      image: "/practitioners/heidi-kleinschmidt.png",
      services: ["Energy Healing", "Emotional Clearing", "Somatic Movement Coaching", "Brainspotting"],
      bio: [
        "Heidi helps clients find balance, energy, and happiness through holistic mind-body-soul work shaped by her background as a counselor with a Native Tribe and her study with shamanic and quantum energy teachers.",
        "Her sessions may include energy clearing on a Rainbow Chakra PEMF InfraMat, Emotion Code emotional clearing, individualized somatic movement coaching, and Brainspotting for trauma, anxiety, fears, and other stored experiences."
      ],
      website: "https://yourlovefromwithin.com",
      websiteLabel: "Your Love from Within"
    },
    {
      name: "Andy Colton",
      role: "Myofascial Release",
      image: "/practitioners/andy_colton.png",
      services: ["Myofascial Release", "Craniosacral Therapy"],
      bio: [
        "Andy has been a bodyworker for more than a decade and specializes in the John F. Barnes approach to Myofascial Release.",
        "His work focuses on slow, sustained fascial release, deep listening, and helping clients feel safer, more fluid, and more connected in their bodies."
      ]
    },
    {
      name: "Mang Xiong",
      role: "Sacred Healing with Mang",
      services: ["Hmong Shaman", "Certified Reiki", "Divination", "Oracle card readings"],
      bio: [
        "Mang offers spiritual and energetic support through Hmong shamanic practice, Reiki, divination, energy healing, and oracle card readings.",
        "Sessions are centered on intuitive guidance, clearing, and reconnection for clients seeking support on their healing path."
      ],
      website: "https://www.facebook.com/p/Sacred-Healing-With-Mang-61572473406449/",
      websiteLabel: "Sacred Healing with Mang"
    }
  ];

  return (
    <section className="py-24 lunar-gradient-section" id="practitioners">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Alternative health services in our healing spaces" light>Our Practitioners</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group text-center mineral-panel rounded-[1.75rem] p-8"
            >
              <div className="relative mb-8 mx-auto w-36 h-36">
                <div className="absolute inset-4 rounded-full border border-gold/20 -rotate-6 group-hover:rotate-6 transition-transform duration-700" />
                <div className="absolute inset-0 rounded-full overflow-hidden border border-gold/40 bg-white/5 flex items-center justify-center">
                  {'image' in member && member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Sparkles className="w-12 h-12 text-gold" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-celestial-dark p-3 rounded-full border border-gold/30">
                  <Heart className="w-5 h-5 text-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-display text-gold-light mb-2">{member.name}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-gold/60 mb-4">{member.role}</p>
              <ul className="text-white/58 text-sm leading-relaxed max-w-xs mx-auto space-y-1 min-h-28">
                {member.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="mt-8 inline-flex min-h-11 items-center px-6 py-2 border border-white/15 rounded-full text-xs uppercase tracking-[0.12em] text-white/62 hover:text-gold-light hover:border-gold transition-all"
                aria-haspopup="dialog"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-celestial-dark/85 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            role="presentation"
          >
            <motion.div
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] border border-gold/20 bg-parchment text-celestial-dark shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="practitioner-dialog-title"
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-celestial-dark/10 bg-parchment/90 text-celestial-dark shadow-sm transition-colors hover:border-gold hover:text-gold"
                aria-label="Close practitioner details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-80 overflow-hidden bg-celestial-dark">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={`${selectedMember.name}, ${selectedMember.role}`}
                      className="h-full min-h-80 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-80 items-center justify-center">
                      <Sparkles className="h-20 w-20 text-gold" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-celestial-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">{selectedMember.role}</p>
                    <h3 id="practitioner-dialog-title" className="font-display text-4xl text-gold-light">
                      {selectedMember.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-8 p-8 md:p-10">
                  <div>
                    <h4 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-gold">Services</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedMember.services.map((service) => (
                        <span key={service} className="rounded-full border border-gold/25 px-4 py-2 text-xs uppercase tracking-[0.12em] text-celestial-dark/70">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5 text-lg leading-relaxed text-celestial-dark/72">
                    {selectedMember.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {selectedMember.website && (
                    <div className="flex flex-col gap-3 border-t border-gray-100 pt-8 sm:flex-row">
                      <a
                        href={selectedMember.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-celestial-dark px-6 py-3 text-xs uppercase tracking-[0.12em] text-parchment transition-all hover:bg-gold hover:text-celestial-dark"
                      >
                        Visit {selectedMember.websiteLabel} <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Marketplace ---

const Marketplace = () => {
  const collections = [
    {
      title: "Crystal Sanctuary",
      subtitle: "Tumbled, Raw & Freeform",
      image: "/marketplace/crystal-sanctuary.jpg",
      description: "From raw clusters to polished points, discover stones curated for their unique energy.",
      detailsHref: `${CONTACT_MAILTO}?subject=Crystal%20Sanctuary%20details`
    },
    {
      title: "Wearable Gems",
      subtitle: "Stone Jewelry",
      image: "/marketplace/wearable-spirit.png",
      description: "Descriptions and photos for current jewelry selections will be added as details are confirmed.",
      detailsHref: `${CONTACT_MAILTO}?subject=Wearable%20Gems%20photos%20and%20details`
    },
    {
      title: "Healing Herbs",
      subtitle: "Herbs & Wellness",
      image: "/marketplace/healing-herbs.png",
      description: "Botanical salves, sprays, and teas to support your physical and energetic body.",
      detailsHref: `${CONTACT_MAILTO}?subject=Healing%20Herbs%20details`
    },
    {
      title: "Sacred Space",
      subtitle: "Decor & Oils",
      image: "/marketplace/sacred-space.png",
      description: "Descriptions and photos for current sacred space supplies will be added as details are confirmed.",
      detailsHref: `${CONTACT_MAILTO}?subject=Sacred%20Space%20photos%20and%20details`
    }
  ];

  const subCategories = [
    "Local Art", "Eye Masks", "Greeting Cards", "Orgonite", "Tensor Rings", "Electroculture", "Natural Fabric Products"
  ];

  return (
    <section className="py-24 lunar-light-section" id="merchandise">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Curated resources for your wellness journey">The Marketplace</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {collections.map((col, i) => (
            <motion.a
              key={i}
              href={col.detailsHref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group grid gap-6 rounded-[1.75rem] border border-celestial-dark/10 bg-parchment/70 p-4 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-2xl md:grid-cols-[0.9fr_1fr]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[1.25rem] shadow-lg">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-celestial-dark/12 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="space-y-4 self-center p-2 md:p-4">
                <span className="text-gold font-sans text-xs tracking-[0.14em] uppercase">{col.subtitle}</span>
                <h3 className="text-3xl font-display text-celestial-dark">{col.title}</h3>
                <p className="text-celestial-dark/68 leading-relaxed text-base">
                  {col.description}
                </p>
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-[0.14em] border-b border-gold/50 pb-1 text-celestial-dark/70 group-hover:text-gold group-hover:border-gold transition-all">
                    Request Photos & Details
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Local Artisans Pill List */}
        <div className="border-t border-celestial-dark/10 pt-16">
          <div className="text-center mb-10">
            <h4 className="font-display text-gold uppercase tracking-[0.14em] text-sm">Support Local Artisans</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {subCategories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-parchment-deep/65 border border-celestial-dark/10 rounded-full text-celestial-dark/72 font-sans text-xs uppercase tracking-[0.12em] hover:bg-gold hover:text-celestial-dark hover:border-gold transition-all cursor-default"
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact/Location ---

const Contact = () => {
  return (
    <section className="py-24 lunar-light-section" id="contact">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 w-full h-[450px] rounded-[1.75rem] overflow-hidden shadow-2xl relative grayscale-[35%] hover:grayscale-0 transition-all duration-700">
            {/* Embedded map for the Schofield storefront. */}
            <iframe 
              src={MAPS_EMBED_URL}
              className="w-full h-full border-0" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none border-[16px] border-parchment/25" />
          </div>
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-block px-4 py-1 bg-gold/12 text-gold rounded-full text-xs uppercase tracking-[0.14em] font-bold">
              Visit Our Sanctuary
            </div>
            <h2 className="font-display text-5xl text-celestial-dark leading-tight">We look forward to <br /><span className="text-gold">welcoming you.</span></h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-4">
                <h4 className="font-display text-xs uppercase tracking-[0.14em] text-gold">Address</h4>
                <p className="text-celestial-dark/68 leading-relaxed">
                  {ADDRESS_LINE_ONE}<br />
                  {ADDRESS_LINE_TWO}
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-display text-xs uppercase tracking-[0.14em] text-gold">Connect</h4>
                <p className="text-celestial-dark/68 leading-relaxed">
                  <a href={`tel:+1${PHONE.replaceAll('-', '')}`} className="hover:text-gold transition-colors">(715) 581-7317</a><br />
                  <a href={CONTACT_MAILTO} className="hover:text-gold transition-colors">{EMAIL}</a>
                </p>
              </div>
              <div className="sm:col-span-2 space-y-4">
                <h4 className="font-display text-xs uppercase tracking-[0.14em] text-gold">Hours</h4>
                <p className="text-celestial-dark/68 leading-relaxed">
                  Thursday: 9:00 AM - 3:00 PM<br />
                  Friday: 11:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed<br />
                  Monday: Closed<br />
                  Tuesday: 9:00 AM - 3:00 PM<br />
                  Wednesday: 11:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            
            <div className="pt-6">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center px-10 py-4 bg-celestial-dark text-parchment rounded-full text-xs uppercase tracking-[0.12em] hover:bg-gold hover:text-celestial-dark transition-all shadow-xl">
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const navLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="lunar-gradient-section pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Moon className="text-gold w-8 h-8" />
              <span className="font-display text-2xl text-gold-light">Lunar Light</span>
            </div>
            <p className="text-white/58 text-sm leading-relaxed">
              "Striving to provide a peaceful, welcoming environment where customers can come to shop, learn, heal, and grow!"
            </p>
            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-all font-display text-sm" aria-label="Lunar Light Awakening on Facebook">
                f
              </a>
              <a href={CONTACT_MAILTO} className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-all" aria-label="Email Lunar Light Awakening">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-gold-light mb-8 tracking-[0.12em] text-sm uppercase">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#merchandise" onClick={(e) => navLinkClick(e, '#merchandise')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-[0.12em]">Merchandise</a></li>
              <li><a href="#events" onClick={(e) => navLinkClick(e, '#events')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-[0.12em]">Events</a></li>
              <li><a href="#practitioners" onClick={(e) => navLinkClick(e, '#practitioners')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-[0.12em]">Practitioners</a></li>
              <li><a href="#blog" onClick={(e) => navLinkClick(e, '#blog')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-[0.12em]">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-gold-light mb-8 tracking-[0.12em] text-sm uppercase">Visit Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0 w-5 h-5" />
                <span>{ADDRESS_LINE_ONE}<br />{ADDRESS_LINE_TWO}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-gold shrink-0 w-5 h-5" />
                <a href={`tel:+1${PHONE.replaceAll('-', '')}`} className="hover:text-gold transition-colors">(715) 581-7317</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-gold shrink-0 w-5 h-5" />
                <a href={CONTACT_MAILTO} className="text-sm hover:text-gold transition-colors">{EMAIL}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-gold-light mb-8 tracking-[0.12em] text-sm uppercase">Stay Connected</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Join our mailing list to receive lunar updates, new merchandise arrivals, and event details.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const subject = encodeURIComponent('Mailing list signup');
                const body = encodeURIComponent(`Please add ${email} to the Lunar Light Awakening mailing list.`);
                window.location.href = `${CONTACT_MAILTO}?subject=${subject}&body=${body}`;
              }}
            >
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="min-h-12 bg-white/6 border border-white/12 rounded-full px-6 py-3 text-sm focus:border-gold transition-all flex-grow"
              />
              <button type="submit" className="w-12 h-12 rounded-full bg-gold text-celestial-dark flex items-center justify-center hover:bg-gold-light transition-all shrink-0" aria-label="Join mailing list">
                <Sparkles size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
            Copyright {new Date().getFullYear()} Lunar Light Awakening. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-celestial-dark overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Offerings />
        <Marketplace />
        <Practitioners />
        <Events />
        <Blog />
        <Contact />
        
        {/* Testimonial/Quote */}
        <section className="py-32 lunar-gradient-section relative">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-gold)_0%,transparent_70%)]" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <Sparkles className="text-gold w-12 h-12 mx-auto mb-10" />
              <blockquote className="font-display text-3xl md:text-5xl text-gold-light leading-snug mb-10">
                "A peaceful, welcoming environment where customers can come to shop, learn, heal, and grow."
              </blockquote>
              <cite className="font-display tracking-[0.3em] text-white/40 uppercase text-sm block">
                Lunar Light Awakening
              </cite>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
