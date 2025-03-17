import Main from "@site/src/features/sql/Main";
import { store } from "@site/src/features/sql/store";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

export default function SQL(): ReactNode {
  return (
    <Layout title="SQL">
      <main className="center">
        <Provider store={store}>
          <Main />
        </Provider>
      </main>
    </Layout>
  );
}
