// import { useRouter } from "next/router";
import styles from "./gatheringPage.module.css";
import Head from "next/head";

export default function GatheringDetail({
  image,
  title,
  description,
  address,
}) {
  return (
    <>
      <Head>
        <title>Gathering, detail view: {title}</title>
      </Head>
      <section className={styles.section}>
        <h1>Gathering: {title} </h1>
        <address>{address}</address>
        <h2>{title}</h2>
        <p>{description}</p>
        <img className={styles.detailImage} src={image} alt={title} />
      </section>
    </>
  );
}

/*
// temp...
<img
className={styles.detailImage}
src='http://localhost:3000/console-build.png'
alt='THE HEADING'
/>
*/
