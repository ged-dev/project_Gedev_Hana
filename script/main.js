var game = new Phaser.Game(1200, 768, Phaser.AUTO, 'game', 
				{preload: preload, create: create, update: update, render: render});

function preload(){
	game.load.spritesheet('character','assets/graphics/sprite_player.png', 64);
	// game.load.image('grass','img/1.png');
	// game.load.image('dirt','img/2.png');
	// game.load.image('spikes','img/3.png');
};

function create(){
	game.stage.backgroundColor = "#77A6B6";
};

function update(){};


function render(){};