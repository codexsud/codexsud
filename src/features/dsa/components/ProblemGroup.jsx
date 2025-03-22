import {
    ChevronDown,
    ChevronRight,
    ExternalLink
} from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";
import ProgressBar from "./ProgressBar";
  

const ProblemGroup = ({
  completedProblems,
  setCompletedProblems,
  expandedPatterns,
  setExpandedPatterns,
  groupedProblems,
}) => {
  const togglePattern = (pattern) => {
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

  const toggleProblemCompletion = (code) => {
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

  return Object.entries(groupedProblems).map(([pattern, patternProblems]) => {
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
          <h2 className="text-2xl font-bold text-gray-900 flex-1">{pattern}</h2>
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
                        onChange={() => toggleProblemCompletion(problem.code)}
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
  });
};

export default ProblemGroup;
