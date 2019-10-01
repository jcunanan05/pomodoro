const defaultState = {
  timer: null,
  isTimerPlaying: false,
  isBreak: false,
  // isLongBreak: false,
  timerSession: {
    secondsRemaining: 0,
    buzzer: '/assets/2buzzer.mp3',
    id: 'main',
    cyclesCompleted: 0,
    types: {
      MAIN: 'main',
      SHORT_BREAK: 'shortBreak',
      // LONG_BREAK: 'longBreak',
    },
  },
  timerList: {
    main: {
      seconds: 3,
      buzzer: '/assets/2buzzer.mp3',
    },
    shortBreak: {
      seconds: 2,
      buzzer: '/assets/1buzzer.mp3',
    },
    // longBreak: {
    //   seconds: 900,
    //   buzzer: '/assets/1buzzer.mp3',
    // },
  },
};

export default defaultState;
