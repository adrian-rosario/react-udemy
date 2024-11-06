"use client"; // opt-in
import Link from "next/link";
import logoImage from "../../../assets/logo.png";
import styles from "./header-primary.module.css";
import Image from "next/image";
import HeaderBackground from "./header-background";
import { usePathname } from "next/navigation";
import NavLink from "./navLink";

export default function PrimaryHeader() {
  const path = usePathname();
  return (
    <>
      <HeaderBackground />

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image
              src={logoImage}
              alt='NexLevel Food logo'
              className={styles.logo}
              priority
            />
            NextLevel Food
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink linkPath='/meals'>Meals</NavLink>

              {/* <Link
                href='/meals'
                className={path === "/meals" ? styles.active : undefined}
              >
                Meals
              </Link> */}
            </li>

            {/* <li>
              <Link
                href='/meals/share'
                className={path === "/meals/share" ? styles.active : undefined}
              >
                Share a Meal
              </Link>
            </li> */}

            <li>
              <NavLink linkPath='/community'>Community</NavLink>

              {/* <Link
                href='/community'
                className={
                  path.startsWith("/community") ? styles.active : undefined
                }
              >
                Community
              </Link> */}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

/* 
<img
  src={logoImage.src}
  alt='NexLevel Food logo'
  className={styles.logo}
/>
*/
