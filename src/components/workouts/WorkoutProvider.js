import { connect } from 'react-redux'
import Workout from './Workout';
import shortId from "shortid";

function getWorkout(workouts, activeWorkoutIndex) {
  // const id = otherProps.navigation.getParam('workoutId', '');
  // if (id === '') {
  //   return {id: shortId.generate(), name: '', description: '', exercises: []};
  // } else {
  //   return workouts.find((el) => el.id === id);
  // }

  return workouts[activeWorkoutIndex];
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, state.activeWorkoutIndex),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleUpdate: (updatedWorkout, action) => {
      dispatch({workout: updatedWorkout, type: action });
    }
  }
};

const WorkoutsListProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);

export default WorkoutsListProvider;
