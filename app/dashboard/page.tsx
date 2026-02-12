'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, Trash2, Package, Tag, DollarSign, Search, Filter, RefreshCw } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

export default function DashboardPage() {
    const { user, token, logout, isLoading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [isLoading, user, router]);

    useEffect(() => {
        if (user && token) {
            fetchProducts();
        }
    }, [user, token]);

    const fetchProducts = async () => {
        if (!token) return;
        try {
            const res = await fetch('/api/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (err) {
            console.error('Failed to fetch products');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsCreating(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description, price: parseFloat(price) }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create product');
            }

            setSuccess('Product created successfully!');
            setName('');
            setDescription('');
            setPrice('');
            fetchProducts();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchProducts();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to delete');
            }
        } catch (err) {
            alert('Failed to delete');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading || !user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                Manage your inventory efficiently
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                                {user.email} <span className="ml-1 opacity-70">({user.role})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 space-y-8">
                {/* Add Product Section */}
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                            <Plus className="mr-2 h-5 w-5 text-blue-500" /> Add New Product
                        </h2>
                    </div>

                    <div className="p-6">
                        {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">{error}</div>}
                        {success && <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm border border-green-200 dark:border-green-800">{success}</div>}

                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Package className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isCreating}
                                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="E.g. Wireless Headphones"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Tag className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        disabled={isCreating}
                                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Optional details..."
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        disabled={isCreating}
                                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/25 font-medium flex items-center justify-center transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isCreating ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 h-4 w-4" /> Add
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Products List Section */}
                <section>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                            Inventory <span className="ml-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm py-1 px-3 rounded-full">{products.length} Items</span>
                        </h2>

                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white text-sm"
                                placeholder="Search products..."
                            />
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden">
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 min-h-10">{product.description || 'No description provided'}</p>
                                    </div>

                                    {user.role === 'ADMIN' && (
                                        <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                disabled={deletingId === product.id}
                                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium flex items-center transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {deletingId === product.id ? (
                                                    <svg className="animate-spin mr-1.5 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <Trash2 className="mr-1.5 h-4 w-4" />
                                                )}
                                                {deletingId === product.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 mb-4">
                                <Search className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                {searchTerm ? `No results for "${searchTerm}". Try different keywords.` : "Get started by adding your first product above."}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
