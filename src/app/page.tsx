import ImageAnnotation from "../components/imageAnnotation/ImageAnnotation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageAnnotation />
    </main>
  );
}
