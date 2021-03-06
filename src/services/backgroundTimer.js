import BackgroundTimer from 'react-native-background-timer';
import Tts from 'react-native-tts';

const timer = (function() {
  this.timeDurations = ['90 seconds', '3 minutes'];
  this.counter = 0;

  return {
    start: exerciseString => {
      BackgroundTimer.runBackgroundTimer(() => {
        if (typeof this.timeDurations[this.counter] !== 'undefined') {
          Tts.getInitStatus().then(() => {
            Tts.stop();
            Tts.setDucking(true);
            Tts.speak(
              `Time for your next set. ${exerciseString}. ${
                this.timeDurations[this.counter]
              } has passed.`,
            );
            console.log(
              `Time for your next set. ${exerciseString}. ${
                this.timeDurations[this.counter]
              } has passed.`,
            );
            this.counter++;
          });
        }
      }, 1000 * 90);
    },
    stop: () => {
      BackgroundTimer.stopBackgroundTimer();
      this.counter = 0;
    },
  };
})();

export default timer;
