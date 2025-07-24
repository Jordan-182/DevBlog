import AdminArticleList from "@/ui/AdminArticlesList";
import Link from "next/link";
import styles from "./adminPage.module.css";

export default async function Admin() {
  return (
    <section className={styles.page}>
      <h1>Panneau d&apos;administration</h1>
      <div>
        <Link href={"/admin/ajouter-article"} className={styles.addLink}>
          + Ajouter un article
        </Link>
      </div>
      <div>
        <h2>Liste d&apos;articles</h2>
        <AdminArticleList />
      </div>
    </section>
  );
}
