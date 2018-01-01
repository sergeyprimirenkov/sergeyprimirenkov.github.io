var left = false;
var right = false;
var jumpNow = false;

var play = {
  create: function() {
    // Here we create the game
    // Set the background color to blue
    game.stage.backgroundColor = '#3598db';

    // Start the Arcade physics system (for movements and collisions)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add the physics engine to all game objects
    game.world.enableBody = true;

    // Variable to store the arrow key pressed
    this.cursor = game.input.keyboard.createCursorKeys();

    // Create the player in the middle of the game
    this.player = game.add.sprite(70, 100, 'player');

    // Add gravity to make it fall
    this.player.body.gravity.y = 600;

    // Create 3 groups that will contain our objects
    this.walls = game.add.group();
    this.coins = game.add.group();
    this.enemies = game.add.group();

    // Design the level. x = wall, o = coin, ! = lava.
    var level = [
      'xxxxxxxxxxxxxxxxxxxxxx',
      '!         !          x',
      '!                 o  x',
      '!         o          x',
      '!                    x',
      '!     o   !    x     x',
      'xxxxxxxxxxxxxxxx!!!!!x',
    ];

    // Create the level by going through the array
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
          var wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
          this.walls.add(wall);
          wall.body.immovable = true;
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
          var coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
          this.coins.add(coin);
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
          var enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'enemy');
          this.enemies.add(enemy);
        }
      }
    }

    coinPickUp = game.add.audio('coinPickUp');
    jump = game.add.audio('jump');

    // Add the VirtualGamepad plugin to the game
    //this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

    // Add a joystick to the game (only one is allowed right now)
    //this.joystick = this.gamepad.addJoystick(100, 250, .7, 'gamepad');

    // Add a button to the game (only one is allowed right now)
    //this.button = this.gamepad.addButton(400, 250, .7, 'gamepad');

    score = 3;

    textStyle_Key = { font: "bold 14px sans-serif", fill: "#000", align: "center" };
    textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

    game.add.text(30, 10, "COINS", textStyle_Key);
    game.add.text(400, 10, "LEVEL", textStyle_Key);
    game.add.text(450, 5, "1", textStyle_Value);
    scoreTextValue = game.add.text(80, 5, score.toString(), textStyle_Value);

    this.add.button(5, 8, 'exit', this.exitGame, this);

    this.buttonLeft = this.add.button(30, 200, 'leftButton', null, this);
    this.buttonRight = this.add.button(110, 200, 'rightButton', null, this);
    this.buttonJump = this.add.button(410, 200, 'jumpArea', null, this);
    this.buttonLeft.alpha = .5;
    this.buttonRight.alpha = .5;
    this.buttonJump.alpha = .5;

    if (game.device.desktop) {
      this.buttonLeft.visible = false;
      this.buttonRight.visible = false;
      this.buttonJump.visible = false;
    }

    //this.buttonLeft.onInputDown.add(this.moveLeft, this);
    //this.buttonRight.onInputDown.add(this.moveRight, this);    
    //this.buttonJump.onInputDown.add(this.jump, this);

    this.buttonLeft.events.onInputDown.add(function() {
      left = true;
    });
    this.buttonLeft.events.onInputUp.add(function() {
      left = false;
    });

    this.buttonRight.events.onInputDown.add(function() {
      right = true;
    });
    this.buttonRight.events.onInputUp.add(function() {
      right = false;
    });

    this.buttonJump.events.onInputDown.add(function() {
      jumpNow = true;
    });
    this.buttonJump.events.onInputUp.add(function() {
      jumpNow = false;
    });

    // var graphics = game.add.graphics(0, 0);
    // graphics.lineStyle(3, 0xffffff);
    // graphics.moveTo(125,200);
    // graphics.lineTo(125, 170);

    // graphics.moveTo(250,200);
    // graphics.lineTo(250, 170);

    // window.graphics = graphics;
  },

  exitGame: function() {
    game.state.start('menu');
  },

  update: function() {
    // Make the player and the walls collide
    game.physics.arcade.collide(this.player, this.walls);

    // Call the 'takeCoin' function when the player takes a coin
    game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

    // Call the 'restart' function when the player touches the enemy
    game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    // Here we update the game 60 times per second

    // Move the player when an arrow key is pressed
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }

    if (left) {
      this.player.body.velocity.x = -200;
      this.buttonLeft.alpha = 1;
    } else {
      this.buttonLeft.alpha = .5;
    }

    if (right) {
      this.player.body.velocity.x = 200;
      this.buttonRight.alpha = 1;
    } else {
      this.buttonRight.alpha = .5;
    }

    if (jumpNow && this.player.body.touching.down) {
      this.player.body.velocity.y = -250;
      this.buttonJump.alpha = 1;
    }

    if (!jumpNow) {
      this.buttonJump.alpha = .5;
    }

    // Read joystick data to set ship's angle and acceleration
    //if (this.joystick.properties.inUse) {
    //  this.player.angle = this.joystick.properties.angle;
    //  this.player.lastAngle = this.player.angle;
    //} else {
    //  this.player.angle = this.player.lastAngle;
    //}
    //this.player.body.acceleration.x = 150 * this.joystick.properties.x;
    //this.player.body.acceleration.y = 14 * this.joystick.properties.y;

    // Jump!
    //if (this.button.isDown && this.player.body.touching.down) {
    // this.player.body.velocity.y = -250;
    //jump.play();
    //}

    // Make the player jump if he is touching the ground
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -250;
      //jump.play();
    }

    //game.input.onDown.add(this.jump, this);

    if (score === 0) {
      game.state.start('level2');
    }
  },

  // jumpNow: function() {
  //   if (this.player.body.touching.down) {
  //     this.player.body.velocity.y = -250;
  //   }
  // },

  // moveLeft: function() {
  //   this.player.body.velocity.x = -200;
  // },

  // moveRight: function() {
  //   this.player.body.velocity.x = 200;
  // },

  // Function to kill a coin
  takeCoin: function(player, coin) {
    coin.kill();
    coinPickUp.play();
    score--;
    scoreTextValue.text = score;
  },

  // Function to restart the game
  restart: function() {
    game.state.start('play');
  }
};







