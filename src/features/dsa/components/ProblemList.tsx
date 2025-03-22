import {
  ChevronDown,
  ChevronDownSquare,
  ChevronRight,
  ChevronUpSquare,
  ExternalLink,
  Filter,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Collection, Problem, ProblemListProps } from "../types";
import DifficultyBadge from "./DifficultyBadge";
import ProgressBar from "./ProgressBar";

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(
    new Set()
  );
  const [expandedPatterns, setExpandedPatterns] = useState<Set<string>>(
    new Set(problems.map((p) => p.pattern))
  );
  const [selectedCollection, setSelectedCollection] =
    useState<Collection>("alpha");

  useEffect(() => {
    const saved = localStorage.getItem("completedProblems");
    if (saved) {
      setCompletedProblems(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "completedProblems",
      JSON.stringify(Array.from(completedProblems))
    );
  }, [completedProblems]);

  const toggleProblemCompletion = (code: string) => {
    setCompletedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const togglePattern = (pattern: string) => {
    setExpandedPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(pattern)) {
        next.delete(pattern);
      } else {
        next.add(pattern);
      }
      return next;
    });
  };

  const toggleAllPatterns = () => {
    const allPatterns = Array.from(new Set(problems.map((p) => p.pattern)));
    setExpandedPatterns((prev) => {
      if (prev.size === allPatterns.length) {
        return new Set();
      }
      return new Set(allPatterns);
    });
  };

  const filterProblems = (problems: Problem[]): Problem[] => {
    switch (selectedCollection) {
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

  const filteredProblems = filterProblems(problems);
  const groupedProblems = filteredProblems.reduce((acc, problem) => {
    if (!acc[problem.pattern]) {
      acc[problem.pattern] = [];
    }
    acc[problem.pattern].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  const totalProblems = filteredProblems.length;
  const completedCount = [...completedProblems].filter((code) =>
    filteredProblems.some((p) => p.code === code)
  ).length;
  const overallProgress =
    totalProblems === 0 ? 0 : (completedCount / totalProblems) * 100;
  const allPatternsExpanded =
    expandedPatterns.size === Object.keys(groupedProblems).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Overall Progress
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={selectedCollection}
                onChange={(e) =>
                  setSelectedCollection(e.target.value as Collection)
                }
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <option value="alpha">alpha</option>
                <option value="All">All Problems</option>
                <option value="Blind75">Blind 75</option>
                <option value="Neetcode150">Neetcode 150</option>
                <option value="Neetcode250">Neetcode 250</option>
                <option value="Grind75">Grind 75</option>
                <option value="Grind169">Grind 169</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={toggleAllPatterns}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {allPatternsExpanded ? (
                <>
                  <ChevronUpSquare className="w-5 h-5" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDownSquare className="w-5 h-5" />
                  Expand All
                </>
              )}
            </button>
          </div>
        </div>
        <ProgressBar progress={overallProgress} />
        <p className="mt-2 text-sm text-gray-600">
          {completedCount} of {totalProblems} problems completed (
          {Math.round(overallProgress)}%)
        </p>
      </div>

      {Object.entries(groupedProblems).map(([pattern, patternProblems]) => {
        const patternCompletedCount = patternProblems.filter((p) =>
          completedProblems.has(p.code)
        ).length;
        const patternProgress =
          (patternCompletedCount / patternProblems.length) * 100;
        const isExpanded = expandedPatterns.has(pattern);

        return (
          <div key={pattern} className="mb-8">
            <div
              className="flex items-center cursor-pointer mb-4"
              onClick={() => togglePattern(pattern)}
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500 mr-2" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
              )}
              <h2 className="text-2xl font-bold text-gray-900 flex-1">
                {pattern}
              </h2>
              <span className="text-sm text-gray-600 mr-4">
                {patternCompletedCount} / {patternProblems.length}
              </span>
            </div>
            <ProgressBar progress={patternProgress} />

            {isExpanded && (
              <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
                <ul className="divide-y divide-gray-200">
                  {patternProblems.map((problem) => (
                    <li
                      key={problem.code}
                      className="p-4 hover:bg-gray-50 transition-colors list-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 flex items-center">
                          <input
                            type="checkbox"
                            checked={completedProblems.has(problem.code)}
                            onChange={() =>
                              toggleProblemCompletion(problem.code)
                            }
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-4"
                          />
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-medium text-gray-900">
                              {problem.problem}
                            </h3>
                            <DifficultyBadge difficulty={problem.difficulty} />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <a
                            href={`https://leetcode.com/problems/${problem.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            title="Problem"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProblemList;
