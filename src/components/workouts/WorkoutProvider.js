import { connect } from 'react-redux'
import Workout from './Workout';

function getWorkout(workouts, activeWorkoutKey, navigation) {
  const passedKey = navigation.getParam('workoutKey');
  return workouts[activeWorkoutKey];
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, state.activeWorkoutKey, otherProps.navigation),
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
