// Type definitions for feature - DSA

export type Collection =
  | "All"
  | "alpha"
  | "Blind75"
  | "Neetcode150"
  | "Neetcode250"
  | "Grind75"
  | "Grind169";

export interface Problem {
  neetcode250?: boolean;
  neetcode150?: boolean;
  blind75?: boolean;
  grind75?: boolean;
  grind169?: boolean;
  problem: string;
  pattern: string;
  link: string;
  video: string;
  difficulty: string;
  code: string;
}

export interface ProblemListProps {
  problems: Problem[];
}
