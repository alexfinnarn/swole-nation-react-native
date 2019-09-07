import { connect } from 'react-redux'
import AddExercise from './AddExercise';

function getWorkout(workouts, otherProps) {
  const id = otherProps.navigation.getParam('workoutId', 0);

  return workouts[1];

  if (id === 0) {
    return {id: 0, name: '', description: '', exercises: []};
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

const AddExerciseProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExercise);

export default AddExerciseProvider;
