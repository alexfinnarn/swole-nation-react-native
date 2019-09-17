import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.useFakeTimers();
jest.mock("react-native-background-timer", () => {});
// jest.mock("react-navigation", () => {});
