import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Yeni Sezon Eğitim Setleri</span>
          <h1 className={styles.title}>
            Geleceğinizi Şekillendiren  <br />
            <span className={styles.highlight}>En Doğru Kaynaklar</span>
          </h1>
          <p className={styles.description}>
            Sınavlara hazırlıkta, akademik yolculuğunuzda ihtiyacınız olan en güncel ve nitelikli eğitim kitapları, uzman kadroların anlatımıyla Spas Kitap'ta.
          </p>
          <div className={styles.actions}>
            <Link href="/kitaplar" className={styles.primaryButton}>
              Kitapları Keşfet
            </Link>
            <Link href="/hakkimizda" className={styles.secondaryButton}>
              Biz Kimiz?
            </Link>
          </div>
        </div>

        {/* Sağ Taraf*/}
        <div className={styles.imageArea}>
          <div className={styles.bookIllustration}>
            <div className={styles.decorativeCard}>
              <span></span>
              <h3>ÖABT & AGS</h3>
              <p>Matematik ve Genel Kültür Setleri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )




}