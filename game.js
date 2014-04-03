var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// GLOBAL VARIABLE!!!
// there shouldnt be a global var in the DOM
var score 		= 0;
var highscore 	= 0;

// the states
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

// start with load state
game.state.start('load')