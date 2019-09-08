import {WorkoutActions} from "./actions";

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
      exercises: [
        'Squats Warmup',
        'Squats'
      ]
    }
  ],
  exercises: [
    {
      id: 1,
      name: 'Squats Warmup',
      instructions: 'Do with a barbell',
      sets: [
        {key: 1, reps: 5, weight: 45.0},
        {key: 2, reps: 5, weight: 45.0},
      ]
    },
    {
      id: 2,
      name: 'Squats',
      instructions: 'Do with a barbell',
      sets: [
        {key: 1, reps: 5, weight: 200.0},
        {key: 2, reps: 5, weight: 200.0},
        {key: 3, reps: 5, weight: 200.0},
        {key: 4, reps: 5, weight: 200.0},
        {key: 5, reps: 5, weight: 200.0},
      ]
    },
  ],
  sessions: [
    {
      id: 1,
      name: new Date(Date.now()).toLocaleString('en-US'),
      workoutIds: [1],
      exercises: [
        {
          shortName: 'SQ',
          sets: '5x5',
          weight: 200.0
        },
        {
          shortName: 'OH',
          sets: '5x5',
          weight: 100.0
        },
        {
          shortName: 'DL',
          sets: '5x5',
          weight: 200.0
        },
      ]
    },
    {
      id: 2,
      name: 'Next Workout',
      workoutIds: [2],
      exercises: [
        {
          shortName: 'SQ',
          sets: '5x5',
          weight: 205.0
        },
        {
          shortName: 'BP',
          sets: '5x5',
          weight: 160.0
        },
        {
          shortName: 'BR',
          sets: '5x5',
          weight: 90.0
        },
      ]
    }
  ],
  tempExerciseList: []
};

function mainStore(state = initialState, action) {
  let newWorkouts = [];

  switch (action.type) {

    case WorkoutActions.CREATE_WORKOUT:
      let newWorkout = action.workout;
      newWorkout.id = state.workouts.length + 1;
      newWorkout.exercises = state.tempExerciseList;
      return Object.assign({}, state, {workouts: [...state.workouts, newWorkout]});

    case WorkoutActions.UPDATE_WORKOUT:
      newWorkouts = state.workouts.map((workout) => {
        if (workout.id === action.workout.id) {
          action.workout.exercises = state.tempExerciseList;
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
      let tempExerciseList = state.tempExerciseList;
      if (action.selection) {
        tempExerciseList.push(action.exercise.name);
      } else {
        tempExerciseList = tempExerciseList.filter((exercise) => {
          return exercise !== action.exercise.name;
        });
      }

      return Object.assign({}, state, {tempExerciseList});

    // newWorkouts = state.workouts.map((workout) => {
    //   if (workout.id === action.workout.id) {
    //     let tempWorkout = action.workout;
    //     if (action.selection) {
    //       tempWorkout.exercises.push(action.exercise.name);
    //     } else {
    //       tempWorkout.exercises = tempWorkout.exercises.filter((exercise) => {
    //         return exercise !== action.exercise.name;
    //       });
    //     }
    //     return tempWorkout;
    //   }
    //   return workout;
    // });
    // return Object.assign({}, state, {workouts: newWorkouts});

    default:
      return state;
  }
}

export default mainStore;
