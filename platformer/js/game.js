// var targetWidth = 640;
// var targetHeight = 960;
// var deviceRatio = window.innerWidth / window.innerHeight;
// var newRatio = (targetHeight / targetWidth) * deviceRatio;
// var newWidth = targetWidth * newRatio;
// var newHeight = targetHeight;

// var game = new Phaser.Game(newWidth, newHeight, Phaser.CANVAS);

var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);
//game.state.add("levelSelect", levelSelect);
//game.state.add('level2', level2);

game.state.start('boot');