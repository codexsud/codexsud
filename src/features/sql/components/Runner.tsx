import React, { useState, useEffect } from "react";
import {
  Terminal,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronRight,
  Laptop2,
  ArrowRight,
  BookOpen,
} from "lucide-react";

interface Task {
  id: number;
  text: string;
  solution: string;
}

interface Exercise {
  lesson_no: number;
  name: string;
  description: string;
  tasks: Task[];
}

const exercises: Exercise[] = [
  {
    lesson_no: 1,
    name: "Introduction to SQL",
    description: `SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. In this introductory lesson, you'll learn about:

• Basic SQL syntax and structure
• How to retrieve data using SELECT statements
• Understanding database tables and relationships
• Best practices for writing SQL queries

Get ready to start your journey into the world of database management!`,
    tasks: [],
  },
  {
    lesson_no: 2,
    name: "Basics of SQL",
    description: `In this lesson, we'll explore fundamental SQL queries using a movie database. You'll learn how to:

• Select specific columns from a table
• Filter data using WHERE clauses
• Work with date ranges using BETWEEN
• Limit your query results

The exercises use a sample Pixar movies database to help you practice these concepts in a fun and engaging way.`,
    tasks: [
      {
        id: 1,
        text: "Find the movie name with id equal to 2",
        solution: "SELECT title FROM pixar WHERE id = 2",
      },
      {
        id: 2,
        text: "Find name and year of the movies released in the years between 2000 and 2010",
        solution:
          "select title, year from pixar where year between 2000 and 2010",
      },
      {
        id: 3,
        text: "Find name and year of movies not released in the years between 2000 and 2010",
        solution:
          "select title, year from pixar where year not between 2000 and 2010",
      },
      {
        id: 4,
        text: "Find the first 5 Pixar movies and their release year",
        solution: "select title, year from pixar limit 5",
      },
    ],
  },
];

const STORAGE_KEY = "sql-exercises-completed-tasks";

function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(
    exercises[0]
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  );
  const [expandedLessons, setExpandedLessons] = useState<
    Record<number, boolean>
  >({
    [exercises[0].lesson_no]: true,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleLesson = (lessonNo: number) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonNo]: !prev[lessonNo],
    }));
  };

  const checkSolution = () => {
    const currentTask = selectedExercise.tasks[currentTaskIndex];
    const db = (window as any).db;

    try {
      const userResult = db.exec(sqlQuery);
      const solutionResult = db.exec(currentTask.solution);

      const isMatch =
        JSON.stringify(userResult) === JSON.stringify(solutionResult);
      setIsCorrect(isMatch);

      if (isMatch) {
        setCompletedTasks((prev) => ({
          ...prev,
          [currentTask.id]: true,
        }));
      }

      setQueryResult(userResult[0]?.values || []);
    } catch (error) {
      setIsCorrect(false);
      setQueryResult([]);
    }
  };

  const handleNextTask = () => {
    if (currentTaskIndex < selectedExercise.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      setSqlQuery("");
      setIsCorrect(null);
      setQueryResult([]);
    }
  };

  const handleTaskClick = (index: number) => {
    setCurrentTaskIndex(index);
    setSqlQuery("");
    setIsCorrect(null);
    setQueryResult([]);
  };

  const currentTask = selectedExercise.tasks[currentTaskIndex];
  const isTaskCompleted = currentTask && completedTasks[currentTask.id];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <Laptop2 className="mx-auto mb-6 text-blue-600" size={64} />
          <h1 className="text-2xl font-bold mb-4">Desktop Only</h1>
          <p className="text-gray-600">
            This SQL learning platform is optimized for desktop use. Please
            access it on a larger screen for the best learning experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Terminal size={24} />
            SQL Exercises
          </h2>
        </div>
        <div className="p-4">
          {exercises.map((exercise) => (
            <div key={exercise.lesson_no}>
              <div
                className={`p-3 rounded-lg cursor-pointer mb-2 flex items-center justify-between ${
                  selectedExercise.lesson_no === exercise.lesson_no
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedExercise(exercise);
                  toggleLesson(exercise.lesson_no);
                }}
              >
                <div>
                  <h3 className="font-medium">Lesson {exercise.lesson_no}</h3>
                  <p className="text-sm text-gray-600">{exercise.name}</p>
                </div>
                {expandedLessons[exercise.lesson_no] ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </div>

              {/* Task list */}
              {expandedLessons[exercise.lesson_no] &&
                exercise.tasks.length > 0 && (
                  <div className="ml-4 space-y-2">
                    {exercise.tasks.map((task, index) => (
                      <div
                        key={task.id}
                        className={`flex items-center p-2 rounded cursor-pointer ${
                          currentTaskIndex === index &&
                          selectedExercise.lesson_no === exercise.lesson_no
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleTaskClick(index)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            completedTasks[task.id]
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          <CheckCircle2 size={20} />
                        </div>
                        <span className="text-sm truncate">
                          Task {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold">
                Lesson {selectedExercise.lesson_no}: {selectedExercise.name}
              </h2>
            </div>
            <div className="prose prose-blue max-w-none">
              {selectedExercise.description
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index} className="text-gray-700 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          {selectedExercise.tasks.length > 0 && (
            <>
              {/* Task Description */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Task {currentTaskIndex + 1} of {selectedExercise.tasks.length}
                </h3>
                <p className="text-gray-700">
                  {selectedExercise.tasks[currentTaskIndex].text}
                </p>
              </div>

              {/* SQL Input */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="query" className="text-lg font-semibold">
                    SQL Query
                  </label>
                  {isCorrect !== null && (
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="text-green-500" />
                      ) : (
                        <XCircle className="text-red-500" />
                      )}
                      <span
                        className={
                          isCorrect ? "text-green-500" : "text-red-500"
                        }
                      >
                        {isCorrect ? "Correct!" : "Try again"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <textarea
                    id="query"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="w-full p-4 border rounded-lg font-mono text-sm bg-gray-50"
                    rows={4}
                    placeholder="Enter your SQL query here..."
                  />
                  {!isTaskCompleted ? (
                    <button
                      onClick={checkSolution}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg h-fit hover:bg-blue-700 transition-colors"
                    >
                      Run Query
                    </button>
                  ) : (
                    currentTaskIndex < selectedExercise.tasks.length - 1 && (
                      <button
                        onClick={handleNextTask}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg h-fit hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        Next Task
                        <ArrowRight size={20} />
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Results Table */}
              {queryResult.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Query Results</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-200">
                        {queryResult.map((row, i) => (
                          <tr key={i}>
                            {Array.isArray(row) ? (
                              row.map((cell, j) => (
                                <td
                                  key={j}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  {cell}
                                </td>
                              ))
                            ) : (
                              <td className="px-6 py-4 whitespace-nowrap">
                                {row}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
