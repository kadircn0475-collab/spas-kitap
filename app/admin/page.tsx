// app/admin/page.tsx
import { db } from '@/app/lib/db';
import { createProduct, deleteProduct } from './actions';
import styles from './admin.module.css';

export default async function AdminPage() {
  // Seçim kutusunu (Select) doldurmak için güncel alt kategorileri çekiyoruz
  const subCategories = (await db.subCategory.findMany({
    orderBy: { name: 'asc' },
  })) as any[];

  // Sistemdeki mevcut tüm kitapları listelemek için çekiyoruz
  const allProducts = (await db.product.findMany({
    orderBy: { createdAt: 'desc' },
  })) as any[];

  return (
    <div className={styles.dashboardContainer}>
      {/* SOL PANEL - YÖNETİM MENÜSÜ */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <h2>Spas Kitap</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="/admin" className={styles.activeLink}> Kitap Yönetimi</a>
          <a href="/"> Ana Sayfaya Dön</a>
        </nav>
      </aside>

      {/* SAĞ PANEL - ANA İÇERİK ALANI */}
      <main className={styles.mainContent}>
        
        {/* ÜST KISIM: KİTAP EKLEME FORMU */}
        <section className={styles.formSection}>
          <h1 className={styles.sectionTitle}>Yeni Kitap Ekle</h1>
          <form action={createProduct} className={styles.adminForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Kitap Adı *</label>
                <input type="text" name="title" required placeholder="" />
              </div>
              <div className={styles.formGroup}>
                <label>Görsel URL</label>
                <input type="url" name="imageUrl" placeholder="" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Açıklama</label>
              <textarea name="description" placeholder="" />
            </div>

            <div className={styles.formRowQuad}>
              <div className={styles.formGroup}>
                <label>Fiyat (TL) *</label>
                <input type="number" step="0.01" name="price" required placeholder="0.00" />
              </div>
              <div className={styles.formGroup}>
                <label>Stok *</label>
                <input type="number" name="stock" required placeholder="0" />
              </div>
              <div className={styles.formGroup}>
                <label>Vitrin *</label>
                <select name="showcase" required>
                  <option value="tyt">TYT Vitrini</option>
                  <option value="ayt">AYT Vitrini</option>
                  <option value="cocuk">Çocuk Vitrini</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Alt Kategori *</label>
                <select name="subCategoryId" required>
                  <option value="">Seçiniz...</option>
                  {subCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className={styles.saveButton}>Kitabı Listeye Çak</button>
          </form>
        </section>

        {/* ALT KISIM: ÜRÜN LİSTESİ VE SİLME BUTONLARI */}
        <section className={styles.listSection}>
          <h2 className={styles.sectionTitle}>Vitrinlerdeki Mevcut Kitaplar ({allProducts.length})</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.proTable}>
              <thead>
                <tr>
                  <th>Görsel</th>
                  <th>Kitap Adı</th>
                  <th>Vitrin</th>
                  <th>Fiyat</th>
                  <th>Stok</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={styles.noData}>Henüz hiç kitap eklenmemiş.</td>
                  </tr>
                ) : (
                  allProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img 
                          src={product.imageUrl || 'https://placehold.co/40x60?text=Yok'} 
                          alt="" 
                          className={styles.tableThumb} 
                        />
                      </td>
                      <td className={styles.tableTitle}>{product.title}</td>
                      <td>
                        <span className={`${styles.badge} ${styles[product.showcase]}`}>
                          {product.showcase.toUpperCase()}
                        </span>
                      </td>
                      <td className={styles.tablePrice}>{product.price} TL</td>
                      <td>{product.stock} Adet</td>
                      <td>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button type="submit" className={styles.deleteBtn}>Sistemden Çıkar</button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}