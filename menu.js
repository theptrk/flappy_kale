var menu_state = {
	create: function () {

		this.space 		= this.game.add.sprite(0, 0, 'space');

		// spacebar
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start, this);

		// defining variables
		var style = { font: "30px Helvetica", fill: "#fff" };
		var title = { font: "60px Helvetica", fill: "#fff" };
		var x = game.world.width/2, y = game.world.height/2;

		// add text
		var kn = this.game.add.text(x, 50, "Kalenauts", title);
		var hs = this.game.add.text(x, y-20, "High Score: " + highscore, style);
		var text = this.game.add.text(x,y+120, "Press space to start", style);
		kn.anchor.setTo(0.5, 0.5);
		text.anchor.setTo(0.5, 0.5);
		hs.anchor.setTo(0.5, 0.5);

		// if user already played
		if (score > 0) {
			// display score
			var score_label = this.game.add.text(x, y+20, "Latest Score: " + score, style);
			score_label.anchor.setTo(0.5, 0.5);
		}
	},

	start: function () {
		this.game.state.start('play');
	}
}