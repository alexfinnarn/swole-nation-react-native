import { WorkoutActions } from "./actions";

const initialState = {
  workouts: [
    {
      id: 1,
      name: 'Stronglifts A',
      description: 'Squats, Overhead Press, Deadlifts'
    },
    {
      id: 2,
      name: 'Stronglifts B',
      description: 'Squats, Bench Press, Barbell Row'
    }
  ],
  exercises: []
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

    default:
      return state;
  }
}

export default mainStore;
