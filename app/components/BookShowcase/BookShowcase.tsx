'use client'; // Etkileşim olduğu için en üste ekledik

import { MOCK_KITAPLAR } from '../../mockData';
import { useCart } from '../../context/CartContext'; // Sepet kancamızı çağırıyoruz
import styles from './BookShowcase.module.css';

interface ShowcaseProps {
  categoryTitle: string;
  categoryFilter: string;
}

export default function BookShowcase({ categoryTitle, categoryFilter }: ShowcaseProps) {
  const { addToCart } = useCart(); // Context içindeki sepete ekleme fonksiyonunu çekiyoruz

  const filtrelenmisKitaplar = MOCK_KITAPLAR.filter(
    (kitap) => kitap.category === categoryFilter
  );

  return (
    <section className={styles.showcaseSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{categoryTitle}</h2>
          <button className={styles.seeAll}>Tümünü Gör →</button>
        </div>

        <div className={styles.bookRow}>
          {filtrelenmisKitaplar.map((kitap) => (
            <div key={kitap.id} className={styles.bookCard}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.emoji}>{kitap.image}</span>
              </div>
              <div className={styles.bookInfo}>
                <span className={styles.categoryTag}>{kitap.category}</span>
                <h4 className={styles.bookTitle}>{kitap.title}</h4>
                <p className={styles.author}>{kitap.author}</p>
                <div className={styles.footerRow}>
                  <span className={styles.price}>{kitap.price} TL</span>
                  {/* Tıklanınca ilgili kitabı sepete gönderiyoruz */}
                  <button 
                    className={styles.addButton}
                    onClick={() => addToCart({ id: kitap.id, title: kitap.title, price: kitap.price })}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}