'use client'; 

import { useCart } from '../context/CartContext'; 
import styles from './cart.module.css'; 

export default function CartPage() {
  const { cart, removeFromCart, cartCount } = useCart();

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Alışveriş Sepetiniz ({cartCount} Ürün)</h1>

      {cart.length === 0 ? (
        <p>Sepetiniz şu anda bomboş. Kitap eklemeye ne dersiniz?</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          {cart.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fff'
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: '#111827' }}>{item.title}</h3>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  {item.price} TL x {item.quantity} Adet
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontWeight: '700', color: '#111827' }}>
                  {item.price * item.quantity} TL
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ 
                    backgroundColor: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}