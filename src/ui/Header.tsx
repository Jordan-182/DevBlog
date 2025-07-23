"use client";

import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GoogleConnexion from "./GoogleConnexion";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className={styles.globalHeader}>
      <button onClick={handleClick} className={styles.button}>
        <Image
          src={isOpen ? "/cross.png" : "/menu.png"}
          alt="Menu"
          height={30}
          width={30}
        />
      </button>
      <h2 className={styles.title}>DevBlog</h2>
      <nav className={isOpen ? styles.globalNav : styles.none}>
        <ul className={styles.nav}>
          <li>
            <Link href={"/"} onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href={"https://jordanpieton.fr/"}
              target="blank"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link href={"/a-propos"} onClick={() => setIsOpen(false)}>
              A propos
            </Link>
          </li>
          <li>
            <Link href={"/blog"} onClick={() => setIsOpen(false)}>
              Blog
            </Link>
          </li>
          {!user && (
            <li className={styles.burgerLogin}>
              <GoogleConnexion />
            </li>
          )}
          {user?.status === "Admin" && (
            <li>
              <Link href={"/admin"} onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user ? (
        <div className={styles.avatar}>
          <Link href={"/profil"}>
            <img src={user.avatar} alt={user.name} height={50} width={50} />
          </Link>
        </div>
      ) : (
        <div className={styles.login}>
          <GoogleConnexion />
        </div>
      )}
    </header>
  );
}
