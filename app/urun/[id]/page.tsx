// app/urun/[id]/page.tsx
import { db } from '@/app/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/app/(shop)/AddCartButton'; 

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;

  let product = null;

  // SÝHÝRLÝ DOKUNUÞ: Veritabanındaki ID hem Int hem String olsa bile iki ihtimali de deniyoruz!
  try {
    const numericId = parseInt(rawId, 10);
    
    if (!isNaN(numericId)) {
      // 1. İhtimal: ID veritabanında tamsayı (Int) ise:
      product = await (db.product as any).findUnique({
        where: { id: numericId },
      });
    }
    
    // 2. İhtimal: Eğer yukarıda bulunamadıysa veya ID aslında metinse (String / UUID):
    if (!product) {
      product = await (db.product as any).findUnique({
        where: { id: rawId },
      });
    }
  } catch (error) {
    console.error("Veritabanı sorgusu sırasında bir hata oluştu:", error);
  }

  // Eğer hiçbir ihtimalde ürün bulunamadıysa 404 sayfasına fırlat
  if (!product) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* GERİ DÖNÜŞ LİNKİ */}
      <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        ← Mağazaya Geri Dön
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        
        {/* SOL TARAF: KİTAP GÖRSEL ALANI */}
        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '24px', padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #e5e7eb', height: '450px' }}>
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }} 
            />
          ) : (
            <span style={{ fontSize: '5rem' }}>📚</span>
          )}
        </div>

        {/* SAĞ TARAF: KİTAP DETAYLARI */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <span style={{ color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Spas Kitap Yayıncılık
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111827', marginBottom: '1rem', lineHeight: 1.2 }}>
            {product.title}
          </h1>
          
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>
            {product.price} TL
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>Kitap Açıklaması</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '1rem' }}>
              {product.description || "Bu eğitim kaynağı için henüz detaylı bir açıklama girilmemiştir. En kısa sürede güncellenecektir."}
            </p>
          </div>

          {/* AKSİYON BUTONU */}
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <AddToCartButton 
              product={{
                id: product.id.toString(),
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl
              }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}