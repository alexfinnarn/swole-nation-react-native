import { WorkoutActions } from "./actions";

const initialWorkouts = [
  {
    name: 'Stronglifts A',
    description: 'Squats, Overhead Press, Deadlifts'
  },
  {
    name: 'Stronglifts B',
    description: 'Squats, Bench Press, Barbell Row'
  }
];

export default function Workouts(state = initialWorkouts, action) {
  switch (action.type) {
    case WorkoutActions.UPDATE_WORKOUT:
      return state.map((workout, index) => {
        if (workout.name === action.workout.name) {
          return Object.assign({}, action.workout)
        }
        return workout;
      });
    default:
      return state;
  }
}
