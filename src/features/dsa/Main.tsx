import ProblemList from "./components/ProblemList";
import { problems } from "./data";

const Main = () => {
  const filteredProblems = (type: "base" | "advanced") => {
    if (type === "base") {
      return problems.filter((problem) =>
        problem.hasOwnProperty("neetcode150")
      );
    } else {
      return problems;
    }
  };

  return <ProblemList problems={filteredProblems("base")} />;
};

export default Main;
