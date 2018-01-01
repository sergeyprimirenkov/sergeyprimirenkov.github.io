var game = new Phaser.Game(800, 500, Phaser.CANVAS);

game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);
//game.state.add("levelSelect", levelSelect);
//game.state.add('level2', level2);

game.state.start('boot');
