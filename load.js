var load_state = {
	preload: function () {
		this.game.stage.backgroundColor = '#71c5cf';
		this.game.load.image('bird', 'assets/kale50redgone.png');
		this.game.load.image('pipe', 'assets/mean_star.png');
		this.game.load.image('space', 'assets/space.jpeg');
		this.game.load.audio('jump', 'assets/mariojump.wav');
		this.game.load.audio('bump', 'assets/mariodie.wav');
		this.game.load.audio('1up', 'assets/mario1up.wav');
	},

	create: function () {
		// change state to 'menu' at this point
		this.game.state.start('menu')
	}
};