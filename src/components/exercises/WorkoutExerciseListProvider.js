import { connect } from 'react-redux'
import WorkoutExerciseList from './WorkoutExerciseList';

const mapStateToProps = (state, otherProps) => {
  return {
    exercises: state.exercises,
    workout: otherProps.workout
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleSelection: (selection, weight, workout, exercise) => {
      dispatch({selection, weight, workout, exercise, type: 'TOGGLE_EXERCISE' });
    }
  }
};

const WorkoutExerciseListProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutExerciseList);

export default WorkoutExerciseListProvider;
