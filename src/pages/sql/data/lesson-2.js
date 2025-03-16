const exercise = {
  id: 2,
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
};

export default exercise;
