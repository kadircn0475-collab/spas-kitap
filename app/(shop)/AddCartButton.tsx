'use client';

import { useCart } from '../context/CartContext';
import styles from './page.module.css';

interface AddToCartButtonProps {
    product: {
        id: string;
        title: string;
        price: number;
        imageUrl?: string;
    };
}


export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const cartContext = useCart();

    if (!cartContext) {
        return null;
    }

    const { addToCart } = cartContext;

    const handleAdd = () => {
        addToCart({
            id: parseInt(product.id, 10) || Math.floor(Math.random() * 100000),
            title: product.title,
            price: product.price,
            quantity: 1,
        });


    };

    return (
        <button onClick={handleAdd} className={styles.addToCartButton}>
            Sepete Ekle
        </button>
    );
}