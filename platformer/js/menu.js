var menu = {
  create: function() {
    // game.stage.backgroundColor = '#000';
    // this.text = { font: "bold 28px sans-serif", fill: "#fff" };
    // this.text.anchor.setTo(.5);
    // this.game.add.text(0, game.world.centerY, "PLATFORMER", this.text);

    // text = game.add.text(0, 0, "- PLATFORMER -");
    // text2 = game.add.text(0, 0 + 80, "TAP TO START");

    // text.font = 'Arial';
    // text.fontWeight = 'bold';
    // text.fontSize = 70;
    // text.fill = '#fff';

    // text2.font = 'Arial';
    // text2.fontWeight = 'normal';
    // text2.fontSize = 20;
    // text2.fill = '#fff';

    //text.anchor.set(0.5);
    // text.align = 'center';

    //text2.anchor.set(0.5);
    // text2.align = 'center';
    this.add.button(0, 0, 'menu', this.startGame, this);
  },

  startGame: function() {
    this.state.start('play');
  }
};
