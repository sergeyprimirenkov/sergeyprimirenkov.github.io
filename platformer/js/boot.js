var boot = {
  init: function() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    // if (game.device.desktop) {
    //   this.game.scale.setGameSize(800, 450);
    // }
  },

  preload: function() {
    this.load.image('logo', '../assets/logo.png');
    this.load.image('preloadBar', '../assets/progressBar.png');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#fff';
    setTimeout(game.state.start('load'), 30000);
  }
};
