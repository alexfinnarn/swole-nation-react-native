import { connect } from 'react-redux'
import Workout from './Workout';
import transform from '../../transformers/transform';

function getWorkout(workouts, activeWorkoutKey, navigation, transformer) {
  const passedKey = navigation.getParam('workoutKey');
  return transformer.key !== 'none' ? transform(workouts[activeWorkoutKey], transformer) : workouts[activeWorkoutKey];
}

const mapStateToProps = (state, otherProps) => {
  return {
    workout: getWorkout(state.workouts, state.activeWorkoutKey, otherProps.navigation, state.transformers[state.activeTransformerKey]),
    transformers: Object.keys(state.transformers).map((key) => state.transformers[key]),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handle: {
      update: (updatedWorkout, action, transformerKey) => {
        dispatch({workout: updatedWorkout, transformerKey, type: action });
      },
    }
  };
};

const WorkoutsListProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);

export default WorkoutsListProvider;
