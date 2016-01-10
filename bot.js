var five = require("johnny-five");
var Particle = require("particle-io");

var board = new five.Board({
  io: new Particle({
    token: '7ae40abd0f7c272888ca95b6740667febd1a29c8',
    deviceName: 'turtle_hoosier'
  })
});

board.on("ready", function() {
  console.log('ready');

  var rightWheel = new five.Motor({
    pins: { pwm: "D0", dir: "D4" },
    invertPWM: true
  });

  var leftWheel = new five.Motor({
    pins: { pwm: "D1", dir: "D5" },
    invertPWM: true
  });

  var rightArmServo = new five.Servo({
      pin: 'A4',
      startAt: 180
  });

  var leftArmServo = new five.Servo({
      pin: 'A5',
      startAt: 100
  });

  var speed = 150;

  function reverse() {
    leftWheel.rev(speed);
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function left() {
    leftWheel.rev(speed);
    rightWheel.fwd(speed);
  }

  function right() {
    leftWheel.fwd(speed);
    rightWheel.rev(speed);
  }

  function exit() {
    leftWheel.rev(0);
    rightWheel.rev(0);
    setTimeout(process.exit, 1000);
  }

  function openArms()
  {
      console.log('');
      console.log('open arms...');

      rightArmServo.to(180);
      leftArmServo.to(100);
  }

  function closeArms()
  {
      console.log('');
      console.log('close arms...');

      rightArmServo.to(120);
      leftArmServo.to(160);
  }

  var keyMap = {
    'up': forward,
    'down': reverse,
    'left': left,
    'right': right,
    'space': stop,
    'q': exit,
    'o': openArms,
    'c': closeArms
  };

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function(chunk, key) {
      if (!key || !keyMap[key.name]) return;

      keyMap[key.name]();
  });
});
