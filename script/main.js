var game = new Phaser.Game(1200, 768, Phaser.AUTO, 'game', 
				{preload: preload, create: create, update: update, render: render});
var spriteCharacter;


function preload(){
	game.load.spritesheet('character','assets/graphics/sprite_player.png', 30, 49, 18);
};



function create(){
	game.stage.backgroundColor = "#77A6B6";
	spriteCharacter = game.add.sprite(300, 200, 'character');

	let walkLeft = spriteCharacter.animations.add('walkLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
	let walkRight = spriteCharacter.animations.add('walkRight', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);

	spriteCharacter.frame = 14;
	// SCAALE

	//spriteCharacter.scale.setTo(rand, rand);
	game.physics.arcade.enable( spriteCharacter );
	spriteCharacter.body.velocity.x = 0;
	
	cursors = this.input.keyboard.createCursorKeys();
	jump = this.input.keyboard.addKey( Phaser.KeyCode.SPACEBAR);
	spriteCharacter.body.maxVelocity.set(10);

};

function update(){

	if (jump.isDown){
		spriteCharacter.body.velocity.y = -100;
		console.log(spriteCharacter.body.velocity.y); 
	}


	// RIGHT
	if ( cursors.right.isDown){
		spriteCharacter.body.x += 5;
		spriteCharacter.animations.play('walkRight', 16, true);
	}else if (cursors.right.isUp && cursors.left.isUp){
	 	spriteCharacter.animations.stop(null, true);
	}
	
	
	// LEFT
	if ( cursors.left.isDown){
		spriteCharacter.body.x -= 5;
		spriteCharacter.animations.play('walkLeft', 16, true);
	} else if (cursors.left.isUp && cursors.right.isUp){
		spriteCharacter.animations.stop(null, true);
	}
};




function render(){};