import {
  ChevronDown,
  ChevronRight,
  Code2,
  ExternalLink,
  PlayCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface Problem {
  neetcode250: boolean;
  problem: string;
  pattern: string;
  link: string;
  video: string;
  difficulty: string;
  code: string;
}

interface ProblemListProps {
  problems: Problem[];
}

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        colors[difficulty as keyof typeof colors]
      }`}
    >
      {difficulty}
    </span>
  );
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(
    new Set()
  );
  const [expandedPatterns, setExpandedPatterns] = useState<Set<string>>(
    new Set()
  );

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

  const groupedProblems = problems.reduce((acc, problem) => {
    if (!acc[problem.pattern]) {
      acc[problem.pattern] = [];
    }
    acc[problem.pattern].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  const totalProblems = problems.length;
  const completedCount = completedProblems.size;
  const overallProgress = (completedCount / totalProblems) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Overall Progress
        </h2>
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
                      className="p-4 hover:bg-gray-50 transition-colors"
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
                            {problem.neetcode250 && (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                Neetcode 250
                              </span>
                            )}
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
                          <a
                            href={`https://youtube.com/watch?v=${problem.video}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            title="Video Solution"
                          >
                            <PlayCircle className="w-5 h-5" />
                          </a>
                          <a
                            href={`https://github.com/neetcode-gh/leetcode/blob/main/typescript/${problem.code}.ts`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            title="Code Solution"
                          >
                            <Code2 className="w-5 h-5" />
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
