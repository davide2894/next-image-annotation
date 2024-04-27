import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href="solution-built-with-libraries">
        Solution that uses libraries
      </Link>
      <Link className={styles.link} href="solution-built-from-scratch">
        Solution built from scratch
      </Link>
    </main>
  );
}
