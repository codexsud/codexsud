import sqlWasm from "@site/src/lib/wasm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import initSqlJs from "sql.js";
import seed from "./data/seed";
import { updateDb } from "./features/appSlice";

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
    return <div>SQL.js loaded successfully!</div>;
  }
};

export default Main;
