import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Star, Sparkles, MapPin, Phone, Mail, Instagram, Facebook, ArrowRight, Gem, Book, Flower2, Heart } from 'lucide-react';

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
        className={`font-serif italic text-lg max-w-2xl mx-auto ${light ? 'text-white/70' : 'text-gray-400'}`}
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
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-celestial-dark/90 backdrop-blur-md py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
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
          <button 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(e as any, '#practitioners');
            }}
            className="px-6 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-celestial-dark transition-all rounded-full text-[10px] uppercase tracking-widest"
          >
            Book Service
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className="absolute top-full left-0 w-full bg-celestial-dark border-t border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
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
            
            {/* User-requested Logo Placeholder */}
            {/* Note: User should place their logo image at public/logo.png */}
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
                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-widest text-shadow-gold">
                  LUNAR <br /> LIGHT
                </h1>
                <p className="mt-4 font-sans text-xs sm:text-sm tracking-[0.5em] uppercase text-gold/80">
                  Awakening
                </p>
              </div>
            </div>
          </div>
        </motion.div>

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
                const el = document.getElementById('merchandise');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              }}
              className="px-10 py-4 bg-gold text-celestial-dark font-sans text-sm uppercase tracking-widest rounded-full hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Explore Our Stones
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('practitioners');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
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
    <section className="py-24 bg-white text-celestial-dark">
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
                src="https://images.unsplash.com/photo-1567015545594-5ef861c80f68?auto=format&fit=crop&q=80&w=1200" 
                alt="Lunar Light Sanctuary" 
                className="rounded-2xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold rounded-2xl z-0" />
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="font-display text-4xl mb-6 text-gold">Our Mission</h2>
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
            <button className="mt-10 flex items-center gap-4 text-gold hover:text-celestial-dark transition-all font-display tracking-widest border-b border-gold pb-2 group">
              Learn More About Our Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
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
      description: "Jewelry, room décor, local art, apparel, and curated card decks.",
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
  const categories = ["Wisdom", "Stones", "Rituals", "Wellness"];
  const posts = [
    {
      title: "Harnessing the Full Moon's Energy",
      excerpt: "Discover the ancient rituals that align your spirit with the lunar cycle for profound clarity.",
      category: "Rituals",
      date: "May 15, 2026",
      image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Crystal Care: Cleansing and Charging",
      excerpt: "Learn why maintaining your stones' vibration is essential for their energetic efficacy.",
      category: "Stones",
      date: "May 10, 2026",
      image: "https://images.unsplash.com/photo-1567015545594-5ef861c80f68?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Introduction to Sound Healing",
      excerpt: "How frequency and vibration can recalibrate your nervous system and promote deep peace.",
      category: "Wellness",
      date: "May 5, 2026",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-24 bg-celestial-dark" id="blog">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Sharing wisdom for your journey" light>Sacred Insights</SectionHeading>
        
        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <button key={i} className="px-6 py-2 rounded-full border border-white/10 text-white/60 hover:text-gold hover:border-gold transition-all text-xs uppercase tracking-widest glass">
              {cat}
            </button>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
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
                  {post.title}
                </h3>
                <p className="font-serif text-white/60 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold border-t border-white/5 group-hover:gap-4 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="text-white/40 hover:text-gold transition-colors uppercase tracking-[0.3em] text-xs flex items-center gap-3 mx-auto">
            View All Wisdom <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Events ---

const Events = () => {
  const workshops = [
    {
      date: "May 22",
      time: "6:00 PM - 8:00 PM",
      title: "Full Moon Journaling & Ritual",
      description: "Join us for an evening of reflection, release, and manifestation as we harness the power of the Full Moon.",
      price: "$25"
    },
    {
      date: "June 05",
      time: "10:00 AM - 12:00 PM",
      title: "Crystal Basics 101",
      description: "Ever wonder why you're drawn to certain stones? Learn how to select, cleanse, and use crystals in your daily life.",
      price: "$30"
    },
    {
      date: "June 12",
      time: "7:00 PM - 8:30 PM",
      title: "Guided Sound Bath Meditation",
      description: "Immerse yourself in the healing vibrations of crystal singing bowls and gongs for deep relaxation.",
      price: "$35"
    }
  ];

  return (
    <section className="py-24 bg-white text-celestial-dark" id="events">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Shop, learn, heal, and grow together">Workshops & Classes</SectionHeading>
        
        <div className="max-w-5xl mx-auto space-y-6">
          {workshops.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all group bg-gray-50/50"
            >
              <div className="md:w-1/4 text-center md:text-left mb-6 md:mb-0">
                <div className="text-3xl font-display text-gold mb-1">{event.date}</div>
                <div className="text-xs uppercase tracking-widest text-gray-400">{event.time}</div>
              </div>
              <div className="md:w-2/4 px-0 md:px-8 text-center md:text-left">
                <h3 className="text-2xl font-display text-celestial-dark mb-3 group-hover:text-gold transition-colors">{event.title}</h3>
                <p className="font-serif text-gray-600 text-sm italic">{event.description}</p>
              </div>
              <div className="md:w-1/4 flex flex-col items-center md:items-end mt-6 md:mt-0">
                <div className="text-xl font-display text-celestial-dark mb-4">{event.price}</div>
                <button className="px-6 py-2 bg-celestial-dark text-white rounded-full text-[10px] uppercase tracking-widest hover:bg-gold transition-all">
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="font-serif text-gray-500 mb-6 italic">Interested in hosting a class in our classroom space?</p>
          <button className="text-gold font-display text-xs tracking-widest border-b border-gold pb-1 hover:text-celestial-dark hover:border-celestial-dark transition-all">
            Inquire About Space Rental
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Practitioners ---

const Practitioners = () => {
  const team = [
    {
      name: "Seraphina Moon",
      role: "Reiki Master & Intuitive",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
      specialty: "Energy alignment and chakra balancing."
    },
    {
      name: "Arlo Stone",
      role: "Crystal Healing Practitioner",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
      specialty: "Using geological vibrations for physical wellness."
    },
    {
      name: "Luna Vance",
      role: "Sound Alchemist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      specialty: "Harmonic frequency therapy and vocal toning."
    }
  ];

  return (
    <section className="py-24 bg-celestial-dark" id="practitioners">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Alternative health services in our healing spaces" light>Our Practitioners</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group text-center"
            >
              <div className="relative mb-8 mx-auto w-64 h-64 lg:w-72 lg:h-72">
                <div className="absolute inset-4 rounded-full border border-gold/20 -rotate-6 group-hover:rotate-6 transition-transform duration-700" />
                <div className="absolute inset-0 rounded-full overflow-hidden border border-gold/40">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-celestial-dark p-3 rounded-full border border-gold/30">
                  <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-display text-gold-light mb-2">{member.name}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-gold/60 mb-4">{member.role}</p>
              <p className="font-serif text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                {member.specialty}
              </p>
              <button className="mt-8 px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/40 hover:text-gold hover:border-gold transition-all">
                View Schedule
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Marketplace ---

const Marketplace = () => {
  const collections = [
    {
      title: "Crystal Sanctuary",
      subtitle: "Tumbled, Raw & Freeform",
      image: "https://images.unsplash.com/photo-1596431940984-754641662973?auto=format&fit=crop&q=80&w=800",
      description: "From raw clusters to polished points, discover stones curated for their unique energy."
    },
    {
      title: "Wearable Spirit",
      subtitle: "Stone Jewelry",
      image: "https://images.unsplash.com/photo-1629227316860-62961e604f4c?auto=format&fit=crop&q=80&w=800",
      description: "Locally created pieces including gorgeous opal jewelry from Opal Gems Crafted."
    },
    {
      title: "Healing Herbs",
      subtitle: "Alice's Rabbit Whole",
      image: "https://images.unsplash.com/photo-1515250436402-990a43063fbc?auto=format&fit=crop&q=80&w=800",
      description: "Botanical salves, sprays, and teas to support your physical and energetic body."
    },
    {
      title: "Sacred Space",
      subtitle: "Decor & Oils",
      image: "https://images.unsplash.com/photo-1614030424754-24d9e9653069?auto=format&fit=crop&q=80&w=800",
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
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
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
                  <span className="text-xs uppercase tracking-widest border-b border-gold/50 pb-1 text-celestial-dark/60 group-hover:text-gold group-hover:border-gold transition-all">
                    Discover Items
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Local Artisans Pill List */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-10">
            <h4 className="font-display text-gold uppercase tracking-[0.3em] text-sm">Support Local Artisans</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {subCategories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-gray-50 border border-gray-100 rounded-full text-celestial-dark/70 font-sans text-xs uppercase tracking-widest hover:bg-gold hover:text-white hover:border-gold transition-all cursor-default"
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
            {/* Google Map Embed Placeholder with stylized overlay */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.313426732958!2d-89.60943892354832!3d44.912644271032895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8800049495acb627%3A0xe54dca7cc203c623!2s121%20Skelly%20St%2C%20Schofield%2C%20WI%2054476!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              className="w-full h-full border-0" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
          </div>
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-block px-4 py-1 bg-gold/10 text-gold rounded-full text-[10px] uppercase tracking-widest font-bold">
              Visit Our Sanctuary
            </div>
            <h2 className="font-display text-5xl text-celestial-dark leading-tight">We look forward to <br /><span className="text-gold italic font-serif">welcoming you.</span></h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-gold italic">Address</h4>
                <p className="text-gray-600 font-serif leading-relaxed">
                  121 Skelly Street<br />
                  Schofield, WI 54476
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-gold italic">Connect</h4>
                <p className="text-gray-600 font-serif leading-relaxed">
                  (715) 581-7317<br />
                  lunarlightawakening@gmail.com
                </p>
              </div>
              <div className="sm:col-span-2 space-y-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-gold italic">Hours</h4>
                <p className="text-gray-600 font-serif leading-relaxed">
                  Tuesday – Saturday: 10:00 AM – 6:00 PM<br />
                  Sunday – Monday: Closed
                </p>
              </div>
            </div>
            
            <div className="pt-6">
              <button className="px-10 py-4 bg-celestial-dark text-white rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-xl">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
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
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-all">
                <Facebook size={18} />
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
                <span>(715) 581-7317</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-gold shrink-0 w-5 h-5" />
                <span className="text-sm">lunarlightawakening@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-gold-light mb-8 tracking-widest text-sm uppercase">Stay Connected</h4>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Join our mailing list to receive lunar updates, new stones arrivals, and event details.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-gold transition-all flex-grow"
              />
              <button className="w-12 h-12 rounded-full bg-gold text-celestial-dark flex items-center justify-center hover:bg-gold-light transition-all shrink-0">
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Lunar Light Awakening. All Rights Reserved.
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
        <Events />
        <Practitioners />
        <Blog />
        <Marketplace />
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
                "A sanctuary of light and peace in the heart of Schofield. The moment you walk in, your soul feels at home."
              </blockquote>
              <cite className="font-display tracking-[0.3em] text-white/40 uppercase text-sm block">
                — A Local Seeker
              </cite>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
