import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <section className={styles.homePage}>
      <Image
        src={"/heroLogo.png"}
        alt="Illustration développeur web"
        height={200}
        width={200}
      />
      <div className={styles.heroSection}>
        <h1>Bienvenue sur mon blog de développeur</h1>
        <p>
          Je partage ici mon parcours, mes projets, des astuces de dev, et des
          réflexions autour du code et du métier.
        </p>
        <p>
          J’expérimente, je me plante parfois, j’apprends tous les jours. Viens
          lire un article ou deux !
        </p>
      </div>
      <Link href="/blog" className={styles.cta}>
        Voir les articles →
      </Link>
    </section>
  );
}
