import BackgroundTimer from 'react-native-background-timer';
import * as Speech from 'expo-speech';

const timer = (function() {
  this.timeDurations = [
    '90 seconds',
    '3 minutes'
  ];
  this.counter = 0;

  return {
    start: () => {
      BackgroundTimer.runBackgroundTimer(() => {
        if (typeof this.timeDurations[this.counter] !== 'undefined') {
          // Speech.speak('do the thing, mayne. Fool! ' + seconds + ' have passed', {pitch: 2});
          console.log(`Time for your next set. ${this.timeDurations[this.counter]} has passed.`);
        }
        this.counter++;
      }, (5000));
    },
    stop: () => {
      BackgroundTimer.stopBackgroundTimer();
      this.counter = 0;
    }
  }
}());

export default timer;
