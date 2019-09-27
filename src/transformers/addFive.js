export default function addFive(session) {
  session.exercises = session.exercises.map((exercise) => {
    if (exercise.name.includes('Warmup')) {
      return exercise;
    }

    exercise.sets = exercise.sets.map(set => {
      set.weight = set.weight + 5;
      return set;
    });
    return exercise;
  });

  return session;
}
