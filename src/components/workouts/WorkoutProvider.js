import { connect } from 'react-redux'
import Workout from './Workout';

function getWorkout(workouts, activeWorkoutIndex) {
  return workouts[activeWorkoutIndex];
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, state.activeWorkoutIndex),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      update: (updatedWorkout, action) => {
        dispatch({workout: updatedWorkout, type: action });
      },
      createSession: () => {
        dispatch({type: 'CREATE_SESSION' });
      }
    }
  };
};

const WorkoutsListProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);

export default WorkoutsListProvider;
