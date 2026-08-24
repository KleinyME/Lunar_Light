import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Star, Sparkles, MapPin, Phone, Mail, ArrowRight, Gem, Book, Flower2, Heart, ExternalLink } from 'lucide-react';
import { blogPosts } from './data/blogPosts';

const FACEBOOK_URL = 'https://www.facebook.com/lunarlightawakening';
const EMAIL = 'lunarlightawakening@gmail.com';
const PHONE = '715-581-7317';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=121%20Skelly%20Street%2C%20Schofield%2C%20WI%2054476';
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
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-display text-4xl md:text-5xl mb-4 ${light ? 'text-white' : 'text-gold'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-serif italic text-lg max-w-2xl mx-auto ${light ? 'text-white/70' : 'text-gray-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-px bg-gold/50 mx-auto mt-8" />
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
    { name: 'Events', href: '#events' },
    { name: 'Practitioners', href: '#practitioners' },
    { name: 'Blog', href: '#blog' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSectionId(href.replace('#', ''));
    setIsMenuOpen(false);
  };

  return (
    <nav aria-label="Primary" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-celestial-dark/90 backdrop-blur-md py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
            <Moon className="w-5 h-5 text-gold" />
          </div>
          <span className="font-display text-xl tracking-widest text-gold-light hidden sm:block">LUNAR LIGHT</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors"
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
            className="px-6 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-celestial-dark transition-all rounded-full text-[10px] uppercase tracking-widest"
          >
            Book Service
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} aria-controls="mobile-nav">
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
            id="mobile-nav"
            className="absolute top-full left-0 w-full bg-celestial-dark border-t border-white/10 py-8 px-6 flex flex-col gap-6 lg:hidden shadow-2xl"
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
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Nebula Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-celestial-dark via-indigo-950/30 to-celestial-dark" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" 
        />
        
        {/* Twinkling Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 inline-block"
        >
          {/* Circular Logo Shell */}
          <div className="relative p-12 rounded-full border border-gold/20 flex items-center justify-center bg-celestial-dark/30 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-full border border-gold/40 animate-pulse" />
            
            <div className="w-64 h-64 sm:w-80 sm:h-80 flex flex-col items-center justify-center text-gold-light">
              <img 
                src="/logo.png" 
                alt="Lunar Light Awakening Logo" 
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-opacity duration-700"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).classList.add('opacity-100');
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.fallback-logo');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="fallback-logo hidden flex flex-col items-center justify-center">
                <Moon size={64} className="mb-4 text-gold drop-shadow-lg" />
                <div className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-widest text-shadow-gold">
                  LUNAR <br /> LIGHT
                </div>
                <p className="mt-4 font-sans text-xs sm:text-sm tracking-[0.5em] uppercase text-gold/80">
                  Awakening
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <h1 className="sr-only">Lunar Light Awakening &mdash; Wellness and Crystal Shop in Schofield, Wisconsin</h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-serif italic text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
            Empowering individuals on their wellness journey through the power of stones, spirit, and community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={(e) => {
                e.preventDefault();
                scrollToSectionId('merchandise');
              }}
              className="px-10 py-4 bg-gold text-celestial-dark font-sans text-sm uppercase tracking-widest rounded-full hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Explore Our Stones
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                scrollToSectionId('practitioners');
              }}
              className="px-10 py-4 border border-white/20 text-white font-sans text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-celestial-dark transition-all"
            >
              Our Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

// --- About ---

