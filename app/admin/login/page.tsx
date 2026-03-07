'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                window.location.href = '/admin'; // Force reload to trigger middleware properly
            } else {
                setError(data.message || 'Invalid password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-[#1a1a1a] flex flex-col items-center justify-center p-4 sm:p-6" style={{ fontFamily: 'var(--font-geist), sans-serif' }}>
            <div className="mb-8 sm:mb-12">
                <Image src="/logo.png" alt="Logo" width={240} height={80} className="w-auto h-16 sm:h-20 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
            </div>

            <Card className="w-full max-w-md border-white/10 bg-[#222] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <CardHeader className="space-y-3 text-center pb-6 sm:pb-8 pt-8 sm:pt-10">
                    <div className="mx-auto w-14 h-14 bg-[#1a1a1a] border border-white/10 shadow-inner rounded-full flex items-center justify-center mb-2">
                        <Lock className="w-6 h-6 text-gray-300" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-black tracking-[0.15em] uppercase text-white drop-shadow-md">Admin Access</CardTitle>
                    <CardDescription className="text-gray-400 font-bold tracking-[0.2em] text-[10px] sm:text-[11px] uppercase">
                        This page is strictly for admin
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 sm:px-10 pb-10">
                    <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
                        <div className="space-y-3 text-left">
                            <label className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Master Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="• • • • • • • •"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 sm:h-14 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-600 rounded-xl sm:rounded-2xl focus:border-white/30 focus:ring-0 transition-all font-bold tracking-widest text-center text-lg shadow-inner pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-[10px] sm:text-xs text-center font-bold tracking-widest uppercase bg-red-500/10 border border-red-500/20 py-2.5 sm:py-3 rounded-lg sm:rounded-xl animate-in fade-in zoom-in slide-in-from-top-2 duration-300">{error}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full h-12 sm:h-14 bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] font-black uppercase tracking-[0.2em] text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin mx-auto text-black" /> : 'Authenticate'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <p className="mt-8 text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Pothos Industry Dashboard © {new Date().getFullYear()}</p>
        </div>
    );
}
