var game = new Phaser.Game(1200, 768, Phaser.AUTO, 'game', 
				{preload: preload, create: create, update: update, render: render});
var spriteCharacter;


function preload(){
	game.load.spritesheet('character','assets/graphics/sprite_player.png', 30, 49, 18);
};



function create(){
	game.stage.backgroundColor = "#77A6B6";
	spriteCharacter = game.add.sprite(300, 200, 'character');

	let walkLeft = spriteCharacter.animations.add('walkLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8], 15, true);
	let walkRight = spriteCharacter.animations.add('walkRight', [9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);

	spriteCharacter.frame = 14;
	// SCAALE

	// --------- INIT PHYSICS ----------- \\
	game.physics.arcade.enable( spriteCharacter, Phaser.Physics.ARCADE );

	// Velocity - Gravity
	game.physics.arcade.gravity.y = 500;
	
	cursors = this.input.keyboard.createCursorKeys();
	jump = this.input.keyboard.addKey( Phaser.KeyCode.SPACEBAR);
	spriteCharacter.body.maxVelocity.set(150);

	leftButton = this.input.keyboard.addKey( Phaser.KeyCode.Q);
	downButton = this.input.keyboard.addKey( Phaser.KeyCode.S);
	upButton = this.input.keyboard.addKey( Phaser.KeyCode.Z);
	rightButton = this.input.keyboard.addKey( Phaser.KeyCode.D);
};

function update(){
	spriteCharacter.body.velocity.x = 0;

	if (cursors.left.isDown)
    {
        //  Move to the left
        spriteCharacter.body.velocity.x = -200;

        spriteCharacter.animations.play('walkLeft');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        spriteCharacter.body.velocity.x = 150;

        spriteCharacter.animations.play('walkRight');
    }
    else
    {
        //  Stand still
        spriteCharacter.animations.stop();
        //spriteCharacter.frame = 4;
    }

    if (jump.isDown)
    {
        spriteCharacter.body.velocity.y = -250;
    }else if (jump.isUp){
    	spriteCharacter.body.velocity.y = 0;
    }
};




function render(){};