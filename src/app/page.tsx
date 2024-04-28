import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Next Image Annotation</p>
      <Link className={styles.link} href="image-annotation">
        Start here
      </Link>
    </main>
  );
}
