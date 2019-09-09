import { connect } from 'react-redux'
import WorkoutExerciseList from './WorkoutExerciseList';

function getExercises(exercises, workout) {
  return exercises.filter(exercise => workout.exercises.includes(exercise.name));
}

const mapStateToProps = (state, otherProps) => {
  return {
    exercises: getExercises(state.exercises, otherProps.workout),
    workout: otherProps.workout,
    thing: state.theThing
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
