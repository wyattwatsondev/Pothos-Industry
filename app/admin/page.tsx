'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    ShoppingBag,
    Plus,
    Search,
    ShoppingCart,
    Pencil,
    Trash2,
    Loader2,
    Menu,
    TrendingUp,
    TrendingDown,
    Package,
    CheckCircle,
    Clock,
    Truck,
} from 'lucide-react';

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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        "Swimming Diving Suit": ["Swimming Diving Suit"]
    },
    "Women": {
        "Textile": ["Hoodies", "Sweatshirts", "Women T-Shirt", "Polo Shirts", "Crop Tops", "Tank Tops", "Jeans Shirts", "Sweatsuits"],
        "Textile Jackets": ["Denim Jackets", "Windbreaker Jackets", "Bubble Jackets", "Varsity Jackets", "Softshell Jackets", "Fleece Jacket"],
        "Leather Jackets": ["Suede Jackets", "PU Leather Jackets", "Biker Leather Jackets", "Shearling Leather Jackets", "Women Leather Shirts", "Leather Long Coats", "Leather Skirts", "Leather Dresses"],
        "Pants": ["Fashion Pants"],
        "Swimming Diving Suits": ["Swimming Diving Suits"]
    },
    "Mens & Women": {
        "Gloves Collection": ["Cycling Gloves", "Driving Gloves", "Golf Gloves", "Mechanics Gloves", "TPR Impact Gloves", "Weightlifting Gloves", "Working Gloves"],
        "Accessories": ["Backpack", "Bracelets", "Face Mask", "Hand Bags", "Hats & Caps", "Night Masks", "Wallets"],
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
    postalCode?: string;
    country: string;
    total: number;
    status: string;
    createdAt: string;
    items?: {
        name: string;
        price: number;
        quantity?: number;
        size?: string;
        selectedSize?: string;
        image?: string;
        selectedColor?: string;
    }[];
}

function AdminSidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
    return (
        <div className="flex flex-col h-full bg-black text-white">
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-12">
                    <Image src="/logo.png" alt="Logo" width={180} height={70} className="h-14 w-auto object-contain brightness-0 invert" />
                </div>

                <nav className="space-y-2">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 px-3">Management</p>
                    <SidebarLink id="products" icon={<ShoppingBag size={18} />} label="Product Catalog" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarLink id="orders" icon={<ShoppingCart size={18} />} label="Order Requests" activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-white/20">
                        <AvatarImage src="/ProductImages/85.png" />
                        <AvatarFallback className="bg-white text-black font-black">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black truncate uppercase tracking-wider">Administrator</p>
                        <p className="text-[10px] text-gray-400 truncate font-bold">admin@pothosindustry.com</p>
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

    // Product filters
    const [productSearch, setProductSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Order filters
    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState('all');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) fetchOrders();
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
                if (selectedOrder?.id === orderToDelete.id) setIsOrderDialogOpen(false);
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
            if (data && data.products) setProducts(data.products);
            else if (Array.isArray(data)) setProducts(data);
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
            if (res.ok) { fetchProducts(); router.refresh(); }
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    // Derived filtered lists
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const filteredOrders = orders.filter(o => {
        const fullName = `${o.firstName} ${o.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(orderSearch.toLowerCase()) || o.email.toLowerCase().includes(orderSearch.toLowerCase());
        const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
        return matchesSearch && matchesStatus;
    });

    // Product stats per category
    const productCategoryCounts = Object.keys(CATEGORY_HIERARCHY).map(cat => ({
        name: cat,
        count: products.filter(p => p.category === cat).length,
    }));

    // Order stats
    const orderStats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'Pending').length,
        approved: orders.filter(o => o.status === 'Approved').length,
        delivered: orders.filter(o => o.status === 'Delivered').length,
    };

    return (
        <div className="flex min-h-screen bg-white flex-col lg:flex-row" style={{ fontFamily: 'var(--font-geist), sans-serif' }}>
            {/* Desktop Sidebar */}
            <aside className="w-64 border-r border-charcoal/5 bg-black flex flex-col hidden lg:flex fixed inset-y-0 z-40">
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden h-20 bg-black border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Logo" width={120} height={40} className="h-10 w-auto object-contain brightness-0 invert" />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-2xl text-white hover:bg-white/10">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-none">
                        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </SheetContent>
                </Sheet>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
                <main className="p-4 md:p-10 space-y-8 overflow-y-auto min-h-screen">

                    {/* ─── PRODUCTS TAB ─── */}
                    {activeTab === 'products' && (
                        <>
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-charcoal uppercase">Product Catalog</h1>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your inventory & listings</p>
                                </div>
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => { setEditingId(null); setFormData({ name: '', price: '', image: '', description: '', category: '', subCategory: '', itemType: '', sizes: '' }); }}
                                            className="bg-black text-white hover:bg-charcoal rounded-2xl px-8 py-6 font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                                        >
                                            <Plus size={16} />
                                            <span>Add Product</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[95vw] max-w-[700px] rounded-[3rem] p-0 overflow-hidden border-none max-h-[95vh] overflow-y-auto">
                                        <DialogHeader className="p-8 md:p-12 bg-black border-b border-white/10">
                                            <DialogTitle className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                                                {editingId ? 'Edit Product' : 'Registry New Product'}
                                            </DialogTitle>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Enter product details for the catalog</p>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8 bg-white">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Product Name</label>
                                                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Silk Summer Dress" required className="rounded-2xl h-14 border-2 border-charcoal/5 bg-gray-50 focus:bg-white text-sm font-bold transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Price ($)</label>
                                                    <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" required className="rounded-2xl h-14 border-2 border-charcoal/5 bg-gray-50 focus:bg-white text-sm font-bold transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Sizes (comma separated)</label>
                                                    <Input value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} placeholder="S, M, L, XL" className="rounded-2xl h-14 border-2 border-charcoal/5 bg-gray-50 focus:bg-white text-sm font-bold transition-all" />
                                                </div>
                                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-charcoal/5 pt-8">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Collection</label>
                                                        <select className="w-full h-12 px-4 rounded-2xl border-2 border-charcoal/5 bg-gray-50 text-[10px] font-black tracking-widest uppercase outline-none appearance-none cursor-pointer" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '', itemType: '' })} required>
                                                            <option value="">SELECT</option>
                                                            {Object.keys(CATEGORY_HIERARCHY).map(cat => (<option key={cat} value={cat}>{cat.toUpperCase()}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Category</label>
                                                        <select className="w-full h-12 px-4 rounded-2xl border-2 border-charcoal/5 bg-gray-50 text-[10px] font-black tracking-widest uppercase outline-none appearance-none cursor-pointer disabled:opacity-30" value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value, itemType: '' })} required disabled={!formData.category}>
                                                            <option value="">SELECT</option>
                                                            {formData.category && Object.keys(CATEGORY_HIERARCHY[formData.category] || {}).map(sub => (<option key={sub} value={sub}>{sub.toUpperCase()}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Type</label>
                                                        <select className="w-full h-12 px-4 rounded-2xl border-2 border-charcoal/5 bg-gray-50 text-[10px] font-black tracking-widest uppercase outline-none appearance-none cursor-pointer disabled:opacity-30" value={formData.itemType} onChange={(e) => setFormData({ ...formData, itemType: e.target.value })} required disabled={!formData.subCategory}>
                                                            <option value="">SELECT</option>
                                                            {formData.category && formData.subCategory && (CATEGORY_HIERARCHY[formData.category]?.[formData.subCategory] || []).map(item => (<option key={item} value={item}>{item.toUpperCase()}</option>))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 space-y-3 pt-4 border-t border-charcoal/5">
                                                    <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Product Image</label>
                                                    <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => { setFormData({ ...formData, image: reader.result as string }); }; reader.readAsDataURL(file); } }} className="rounded-2xl h-14 pt-3 file:bg-black file:text-white file:rounded-xl file:border-none file:px-4 file:py-1 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:mr-4 border-2 border-charcoal/5 bg-gray-50" required={!editingId} />
                                                    {formData.image && (<div className="mt-2 h-16 w-16 rounded-lg overflow-hidden border"><img src={formData.image} alt="Preview" className="h-full w-full object-cover" /></div>)}
                                                </div>
                                                <div className="md:col-span-2 space-y-3">
                                                    <label className="text-[10px] font-black text-charcoal uppercase tracking-widest">Description</label>
                                                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Detailed product story..." required className="w-full h-32 md:h-40 p-6 text-sm font-bold rounded-[2rem] border-2 border-charcoal/5 bg-gray-50 focus:bg-white outline-none transition-all resize-none" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 h-14 rounded-2xl border-2 border-charcoal/5 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50">Cancel</Button>
                                                <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 rounded-2xl bg-black text-white hover:bg-charcoal font-black uppercase tracking-widest text-[10px]">
                                                    {isSubmitting ? (<div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-white" /><span>SAVING...</span></div>) : (editingId ? 'Save Changes' : 'Add to Catalog')}
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Product Stat Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <Card
                                    onClick={() => setCategoryFilter('all')}
                                    className={`rounded-2xl border-2 cursor-pointer transition-all duration-200 ${categoryFilter === 'all' ? 'border-black bg-black text-white' : 'border-charcoal/10 bg-white hover:border-charcoal/30'}`}
                                >
                                    <CardContent className="p-6 text-center space-y-2">
                                        <Package size={20} className={`mx-auto ${categoryFilter === 'all' ? 'text-white' : 'text-gray-400'}`} />
                                        <p className={`text-3xl font-black tracking-tighter ${categoryFilter === 'all' ? 'text-white' : 'text-charcoal'}`}>{products.length}</p>
                                        <p className={`text-[9px] font-black uppercase tracking-widest ${categoryFilter === 'all' ? 'text-gray-300' : 'text-gray-400'}`}>All Products</p>
                                    </CardContent>
                                </Card>
                                {productCategoryCounts.map(cat => (
                                    <Card
                                        key={cat.name}
                                        onClick={() => setCategoryFilter(cat.name)}
                                        className={`rounded-2xl border-2 cursor-pointer transition-all duration-200 ${categoryFilter === cat.name ? 'border-black bg-black text-white' : 'border-charcoal/10 bg-white hover:border-charcoal/30'}`}
                                    >
                                        <CardContent className="p-6 text-center space-y-2">
                                            <p className={`text-3xl font-black tracking-tighter ${categoryFilter === cat.name ? 'text-white' : 'text-charcoal'}`}>{cat.count}</p>
                                            <p className={`text-[9px] font-black uppercase tracking-widest leading-tight ${categoryFilter === cat.name ? 'text-gray-300' : 'text-gray-400'}`}>{cat.name}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Search products..."
                                        value={productSearch}
                                        onChange={(e) => setProductSearch(e.target.value)}
                                        className="pl-12 h-12 rounded-2xl border-2 border-charcoal/10 bg-gray-50 text-sm font-bold focus:border-charcoal/30"
                                    />
                                </div>
                                {categoryFilter !== 'all' && (
                                    <Badge className="bg-black text-white border-none rounded-full px-4 py-2 font-black text-[10px] uppercase tracking-widest">
                                        {categoryFilter}
                                        <button onClick={() => setCategoryFilter('all')} className="ml-2 text-gray-400 hover:text-white">×</button>
                                    </Badge>
                                )}
                            </div>

                            {/* Products Table */}
                            <Card className="rounded-3xl border-2 border-charcoal/5 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-2 border-charcoal/5 hover:bg-transparent">
                                            <TableHead className="pl-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-16">IMG</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</TableHead>
                                            <TableHead className="py-5 pr-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow><TableCell colSpan={5} className="text-center py-20"><div className="flex items-center justify-center gap-3 text-gray-400"><Loader2 className="w-6 h-6 animate-spin" /><span className="text-sm font-black uppercase tracking-widest">Loading...</span></div></TableCell></TableRow>
                                        ) : filteredProducts.length === 0 ? (
                                            <TableRow><TableCell colSpan={5} className="text-center py-20 text-[10px] font-black text-gray-300 uppercase tracking-widest">No products found</TableCell></TableRow>
                                        ) : filteredProducts.map((product) => (
                                            <TableRow key={product.id} className="border-b border-charcoal/5 hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="pl-8 py-5">
                                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-charcoal/5 overflow-hidden flex items-center justify-center">
                                                        {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> : <Package size={20} className="text-gray-300" />}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <p className="text-sm font-black text-charcoal uppercase tracking-tight">{product.name}</p>
                                                    {product.subCategory && <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{product.subCategory}</p>}
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <Badge className="bg-gray-50 text-charcoal border border-charcoal/10 rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-widest">{product.category}</Badge>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <p className="text-sm font-black text-charcoal">${product.price.toFixed(2)}</p>
                                                </TableCell>
                                                <TableCell className="pr-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="h-10 w-10 p-0 rounded-xl border-charcoal/10 hover:bg-black hover:text-white hover:border-black transition-all">
                                                            <Pencil size={14} />
                                                        </Button>
                                                        <Button variant="outline" size="sm" onClick={() => handleDeleteClick(product)} className="h-10 w-10 p-0 rounded-xl border-charcoal/10 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </>
                    )}

                    {/* ─── ORDERS TAB ─── */}
                    {activeTab === 'orders' && (
                        <>
                            {/* Header */}
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-charcoal uppercase">Order Requests</h1>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Track and manage customer orders</p>
                            </div>

                            {/* Order Stat Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Total Orders', value: orderStats.total, icon: <Package size={20} />, key: 'all', color: 'bg-black text-white', activeColor: 'border-black' },
                                    { label: 'Pending', value: orderStats.pending, icon: <Clock size={20} />, key: 'Pending', color: 'bg-yellow-50', activeColor: 'border-yellow-400' },
                                    { label: 'Approved', value: orderStats.approved, icon: <CheckCircle size={20} />, key: 'Approved', color: 'bg-blue-50', activeColor: 'border-blue-400' },
                                    { label: 'Delivered', value: orderStats.delivered, icon: <Truck size={20} />, key: 'Delivered', color: 'bg-green-50', activeColor: 'border-green-400' },
                                ].map((stat) => (
                                    <Card
                                        key={stat.key}
                                        onClick={() => setOrderStatusFilter(stat.key)}
                                        className={`rounded-2xl border-2 cursor-pointer transition-all duration-200 ${orderStatusFilter === stat.key ? `${stat.activeColor} ${stat.key === 'all' ? 'bg-black' : stat.color}` : 'border-charcoal/10 bg-white hover:border-charcoal/30'}`}
                                    >
                                        <CardContent className="p-6 space-y-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.key === 'all' && orderStatusFilter === 'all' ? 'text-white' : stat.key === 'Pending' ? 'bg-yellow-100 text-yellow-600' : stat.key === 'Approved' ? 'bg-blue-100 text-blue-600' : stat.key === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {stat.icon}
                                            </div>
                                            <p className={`text-3xl font-black tracking-tighter ${stat.key === 'all' && orderStatusFilter === 'all' ? 'text-white' : 'text-charcoal'}`}>{stat.value}</p>
                                            <p className={`text-[9px] font-black uppercase tracking-widest ${stat.key === 'all' && orderStatusFilter === 'all' ? 'text-gray-300' : 'text-gray-400'}`}>{stat.label}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Search by name or email..."
                                        value={orderSearch}
                                        onChange={(e) => setOrderSearch(e.target.value)}
                                        className="pl-12 h-12 rounded-2xl border-2 border-charcoal/10 bg-gray-50 text-sm font-bold focus:border-charcoal/30"
                                    />
                                </div>
                                {orderStatusFilter !== 'all' && (
                                    <Badge className="bg-black text-white border-none rounded-full px-4 py-2 font-black text-[10px] uppercase tracking-widest">
                                        {orderStatusFilter}
                                        <button onClick={() => setOrderStatusFilter('all')} className="ml-2 text-gray-400 hover:text-white">×</button>
                                    </Badge>
                                )}
                            </div>

                            {/* Orders Table */}
                            <Card className="rounded-3xl border-2 border-charcoal/5 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-2 border-charcoal/5 hover:bg-transparent">
                                            <TableHead className="pl-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order ID</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</TableHead>
                                            <TableHead className="py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</TableHead>
                                            <TableHead className="py-5 pr-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.length === 0 ? (
                                            <TableRow><TableCell colSpan={6} className="text-center py-20 text-[10px] font-black text-gray-300 uppercase tracking-widest">No orders found</TableCell></TableRow>
                                        ) : filteredOrders.map((order) => (
                                            <TableRow key={order.id} className="border-b border-charcoal/5 hover:bg-gray-50/50 transition-colors">
                                                <TableCell className="pl-8 py-5">
                                                    <p className="text-xs font-black text-charcoal uppercase tracking-tight">#{order.id}</p>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <p className="text-sm font-black text-charcoal uppercase tracking-tight">{order.firstName} {order.lastName}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">{order.email}</p>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <p className="text-sm font-black text-charcoal">${order.total.toFixed(2)}</p>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                </TableCell>
                                                <TableCell className="py-5">
                                                    <select
                                                        className={`h-9 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-none outline-none cursor-pointer ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : order.status === 'Approved' ? 'bg-blue-50 text-blue-600' : order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                                                        value={order.status}
                                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Approved">Approved</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </TableCell>
                                                <TableCell className="pr-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="outline" size="sm" onClick={() => { setSelectedOrder(order); setIsOrderDialogOpen(true); }} className="h-9 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest border-charcoal/10 hover:bg-black hover:text-white hover:border-black transition-all">
                                                            Details
                                                        </Button>
                                                        <Button variant="outline" size="sm" onClick={() => handleDeleteOrderClick(order)} className="h-9 w-9 p-0 rounded-xl border-charcoal/10 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </>
                    )}
                </main>
            </div>

            {/* Order Details Modal */}
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                <DialogContent className="max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none">
                    <DialogHeader className="p-8 md:p-12 bg-black border-b border-white/10">
                        <div className="flex justify-between items-start">
                            <div>
                                <DialogTitle className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Order Details</DialogTitle>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Reference #{selectedOrder?.id}</p>
                            </div>
                            {selectedOrder && (
                                <Badge className={`rounded-full px-4 py-2 font-black text-[10px] uppercase tracking-widest border-none ${selectedOrder.status === 'Pending' ? 'bg-yellow-500 text-white' : selectedOrder.status === 'Approved' ? 'bg-blue-500 text-white' : selectedOrder.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                    {selectedOrder.status}
                                </Badge>
                            )}
                        </div>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="p-8 md:p-12 space-y-10 bg-white max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-charcoal uppercase tracking-[0.2em] border-b border-charcoal/5 pb-2">Customer Information</h3>
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-charcoal uppercase">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                        <p className="text-xs font-bold text-gray-400">{selectedOrder.email}</p>
                                        <p className="text-xs font-bold text-gray-400">{selectedOrder.phone}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-charcoal uppercase tracking-[0.2em] border-b border-charcoal/5 pb-2">Shipping Destination</h3>
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-charcoal uppercase">{selectedOrder.address}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{selectedOrder.city}, {selectedOrder.postalCode}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{selectedOrder.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black text-charcoal uppercase tracking-[0.2em] border-b border-charcoal/5 pb-2">Order Items</h3>
                                <div className="space-y-4">
                                    {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center py-4 border-b border-charcoal/5 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-charcoal/5 flex items-center justify-center overflow-hidden">
                                                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" /> : <Package size={16} className="text-gray-300" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-charcoal uppercase">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">QTY: {item.quantity || 1} • SIZE: {item.size || item.selectedSize || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-black text-charcoal">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-[2rem] p-8 space-y-3">
                                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Subtotal</span><span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-charcoal/5 pb-3">
                                    <span>Shipping</span><span>FREE</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-charcoal uppercase tracking-tighter pt-2">
                                    <span>Total</span><span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="p-8 bg-white border-t border-charcoal/5 flex justify-end">
                        <Button onClick={() => setIsOrderDialogOpen(false)} className="h-14 px-10 rounded-2xl bg-black text-white hover:bg-charcoal font-black uppercase tracking-widest text-[10px]">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Order Dialog */}
            <AlertDialog open={isDeleteOrderDialogOpen} onOpenChange={setIsDeleteOrderDialogOpen}>
                <AlertDialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none">
                    <div className="p-8 md:p-12 bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black text-charcoal uppercase tracking-tighter">Delete Order</AlertDialogTitle>
                            <AlertDialogDescription className="text-sm font-bold text-gray-400 mt-4 leading-relaxed">
                                This will permanently remove the order record. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-10 gap-4">
                            <AlertDialogCancel className="h-14 flex-1 rounded-2xl border-2 border-charcoal/5 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={(e) => { e.preventDefault(); confirmDeleteOrder(); }} disabled={isDeletingOrder} className="h-14 flex-1 rounded-2xl bg-red-600 text-white hover:bg-red-700 font-black uppercase tracking-widest text-[10px] border-none">
                                {isDeletingOrder ? (<div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /><span>Deleting...</span></div>) : "Confirm Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Product Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="rounded-[2.5rem] p-0 overflow-hidden border-none">
                    <div className="p-8 md:p-12 bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black text-charcoal uppercase tracking-tighter">Delete Product</AlertDialogTitle>
                            <AlertDialogDescription className="text-sm font-bold text-gray-400 mt-4 leading-relaxed">
                                This product will be permanently removed from the catalog. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-10 gap-4">
                            <AlertDialogCancel className="h-14 flex-1 rounded-2xl border-2 border-charcoal/5 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={(e) => { e.preventDefault(); confirmDelete(); }} disabled={isDeleting} className="h-14 flex-1 rounded-2xl bg-red-600 text-white hover:bg-red-700 font-black uppercase tracking-widest text-[10px] border-none">
                                {isDeleting ? (<div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /><span>Deleting...</span></div>) : "Confirm Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function SidebarLink({ id, icon, label, activeTab, setActiveTab }: { id: string, icon: React.ReactNode, label: string, activeTab: string, setActiveTab: (tab: string) => void }) {
    const active = activeTab === id;
    return (
        <div
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${active ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
        >
            <div className={`${active ? 'text-black' : 'text-gray-500'}`}>{icon}</div>
            <span className="flex-1 text-xs font-black uppercase tracking-widest">{label}</span>
        </div>
    );
}

function StatCard({ title, value, trend, trendType }: { title: string, value: string, trend: string, trendType: 'up' | 'down' }) {
    return (
        <Card className="rounded-[2rem] border-2 border-charcoal/5 bg-white hover:border-charcoal/20 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-tight">{title}</p>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${trendType === 'up' ? 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' : 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'}`}>
                        {trendType === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-black text-charcoal tracking-tighter leading-none">{value}</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-tight ${trendType === 'up' ? 'text-green-600' : 'text-red-600'}`}>{trend}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">vs last month</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
