import styles from "./aboutPage.module.css";

export default function About() {
  return (
    <section className={styles.container}>
      <h1>À propos</h1>

      <p>Bienvenue sur mon blog ! 👋</p>

      <p>
        Je m’appelle Jordan, je me forme pour devenir développeur fullstack en
        JavaScript et TypeScript. Ce blog me sert à partager mon parcours, mes
        projets, et les choses que j’apprends au fur et à mesure.
      </p>

      <p>
        J’écris sur des sujets qui me passionnent comme React, Next.js, Express,
        ou simplement sur des défis que je rencontre pendant ma formation.
      </p>

      <p>
        L’idée, c’est de garder une trace de mes progrès et peut-être d’aider
        d’autres développeurs qui débutent aussi. Merci de passer par ici et
        bonne lecture !
      </p>
    </section>
  );
}
