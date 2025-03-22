import { Problem } from "../types";

export const filterProblems = (
  problems: Problem[],
  collection: string
): Problem[] => {
  switch (collection) {
    case "alpha":
      return problems;
    case "Blind75":
      return problems.filter((problem) => problem.blind75);
    case "Neetcode150":
      return problems.filter((problem) => problem.neetcode150);
    case "Neetcode250":
      return problems.filter((problem) => problem.neetcode250);
    case "Grind75":
      return problems.filter((problem) => problem.grind75);
    case "Grind169":
      return problems.filter((problem) => problem.grind169);
    default:
      return problems;
  }
};
