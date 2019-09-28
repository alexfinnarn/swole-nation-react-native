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
      name: "Overhead Press Warmup",
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
      name: "Overhead Press",
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
        },
        {
          "reps": 5,
          "weight": 115.0
        },
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
      completed: 18,
      duration: 15,
      key: "BwgFDQ8CCg8",
      name: "Thu Sep 26 12:19:14 2019",
      progress: [
        5,
        1,
      ],
      workoutName: "Stronglifts A",
      exercises: [
        {
          image: require("../../assets/squats.gif"),
          instructions: "Do with a barbell",
          key: "BwEBDwoFBgQ",
          name: "Squats Warmup",
          sets: [
            {
              completed: true,
              reps: 5,
              weight: 45,
            },
            {
              completed: true,
              reps: 5,
              weight: 45,
            },
            {
              completed: true,
              reps: 5,
              weight: 95,
            },
            {
              completed: true,
              reps: 5,
              weight: 135,
            },
            {
              completed: true,
              reps: 3,
              weight: 185,
            },
            {
              completed: true,
              reps: 2,
              weight: 205,
            },
          ],
        },
        {
          image: require("../../assets/squats.gif"),
          instructions: "Do with a barbell",
          key: "Bw0ECwAKBws",
          name: "Squats",
          sets: [
            {
              completed: false,
              reps: 5,
              weight: 230,
            },
            {
              completed: true,
              reps: 5,
              weight: 230,
            },
            {
              completed: true,
              reps: 5,
              weight: 230,
            },
            {
              completed: false,
              reps: 5,
              weight: 230,
            },
            {
              completed: true,
              reps: 5,
              weight: 230,
            },
          ],
        },
        {
          image: require("../../assets/bench-press.gif"),
          instructions: "Do with a barbell",
          key: "BwwBDAIJDgw",
          name: "Bench Press Warmup",
          sets: [
            {
              completed: true,
              reps: 5,
              weight: 45,
            },
            {
              completed: true,
              reps: 5,
              weight: 45,
            },
            {
              completed: true,
              reps: 5,
              weight: 95,
            },
            {
              completed: true,
              reps: 3,
              weight: 135,
            },
          ],
        },
        {
          image: require("../../assets/bench-press.gif"),
          instructions: "Do with a barbell",
          key: "DgcBCA8BCQo",
          name: "Bench Press",
          sets: [
            {
              completed: true,
              reps: 5,
              weight: 165,
            },
            {
              completed: false,
              reps: 5,
              weight: 165,
            },
            {
              completed: true,
              reps: 5,
              weight: 165,
            },
            {
              completed: true,
              reps: 5,
              weight: 165,
            },
            {
              completed: true,
              reps: 5,
              weight: 165,
            },
          ],
        },
        {
          image: require("../../assets/barbell-row.gif"),
          instructions: "Do with a barbell",
          key: "BwYGAw0NDwo",
          name: "Barbell Row Warmup",
          sets: [
            {
              completed: true,
              reps: 5,
              weight: 95,
            },
          ],
        },
        {
          image: require("../../assets/barbell-row.gif"),
          instructions: "Do with a barbell",
          key: "BwQKAwYKAgA",
          name: "Barbell Row",
          sets: [
            {
              completed: false,
              reps: 5,
              weight: 115,
            },
            {
              completed: false,
              reps: 5,
              weight: 115,
            },
          ],
        },
      ],
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
      label: "Main Exercises (+5 lbs)",
      callback: addFive
    }
  },
  activeWorkoutKey: "",
  activeExerciseKey: "",
  activeSessionKey: "",
  activeTransformerKey: "none",
  theSetting: "",
  theThing: "",
};

export default data;
