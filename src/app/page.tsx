import { authOptions } from "@/lib/authOptions";
import GoogleConnexion from "@/ui/GoogleConnexion";
import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import { getServerSession } from "next-auth";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p>Non connecté</p>
          <GoogleConnexion />
        </main>
      </div>
    );
  }
  if (session) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p>Connecté</p>
          <GoogleDeconnexion />
        </main>
      </div>
    );
  }
}
