export type Product = {
  title: string;
  category: string,
  description: string,
  reviews: number;
  gm: number;
  price: number;
  discountedPrice: number;
  id: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
