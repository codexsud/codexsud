import Layout from "@theme/Layout";
import type { ReactNode } from "react";

export default function Home(): ReactNode {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <main className="center">
        <h1 className="text-blue-500">Hello, World!</h1>
      </main>
    </Layout>
  );
}
