var load = {
  preload: function() {
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, 'preloadBar');
    this.preloadBar.anchor.setTo(.5);

    this.load.setPreloadSprite(this.preloadBar, 0);

    //this.load.spritesheet('gamepad', '../assets/gamepad_spritesheet.png', 100, 100);
    game.load.image('menu', '../platformer/assets/menu2.png');
    game.load.image('player', '../platformer/assets/player2.png');
    game.load.image('wall', '../platformer/assets/wall2.png');
    game.load.image('pin', '../platformer/assets/pin.png');
    game.load.image('saw', '../platformer/assets/saw.png');
    game.load.image('platform', '../platformer/assets/platform.png');
    game.load.image('coin', '../platformer/assets/coin.png');
    game.load.image('pause', '../platformer/assets/pause.png');
    game.load.image('jumpButton', '../platformer/assets/jump2.png');
	game.load.image('leftButton', '../platformer/assets/left2.png');
	game.load.image('rightButton', '../platformer/assets/right2.png');
	game.load.image('leftButton', '../platformer/assets/left-arrow.png');
    game.load.tilemap('tilemap', '../platformer/assets/level.json', null, Phaser.Tilemap.TILED_JSON);  
    game.load.image('ch', '../platformer/assets/flag2.png');
    game.load.image('fin', '../platformer/assets/finish.png');
    game.load.image('mute', '../platformer/assets/mute.png');
    game.load.audio('music', '../platformer/assets/music.mp3');
    game.load.audio('jump', '../platformer/assets/jump.wav');
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
