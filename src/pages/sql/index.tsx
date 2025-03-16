import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import Main from "./components/Main";
import { store } from "./store";

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
