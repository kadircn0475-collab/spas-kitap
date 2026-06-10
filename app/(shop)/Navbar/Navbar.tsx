'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext'; 
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Navbar() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Arama için gerekli Next.js hook'ları
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Kullanıcı enter'a bastığında veya arama yaptığında çalışacak fonksiyon
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/'); // Arama alanı boşaltılırsa ana sayfayı sıfırla
    }
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem', 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* LOGO */}
      <div className="logo">
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', textDecoration: 'none' }}>
          Spas Kitap
        </Link>
      </div>

      {/* ARAMA ALANI */}
      <form onSubmit={handleSearchSubmit} style={{ flex: '0 1 400px', margin: '0 2rem' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Kitap adı veya kategori ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 1rem 0.6rem 2.5rem',
              borderRadius: '9999px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              fontSize: '0.9rem',
              color: '#111827',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#111827';
              e.target.style.boxShadow = '0 0 0 3px rgba(17, 24, 39, 0.05)';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = '#f9fafb';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
          {/* Arama Büyüteç ikonu */}
          <span style={{ position: 'absolute', left: '1rem', color: '#9ca3af', fontSize: '1rem', pointerEvents: 'none' }}>
            
          </span>
          
          {/* Eğer içerik yazıldıysa temizleme çarpısı çıksın */}
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); router.push('/'); }}
              style={{ position: 'absolute', right: '1rem', border: 'none', background: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* SAĞ LİNKLER */}
      <div className="menu-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        
        {/* SEPET */}
        <Link href="/cart" style={{ textDecoration: 'none', color: '#111827', fontWeight: 700, backgroundColor: '#f3f4f6', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           Sepet 
          <span style={{ backgroundColor: '#111827', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.85rem' }}>
            {!mounted ? 0 : (Number.isNaN(cartCount) ? 0 : cartCount)}
          </span>
        </Link>
      </div>
    </nav>
  );
}