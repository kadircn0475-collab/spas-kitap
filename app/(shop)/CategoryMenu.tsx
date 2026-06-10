'use client'; // kullanıcı etkisi olduğu için yine bu yapıya yer verdik 

import React from 'react';

interface CategoryMenuProps {
  categories: { id: string; name: string }[];
}

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  
  // Sayfanın aşağı doğru kaymasını sağlayan fonksiyon burada yer alıyor unutmaaaa
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    // Hedef bileşenin sayfa üzerindeki konumunu buluyoruz
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    // Süre ayarı: geçiş ayarını unutulursa buradan yapılıyor
    const duration = 700; 
    let startTime: number | null = null;

    // Yağ gibi akan (EaseInOutQuad) matematiksel yumuşatma formülü
    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '0.75rem', 
      overflowX: 'auto', 
      padding: '0.5rem 0 1.5rem 0',
      whiteSpace: 'nowrap',
      scrollbarWidth: 'none',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '2rem',
      position: 'sticky',
      top: 0,
      backgroundColor: '#ffffff',
      zIndex: 10
    }}>
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          onClick={(e) => scrollToSection(e, cat.id)} // Tıklanınca özel yavaş animasyon çalışacak aşağıda ayrı yazmak yerine styles kodları var düzeltme için önemli 
          style={{
            backgroundColor: '#ffffff',
            color: '#4b5563',
            border: '1px solid #e5e7eb',
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            display: 'inline-block'
          }}
        >
          {cat.name}
        </a>
      ))}
    </div>
  );
}