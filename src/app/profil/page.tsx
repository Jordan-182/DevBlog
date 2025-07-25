"use client";

import { useUserContext } from "@/context/UserContext";
import GoogleDeconnexion from "@/ui/GoogleDeconnexion";
import styles from "./profilPage.module.css";

export default function Profil() {
  const { user } = useUserContext();
  return (
    <section className={styles.container}>
      <h1>Profil</h1>
      <img src={user?.avatar} alt="Avatar" className={styles.avatar} />
      <h2>{user?.name}</h2>
      <GoogleDeconnexion />
    </section>
  );
}