const About = () => {
  return (
    <section className="py-24 bg-white text-celestial-dark" id="about">
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
            <h2 className="font-display text-4xl mb-6 text-gold-deep">Our Mission</h2>
            <div className="space-y-6 font-serif text-lg leading-relaxed text-gray-700">
              <p>
                It is our mission to empower individuals on their wellness journey by providing a variety of resources that support them in reaching their wellness goals.
              </p>
              <p>
                We have curated an expansive line of products and alternative health resources to assist our customers in improving the overall health of their body, mind, and spirit.
              </p>
              <p>
                We strive to provide a peaceful, welcoming environment where customers can come to shop, learn, heal, and grow! Whether you're seeking a rare crystal for aesthetic enjoyment or looking for a transformative workshop, we are here to support your awakening.
              </p>
            </div>
            <a
              href="/blog/the-heart-of-lunar-light-awakening/"
              className="mt-10 inline-flex items-center gap-4 text-gold hover:text-celestial-dark transition-all font-display tracking-widest border-b border-gold pb-2 group"
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
      items: ["Reiki", "Sound Healing", "Crystal Therapy", "Meditation"]
    },
    {
      title: "Community Learning",
      icon: <Book className="w-8 h-8" />,
      description: "Classes and workshops in our dedicated classroom space.",
      items: ["Journaling", "Meditation 101", "Lunar Cycles", "Herbalism"]
    },
    {
      title: "Artisanal Treasures",
      icon: <Flower2 className="w-8 h-8" />,
      description: "Jewelry, room decor, local art, apparel, and curated card decks.",
      items: ["Dainty Pendants", "Tapestries", "Oracle Decks", "Handmade Soap"]
    }
  ];

  return (
    <section className="py-24 bg-celestial-dark" id="offerings">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Resources for your body, mind, and spirit" light>Our Offerings</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl hover:border-gold/40 transition-all group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="font-display text-xl mb-4 text-gold-light">{cat.title}</h3>
              <p className="text-white/60 mb-6 font-serif leading-relaxed text-sm">
                {cat.description}
              </p>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest">
                    <Star className="w-2 h-2 text-gold/30" /> {item}
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
    <section className="py-24 bg-celestial-dark" id="blog">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Sharing wisdom for your journey" light>Sacred Insights</SectionHeading>
        
        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <span key={i} className="px-6 py-2 rounded-full border border-white/10 text-white/60 text-xs uppercase tracking-widest glass">
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
                <time className="text-white/40 text-xs uppercase tracking-widest">{post.date}</time>
                <h3 className="font-display text-2xl text-gold-light group-hover:text-gold transition-colors leading-tight">
                  {post.shortTitle}
                </h3>
                <p className="font-serif text-white/60 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold border-t border-white/5 group-hover:gap-4 transition-all">
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

const Events = () => {
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
    <section className="py-24 bg-white text-celestial-dark" id="events">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Shop, learn, heal, and grow together">Workshops & Classes</SectionHeading>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventPaths.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all group bg-gray-50/50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-8">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display text-celestial-dark mb-4 group-hover:text-gold transition-colors">{event.title}</h3>
              <p className="font-serif text-gray-600 text-sm italic leading-relaxed mb-8 flex-grow">{event.description}</p>
              <a
                href={event.href}
                onClick={event.href.startsWith('#') ? (e) => scrollToSectionLink(e, event.href) : undefined}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-gold border-b border-gold/50 pb-1 group-hover:border-gold"
              >
                {event.cta} <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="font-serif text-gray-600 mb-6 italic">Dates move quickly; contact the shop for the current class and workshop schedule.</p>
          <a href="#contact" onClick={(e) => scrollToSectionLink(e, '#contact')} className="text-gold-deep font-display text-xs tracking-widest border-b border-gold pb-1 hover:text-celestial-dark hover:border-celestial-dark transition-all">
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
        "Heidi helps clients find balance, energy, and happiness through holistic mind-body-spirit work shaped by her background as a counselor with a Native Tribe and her study with shamanic and quantum energy teachers.",
        "Her sessions may include energy clearing on a Rainbow Chakra PEMF InfraMat, Emotion Code emotional clearing, individualized somatic movement coaching, and Brainspotting for trauma, anxiety, fears, and other stored experiences."
      ],
      website: "https://yourlovefromwithin.com",
      websiteLabel: "Your Love from Within"
    },
    {
      name: "Andy Colton",
      role: "Myofascial Release",
      image: "/practitioners/andy-colton.png",
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
    <section className="py-24 bg-celestial-dark" id="practitioners">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Alternative health services in our healing spaces" light>Our Practitioners</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group text-center glass rounded-3xl p-8"
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
              <ul className="font-serif text-white/50 text-sm leading-relaxed max-w-xs mx-auto space-y-1 min-h-28">
                {member.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelectedMember(member)}
                className="mt-8 inline-flex px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/40 hover:text-gold hover:border-gold transition-all"
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
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-gold/20 bg-white text-celestial-dark shadow-2xl"
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
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-celestial-dark/10 bg-white/90 text-celestial-dark shadow-sm transition-colors hover:border-gold hover:text-gold"
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
                        <span key={service} className="rounded-full border border-gold/25 px-4 py-2 text-xs uppercase tracking-widest text-celestial-dark/70">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5 font-serif text-lg leading-relaxed text-gray-700">
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
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-celestial-dark px-6 py-3 text-xs uppercase tracking-widest text-white transition-all hover:bg-gold hover:text-celestial-dark"
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
      description: "From raw clusters to polished points, discover stones curated for their unique energy."
    },
    {
      title: "Wearable Spirit",
      subtitle: "Stone Jewelry",
      image: "/marketplace/wearable-spirit.png",
      description: "Locally created pieces including gorgeous opal jewelry from Opal Gems Crafted."
    },
    {
      title: "Healing Herbs",
      subtitle: "Alice's Rabbit Whole",
      image: "/marketplace/healing-herbs.png",
      description: "Botanical salves, sprays, and teas to support your physical and energetic body."
    },
    {
      title: "Sacred Space",
      subtitle: "Decor & Oils",
      image: "/marketplace/sacred-space.png",
      description: "Sun's Eye oils, sage bundles, and palo santo to clear and uplift your environment."
    }
  ];

  const subCategories = [
    "Local Art", "Eye Masks", "Bath Bombs", "Creamed Honey", "Maple Syrup", "Greeting Cards"
  ];

  return (
    <section className="py-24 bg-white" id="merchandise">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Curated resources for your wellness journey">The Marketplace</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {collections.map((col, i) => (
            <motion.a
              key={i}
              href="#contact"
              onClick={(e) => scrollToSectionLink(e, '#contact')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-center group"
            >
              <div className="w-full md:w-1/2 aspect-square overflow-hidden rounded-3xl shadow-2xl relative">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-celestial-dark/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-gold font-display text-xs tracking-widest uppercase">{col.subtitle}</span>
                <h3 className="text-3xl font-display text-celestial-dark">{col.title}</h3>
                <p className="font-serif text-gray-600 leading-relaxed text-sm">
                  {col.description}
                </p>
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-widest border-b border-gold/50 pb-1 text-celestial-dark/80 group-hover:text-gold-deep group-hover:border-gold transition-all">
                    Ask About Items
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Local Artisans Pill List */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-10">
            <h4 className="font-display text-gold-deep uppercase tracking-[0.3em] text-sm">Support Local Artisans</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {subCategories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-gray-50 border border-gray-100 rounded-full text-celestial-dark/80 font-sans text-xs uppercase tracking-widest hover:bg-gold hover:text-white hover:border-gold transition-all cursor-default"
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
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
            {/* Embedded map for the Schofield storefront. */}
            <iframe 
              title="Map to 121 Skelly Street, Schofield, WI 54476"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.313426732958!2d-89.60943892354832!3d44.912644271032895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8800049495acb627%3A0xe54dca7cc203c623!2s121%20Skelly%20St%2C%20Schofield%2C%20WI%2054476!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              className="w-full h-full border-0" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
          </div>
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-block px-4 py-1 bg-gold/10 text-gold-deep rounded-full text-[10px] uppercase tracking-widest font-bold">
              Visit Our Sanctuary
            </div>
            <h2 className="font-display text-5xl text-celestial-dark leading-tight">We look forward to <br /><span className="text-gold italic font-serif">welcoming you.</span></h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-gold-deep italic">Address</h4>
                <p className="text-gray-600 font-serif leading-relaxed">
                  121 Skelly Street<br />
                  Schofield, WI 54476
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-gold-deep italic">Connect</h4>
                <p className="text-gray-600 font-serif leading-relaxed">
                  <a href={`tel:+1${PHONE.replaceAll('-', '')}`} className="hover:text-gold transition-colors">(715) 581-7317</a><br />
                  <a href={CONTACT_MAILTO} className="hover:text-gold transition-colors">{EMAIL}</a>
                </p>
              </div>
              <div className="sm:col-span-2 space-y-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-gold-deep italic">Hours</h4>
                <p className="text-gray-600 font-serif leading-relaxed">
                  Tuesday - Saturday: 10:00 AM - 6:00 PM<br />
                  Sunday - Monday: Closed
                </p>
              </div>
            </div>
            
            <div className="pt-6">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex px-10 py-4 bg-celestial-dark text-white rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-xl">
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
    <footer className="bg-celestial-dark pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Moon className="text-gold w-8 h-8" />
              <span className="font-display text-2xl tracking-[0.2em] text-gold-light">LUNAR LIGHT</span>
            </div>
            <p className="text-white/50 font-serif text-sm leading-relaxed italic">
              "Striving to provide a peaceful, welcoming environment where customers can come to shop, learn, heal, and grow!"
            </p>
            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-all font-display text-sm" aria-label="Lunar Light Awakening on Facebook">
                f
              </a>
              <a href={CONTACT_MAILTO} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-all" aria-label="Email Lunar Light Awakening">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-gold-light mb-8 tracking-widest text-sm uppercase">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#merchandise" onClick={(e) => navLinkClick(e, '#merchandise')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-widest">Merchandise</a></li>
              <li><a href="#events" onClick={(e) => navLinkClick(e, '#events')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-widest">Events</a></li>
              <li><a href="#practitioners" onClick={(e) => navLinkClick(e, '#practitioners')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-widest">Practitioners</a></li>
              <li><a href="#blog" onClick={(e) => navLinkClick(e, '#blog')} className="text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-widest">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-gold-light mb-8 tracking-widest text-sm uppercase">Visit Us</h4>
            <ul className="space-y-4 font-serif text-white/60">
              <li className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0 w-5 h-5" />
                <span>121 Skelly Street<br />Schofield, WI 54476</span>
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
            <h4 className="font-display text-gold-light mb-8 tracking-widest text-sm uppercase">Stay Connected</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Join our mailing list to receive lunar updates, new stones arrivals, and event details.
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
                aria-label="Email address for the mailing list"
                placeholder="Your email" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold transition-all flex-grow"
              />
              <button type="submit" className="w-12 h-12 rounded-full bg-gold text-celestial-dark flex items-center justify-center hover:bg-gold-light transition-all shrink-0" aria-label="Join mailing list">
                <Sparkles size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-white/60 text-xs uppercase tracking-[0.2em]">
            Copyright {new Date().getFullYear()} Lunar Light Awakening. All Rights Reserved. <a href="/privacy/" className="underline decoration-white/40 underline-offset-4 hover:text-gold transition-colors">Privacy Policy</a>
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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-gold focus:text-celestial-dark focus:px-5 focus:py-2 focus:rounded-full">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Offerings />
        <Marketplace />
        <Events />
        <Practitioners />
        <Blog />
        <Contact />
        
        {/* Testimonial/Quote */}
        <section className="py-32 bg-celestial-dark relative">
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
              <blockquote className="font-serif italic text-3xl md:text-5xl text-gold-light leading-snug mb-10">
                "A peaceful, welcoming environment where customers can come to shop, learn, heal, and grow."
              </blockquote>
              <cite className="font-display tracking-[0.3em] text-white/60 uppercase text-sm block">
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
