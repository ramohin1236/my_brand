// ============================================================
// TYPE DEFINITIONS — Bangladesh Localized + Extended
// ============================================================

export interface Product {
  id: string;
  name: string;
  category: 'Wood' | 'Bamboo' | 'Cane';
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFlashDeal: boolean;
  tags: string[];
  dimensions: {width: number;height: number;depth: number;};
  material: string;
  weight: number;
  /** Available sizes e.g. ["S", "M", "L", "XL"] or ["2-seater", "3-seater"] */
  sizes?: string[];
  /** Available color hex codes */
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface WishlistState {
  items: WishlistItem[];
}

/** Bangladesh-localized shipping address */
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  upazila: string;
}

export interface CheckoutStep {
  id: number;
  title: string;
  completed: boolean;
}

export type ShippingErrors = Partial<Record<keyof ShippingAddress, string>>;

export interface Artisan {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: number;
  specialty: 'Wood' | 'Bamboo' | 'Cane';
  avatar: string;
  coverImage: string;
  gallery: string[];
  shortBio: string;
  fullStory: string;
  videoUrl: string;
  products: string[];
  tags: string[];
  instagram: string;
  featured: boolean;
}