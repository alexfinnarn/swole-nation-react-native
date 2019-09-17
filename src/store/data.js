import addFive from '../transformers/addFive'

const data = {
  workouts: {
    DQkECwYLCQQ: {
      name: "Stronglifts A",
      key: "DQkECwYLCQQ",
      description: "Squats, Bench Press, Barbell Row",
      exercises: [
        "Squats Warmup",
        "Squats",
        "Bench Press Warmup",
        "Bench Press",
        "Barbell Row Warmup",
        "Barbell Row"
      ]
    },
    DAwJBQEMAA0: {
      name: "Stronglifts B",
      key: "DAwJBQEMAA0",
      description: "Squats, Overhead Press, Deadlifts",
      exercises: [
        "Squats Warmup",
        "Squats",
        "Overhead Press Warmup",
        "Overhead Press",
        "Deadlifts Warmup",
        "Deadlifts"
      ]
    }
  },
  exercises: {
    BwEBDwoFBgQ: {
      name: "Squats Warmup",
      key: "BwEBDwoFBgQ",
      image: require("../../assets/squats.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 45.0
        },
        {
          "reps": 5,
          "weight": 45.0
        },
        {
          "reps": 5,
          "weight": 95.0
        },
        {
          "reps": 5,
          "weight": 135.0
        },
        {
          "reps": 3,
          "weight": 185.0
        },
        {
          "reps": 2,
          "weight": 205.0
        }
      ]
    },
    Bw0ECwAKBws: {
      name: "Squats",
      key: "Bw0ECwAKBws",
      image: require("../../assets/squats.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 230.0
        },
        {
          "reps": 5,
          "weight": 230.0
        },
        {
          "reps": 5,
          "weight": 230.0
        },
        {
          "reps": 5,
          "weight": 230.0
        },
        {
          "reps": 5,
          "weight": 230.0
        }
      ]
    },
    BwwBDAIJDgw: {
      name: "Bench Press Warmup",
      key: "BwwBDAIJDgw",
      image: require("../../assets/bench-press.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 45.0
        },
        {
          "reps": 5,
          "weight": 45.0
        },
        {
          "reps": 5,
          "weight": 95.0
        },
        {
          "reps": 3,
          "weight": 135.0
        }
      ]
    },
    DgcBCA8BCQo: {
      name: "Bench Press",
      key: "DgcBCA8BCQo",
      image: require("../../assets/bench-press.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 165.0
        },
        {
          "reps": 5,
          "weight": 165.0
        },
        {
          "reps": 5,
          "weight": 165.0
        },
        {
          "reps": 5,
          "weight": 165.0
        },
        {
          "reps": 5,
          "weight": 165.0
        }
      ]
    },
    DwcACw4PCgI: {
      name: "Shoulder Press Warmup",
      key: "DwcACw4PCgI",
      image: require("../../assets/shoulder-press.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 45.0
        },
        {
          "reps": 5,
          "weight": 45.0
        },
        {
          "reps": 3,
          "weight": 75.0
        }
      ]
    },
    CAMBAwsFBwQ: {
      name: "Shoulder Press",
      key: "CAMBAwsFBwQ",
      image: require("../../assets/shoulder-press.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 110.0
        },
        {
          "reps": 5,
          "weight": 110.0
        },
        {
          "reps": 5,
          "weight": 110.0
        },
        {
          "reps": 5,
          "weight": 110.0
        },
        {
          "reps": 5,
          "weight": 110.0
        }
      ]
    },
    BwYGAw0NDwo: {
      name: "Barbell Row Warmup",
      key: "BwYGAw0NDwo",
      image: require("../../assets/barbell-row.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 95.0
        }
      ]
    },
    BwQKAwYKAgA: {
      name: "Barbell Row",
      key: "BwQKAwYKAgA",
      image: require("../../assets/barbell-row.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 115.0
        },
        {
          "reps": 5,
          "weight": 115.0
        }
      ]
    },
    AQcNAQkBCwo: {
      name: "Deadlifts Warmup",
      key: "AQcNAQkBCwo",
      image: require("../../assets/deadlift.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 135.0
        },
        {
          "reps": 5,
          "weight": 185.0
        },
        {
          "reps": 5,
          "weight": 205.0
        }
      ]
    },
    DAYCDAQKAw4: {
      name: "Deadlifts",
      key: "DAYCDAQKAw4",
      image: require("../../assets/deadlift.gif"),
      instructions: "Do with a barbell",
      sets: [
        {
          "reps": 5,
          "weight": 225.0
        }
      ]
    }
  },
  sessions: {
    BwgFDQ8CCg8: {
      name: "new ...date",
      key: "BwgFDQ8CCg8",
      workoutKeys: [],
      exercises: []
    }
  },
  transformers: {
    none: {
      key: 'none',
      label: "N/A",
      callback: null
    },
    addFive: {
      key: 'addFive',
      label: "Exercises (+5 lbs)",
      callback: addFive
    }
  },
  activeWorkoutKey: "",
  activeExerciseKey: "",
  activeTransformerKey: "none",
};

export default data;
