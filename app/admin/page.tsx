'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    Plus,
    Search,
    Bell,
    Moon,
    Grid,
    ShoppingCart,
    Pencil,
    Trash2,
    Loader2,
    Menu,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CATEGORY_HIERARCHY: Record<string, Record<string, string[]>> = {
    "Mens": {
        "Textile": ["Denim Shirts", "Sweatshirts", "Hoodies", "Joggers & Chinos", "T Shirts", "Tank Tops And Singlets", "Track Suits", "Polo Shirts", "Shorts"],
        "Textile Jackets": ["Denim Jackets", "Windbreaker Jackets", "Bubble-Puffer Jackets", "Varsity Jackets", "Softshell Jackets", "Fleece Jackets"],
        "Leather Jackets": ["Suede Leather Jackets", "Shearling Leather Jackets", "Leather Fashion Jackets", "PU Leather Fashion Jackets", "Motorbike Leather Jacket", "Motorbike Leather Suit", "Leather Blazers", "Leather Long Coats"],
        "Pant": ["Leather Pants"],
        "Gloves Collection": ["Cycling Gloves", "Driving Gloves", "Golf Gloves", "Mechanics Gloves", "TPR Impact Gloves", "Weightlifting Gloves", "Working Gloves"],
        "Accessories": ["Backpack", "Bracelets", "Face Mask", "Hand Bags", "Hats & Caps", "Night Masks", "Wallets"],
        "Swimming Diving Suit": ["Swimming Diving Suit"]
    },
    "Women": {
        "Textile": ["Hoodies", "Sweatshirts", "Women T-Shirt", "Polo Shirts", "Crop Tops", "Tank Tops", "Jeans Shirts", "Sweatsuits"],
        "Textile Jackets": ["Denim Jackets", "Windbreaker Jackets", "Bubble Jackets", "Varsity Jackets", "Softshell Jackets", "Fleece Jacket"],
        "Leather Jackets": ["Suede Jackets", "PU Leather Jackets", "Biker Leather Jackets", "Shearling Leather Jackets", "Women Leather Shirts", "Leather Long Coats", "Leather Skirts", "Leather Dresses"],
        "Pants": ["Fashion Pants"],
        "Swimming Diving Suits": ["Swimming Diving Suits"]
    },
    "Kids": {
        "Textile": ["Hoodies", "T-Shirts", "Polo Shirts", "Kids Tracksuits", "Sweatshirts"],
        "Kids Leather And Textile Jackets": ["Kids Leather & Textile Jackets"]
    },
    "Other": {
        "Uniforms": ["Uniforms"]
    }
};

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    subCategory?: string;
    itemType?: string;
    sizes?: string[];
}

interface Order {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode?: string; // optional, agar har order me na ho
    country: string;
    total: number;
    status: string;
    createdAt: string;
    items?: {           // optional array of items
        name: string;
        price: number;
        quantity?: number;
        selectedSize?: string;
        selectedColor?: string;
    }[];
}

function AdminSidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-8">
                    <Image src="/hutlemoblogo.png" alt="Logo" width={120} height={40} className="h-16 w-auto object-contain" />
                </div>

                <nav className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Dashboards</p>
                    <SidebarLink id="classic" icon={<LayoutDashboard size={18} />} label="Classic Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarLink id="products" icon={<ShoppingBag size={18} />} label="Products" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarLink id="customers" icon={<Users size={18} />} label="Customers" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarLink id="orders" icon={<ShoppingCart size={18} />} label="Orders" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarLink id="settings" icon={<Settings size={18} />} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-50">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/ProductImages/85.png" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">Admin User</p>
                        <p className="text-[10px] text-gray-500 truncate">admin@hustlemob.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
        category: '',
        subCategory: '',
        itemType: '',
        sizes: '',
    });
    const [categoryFilter, setCategoryFilter] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Order Modal State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
    const [isDeletingOrder, setIsDeletingOrder] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
    const [isDeleteOrderDialogOpen, setIsDeleteOrderDialogOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleUpdateOrderStatus = async (id: number, newStatus: string) => {
        try {
            // Optimistic update
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) {
                fetchOrders(); // Revert on failure
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            fetchOrders();
        }
    };

    const handleDeleteOrderClick = (order: Order) => {
        setOrderToDelete(order);
        setIsDeleteOrderDialogOpen(true);
    };

    const confirmDeleteOrder = async () => {
        if (!orderToDelete) return;
        setIsDeletingOrder(true);

        try {
            const res = await fetch(`/api/orders/${orderToDelete.id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchOrders();
                if (selectedOrder?.id === orderToDelete.id) {
                    setIsOrderDialogOpen(false);
                }
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setIsDeletingOrder(false);
            setIsDeleteOrderDialogOpen(false);
            setOrderToDelete(null);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products?full=true&limit=50');
            const data = await res.json();
            if (data && data.products) {
                setProducts(data.products);
            } else if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/products/${editingId}` : '/api/products';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(s => s !== '') : [],
                }),
            });

            if (res.ok) {
                setFormData({ name: '', price: '', image: '', description: '', category: '', subCategory: '', itemType: '', sizes: '' });
                setEditingId(null);
                setIsDialogOpen(false);
                fetchProducts();
                router.refresh();
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            image: product.image,
            description: product.description,
            category: product.category,
            subCategory: product.subCategory || '',
            itemType: product.itemType || '',
            sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
        });
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        setIsDeleting(true);

        try {
            const res = await fetch(`/api/products/${productToDelete.id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchProducts();
                router.refresh();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB] flex-col lg:flex-row">
            {/* Desktop Sidebar */}
            <aside className="w-64 border-r bg-white flex flex-col hidden lg:flex fixed inset-y-0 z-40">
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <Image src="/hutlemoblogo.png" alt="Logo" width={100} height={32} className="h-12 w-auto object-contain" />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-lg">
                            <Menu size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-none">
                        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </SheetContent>
                </Sheet>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
                <main className="p-4 md:p-8 space-y-6 md:space-y-8 overflow-y-auto">
                    {activeTab === 'products' && (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h1 className="text-xl md:text-2xl font-bold tracking-tight">Products</h1>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => { setEditingId(null); setFormData({ name: '', price: '', image: '', description: '', category: '', subCategory: '', itemType: '', sizes: '' }); }}
                                            className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 font-bold flex items-center gap-2"
                                        >
                                            <Plus size={18} />
                                            <span>Add Product</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[95vw] max-w-[600px] rounded-2xl p-0 overflow-hidden border-none max-h-[95vh] overflow-y-auto shadow-2xl">
                                        <DialogHeader className="p-4 md:p-8 bg-gray-50 border-b">
                                            <DialogTitle className="text-lg md:text-xl font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-4 md:space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                                                    <Input
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="e.g. Silk Summer Dress"
                                                        required
                                                        className="rounded-xl h-11"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Price ($)</label>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                        placeholder="0.00"
                                                        required
                                                        className="rounded-xl h-11"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Sizes (comma separated)</label>
                                                    <Input
                                                        value={formData.sizes}
                                                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                                        placeholder="S, M, L, XL"
                                                        className="rounded-xl h-11 border-2 border-black/10"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase">Main Category</label>
                                                        <select
                                                            className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                                                            value={formData.category}
                                                            onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '', itemType: '' })}
                                                            required
                                                        >
                                                            <option value="">Select Category</option>
                                                            {Object.keys(CATEGORY_HIERARCHY).map(cat => (
                                                                <option key={cat} value={cat}>{cat}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase">Sub Category</label>
                                                        <select
                                                            className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-black outline-none transition-all disabled:opacity-50"
                                                            value={formData.subCategory}
                                                            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value, itemType: '' })}
                                                            required
                                                            disabled={!formData.category}
                                                        >
                                                            <option value="">Select Sub-Category</option>
                                                            {formData.category && Object.keys(CATEGORY_HIERARCHY[formData.category] || {}).map(sub => (
                                                                <option key={sub} value={sub}>{sub}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase">Item Type / Product</label>
                                                        <select
                                                            className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-black outline-none transition-all disabled:opacity-50"
                                                            value={formData.itemType}
                                                            onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                                                            required
                                                            disabled={!formData.subCategory}
                                                        >
                                                            <option value="">Select Item Type</option>
                                                            {formData.category && formData.subCategory && (CATEGORY_HIERARCHY[formData.category]?.[formData.subCategory] || []).map(item => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 space-y-2 pt-2 border-t">
                                                    <label className="text-xs font-bold text-gray-400 uppercase">Product Image</label>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setFormData({ ...formData, image: reader.result as string });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        className="rounded-xl h-11 pt-2 file:bg-gray-100 file:text-black file:rounded-md file:border-none file:px-3 file:py-1 file:text-[10px] file:font-bold file:mr-3"
                                                        required={!editingId}
                                                    />
                                                    {formData.image && (
                                                        <div className="mt-2 h-16 w-16 rounded-lg overflow-hidden border">
                                                            <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                                    <textarea
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                        placeholder="Detailed product story..."
                                                        required
                                                        className="w-full h-24 md:h-32 p-3 text-sm rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setIsDialogOpen(false)}
                                                    className="flex-1 h-12 rounded-xl border-gray-200 font-bold"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex-1 h-12 rounded-xl bg-black text-white hover:bg-gray-800 font-bold"
                                                >
                                                    {isSubmitting ? (
                                                        <div className="flex items-center gap-2">
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            <span>{editingId ? 'Updating...' : 'Adding...'}</span>
                                                        </div>
                                                    ) : (
                                                        editingId ? 'Update Product' : 'Add Product'
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                                <StatCard
                                    title="Total Products"
                                    value="$199"
                                    trend="+20.1%"
                                    trendType="up"
                                />
                                <StatCard
                                    title="Total Categories"
                                    value="6"
                                    trend="+5.02"
                                    trendType="up"
                                />
                                <StatCard
                                    title="Total Orders Success"
                                    value="120"
                                    trend="+3.1%"
                                    trendType="up"
                                />
                                <StatCard
                                    title="Total Revenue"
                                    value="$2,230"
                                    trend="-3.58%"
                                    trendType="down"
                                />
                            </div>

                            {/* Product List Table */}
                            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
                                <CardHeader className="p-4 md:p-6 bg-white border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-0">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                                        <div className="relative w-full sm:w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                            <Input placeholder="Search products..." className="pl-9 h-9 bg-gray-50 border-none rounded-lg text-xs w-full" />
                                        </div>
                                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                                            <select
                                                className="h-9 px-3 rounded-lg text-xs border border-gray-100 bg-white outline-none focus:ring-1 focus:ring-black min-w-[120px]"
                                                value={categoryFilter}
                                                onChange={(e) => setCategoryFilter(e.target.value)}
                                            >
                                                <option value="">All Categories</option>
                                                {Object.keys(CATEGORY_HIERARCHY).map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <Button variant="outline" className="h-9 rounded-lg text-xs border-gray-100 gap-2 shrink-0">
                                                Price: $100-$200
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table className="min-w-[800px]">
                                            <TableHeader className="bg-gray-50/50">
                                                <TableRow className="border-b-0 hover:bg-transparent">
                                                    <TableHead className="pl-6 h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Product Name</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Price</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Category</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Stock</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Rating</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Status</TableHead>
                                                    <TableHead className="pr-6 h-12 text-right text-[10px] font-bold uppercase text-gray-400 tracking-wider">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {loading ? (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="h-32 text-center">
                                                            <div className="flex justify-center">
                                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : products
                                                    .filter(p => !categoryFilter || p.category === categoryFilter)
                                                    .map((product) => (
                                                        <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                                            <TableCell className="pl-6 py-4">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="h-10 w-10 min-w-[40px] rounded-lg bg-gray-100 flex items-center justify-center p-1.5 overflow-hidden">
                                                                        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                                                                    </div>
                                                                    <div className="flex flex-col min-w-0">
                                                                        <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{product.name}</span>
                                                                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                                                                            {product.category} {product.subCategory ? `> ${product.subCategory}` : ''} {product.itemType ? `> ${product.itemType}` : ''}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <span className="text-sm text-gray-600 capitalize">
                                                                    {product.itemType || product.category.replace('-', ' ')}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <span className="text-sm font-medium text-gray-900">25</span>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Badge variant="secondary" className="bg-transparent border-none text-orange-400 flex items-center gap-1 p-0 font-bold text-sm">
                                                                        ★ 4.9
                                                                    </Badge>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none rounded-lg px-2 shadow-none font-bold text-[10px]">
                                                                    Active
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="pr-6 py-4 text-right">
                                                                <div className="flex items-center justify-end space-x-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => handleEdit(product)}
                                                                        className="h-8 w-8 p-0 rounded-lg bg-white border-gray-100 shadow-none hover:bg-gray-50"
                                                                    >
                                                                        <Pencil size={14} className="text-gray-600" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => handleDeleteClick(product)}
                                                                        className="h-8 w-8 p-0 rounded-lg bg-white border-gray-100 shadow-none hover:bg-gray-50 text-red-500 hover:text-red-700"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                {!loading && products.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="h-32 text-center text-gray-500 italic">
                                                            No products found in the catalog.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {activeTab === 'orders' && (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h1 className="text-xl md:text-2xl font-bold tracking-tight">Orders</h1>
                            </div>
                            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
                                <CardHeader className="p-4 md:p-6 bg-white border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-0">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                                        <div className="relative w-full sm:w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                            <Input placeholder="Search orders..." className="pl-9 h-9 bg-gray-50 border-none rounded-lg text-xs w-full" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table className="min-w-[800px]">
                                            <TableHeader className="bg-gray-50/50">
                                                <TableRow className="border-b-0 hover:bg-transparent">
                                                    <TableHead className="pl-6 h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Order ID</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Date</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Customer</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</TableHead>
                                                    <TableHead className="h-12 text-[10px] font-bold uppercase text-gray-400 tracking-wider">Status</TableHead>
                                                    <TableHead className="pr-6 h-12 text-right text-[10px] font-bold uppercase text-gray-400 tracking-wider">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {loading ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-32 text-center">
                                                            <div className="flex justify-center">
                                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : orders.map((order) => (
                                                    <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                                        <TableCell className="pl-6 py-4">
                                                            <span className="text-sm font-bold text-gray-900">#{order.id}</span>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <span className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-gray-900">{order.firstName} {order.lastName}</span>
                                                                <span className="text-[10px] text-gray-500">{order.email}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <select
                                                                className={`h-8 px-2 rounded-lg text-[10px] font-bold border-none outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-sm
                                                                    ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                                                        order.status === 'Approved' ? 'bg-blue-50 text-blue-600' :
                                                                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                                                'bg-gray-50 text-gray-600'}`}
                                                                value={order.status}
                                                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                            >
                                                                <option value="Pending">Pending</option>
                                                                <option value="Approved">Approved</option>
                                                                <option value="Delivered">Delivered</option>
                                                            </select>
                                                        </TableCell>
                                                        <TableCell className="pr-6 py-4 text-right">
                                                            <div className="flex items-center justify-end space-x-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setSelectedOrder(order);
                                                                        setIsOrderDialogOpen(true);
                                                                    }}
                                                                    className="h-8 px-3 rounded-lg bg-white border-gray-100 shadow-none hover:bg-gray-50 text-xs font-bold"
                                                                >
                                                                    View
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteOrderClick(order)}
                                                                    className="h-8 w-8 p-0 rounded-lg bg-white border-gray-100 shadow-none hover:bg-gray-50 text-red-500 hover:text-red-700"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {!loading && orders.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-32 text-center text-gray-500 italic">
                                                            No orders found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </main>
            </div>

            {/* Order Details Modal */}
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                <DialogContent className="w-[95vw] max-w-[600px] rounded-2xl p-0 overflow-hidden border-none max-h-[95vh] overflow-y-auto shadow-2xl">
                    <DialogHeader className="p-4 md:p-6 bg-gray-50 border-b">
                        <DialogTitle className="text-lg md:text-xl font-bold">
                            Order #{selectedOrder?.id} Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="p-4 md:p-6 space-y-6">
                            {/* Customer & Shipping Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Information</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipping Address</p>
                                    <p className="text-sm text-gray-900">{selectedOrder.address}</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.city}, {selectedOrder.postalCode}</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.country}</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Order Summary & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Date</p>
                                    <p className="text-sm text-gray-900">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                                    <select
                                        className={`h-8 px-2 rounded-lg text-[10px] font-bold border-none outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-sm
                                            ${selectedOrder.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                                selectedOrder.status === 'Approved' ? 'bg-blue-50 text-blue-600' :
                                                    selectedOrder.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                        'bg-gray-50 text-gray-600'}`}
                                        value={selectedOrder.status}
                                        onChange={(e) => {
                                            const newStatus = e.target.value;
                                            handleUpdateOrderStatus(selectedOrder.id, newStatus);
                                            setSelectedOrder({ ...selectedOrder, status: newStatus });
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>

                            <Separator />

                            {/* Items List */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Purchased Items</p>
                                <div className="space-y-3">
                                    {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center text-sm">
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    Qty: {item.quantity || 1}
                                                    {item.selectedSize ? ` | Size: ${item.selectedSize}` : ''}
                                                    {item.selectedColor ? ` | Color: ${item.selectedColor}` : ''}
                                                </p>
                                            </div>
                                            <p className="font-bold text-gray-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Total Calculation */}
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-sm font-bold text-gray-900 uppercase">Total Amount</p>
                                <p className="text-xl font-bold text-black">${selectedOrder.total.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={() => setIsOrderDialogOpen(false)}
                                    className="bg-black text-white hover:bg-gray-800 rounded-lg px-6 font-bold"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Order Confirmation Modal */}
            <AlertDialog open={isDeleteOrderDialogOpen} onOpenChange={setIsDeleteOrderDialogOpen}>
                <AlertDialogContent className="max-w-[90vw] sm:max-w-md rounded-2xl border-none p-6 md:p-8">
                    <AlertDialogHeader className="space-y-3">
                        <AlertDialogTitle className="text-xl font-bold">Delete Order?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500">
                            This action cannot be undone. This will permanently delete order <span className="font-bold text-black">#{orderToDelete?.id}</span> and remove the data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
                        <AlertDialogCancel className="h-11 rounded-xl border-gray-100 font-bold flex-1">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                confirmDeleteOrder();
                            }}
                            disabled={isDeletingOrder}
                            className="h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold flex-1"
                        >
                            {isDeletingOrder ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                "Yes, Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Confirmation Modal */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="max-w-[90vw] sm:max-w-md rounded-2xl border-none p-6 md:p-8">
                    <AlertDialogHeader className="space-y-3">
                        <AlertDialogTitle className="text-xl font-bold">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500">
                            This action cannot be undone. This will permanently delete <span className="font-bold text-black">{productToDelete?.name}</span> and remove the data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
                        <AlertDialogCancel className="h-11 rounded-xl border-gray-100 font-bold flex-1">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                confirmDelete();
                            }}
                            disabled={isDeleting}
                            className="h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold flex-1"
                        >
                            {isDeleting ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                "Yes, Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function SidebarLink({ id, icon, label, activeTab, setActiveTab, subLinks }: { id: string, icon: React.ReactNode, label: string, activeTab: string, setActiveTab: (tab: string) => void, subLinks?: { label: string, href: string, active?: boolean }[] }) {
    const active = activeTab === id;
    const [isOpen, setIsOpen] = useState(active);

    return (
        <div className="space-y-1">
            <div
                onClick={() => {
                    setActiveTab(id);
                    if (subLinks) setIsOpen(!isOpen);
                }}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-black/5 text-black' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
            >
                <div className={`${active ? 'text-black' : 'text-gray-400'}`}>{icon}</div>
                <span className="flex-1 text-sm font-bold">{label}</span>
                {subLinks && <TrendingUp size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''} text-gray-400`} />}
            </div>
            {subLinks && isOpen && (
                <div className="space-y-1 pt-1 ml-4 border-l border-gray-100">
                    {subLinks.map((link, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center space-x-3 px-8 py-2 rounded-lg cursor-pointer transition-all text-xs font-medium ${link.active ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-900'
                                }`}
                        >
                            <span>{link.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, trend, trendType }: { title: string, value: string, trend: string, trendType: 'up' | 'down' }) {
    return (
        <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">{title}</p>
                    <Badge className={`rounded-full px-2 py-0 border-none shadow-none text-[8px] md:text-[10px] font-bold ${trendType === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {trend}
                    </Badge>
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-xl md:text-3xl font-bold tracking-tight">{value}</p>
                    <div className={`p-1.5 md:p-2 rounded-lg ${trendType === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {trendType === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
