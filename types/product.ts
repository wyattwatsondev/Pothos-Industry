export interface Product {
    id: number;
    name: string;
    category?: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    badge?: string;
    sizes?: string[];
}
