export type GalleryCategory =
  | "people-stories"
  | "framed-perspectives"
  | "architecture-heritage"
  | "landscapes-light"
  | "nature-details";

export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
  title: string;
  alt: string;
  isHero: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: "images/people-stories/a-moment-of-freedom.jpg",
    width: 1365,
    height: 2048,
    category: "people-stories",
    title: "A Moment Of Freedom",
    alt: "Child jumping with arms wide in a candid street photograph titled A Moment Of Freedom.",
    isHero: false
  },
  {
    src: "images/people-stories/everyday-stories-street-photography.jpg",
    width: 1365,
    height: 2048,
    category: "people-stories",
    title: "Everyday Street Stories",
    alt: "Candid street photography scene showing everyday life and human stories in India.",
    isHero: false
  },
  {
    src: "images/people-stories/life-in-village-mornings.jpg",
    width: 2048,
    height: 1365,
    category: "people-stories",
    title: "Life In Village Mornings",
    alt: "Morning village life captured in natural light with people moving through a rural setting.",
    isHero: false
  },
  {
    src: "images/people-stories/street-vendor-quiet-expression.jpg",
    width: 1365,
    height: 2048,
    category: "people-stories",
    title: "Street Vendor Quiet Expression",
    alt: "Street vendor portrait with a quiet expression, photographed in available light.",
    isHero: false
  },
  {
    src: "images/framed-perspectives/framed-lake-view-through-leaves.jpg",
    width: 2048,
    height: 1365,
    category: "framed-perspectives",
    title: "Framed Lake View Through Leaves",
    alt: "Lake view framed through foreground leaves, creating a layered natural perspective.",
    isHero: false
  },
  {
    src: "images/framed-perspectives/framed-steps-into-udaipur.jpg",
    width: 1365,
    height: 2048,
    category: "framed-perspectives",
    title: "Framed Steps Into Udaipur",
    alt: "Stone steps in Udaipur framed by architecture and leading lines.",
    isHero: false
  },
  {
    src: "images/architecture-heritage/bara-gumbad-lodhi-garden.jpg",
    width: 2048,
    height: 1365,
    category: "architecture-heritage",
    title: "Bara Gumbad Lodhi Garden",
    alt: "Bara Gumbad monument at Lodhi Garden photographed as Indian heritage architecture.",
    isHero: false
  },

  {
    src: "images/architecture-heritage/kumbhalgarh-fort-heritage-view.jpg",
    width: 2048,
    height: 1365,
    category: "architecture-heritage",
    title: "Kumbhalgarh Fort Heritage View",
    alt: "Wide heritage view of Kumbhalgarh Fort and its historic stone architecture.",
    isHero: false
  },
  {
    src: "images/architecture-heritage/kumbhalgarh-fort-main-gate.jpg",
    width: 2048,
    height: 1365,
    category: "architecture-heritage",
    title: "Kumbhalgarh Fort Main Gate",
    alt: "Main gate of Kumbhalgarh Fort photographed from below to emphasize scale and texture.",
    isHero: false
  },
  {
    src: "images/architecture-heritage/lepakshi-naga-linga-wide.jpg",
    width: 2048,
    height: 1365,
    category: "architecture-heritage",
    title: "Lepakshi Naga Linga",
    alt: "Wide photograph of the Naga Linga sculpture at Lepakshi temple.",
    isHero: false
  },
  {
    src: "images/architecture-heritage/lepakshi-pillars-perspective.jpg",
    width: 1365,
    height: 2048,
    category: "architecture-heritage",
    title: "Lepakshi Pillars Perspective",
    alt: "Carved pillars at Lepakshi temple photographed with depth and perspective.",
    isHero: false
  },
  {
    src: "images/architecture-heritage/udaipur-city-palace-arches.jpg",
    width: 2048,
    height: 1365,
    category: "architecture-heritage",
    title: "Udaipur City Palace Arches",
    alt: "Decorative arches inside Udaipur City Palace highlighting heritage craftsmanship.",
    isHero: false
  },
  {
    src: "images/landscapes-light/Sunset-with-clouds-light-breaking-through.jpg",
    width: 2048,
    height: 1365,
    category: "landscapes-light",
    title: "Sunset With Light Breaking Through",
    alt: "Sunset sky with clouds and warm light breaking through over the landscape.",
    isHero: false
  },
  {
    src: "images/landscapes-light/udaipur-lake-cityscape.jpg",
    width: 2048,
    height: 1365,
    category: "landscapes-light",
    title: "Udaipur Lake Cityscape",
    alt: "Udaipur lake cityscape with buildings reflected near the water.",
    isHero: false
  },
  {
    src: "images/landscapes-light/udaipur-lake-sunset-blue-hour.jpg",
    width: 2048,
    height: 1365,
    category: "landscapes-light",
    title: "Udaipur Lake Sunset Blue Hour",
    alt: "Udaipur lake at blue hour after sunset with calm water and city lights.",
    isHero: false
  },
  {
    src: "images/landscapes-light/udaipur-lake-sunset-lights.jpg",
    width: 2048,
    height: 1365,
    category: "landscapes-light",
    title: "Udaipur Lake Sunset Lights",
    alt: "Udaipur lake sunset with glowing lights reflected across the water.",
    isHero: false
  },
  {
    src: "images/landscapes-light/udaipur-sunset-orange-gradient.jpg",
    width: 2048,
    height: 1365,
    category: "landscapes-light",
    title: "Udaipur Sunset Orange Gradient",
    alt: "Orange sunset gradient over Udaipur with warm evening light across the lake.",
    isHero: false
  },

  {
    src: "images/landscapes-light/where-the-water-rests.jpg",
    width: 2048,
    height: 1365,
    category: "landscapes-light",
    title: "Where The Water Rests",
    alt: "Still water landscape with a quiet reflective mood.",
    isHero: false
  },
  {
    src: "images/nature-details/green-canopy-walkway.jpg",
    width: 2048,
    height: 1365,
    category: "nature-details",
    title: "Green Canopy Walkway",
    alt: "Green canopy walkway surrounded by dense leaves and natural light.",
    isHero: false
  },
  {
    src: "images/nature-details/lotus-closeup-purple-bloom.jpg",
    width: 2048,
    height: 1365,
    category: "nature-details",
    title: "Purple Lotus Bloom",
    alt: "Close-up of a purple lotus bloom with soft detail and natural color.",
    isHero: false
  },
  {
    src: "images/nature-details/purple-lotus-closeup.jpg",
    width: 2048,
    height: 1638,
    category: "nature-details",
    title: "Purple Lotus Closeup",
    alt: "Macro-style close-up of a purple lotus flower showing petals and texture.",
    isHero: true
  },
  {
    src: "images/nature-details/white-throated-kingfisher-perch.jpg",
    width: 2048,
    height: 1365,
    category: "nature-details",
    title: "White Throated Kingfisher",
    alt: "White-throated kingfisher perched on a branch against a natural background.",
    isHero: false
  },
  {
    src: "images/architecture-heritage/city-palace-udaipur-corridor-leading-lines.jpg",
    width: 2048,
    height: 1365,
    category: "architecture-heritage",
    title: "City Palace Udaipur Corridor",
    alt: "City Palace Udaipur corridor with repeating arches and strong leading lines.",
    isHero: false
  }
];

export const galleryCategories: Array<"all" | GalleryCategory> = [
  "all",
  "people-stories",
  "framed-perspectives",
  "architecture-heritage",
  "landscapes-light",
  "nature-details"
];

export const categoryLabels: Record<"all" | GalleryCategory, string> = {
  all: "All",
  "people-stories": "People Stories",
  "framed-perspectives": "Framed Perspectives",
  "architecture-heritage": "Architecture Heritage",
  "landscapes-light": "Landscapes Light",
  "nature-details": "Nature Details"
};

export const heroImage = gallery.find((image) => image.isHero) ?? gallery[0];
