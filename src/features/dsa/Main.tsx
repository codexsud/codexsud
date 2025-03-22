import ProblemList, { Problem } from "./components/ProblemList";

const sampleProblems: Problem[] = [
  {
    neetcode250: true,
    problem: "Concatenation of Array",
    pattern: "Arrays & Hashing",
    link: "concatenation-of-array/",
    video: "68isPRHgcFQ",
    difficulty: "Easy",
    code: "1929-concatenation-of-array",
  },
  {
    neetcode250: true,
    problem: "Two Sum",
    pattern: "Arrays & Hashing",
    link: "two-sum/",
    video: "KLlXCFG5TnA",
    difficulty: "Easy",
    code: "1-two-sum",
  },
  {
    neetcode250: true,
    problem: "Valid Parentheses",
    pattern: "Stack",
    link: "valid-parentheses/",
    video: "WTzjTskDFMg",
    difficulty: "Easy",
    code: "20-valid-parentheses",
  },
];

const Main = () => {
  return <ProblemList problems={sampleProblems} />;
};

export default Main;
