var levelSelect = {
  create: function() {
     game.stage.backgroundColor = '#000';

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
    this.add.button(50, 20, 'level1', this.startGame, this);
    this.add.button(230, 20, 'level2', this.startGame, this).alpha = .5;
    this.add.button(420, 20, 'level3', this.startGame, this).alpha = .5;
    this.add.button(610, 20, 'level4', this.startGame, this).alpha = .5;

    this.add.button(50, 180, 'level', this.startGame, this).alpha = .5;
    this.add.button(230, 180, 'level', this.startGame, this).alpha = .5;
    this.add.button(420, 180, 'level', this.startGame, this).alpha = .5;
    this.add.button(610, 180, 'level', this.startGame, this).alpha = .5;

    this.add.button(50, 340, 'level', this.startGame, this).alpha = .5;
    this.add.button(230, 340, 'level', this.startGame, this).alpha = .5;
    this.add.button(420, 340, 'level', this.startGame, this).alpha = .5;
    this.add.button(610, 340, 'level', this.startGame, this).alpha = .5;
  },

  startGame: function() {
    this.state.start('play');
  }
};