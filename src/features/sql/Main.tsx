import sqlWasm from "@site/src/lib/wasm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import initSqlJs from "sql.js";
import Sidebar from "./components/Sidebar";
import seed from "./data/seed";
import { updateDb } from "./slices/appSlice";

const Main = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const db = useSelector((state: { app: { db: any } }) => state.app.db);

  useEffect(() => {
    let isMounted = true;
    const loadSqlJs = async () => {
      try {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        if (isMounted) {
          dispatch(updateDb(new SQL.Database()));
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      }
    };
    loadSqlJs();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (db && seed) {
      seed.forEach((sql) => {
        db.exec(sql);
      });
    }
  }, [db, seed]);

  if (error) {
    return <div>{error.message}</div>;
  } else if (!db) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <h1 className="text-blue-500">SQL.js loaded successfully.</h1>
      </div>
    );
  }
};

export default Main;
