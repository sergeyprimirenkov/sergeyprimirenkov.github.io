var left = false;
var right = false;
var jumpNow = false;
var pause = false;
var jumptimer = 0;
var isCheck = false;

var play = {
  create: function() {
    // this.lightSystem = new LightSystem(256, 256, true);
    // this.lightSource1 = new LightSource(new Phaser.Point(50, 50), 500, 0.5, [1, 0, 0, 1]);

    // this.lightSystem.addLightSource(this.lightSource1);
    // this.lightSystem.updateUniforms();

    // this.lightSource1.position.x = 100;
    // this.lightSource1.position.y = 200;
    // this.lightSystem.updateUniforms();

    //this.lightSystem.updateCamera(new Phaser.Point(this.X, this.Y));

    game.time.advancedTiming = true;

    game.stage.backgroundColor = '#182022';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('wall', 'wall');
    this.map.addTilesetImage('pin', 'pin');
    this.map.addTilesetImage('saw', 'saw');
    this.groundLayer = this.map.createLayer('GroundLayer');
    this.map.setCollisionBetween(1, 50, true, 'GroundLayer');
    this.groundLayer.resizeWorld();

    game.world.enableBody = true;

    this.pins = this.game.add.group();
    this.pins.enableBody = true;
    this.map.createFromObjects('pins', 2, 'pin', 0, true, false, this.pins);

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.map.createFromObjects('platforms', 3, 'platform', 0, true, false, this.platforms);

    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);

    this.saws = this.game.add.group();
    this.saws.enableBody = true;
    this.map.createFromObjects('saws', 4, 'saw', 0, true, false, this.saws);

    this.saws.setAll('anchor.x', .5);
    this.saws.setAll('anchor.y', .5);

    // emitter = this.game.add.emitter(0, 0, 100);
    // emitter.makeParticles('blob');
    // emitter.x = 160;
    // emitter.y = 160;
    // emitter.lifespan = 500;
    // emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
    // emitter.minParticleSpeed = new Phaser.Point(-200, -50);

    var platformTween = this.add.tween(this.platforms)
    platformTween.to({ x: 100 }, 1500, Phaser.Easing.Linear.None, true, 0, -1, true);

    var r = this.add.tween(this.pins);
    r.to({ y: 20 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.cursor = game.input.keyboard.createCursorKeys();

    this.player = game.add.sprite(70, 100, 'player');
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
    this.player.body.gravity.y = 600;
    if (isCheck) {
      this.player.x = 1535;
      this.player.y = 330;
    }

    this.checkpoint = game.add.sprite(1530, 323, 'ch');
    this.checkpoint.alpha = .3;

    this.finish = game.add.sprite(1568, 480, 'fin');

    this.buttonPause = this.add.button(10, 10, 'pause', this.pauseGame, this);
    this.buttonPause.inputEnabled = true;

    this.buttonMute = this.add.button(766, 10, 'mute', this.toggleMute, this);
    this.buttonMute.inputEnabled = true;

    if (!this.game.sound.mute) {
      this.buttonMute.alpha = .5;
    } else {
      this.buttonMute.alpha = 1;
    }

    this.buttonPause.events.onInputUp.add(function() {
      this.game.paused = true;
      this.buttonPause.alpha = 1;
    }, this);

    this.game.input.onDown.add(function() {
      if (this.game.paused) this.game.paused = false;
      this.buttonPause.alpha = .5;
    }, this);

    this.buttonLeft = this.add.button(30, 435, 'leftButton', null, this);
    this.buttonRight = this.add.button(100, 435, 'rightButton', null, this);
    this.buttonJump = this.add.button(710, 450, 'jumpButton', null, this);

    this.buttonPause.alpha = .5;
    this.buttonMute.alpha = .5;
    this.buttonLeft.alpha = .5;
    this.buttonRight.alpha = .5;
    this.buttonJump.alpha = .5;

    this.buttonPause.fixedToCamera = true;
    this.buttonMute.fixedToCamera = true;
    this.buttonLeft.fixedToCamera = true;
    this.buttonRight.fixedToCamera = true;
    this.buttonJump.fixedToCamera = true;

    if (game.device.desktop) {
      this.buttonLeft.visible = false;
      this.buttonRight.visible = false;
      this.buttonJump.visible = false;
    }

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

    function unpauseGame() {
      game.paused = false;
      //buttonPause.alpha = .5;
    }

    music = game.add.audio('music', 1, true);
    music.loop = true;
    if (!music.isPlaying) {
      music.play();
    }

    jump = game.add.audio('jump');
  },

  toggleMute: function() {
    if (!this.game.sound.mute) {
      this.game.sound.mute = true;
      this.buttonMute.alpha = 1;
    } else {
      this.game.sound.mute = false;
      this.buttonMute.alpha = .5;
    }
  },

  update: function() {
    // this.lightSystem.updateUniforms();
    // this.lightSystem.update();

    //emitter.emitParticle();

    this.saws.forEach(function(saw) {
      saw.angle += 5;
    });

    game.physics.arcade.collide(this.player, this.groundLayer);

    game.physics.arcade.overlap(this.player, this.pins, this.restart, null, this);

    game.physics.arcade.overlap(this.player, this.saws, this.restart, null, this);

    game.physics.arcade.collide(this.player, this.platforms, this.platformSep, null, this);

    game.physics.arcade.overlap(this.player, this.checkpoint, this.check, null, this);

    game.physics.arcade.overlap(this.player, this.finish, this.finishGame, null, this);

    if (this.player.locked) {
      if (this.player.body.right < this.player.lockedTo.body.x || this.player.body.x > this.player.lockedTo.body.right) {
        this.player.locked = false;
        this.player.lockedTo = null;
      } else {
        this.player.x += this.player.lockedTo.deltaX;
        this.player.y += this.player.lockedTo.deltaY;
      }
    }

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

    if (jumpNow && (this.player.body.onFloor() || this.player.body.touching.down)) {
      this.player.body.velocity.y = -250;
      this.buttonJump.alpha = 1;
      jump.play();
    }

    if (!jumpNow) {
      this.buttonJump.alpha = .5;
    }

    if (this.cursor.up.isDown && (this.player.body.onFloor() || this.player.body.touching.down)) {
      jumptimer = 1;
      this.player.body.velocity.y = -150;
      jump.play();
    } else if (this.cursor.up.isDown && (jumptimer != 0)) {
      if (jumptimer > 5) {
        jumptimer = 0;
      } else {
        jumptimer++;
        this.player.body.velocity.y = -250;
      }
    } else if (jumptimer != 0) {
      jumptimer = 0;
    }
  },

  finishGame: function(player, pins) {
    isCheck = false;
    music.stop();
    game.state.start('play');
  },

  restart: function() {
    if (isCheck) {
      this.player.x = 200;
    }
    music.stop();
    game.state.start('play');
  },

  platformSep: function(player, platforms) {
    if (!this.player.locked) {
      this.player.locked = true;
      this.player.lockedTo = platforms;
      platforms.playerLocked = true;
      this.player.body.velocity.x = 0;
    }
  },

  check: function() {
    this.checkpoint.alpha = 1;
    isCheck = true;
  },

  render: function() {
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
  }
};
