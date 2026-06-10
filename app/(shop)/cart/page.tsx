'use client';
import { useCart } from '../../context/CartContext'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './cart.module.css'; 

export default function CartPage() {
  const { cart, removeFromCart, cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Toplam sepet tutarı hesabı
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>
        Alışveriş Sepetiniz ({cartCount} Kitap)
      </h1>

      {cart.length === 0 ? (
        /* SEPET BOŞKEN GÖRÜNECEK ALAN */
        <div className={styles.emptyCartCard}>
          <span className={styles.emptyIcon}></span>
          <h2 className={styles.emptyTitle}>Sepetiniz şu an boş</h2>
          <p className={styles.emptyText}>Spas Kitap'ın güncel eğitim kaynaklarını incelemek ister misiniz?</p>
          <Link href="/">
            <button className={styles.shopButton}>
              Alışverişe Başla
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartList}>
          
          {/* SEPETTEKİ KİTAPLARIN SATIRLARI */}
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItemRow}>
              <div className={styles.itemInfo}>
                <h3>{item.title}</h3>
                <div className={styles.itemMeta}>
                  <span>Adet: <strong>{item.quantity}</strong></span>
                  <span>•</span>
                  <span>Birim Fiyat: {item.price} TL</span>
                </div>
              </div>

              <div className={styles.rightSide}>
                <span className={styles.itemTotalPrice}>
                  {item.price * item.quantity} TL
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))}

          {/* SİPARİŞ ÖZETİ */}
          <div className={styles.summaryCard}>
            <div>
              <span className={styles.totalLabel}>Genel Toplam:</span>
              <div className={styles.totalAmount}>
                {totalPrice} TL
              </div>
            </div>
            <button className={styles.checkoutButton}>
              Alışverişi Tamamla
            </button>
          </div>

        </div>
      )}
    </div>
  );
}