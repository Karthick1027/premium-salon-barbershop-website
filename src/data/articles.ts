import type { Article } from '../types'

/** Sample editorial content — general tips only, no medical or results claims. */
export const articles: Article[] = [
  {
    id: 'everyday-beauty-tips',
    category: 'Beauty',
    title: 'Everyday Beauty Tips',
    excerpt: 'Small, simple habits that help you look and feel put-together on busy days.',
    body: [
      'Start with a clean, moisturised base and keep your routine short enough that you’ll actually follow it. A tinted moisturiser, a soft brow and a touch of lip colour go a long way.',
      'Keep brushes and sponges clean, and replace makeup that has changed in smell or texture. When in doubt, ask your stylist which few products suit your skin and schedule best.',
    ],
    image: '/images/journal-everyday-beauty.jpg',
    imageAlt: 'Makeup brushes, mascara, lipstick and a compact on a beige surface',
    readTime: '3 min read',
  },
  {
    id: 'skincare-healthy-glow',
    category: 'Skincare',
    title: 'Skincare Secrets for a Healthy Glow',
    excerpt: 'A gentle, consistent routine is often the most effective place to start.',
    body: [
      'Cleanse gently, moisturise daily and use sunscreen whenever you’re outdoors. Consistency usually matters more than the number of products you use.',
      'Introduce one new product at a time so you can tell how your skin responds. If you have a skin condition or a reaction, speak to a dermatologist for personal advice.',
    ],
    image: '/images/journal-skincare-glow.jpg',
    imageAlt: 'Dropper releasing facial oil onto the back of a hand',
    readTime: '4 min read',
  },
  {
    id: 'maintain-your-hairstyle',
    category: 'Hair Care',
    title: 'How to Maintain Your Hairstyle',
    excerpt: 'Keep your cut and colour looking fresh for longer between salon visits.',
    body: [
      'Use a heat protectant before blow-drying or straightening, and keep hot tools on the lowest setting that works for your hair.',
      'Book regular trims to keep your shape, use colour-friendly shampoo after colouring, and sleep on a smooth pillowcase to reduce frizz.',
    ],
    image: '/images/journal-hairstyle-care.jpg',
    imageAlt: 'Woman running her hands through long, healthy, wavy hair',
    readTime: '3 min read',
  },
]
