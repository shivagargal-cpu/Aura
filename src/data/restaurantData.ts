import { MenuItem, Review, Experience, GalleryItem } from '../types';
import { IMAGES } from '../assets/images';

export const RESTAURANT_INFO = {
  name: "AURA",
  tagline: "Haute Cuisine & Contemporary Sensory Dining",
  address: "48 Avenue Montaigne, Golden Triangle",
  city: "Paris / Mayfair District",
  phone: "+1 (555) 382-7400",
  email: "reservations@aura-dining.com",
  hours: [
    { days: "Tuesday – Thursday", lunch: "12:00 PM – 2:30 PM", dinner: "6:00 PM – 10:30 PM" },
    { days: "Friday – Saturday", lunch: "12:00 PM – 3:00 PM", dinner: "5:30 PM – 11:30 PM" },
    { days: "Sunday", lunch: "12:30 PM – 3:30 PM", dinner: "6:00 PM – 10:00 PM" },
    { days: "Monday", lunch: "Closed", dinner: "Private Events Only" },
  ],
  awards: [
    "Two Michelin Stars (2024–2026)",
    "World's 50 Best Discovery",
    "Grand Award of Excellence — Wine Spectator",
  ],
  stats: [
    { value: 15, suffix: "+", label: "Years Culinary Craft" },
    { value: 50, suffix: "+", label: "Signature Artful Dishes" },
    { value: 10, suffix: "K+", label: "Honored Dining Guests" },
    { value: 2, suffix: "★", label: "Michelin Guide Stars" },
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dish-1",
    name: "Heirloom Tomato & Botanical Tartare",
    frenchName: "Tartare de Tomates Anciennes et Herbes Rares",
    category: "starters",
    price: "$38",
    description: "Sun-ripened heritage tomatoes compressed in elderflower vinegar, golden leaf veil, fresh basil emulsion, and crystallized garden blooms.",
    ingredients: ["Heritage Heirloom Tomatoes", "Elderflower Vinegar", "Gold Leaf", "Opal Basil Oil", "Marigold Petals"],
    winePairing: "Domaine Leflaive Puligny-Montrachet 2021",
    dietary: ["Vegetarian", "Gluten-Free"],
    image: IMAGES.pedestalStarter,
    isSignature: true,
  },
  {
    id: "dish-2",
    name: "Wild Brittany Sea Bass & Saffron Nectar",
    frenchName: "Bar Sauvage Rôti à la Nectar de Safran",
    category: "mains",
    price: "$78",
    description: "Pan-crisped wild sea bass fillet rested atop roasted baby fennel, saffron velouté, finger lime pearls, and hand-foraged sea herbs.",
    ingredients: ["Wild Brittany Sea Bass", "Castilian Saffron", "Braised Baby Fennel", "Finger Lime", "Samphire"],
    winePairing: "Meursault Premier Cru Les Perrières 2019",
    dietary: ["Pescatarian", "Gluten-Free"],
    image: IMAGES.dishSeaBass,
    isSignature: true,
  },
  {
    id: "dish-3",
    name: "Smoked Vanilla Bean & Grand Cru Chocolate",
    frenchName: "Mousse Vanille Fumée et Chocolat Noir Grand Cru",
    category: "desserts",
    price: "$34",
    description: "Cold-smoked Madagascar vanilla mousse, single-origin 72% Venezuelan dark chocolate sphere, tart raspberry nectar, and edible gold flakes.",
    ingredients: ["Madagascar Vanilla Bean", "Venezuelan Criollo Cacao", "Wild Mountain Raspberries", "24K Gold Flakes"],
    winePairing: "Château d'Yquem Premier Cru Supérieur Sauternes 2017",
    dietary: ["Vegetarian"],
    image: IMAGES.pedestalDessert,
    isSignature: true,
  },
  {
    id: "dish-4",
    name: "A5 Miyazaki Wagyu & Périgord Truffle",
    frenchName: "Bœuf Wagyu A5 au Jus de Truffe Noire",
    category: "mains",
    price: "$115",
    description: "Charcoal-kissed A5 Wagyu striploin glazed in black Périgord winter truffle jus, bone marrow emulsion, and smoked pomme purée.",
    ingredients: ["A5 Miyazaki Wagyu Ribcap", "Black Périgord Truffle", "Aged Balsamic Glaze", "Bone Marrow Emulsion"],
    winePairing: "Château Margaux Premier Grand Cru Classé 2015",
    dietary: ["Gluten-Free"],
    image: IMAGES.heroWagyu,
    isSignature: true,
  },
  {
    id: "dish-5",
    name: "Roasted Seasonal Garden Symphony",
    frenchName: "Symphonie de Racines et Fleurs Sauvages",
    category: "starters",
    price: "$42",
    description: "Artisanal plate of glazed baby heritage carrots, charred baby leeks, fermented plum reduction, and crispy wild mushroom paper.",
    ingredients: ["Glazed Heritage Carrots", "Morel Mushrooms", "Fermented Mirabelle Plum", "Parsnip Velouté"],
    winePairing: "Weingut Keller Riesling GG Trocken 2020",
    dietary: ["Vegan", "Gluten-Free"],
    image: IMAGES.heroPlatter,
    isSignature: false,
  },
  {
    id: "dish-6",
    name: "The Imperial Ten-Course Tasting Journey",
    frenchName: "Le Grand Menu Dégustation en Dix Temps",
    category: "tasting",
    price: "$240",
    description: "An unhurried multi-sensory progression of Chef Vance's most celebrated creations, paired with rare vintage allocations.",
    ingredients: ["Petrossian Caviar", "Hokkaido Sea Urchin", "Brittany Langoustine", "A5 Wagyu", "Rare Botanicals"],
    winePairing: "Grand Cru Prestige Sommelier Pairing (Optional +$160)",
    dietary: ["Chef's Selection"],
    image: IMAGES.galleryFeast,
    isSignature: true,
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "Chef Julian's Counter",
    subtitle: "Front-row intimate omakase dining",
    description: "Immerse yourself directly across from our culinary atelier. Watch Executive Chef Julian Vance and his brigade compose each plate with laser precision and storytelling.",
    courses: "12 Curated Courses",
    duration: "3.5 Hours",
    pricePerPerson: "$285",
    features: ["Limited to 8 guests nightly", "Direct chef narrative with each course", "Exclusive cellar wine pours", "Signed seasonal menu keepsake"],
    image: IMAGES.chefPortrait,
    badge: "Most Sought-After"
  },
  {
    id: "exp-2",
    title: "The Sommelier's Reserve Cellar",
    subtitle: "Subterranean vintage wine paired dining",
    description: "Surrounded by 3,200 bottles of historic Grand Crus, this candlelit vault provides an unforgettable private sanctuary for intimate milestone celebrations.",
    courses: "8 Gastronomic Courses",
    duration: "3 Hours",
    pricePerPerson: "$340",
    features: ["Private sommelier service", "Library vintages dating back to 1982", "Custom engraved crystal glasses", "Accommodates 4 to 12 guests"],
    image: IMAGES.galleryFeast,
    badge: "Private Dining"
  },
  {
    id: "exp-3",
    title: "Autumn Botanical & Truffle Season",
    subtitle: "Celebration of earth, forest, and forest harvest",
    description: "A seasonal exploration honoring Périgord black truffles, foraged wild mushrooms, and autumn orchards alongside heritage game and artisanal cheeses.",
    courses: "6 Courses",
    duration: "2.5 Hours",
    pricePerPerson: "$195",
    features: ["Freshly shaved truffle tableside", "Wild mushroom botanical broth", "Artisan farm cheese chariot", "Available through November"],
    image: IMAGES.heroPlatter,
    badge: "Seasonal Special"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Eleanor de Montferrat",
    role: "Gastronomic Critic & Food Writer",
    rating: 5,
    date: "Two weeks ago",
    comment: "A breathtaking elevation of culinary craft. Every course is composed with the delicate touch of a master painter. The roasted sea bass with saffron nectar is an instant classic.",
    favoriteDish: "Wild Brittany Sea Bass & Saffron Nectar"
  },
  {
    id: "rev-2",
    name: "Arthur Pendelton-Hayes",
    role: "Private Art Collector",
    rating: 5,
    date: "Last month",
    comment: "The Chef's Counter is simply the finest dining experience in the country. The warmth of the hospitality matches the quiet perfection of the food. Remarkable wine cellar curation.",
    favoriteDish: "A5 Miyazaki Wagyu & Périgord Truffle"
  },
  {
    id: "rev-3",
    name: "Dr. Sofia Lindqvist",
    role: "Architect & Spatial Designer",
    rating: 5,
    date: "Three weeks ago",
    comment: "From the minimalist travertine plinths to the warm acoustic ambiance, AURA understands how space, light, and flavor harmonize. A true sensory revelation.",
    favoriteDish: "Smoked Vanilla Bean & Grand Cru Chocolate"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Grand Feast & Artisanal Table Spread",
    category: "Gastronomy",
    image: IMAGES.galleryFeast,
    span: "large"
  },
  {
    id: "gal-2",
    title: "Culinary Atelier & Chef Julian Vance",
    category: "Craftsmanship",
    image: IMAGES.chefPortrait,
    span: "medium"
  },
  {
    id: "gal-3",
    title: "Heirloom Harvest & Botanical Tartare",
    category: "Plating",
    image: IMAGES.pedestalStarter,
    span: "small"
  },
  {
    id: "gal-4",
    title: "Signature Plated Heritage Sea Bass",
    category: "Signature Dishes",
    image: IMAGES.dishSeaBass,
    span: "medium"
  },
  {
    id: "gal-5",
    title: "A5 Wagyu Striploin & Black Périgord Truffle",
    category: "Tasting Menu",
    image: IMAGES.heroWagyu,
    span: "large"
  },
  {
    id: "gal-6",
    title: "Single Origin Mousse & Gold Leaf",
    category: "Dessert Art",
    image: IMAGES.pedestalDessert,
    span: "small"
  }
];
