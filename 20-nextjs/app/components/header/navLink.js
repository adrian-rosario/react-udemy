"use client"; // opt-in

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navLink.module.css";

export default function NavLink({ linkPath, children }) {
  const path = usePathname();
  return (
    <>
      <Link
        href={linkPath}
        className={
          path.startsWith(linkPath)
            ? `${styles.link} ${styles.active}`
            : styles.link
        }
      >
        {children}
      </Link>
    </>
  );
}
