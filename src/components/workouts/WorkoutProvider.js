import { connect } from 'react-redux'
import Workout from './Workout';
import shortId from "shortid";

function getWorkout(workouts, otherProps) {
  const id = otherProps.navigation.getParam('workoutId', '');

  return workouts[1];

  if (id === '') {
    return {id: shortId.generate(), name: '', description: '', exercises: []};
  } else {
    return workouts.find((el) => el.id === id);
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, otherProps),
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
