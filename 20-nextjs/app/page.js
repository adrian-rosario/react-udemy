import Link from "next/link";
import SlideShow from "./components/slideshow/slideshow";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.slideshow}>
          <SlideShow />
        </div>
        <div>
          <div className={styles.hero}>
            <h1>Our selections:</h1>
          </div>
          <div className={styles.cta}>
            <Link href='/community'>Community</Link>
            <Link href='/meals'>Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <h1 style={{ color: "white", textAlign: "center" }}>
          Time to get started with NextJS!
        </h1>

        <section className={styles.section}>
          <h2>More details</h2>
          <p>We love food from all over the planet</p>
        </section>
      </main>
    </>
  );
}
