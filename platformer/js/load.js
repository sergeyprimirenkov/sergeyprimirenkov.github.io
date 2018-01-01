var load = {
  preload: function() {
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'preloadBar');
    this.preloadBar.anchor.setTo(.5);

    this.load.setPreloadSprite(this.preloadBar, 0);

    //this.load.spritesheet('gamepad', '../assets/gamepad_spritesheet.png', 100, 100);
    game.load.image('menu', '../assets/menu2.png');
    game.load.image('player', '../assets/player2.png');
    game.load.image('wall', '../assets/wall2.png');
    game.load.image('pin', '../assets/pin.png');
    game.load.image('saw', '../assets/saw.png');
    game.load.image('platform', '../assets/platform.png');
    game.load.image('coin', '../assets/coin.png');
    game.load.image('pause', '../assets/pause.png');
    game.load.image('jumpButton', '../assets/jump2.png');
	game.load.image('leftButton', '../assets/left2.png');
	game.load.image('rightButton', '../assets/right2.png');
	game.load.image('leftButton', '../assets/left-arrow.png');
    game.load.tilemap('tilemap', '../assets/level.json', null, Phaser.Tilemap.TILED_JSON);  
    game.load.image('ch', '../assets/flag2.png');
    game.load.image('fin', '../assets/finish.png');
    game.load.image('mute', '../assets/mute.png');
    game.load.audio('music', '../assets/music.mp3');
    game.load.audio('jump', '../assets/jump.wav');
    //game.load.physics("physicsData", "assets/saw_physics.json");
    //game.load.image('enemy', '../assets/enemy.png');
    //game.load.image('bg', '../assets/bg.jpg');
    //game.load.image('level', '../assets/level.png');
    //game.load.image('level1', '../assets/level1.png');
    //game.load.image('level2', '../assets/level2.png');
    //game.load.image('level3', '../assets/level3.png');
    //game.load.image('level4', '../assets/level4.png');
    //game.load.image('blob', '../assets/blob.png');
  },

  create: function() {
    game.state.start('menu');
  }
};
