## Background And Motivation

> Note: The current app is only meant to be run on Android and is not tested on iOS but may work on that platform.

Do you currently use more than one app to track your exercise regiment? Are you tired of those developers modifying pricing/subscription structures or placing ads in between you and getting fit? Do app updates lose features that you came to rely on in your workouts?

I sure know I answered yes to all those questions. Swole Nation is an open-source fitness application that aims to help you manage and track your fitness progression. I am combining ideas and features I used across multiple exercise apps into one ad-free app that suits my exercise needs. 

To start out, the alpha version of Swole Nation will only include workouts from the "Texas Method", a grouping of five compound barbell exercises structured in a way to build strength quickly and effectively. In future versions, more workouts will be added as well as more features related to tracking your progress throughout your fitness journey.

Features:
- Workouts that help you build strength quickly
- Animations of proper form for each exercise
- Background voice reminders of when to do the next set
- Timers for set and workout duration
- Weight plate calculator for barbell exercises
- Ways to customize and transform your workouts

## Roadmap

As Swole Nation is still in early alpha testing, the roadmap will be hard to pin down until more testing is done. I can tell you that I want to expand the app to include exercises that have a count-down timer (e.g. planks) and work better with exercises that only have one set.

The other goal is to place workouts, exercises, and sessions in an online repository so that users can add and edit their workouts in the cloud on a laptop, if they choose to do so.

Ideally, this app will replace all the exercise apps I currently use, so any missing features will be included until I reach that holy grail.

## Develop Locally

Like a normal React Native app, you can run this app locally via the scripts in `package.json`. It is a good idea to install Android Studio and use the emulators that come with that IDE. Otherwise, you will have to plug in a device to build the app. More instructions at: https://facebook.github.io/react-native/docs/running-on-device

```bash
# Build and run app on Android device
npm run android

# Start up metro bundler.
npm run start
```

### Troubleshooting

I have run into some issues while developing this app, and it's worth it to list out the workarounds. 

You might encounter some issues while the bundler is building the app. Sometimes, you can clean/restart/build the project in Android Studio and it will resolve the issue. At other points, I've had to uninstall the app via `adb` to remove all traces of the app. At other times, I've had hanging processes take up the development server's ports.

```bash
# Uninstall whole app.
adb uninstall "com.swolenation"

# Rebuild and start app.
npm run android

# Kill any hanging processes if you have to.
sudo ps -ax | grep node
sudo ps -ax | grep react

sudo kill -9 <pid-of-ghost-process>
```

You might also have issues while developing parts of the app associated with `react-navigation`. Fast refresh does not seem to reload the navbar and so a manual reload of the app is needed before those changes will reflect.

## Run Tests

This app uses Jest for the unit tests and eventually Detox for the E2E, functional tests. Collaborators to the system under test are dealt with via mocks instead of stubs. You can debate me on this, but that's how I set it up :shrug.

```bash
# Run tests in interactive watch mode.
npm run test:watch

# run tests and generate coverage report
npm run coverage
```

I usually update snapshots from the interactive watch mode, since I find that method handy, rather than run a separate command for that. The interactive mode also allows you to only run failed tests as well as the whole test suite and modififed testing files.

## Wiki

There is more detailed developer information and a user guide within the wiki: https://github.com/alexfinnarn/swole-nation-react-native/wiki 

