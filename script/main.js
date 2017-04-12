var game = new Phaser.Game(1200, 768, Phaser.AUTO, 'game', 
				{preload: preload, create: create, update: update, render: render});



var spriteCharacter;
var map;
var score = 0;
var death = 0;
var jumpTimer = 0;
var gravityTimer = 0;

var compteurTest = 0;


function hitCoin(sprite, tile){

	map.removeTile(tile.x, tile.y);
	score++;
	console.log(score);
	return false;
}


function preload(){
	game.load.spritesheet('character','assets/graphics/sprite_player.png', 30, 49, 18);
	game.load.image('tiles', 'assets/graphics/sheet1.png');
	game.load.tilemap('gravity', 'assets/levels/gravity.json', null, Phaser.Tilemap.TILED_JSON);
};


function create(){
	map = game.add.tilemap('gravity');
	map.addTilesetImage('sheet1', 'tiles');
	layer = map.createLayer('Fond');
	blocBleu = map.createLayer('Gravity');

	console.log(layer);
    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
    console.log(map);
    map.setCollisionBetween(1, 15);
    map.setTileIndexCallback(10, hitCoin, this);


	game.stage.backgroundColor = "#77A6B6";
	spriteCharacter = game.add.sprite(50, 50, 'character');

	// Create ANIMATIONS
	let walkLeft = spriteCharacter.animations.add('walkLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8], 15, true);
	let walkRight = spriteCharacter.animations.add('walkRight', [9, 10, 11, 12, 13, 14, 15, 16, 17], 15, true);

	spriteCharacter.frame = 14;




	// --------- INIT PHYSICS ----------- \\
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 250;
	game.physics.arcade.enable( spriteCharacter, Phaser.Physics.ARCADE );


	// Velocity - Gravity
	spriteCharacter.anchor.setTo(0.5, 0.5);
	

	// ---------- KEYBOARD ------------- \\ 
	cursors = this.input.keyboard.createCursorKeys();
	jump = this.input.keyboard.addKey( Phaser.KeyCode.SPACEBAR);
	spriteCharacter.body.maxVelocity.set(500);

	leftButton = this.input.keyboard.addKey( Phaser.KeyCode.Q);
	downButton = this.input.keyboard.addKey( Phaser.KeyCode.S);
	upButton = this.input.keyboard.addKey( Phaser.KeyCode.Z);
	rightButton = this.input.keyboard.addKey( Phaser.KeyCode.D);
};

function callback(sprite, tile){
	// if(tile.index == 14){
	// 	console.log("Le cube bleu")
	// }

	if(spriteCharacter.body.blocked.up && game.time.now > gravityTimer){
 		game.physics.arcade.gravity.y *= -1;

 		console.log(game.physics.arcade.gravity.y);
 		gravityTimer = game.time.now + 3000;
 		compteurTest++;

 		spriteCharacter.angle = -180;
 		console.log(compteurTest);
	}
}

function update(){
	game.physics.arcade.collide(spriteCharacter, layer);

	game.physics.arcade.collide(spriteCharacter, blocBleu, callback());


	spriteCharacter.body.velocity.x = 0;

	


	if (cursors.left.isDown || leftButton.isDown)
    {
        //  Move to the left
        spriteCharacter.body.velocity.x = -200;

        spriteCharacter.animations.play('walkLeft');
    }
    else if (cursors.right.isDown || rightButton.isDown)
    {
        //  Move to the right
        spriteCharacter.body.velocity.x = 150;

        spriteCharacter.animations.play('walkRight');
    }
    else
    {
        //  Stand still
        spriteCharacter.animations.stop();
        
    }

    if ((jump.isDown || upButton.isDown) && spriteCharacter.body.onFloor() && game.time.now > jumpTimer)
    {
        spriteCharacter.body.velocity.y = -285;
        jumpTimer = game.time.now + 750;
    }else if (jump.isUp){
    	//spriteCharacter.body.velocity.y = 0;
    }
};




function render(){};