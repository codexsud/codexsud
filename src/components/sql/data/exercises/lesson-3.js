const exercise = {
  id: 3,
  tasks: [
    {
      id: 1,
      text: "Find all the movies directed by John Lasseter",
      solution: "SELECT title FROM pixar where director = 'John Lasseter'",
    },
    {
      id: 2,
      text: "Find all the movies (and director) not directed by John Lasseter",
      solution:
        "select title, director from pixar where director <> 'John Lasseter'",
    },
  ],
};

export default exercise;
