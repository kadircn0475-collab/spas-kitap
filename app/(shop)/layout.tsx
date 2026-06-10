import Navbar from "./Navbar/Navbar";
import { CartProvider } from "../context/CartContext"; 
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      {children}
    </CartProvider>
  );
}

//aslında ana yer burası burada sergileniyor tüm yapı 