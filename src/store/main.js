import { WorkoutActions } from "./actions";

const initialState = {
  workouts: [
    {
      id: 1,
      name: 'Stronglifts A',
      description: 'Squats, Overhead Press, Deadlifts',
      exercises: []
    },
    {
      id: 2,
      name: 'Stronglifts B',
      description: 'Squats, Bench Press, Barbell Row',
      exercises: []
    }
  ],
  exercises: [
    {
      id: 1,
      name: 'Squats Warmup',
      instructions: 'Do with a barbell',
      sets: [
        { reps: 5, weight: 45.0 },
        { reps: 5, weight: 45.0 },
      ]
    },
    {
      id: 2,
      name: 'Squats',
      instructions: 'Do with a barbell',
      sets: [
        { reps: 5, weight: 200.0 },
        { reps: 5, weight: 200.0 },
        { reps: 5, weight: 200.0 },
        { reps: 5, weight: 200.0 },
        { reps: 5, weight: 200.0 },
      ]
    },
  ]
};

function mainStore(state = initialState, action) {
  let newWorkouts = [];

  switch (action.type) {

    case WorkoutActions.CREATE_WORKOUT:
      let newWorkout = action.workout;
      newWorkout.id = state.workouts.length + 1;
      return Object.assign({}, state, {workouts: [...state.workouts, action.workout]});

    case WorkoutActions.UPDATE_WORKOUT:
      newWorkouts = state.workouts.map((workout) => {
        if (workout.id === action.workout.id) {
          return action.workout;
        }
        return workout;
      });
      return Object.assign({}, state, {workouts: newWorkouts});

    case WorkoutActions.DELETE_WORKOUT:
      newWorkouts = state.workouts.filter((workout) => {
        if (workout.id !== action.workout.id) {
          return workout;
        }
      });
      return Object.assign({}, state, {workouts: newWorkouts});

    case WorkoutActions.TOGGLE_EXERCISE:
      newWorkouts = state.workouts.map((workout) => {
        if (workout.id === action.workout.id) {
          let tempWorkout = action.workout;
          if (action.selection) {
            tempWorkout.exercises.push(action.exercise.name)
          } else {
            tempWorkout.exercises = tempWorkout.exercises.filter((exercise) => {
              return exercise !== action.exercise.name;
            });
          }
          return tempWorkout;
        }
        return workout;
      });

      return Object.assign({}, state, {workouts: newWorkouts});

    default:
      return state;
  }
}

export default mainStore;
