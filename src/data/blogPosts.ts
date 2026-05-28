export type BlogPost = {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  readTime: string;
  sections: Array<{
    heading?: string;
    paragraphs?: string[];
    list?: string[];
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-heart-of-lunar-light-awakening',
    title: 'The Heart of Lunar Light Awakening',
    shortTitle: 'The Heart of Lunar Light Awakening',
    excerpt:
      'A welcoming space for crystals, wellness, and personal transformation.',
    category: 'Store Stories',
    date: 'Apr 17, 2024',
    author: 'Lisa Bernarde',
    readTime: '2 min read',
    image: '/blog/heart-of-lunar-light-awakening.png',
    imageAlt: 'A warm crystal shop interior with moonstone displays, candlelight, and lunar accents.',
    sourceUrl:
      'https://lunarlightawakening.wixsite.com/luna-light-awakening/post/from-bill-s-moonstones-to-luna-light-awakening-a-journey-of-transformation',
    sections: [
      {
        paragraphs: [
          'Have you ever experienced a transformation that changed your perspective and gave you a renewed sense of purpose? That spirit of awakening is at the heart of Lunar Light Awakening, a metaphysical crystal shop based in Wisconsin.',
          "The shop's journey reflects a meaningful shift in identity, branding, and purpose while staying rooted in crystals, wellness, and a warm, welcoming experience for every visitor.",
        ],
      },
      {
        heading: 'A Journey of Transformation',
        paragraphs: [
          "The transition into Lunar Light Awakening was more than a name change. It was a reimagining of the shop's identity around spiritual growth, self-awareness, and whole-person wellness.",
          "The name Lunar Light Awakening reflects the shop's focus on helping people reconnect with their own inner light through thoughtful tools, supportive guidance, and a community-centered experience.",
        ],
      },
      {
        heading: 'Tools for Every Path',
        paragraphs: [
          'Crystals, jewelry, oracle cards, and other metaphysical items are part of the vibrant mix visitors can explore in the shop.',
          'Whether you are choosing your first crystal, adding to a meaningful collection, or searching for a gift with intention, Lunar Light Awakening offers something for many different stages of the spiritual journey.',
        ],
      },
      {
        heading: 'Guidance for Beginners and Experienced Seekers',
        paragraphs: [
          'If you are new to crystals or metaphysical practices, Lunar Light Awakening is a supportive place to begin. The knowledgeable staff can help you choose crystals, understand their meanings, and find tools that align with your intentions.',
          'For experienced seekers, the shop offers fresh inspiration, meaningful pieces, and space to continue deepening your practice. Oracle readings are also available for those looking for insight, clarity, or encouragement on their path.',
        ],
      },
      {
        heading: 'Awaken Your Inner Light',
        paragraphs: [
          'As Lunar Light Awakening continues to grow, it remains committed to creating a transformative and welcoming experience for customers.',
          'Whether you are a seasoned crystal enthusiast or just beginning your journey, the shop welcomes you with open arms. Explore crystals, jewelry, oracle cards, and wellness resources, and begin your own journey of transformation.',
          'The power to awaken your inner light is already within you. Lunar Light Awakening is here to guide you every step of the way.',
        ],
      },
    ],
  },
  {
    slug: 'unlocking-your-intuition-the-benefits-of-oracle-readings',
    title: 'Unlocking Your Intuition: The Benefits of Oracle Readings',
    shortTitle: 'Unlocking Your Intuition',
    excerpt:
      'A practical look at how oracle readings can support self-discovery, intuitive trust, and personal guidance.',
    category: 'Oracle Readings',
    date: 'Apr 17, 2024',
    author: 'Lisa Bernarde',
    readTime: '3 min read',
    image: '/blog/oracle-readings.png',
    imageAlt: 'An oracle reading setup with cards, crystals, candlelight, and moonlight.',
    sourceUrl:
      '/blog/unlocking-your-intuition-the-benefits-of-oracle-readings/',
    sections: [
      {
        paragraphs: [
          "In today's fast-paced world, many of us are seeking ways to tap into our intuition and gain insights into our lives. One powerful tool that has been used for centuries to connect with our inner wisdom is oracle readings.",
          'These readings can provide guidance, clarity, and a deeper understanding of ourselves and the world around us.',
        ],
      },
      {
        heading: 'The Power of Oracle Readings',
        paragraphs: [
          'Oracle readings involve using a deck of cards or other divination tools to receive messages from the divine, soul guides, or our higher selves. Unlike tarot readings, which follow a specific structure and symbolism, oracle readings are more intuitive and open-ended.',
          'This allows the reader to interpret the messages based on their intuition and the unique energy of the individual seeking guidance.',
        ],
      },
      {
        heading: 'Benefits of Oracle Readings',
        list: [
          'Clarity and guidance: Oracle readings can help us gain clarity on a situation or decision we are facing. The messages received during a reading can offer insights and guidance that we may not have considered on our own.',
          'Self-reflection: Oracle readings encourage self-reflection and introspection. By exploring the messages and symbols in the cards, we can gain a deeper understanding of our thoughts, emotions, and beliefs.',
          'Empowerment: Oracle readings can empower us to make positive changes in our lives. The guidance received can inspire us to take action, trust our intuition, and follow our hearts.',
          'Connection: Oracle readings can help us feel connected to something greater than ourselves. Whether we believe the messages come from soul guides, angels, or our higher selves, the experience can be deeply comforting and reassuring.',
        ],
      },
      {
        heading: 'How to Get Started',
        paragraphs: [
          'If you are interested in exploring oracle readings, there are a few simple steps you can take to get started.',
        ],
        list: [
          'Choose a deck: Select an oracle deck that resonates with you. There are many different decks available, each with its own theme, artwork, and energy.',
          'Set an intention: Before a reading, take a moment to set an intention or ask a specific question. This helps focus the energy of the reading and provides a clearer message.',
          'Trust your intuition: As you pull cards and interpret their meanings, trust your intuition. Pay attention to any thoughts, feelings, or impressions that arise.',
          'Reflect and journal: After the reading, take time to reflect on the messages you received. Journaling can help you process the insights and integrate them into your life.',
        ],
      },
      {
        heading: 'Embrace Your Inner Wisdom',
        paragraphs: [
          'Oracle readings are a powerful tool for unlocking your intuition and connecting with your inner wisdom. Whether you are seeking guidance, clarity, or a deeper understanding of yourself, oracle readings can provide valuable insights and support on your journey.',
          'Embrace the magic of oracle readings and discover the wisdom that lies within.',
        ],
      },
    ],
  },
  {
    slug: 'the-power-of-crystals',
    title: 'The Power of Crystals',
    shortTitle: 'The Power of Crystals',
    excerpt:
      'How crystals can support intention, transformation, daily ritual, and a deeper connection to the natural world.',
    category: 'Crystals',
    date: 'Apr 17, 2024',
    author: 'Lisa Bernarde',
    readTime: '3 min read',
    image: '/blog/power-of-crystals.png',
    imageAlt: 'A luminous collection of crystals arranged with herbs, linen, and soft morning light.',
    sourceUrl: '/blog/the-power-of-crystals/',
    sections: [
      {
        paragraphs: [
          'Crystals have been used for centuries for their healing properties and spiritual significance. These beautiful stones are believed to possess unique energies that can help balance and harmonize our physical, emotional, and spiritual well-being.',
          'In this blog post, we will explore the power of crystals and how you can incorporate them into your daily life.',
        ],
      },
      {
        heading: 'The Healing Properties of Crystals',
        paragraphs: [
          'Crystals are believed to have various healing properties based on their composition, color, and energy. Each crystal is said to resonate with specific frequencies that can influence our energy fields and promote healing.',
          'For example, amethyst is known for its calming and protective qualities, while rose quartz is associated with love and emotional healing.',
        ],
      },
      {
        heading: 'How to Use Crystals',
        paragraphs: ['There are many ways to incorporate crystals into your daily routine. Here are a few simple methods:'],
        list: [
          "Meditation: Hold a crystal in your hand or place it nearby during meditation to enhance your practice and deepen your connection to its energy.",
          "Jewelry: Wear crystal jewelry to keep the stone's energy close to your body throughout the day.",
          'Home decor: Place crystals around your home to create a positive and harmonious environment.',
          'Crystal grids: Arrange multiple crystals in a specific pattern to amplify their energies and intentions.',
        ],
      },
      {
        heading: 'Choosing the Right Crystal',
        paragraphs: [
          'When selecting a crystal, trust your intuition. You may feel drawn to a particular stone because of its color, shape, or energy. Take time to research the properties of different crystals and choose one that aligns with your intentions and needs.',
        ],
      },
      {
        heading: 'Cleansing and Charging Crystals',
        paragraphs: [
          'To maintain their effectiveness, crystals should be cleansed and charged regularly. This can be done by placing them under running water, leaving them in moonlight, or using sage or palo santo smoke.',
          'Charging crystals in sunlight or moonlight can help restore their energy and keep them vibrant.',
        ],
      },
      {
        heading: 'Embrace the Magic of Crystals',
        paragraphs: [
          'Crystals offer a beautiful and meaningful way to connect with the natural world and support your well-being. Whether you are new to crystals or have been working with them for years, there is always something new to discover.',
          'Embrace the magic of crystals and allow their energies to guide and support you on your journey.',
        ],
      },
    ],
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
