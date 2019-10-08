import {connect} from 'react-redux';
import WorkoutExerciseList from './WorkoutExerciseList';

function getExercises(exercises, workout) {
  let exers = Object.keys(exercises).map(exerciseKey => {
    if (workout.exercises.includes(exercises[exerciseKey].name)) {
      return exercises[exerciseKey];
    }
  });

  return exers.filter(ex => typeof ex !== 'undefined');
}

const mapStateToProps = (state, otherProps) => {
  return {
    exercises: getExercises(state.exercises, otherProps.workout),
    workout: otherProps.workout,
    thing: state.theThing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      setActiveExerciseKey: key => {
        dispatch({key, type: 'SET_ACTIVE_EXERCISE'});
      },
    },
  };
};

const WorkoutExerciseListProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkoutExerciseList);

export default WorkoutExerciseListProvider;
