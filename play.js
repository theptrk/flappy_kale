var play_state = {
	// note no more preload
	create: function () {
		this.space 		= this.game.add.sprite(0, 0, 'space');

		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);

		this.pipes = game.add.group();
		this.pipes.createMultiple(20, 'pipe');
		this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);

		this.bird = this.game.add.sprite(100, 245, 'bird');
		this.bird.body.gravity.y = 1000;
		this.bird.anchor.setTo(-0.2, 0.5);

		// GLOBAL OBJECT, easily cheatable
		score = 0;
		var style = { font: "30px Helvetica", fill: "#fff" };
		this.label_score = this.game.add.text(20, 20, "0", style);
		this.jump_sound  = this.game.add.audio('jump');
		this.bump_sound  = this.game.add.audio('bump');
		this.one_up 	 = this.game.add.audio('1up');
	},

	update: function () {
		if (this.bird.inWorld === false) {
			this.restart_game();
		}

		if (this.bird.angle < 20) {
			this.bird.angle += 1;
		}

		this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);

	},

	jump: function () {
		if (this.bird.alive === false)
			return;

		this.bird.body.velocity.y = -350;
		this.game.add.tween(this.bird).to({angle: -20}, 100).start();
		this.jump_sound.play();
	},

	hit_pipe: function () {
		if (this.bird.alive === false) {
			return;
		};

		this.bird.alive = false;
		this.game.time.events.remove(this.timer);

		this.pipes.forEachAlive(function (p) {
			p.body.velocity.x = 0;
		}, this);

	},

	restart_game: function () {
		this.game.time.events.remove(this.timer);
		if (highscore < score) {
			this.one_up.play();
		} else {
			this.bump_sound.play();
		}
		highscore = highscore < score ? score: highscore
		// we go back to menu after every death
		this.game.state.start('menu');
	},

	add_one_pipe: function (x, y) {
		var pipe = this.pipes.getFirstDead();
		pipe.reset(x, y);
		pipe.body.velocity.x = -200;
		pipe.outOfBoundsKill = true;
	},

	add_row_of_pipes: function () {
		var hole = Math.floor(Math.random()*5)+1;

		for (var i = 0; i < 8; i++) {
			if (i !== hole && i !== hole +1) {
				this.add_one_pipe(400, i*60+10);
			};
		};
		// GLOBAL VARIABLE BRO!!!
		score += 1;
		this.label_score.content = score; //content == .text()
	}
}