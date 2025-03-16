import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <main className={styles.center}>
        <h1 className="text-blue-500">Hello, World!</h1>
      </main>
    </Layout>
  );
}
