import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import initSqlJs from "sql.js";
import { updateDb } from "../features/appSlice";

const Main = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const db = useSelector((state) => state.app.db);

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

  const seed = [
    "drop table if exists pixar;",
    "create table pixar (id number, title varchar, director varchar, year number, length number);",
    "insert into pixar values(1,'Toy Story','John Lasseter',1995,81);",
    "insert into pixar values(2,'A Bugs Life','John Lasseter',1998,95);",
    "insert into pixar values(3,'Toy Story 2','John Lasseter',1999,93);",
    "insert into pixar values(4,'Monsters, Inc.','Pete Docter',2001,92);",
    "insert into pixar values(5,'Finding Nemo','Andrew Stanton',2003,107);",
    "insert into pixar values(6,'The Incredibles','Brad Bird',2004,116);",
    "insert into pixar values(7,'Cars','John Lasseter',2006,117);",
    "insert into pixar values(8,'Ratatouille','Brad Bird',2007,115);",
    "insert into pixar values(9,'WALL-E','Andrew Stanton',2008,104);",
    "insert into pixar values(10,'Up','Pete Docter',2009,101);",
    "insert into pixar values(11,'Toy Story 3','Lee Unkrich',2010,103);",
    "insert into pixar values(12,'Cars 2','John Lasseter',2011,120);",
    "insert into pixar values(13,'Brave','Brenda Chapman',2012,102);",
    "insert into pixar values(14,'Monsters University','Dan Scanlon',2013,110);",
  ];

  useEffect(() => {
    if (db && seed) {
      seed.forEach((sql) => {
        db.exec(sql);
      });

      const res = db.exec("SELECT * FROM pixar;");
      console.log(res);
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