// Level 2

var level2 = {
  create: function() {
    // Here we create the game
    // Set the background color to blue
    game.stage.backgroundColor = '#3598db';

    // Start the Arcade physics system (for movements and collisions)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add the physics engine to all game objects
    game.world.enableBody = true;

    // Variable to store the arrow key pressed
    this.cursor = game.input.keyboard.createCursorKeys();

    // Create the player in the middle of the game
    this.player = game.add.sprite(70, 100, 'player');

    // Add gravity to make it fall
    this.player.body.gravity.y = 600;

    // Create 3 groups that will contain our objects
    this.walls = game.add.group();
    this.coins = game.add.group();
    this.enemies = game.add.group();

    // Design the level. x = wall, o = coin, ! = lava.
    var level = [
      'xxxxxxxxxxxxxxxxxxxxxx',
      '!                    x',
      '!                 o  x',
      '!         o          x',
      '!               o    x',
      '!         !    !x    x',
      'xxxxxxxxxxxxxxxx!!!!!x',
    ];

    // Create the level by going through the array
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
          var wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
          this.walls.add(wall);
          wall.body.immovable = true;
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
          var coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
          this.coins.add(coin);
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
          var enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'enemy');
          this.enemies.add(enemy);
        }
      }
    }

    coinPickUp = game.add.audio('coinPickUp');
    jump = game.add.audio('jump');

    // Add the VirtualGamepad plugin to the game
    //this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

    // Add a joystick to the game (only one is allowed right now)
    //this.joystick = this.gamepad.addJoystick(100, 250, .7, 'gamepad');

    // Add a button to the game (only one is allowed right now)
    //this.button = this.gamepad.addButton(400, 250, .7, 'gamepad');

    score = 3;

    textStyle_Key = { font: "bold 14px sans-serif", fill: "#000", align: "center" };
    textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

    game.add.text(30, 10, "COINS", textStyle_Key);
    game.add.text(400, 10, "LEVEL", textStyle_Key);
    game.add.text(450, 5, "1", textStyle_Value);
    scoreTextValue = game.add.text(80, 5, score.toString(), textStyle_Value);

    this.add.button(5, 8, 'exit', this.exitGame, this);

    this.buttonLeft = this.add.button(30, 200, 'leftButton', null, this);
    this.buttonRight = this.add.button(110, 200, 'rightButton', null, this);
    this.buttonJump = this.add.button(410, 200, 'jumpArea', null, this);
    this.buttonLeft.alpha = .5;
    this.buttonRight.alpha = .5;
    this.buttonJump.alpha = .5;

    if (game.device.desktop) {
      this.buttonLeft.visible = false;
      this.buttonRight.visible = false;
      this.buttonJump.visible = false;
    }
    //this.buttonLeft.onInputDown.add(this.moveLeft, this);
    //this.buttonRight.onInputDown.add(this.moveRight, this);    
    //this.buttonJump.onInputDown.add(this.jump, this);

    this.buttonLeft.events.onInputDown.add(function() {
      left = true;
    });
    this.buttonLeft.events.onInputUp.add(function() {
      left = false;
    });

    this.buttonRight.events.onInputDown.add(function() {
      right = true;
    });
    this.buttonRight.events.onInputUp.add(function() {
      right = false;
    });

    this.buttonJump.events.onInputDown.add(function() {
      jumpNow = true;
    });
    this.buttonJump.events.onInputUp.add(function() {
      jumpNow = false;
    });

    // var graphics = game.add.graphics(0, 0);
    // graphics.lineStyle(3, 0xffffff);
    // graphics.moveTo(125,200);
    // graphics.lineTo(125, 170);

    // graphics.moveTo(250,200);
    // graphics.lineTo(250, 170);

    // window.graphics = graphics;
  },

  exitGame: function() {
    game.state.start('menu');
  },

  update: function() {
    // Make the player and the walls collide
    game.physics.arcade.collide(this.player, this.walls);

    // Call the 'takeCoin' function when the player takes a coin
    game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

    // Call the 'restart' function when the player touches the enemy
    game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
    // Here we update the game 60 times per second

    // Move the player when an arrow key is pressed
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }

    if (left) {
      this.player.body.velocity.x = -200;
      this.buttonLeft.alpha = 1;
    } else {
      this.buttonLeft.alpha = .5;
    }

    if (right) {
      this.player.body.velocity.x = 200;
      this.buttonRight.alpha = 1;
    } else {
      this.buttonRight.alpha = .5;
    }

    if (jumpNow && this.player.body.touching.down) {
      this.player.body.velocity.y = -250;
      this.buttonJump.alpha = 1;
    }

    if (!jumpNow) {
      this.buttonJump.alpha = .5;
    }

    // Read joystick data to set ship's angle and acceleration
    //if (this.joystick.properties.inUse) {
    //  this.player.angle = this.joystick.properties.angle;
    //  this.player.lastAngle = this.player.angle;
    //} else {
    //  this.player.angle = this.player.lastAngle;
    //}
    //this.player.body.acceleration.x = 150 * this.joystick.properties.x;
    //this.player.body.acceleration.y = 14 * this.joystick.properties.y;

    // Jump!
    //if (this.button.isDown && this.player.body.touching.down) {
    // this.player.body.velocity.y = -250;
    //jump.play();
    //}

    // Make the player jump if he is touching the ground
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -250;
      //jump.play();
    }

    //game.input.onDown.add(this.jump, this);

    if (score === 0) {
      game.state.start('play');
    }
  },

  // jumpNow: function() {
  //   if (this.player.body.touching.down) {
  //     this.player.body.velocity.y = -250;
  //   }
  // },

  // moveLeft: function() {
  //   this.player.body.velocity.x = -200;
  // },

  // moveRight: function() {
  //   this.player.body.velocity.x = 200;
  // },

  // Function to kill a coin
  takeCoin: function(player, coin) {
    coin.kill();
    coinPickUp.play();
    score--;
    scoreTextValue.text = score;
  },

  // Function to restart the game
  restart: function() {
    game.state.start('play');
  }
};
