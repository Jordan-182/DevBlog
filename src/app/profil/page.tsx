import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import styles from "./profilPage.module.css";

export default function Profil() {
  return (
    <section className={styles.container}>
      <h1>Profil</h1>
      <GoogleDeconnexion />
    </section>
  );
}
