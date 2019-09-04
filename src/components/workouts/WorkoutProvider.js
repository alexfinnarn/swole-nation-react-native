import { connect } from 'react-redux'
import Workout from './Workout';

function getWorkout(workouts, otherProps) {
  const id = otherProps.navigation.getParam('workoutId', 0);

  if (id === 0) {
    return {id: 0, name: '', description: '', exercises: []};
  } else {
    return workouts.find((el) => el.id === id);
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, otherProps)
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
