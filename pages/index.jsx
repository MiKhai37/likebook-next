import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useUser } from '../lib/auth/hooks';


export default function Home() {
  const user = useUser()

  return (
    <div className={styles.container}>
      <Head>
        <title>Likebook</title>
        <meta name="description" content="Facebook clone" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Likebook
        </h1>

        <p className={styles.description}>
          Facebook Clone
        </p>

        <p className={styles.description}>
          <Link href='/auth/register'>
            <a>
              Register
            </a>
          </Link>
          {' '}
          <Link href='/auth/login'>
            <a>
              Log In
            </a>
          </Link>
        </p>

        <div className={styles.grid}>
          <a href="https://www.mongodb.com/" className={styles.card}>
            <h2>MongoDB</h2>
            <p>Non Relational Database</p>
          </a>

          <a href="https://nextjs.org/" className={styles.card}>
            <h2>React with NextJS</h2>
            <p>Front End</p>
          </a>

          <a href="https://nodejs.org/" className={styles.card}>
            <h2>NodeJS</h2>
            <p>Back End</p>
          </a>

          <a
            href="https://vercel.com"
            className={styles.card}
          >
            <h2>Vercel</h2>
            <p>
              Deployment
            </p>
          </a>

          <a
            href="http://www.passportjs.org/"
            className={styles.card}
          >
            <h2>PassportJS</h2>
            <p>
              Authentication
            </p>
          </a>

          <a
            href="https://ant.design/"
            className={styles.card}
          >
            <h2>Ant Design</h2>
            <p>
              React UI Library
            </p>
          </a>

        </div>
      </main>
    </div>
  )
}
