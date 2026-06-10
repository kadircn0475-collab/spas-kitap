import { db } from '@/app/lib/db';
import styles from './page.module.css';
import AddToCartButton from './AddCartButton';
import Link from 'next/link';
import CategoryMenu from './CategoryMenu'; // aşağı akma menüsü burada 

export default async function HomePage() {
  const tytBooks = (await (db.product as any).findMany({
    where: { showcase: 'tyt' },
    orderBy: { createdAt: 'desc' },
  })) as any[];

  const aytBooks = (await (db.product as any).findMany({
    where: { showcase: 'ayt' },
    orderBy: { createdAt: 'desc' },
  })) as any[];

  const cocukBooks = (await (db.product as any).findMany({
    where: { showcase: 'cocuk' },
    orderBy: { createdAt: 'desc' },
  })) as any[];

  const categories = [
    { id: 'tyt-section', name: ' TYT Hazırlık' },
    { id: 'ayt-section', name: ' AYT Uzmanlık' },
    { id: 'cocuk-section', name: ' Çocuk Dünyası' }
  ];

  return (
    <main className={styles.mainContainer}>

      <CategoryMenu categories={categories} />

      {/* HERO */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Geleceği Spas Kitap ile İnşa Edin</h1>
          <p className={styles.heroSubtitle}>
            TYT, AYT ve Çocuk dünyasına dair en seçkin kaynaklar, başarı yolculuğunuzda yanınızda.
          </p>
          <div className={styles.heroBadges}>
            <span>Hızlı Teslimat</span>
            <span>Güncel Müfredat</span>
            <span>Güvenli Alışveriş</span>
          </div>
        </div>
      </header>

      {/* TYT ALANI */}
      <section id="tyt-section" className={styles.showcaseSection} style={{ scrollMarginTop: '80px' }}>
        <div className={styles.showcaseHeader}>
          <div className={styles.headerLine}></div>
          <h2 className={styles.showcaseTitle}>TYT KİTAPLARI</h2>
        </div>
        {tytBooks.length === 0 ? (
          <p className={styles.emptyMessage}>TYT vitrinine henüz kitap eklenmedi.</p>
        ) : (
          <div className={styles.productGrid}>
            {tytBooks.map((book) => (
              <div key={book.id} className={styles.productCard}>
                <div>
                  <div className={styles.bookIconContainer}>
                    {book.imageUrl ? (
                      <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
                    ) : (
                      <div className={styles.bookIcon}></div>
                    )}
                  </div>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookDescription}>{book.description || 'Açıklama belirtilmedi.'}</p>
                </div>
                <div className={styles.cardBottom}>
                  <span className={styles.priceTag}>{book.price} TL</span>
                  <div className={styles.actionButtons}>
                    <Link href={`/urun/${book.id}`} className={styles.buyButton}>
                      İncele
                    </Link>
                    <AddToCartButton product={book} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AYT ALANI */}
      <section id="ayt-section" className={styles.showcaseSection} style={{ scrollMarginTop: '80px' }}>
        <div className={styles.showcaseHeader}>
          <div className={styles.headerLine}></div>
          <h2 className={styles.showcaseTitle}>AYT Uzmanlık Kitapları</h2>
        </div>
        {aytBooks.length === 0 ? (
          <p className={styles.emptyMessage}>AYT vitrinine henüz kitap eklenmedi.</p>
        ) : (
          <div className={styles.productGrid}>
            {aytBooks.map((book) => (
              <div key={book.id} className={styles.productCard}>
                <div>
                  <div className={styles.bookIconContainer}>
                    {book.imageUrl ? (
                      <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
                    ) : (
                      <div className={styles.bookIcon}></div>
                    )}
                  </div>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookDescription}>{book.description || 'Açıklama belirtilmedi.'}</p>
                </div>
                <div className={styles.cardBottom}>
                  <span className={styles.priceTag}>{book.price} TL</span>
                  <div className={styles.actionButtons}>
                    <Link href={`/urun/${book.id}`} className={styles.buyButton}>
                      İncele
                    </Link>
                    <AddToCartButton product={book} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ÇOCUK KİTAPLARI*/}
      <section id="cocuk-section" className={styles.showcaseSection} style={{ scrollMarginTop: '80px' }}>
        <div className={styles.showcaseHeader}>
          <div className={styles.headerLine}></div>
          <h2 className={styles.showcaseTitle}>Okul Öncesi & Çocuk Dünyası</h2>
        </div>
        {cocukBooks.length === 0 ? (
          <p className={styles.emptyMessage}>Çocuk kitapları vitrinine henüz kitap eklenmedi.</p>
        ) : (
          <div className={styles.productGrid}>
            {cocukBooks.map((book) => (
              <div key={book.id} className={styles.productCard}>
                <div>
                  <div className={styles.bookIconContainer}>
                    {book.imageUrl ? (
                      <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
                    ) : (
                      <div className={styles.bookIcon}></div>
                    )}
                  </div>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookDescription}>{book.description || 'Açıklama belirtilmedi.'}</p>
                </div>
                <div className={styles.cardBottom}>
                  <span className={styles.priceTag}>{book.price} TL</span>
                  <div className={styles.actionButtons}>
                    <Link href={`/urun/${book.id}`} className={styles.buyButton}>
                      İncele
                    </Link>
                    <AddToCartButton product={book} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}