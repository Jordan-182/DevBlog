import AdminArticleList from "@/ui/AdminArticlesList";
import styles from "./adminPage.module.css";

export default async function Admin() {
  return (
    <section className={styles.page}>
      <h1>Panneau d&apos;administration</h1>
      <div>
        <h2>Liste d&apos;articles</h2>
        <AdminArticleList />
      </div>
    </section>
  );
}
