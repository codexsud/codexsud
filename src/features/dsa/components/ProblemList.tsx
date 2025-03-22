import { ChevronDownSquare, ChevronUpSquare, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Collection, Problem, ProblemListProps } from "../types";
import ProgressBar from "./ProgressBar";
import ProblemGroup from "./ProblemGroup";
import { filterProblems } from "../utils";

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

  const toggleAllPatterns = () => {
    const allPatterns = Array.from(new Set(problems.map((p) => p.pattern)));
    setExpandedPatterns((prev) => {
      if (prev.size === allPatterns.length) {
        return new Set();
      }
      return new Set(allPatterns);
    });
  };

  const filteredProblems = filterProblems(problems, selectedCollection);
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
      <ProblemGroup
        completedProblems={completedProblems}
        setCompletedProblems={setCompletedProblems}
        expandedPatterns={expandedPatterns}
        setExpandedPatterns={setExpandedPatterns}
        groupedProblems={groupedProblems}
      />
    </div>
  );
};

export default ProblemList;
