import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.useFakeTimers();
jest.mock('react-native-background-timer', () => {
  return {
    runBackgroundTimer: jest.fn(),
    stopBackgroundTimer: jest.fn(),
  };
});
jest.mock('react-native-tts', () => {
  return {
    getInitStatus: jest.fn(),
    setDucking: jest.fn(),
    speak: jest.fn(),
    stop: jest.fn(),
  };
});
