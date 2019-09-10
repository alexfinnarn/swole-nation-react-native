import { connect } from 'react-redux'
import Workout from './Workout';
import shortId from "shortid";

function getWorkout(workouts, activeWorkoutId) {
  // const id = otherProps.navigation.getParam('workoutId', '');
  // if (id === '') {
  //   return {id: shortId.generate(), name: '', description: '', exercises: []};
  // } else {
  //   return workouts.find((el) => el.id === id);
  // }

  return workouts.find((workout => workout.id === activeWorkoutId));
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, state.activeWorkoutId),
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
