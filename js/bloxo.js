function setGameStage(){

	var element = document.getElementById("startButton");
	element.parentNode.removeChild(element);

	bloxo();
}


function bloxo()
{
	var game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'gameStage', { preload: preload, create: create, update: update });
	var prevHole = 3;

	function preload() {
		game.load.image('bloxoDown','../bloxo/assets/images/bloxoDown.png');
		game.load.image('bloxoUp','../bloxo/assets/images/bloxoUp.png');
		game.load.image('wall','../bloxo/assets/images/platform.png',400,200);

		var space;
		var esc;
		var player;
		var walls;
		var score;
	}

	function create() {

		//Canvas With a White Bacground and Physics is Created
		game.stage.backgroundColor = "#ffffff";
		game.physics.startSystem(Phaser.Physics.ARCADE);


		//Sets the initial Score.
		score = 0;	
		scoreLbl = game.add.text(1050, 30, "Score: " + score, { font: '30px Roboto', fill: '#aaaaaa' });

		//Sets how fast the tiles move
		tileSpeed = -300;

		tileWidth = game.cache.getImage('wall').width;
		tileHeight = game.cache.getImage('wall').height;;

		//Keys for User Input are created
		space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

		//Adds Bloxo to the game as a sprite.
		player = game.add.sprite(200,200,'bloxoDown');
		player.scale.setTo(0.6, 0.6);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		player.body.immovable = true;

		//Walls Group is created
		walls = game.add.physicsGroup();
		walls.createMultiple(50, 'wall');
		walls.enableBody = true;

		//  Stop the following keys from propagating up to the browser
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ESC,]);

		//Unpausing Function
		window.onkeydown = function(event) 
	    {  
	        if (esc.onDown && (esc.timeDown > 2000))
	        {  	
	        	if(game.paused)
	        	{  
	            	game.paused = !game.paused;
	            	pauseLbl.destroy();
	           	}   
	        } 
	    }

	    //Add an initial platform
		addWall();
 
		//Add a platform every 3 seconds
		var timerWorld = game.time.events.loop(500, addWall);
	}

	function update() {

		if (space.isDown)
    	{
        	player.body.y -=5;
        	bloxoUp();
    	}
    	else
    	{
    		player.body.y +=5;
    		bloxoDown();
    	}

    	if(esc.isDown)
    	{
    		pauseGame();	
    	}

    	game.physics.arcade.collide(player,walls,gameOver);

    	game.world.bringToTop(scoreLbl);
    	scoreLbl.setText("Score: " + score);
	}

	function bloxoUp()
	{
		player.loadTexture('bloxoUp');
	}

	function bloxoDown()
	{
		player.loadTexture('bloxoDown');
	}

	function pauseGame()
	{
		game.paused = true;
		pauseLbl = game.add.text(500, 300, 'Game Paused', { font: '30px Roboto', fill: '#aaaaaa' });
	}

	function addTile(x,y)
	{
	    //Get a tile that is not currently on screen
	    var tile = walls.getFirstDead();
	 
	    //Reset it to the specified coordinates
	    tile.reset(x,y);
	    tile.body.velocity.x = tileSpeed; 
	    tile.body.immovable = true;
	 
	    //When the tile leaves the screen, kill it
	    tile.checkWorldBounds = true;
	    tile.outOfBoundsKill = true;    
	}

	function addWall()
	{
	    //Speed up the game to make it harder
	    tileSpeed -= 2;
	    score += 5;
	 
	    //Work out how many tiles we need to fit across the whole screen
	    var tilesNeeded = Math.ceil(game.world.height / tileHeight);

	    //Add a hole randomly somewhere
	    do
	    {
	    	var hole = Math.floor(Math.random() * (tilesNeeded - 2)) + 1;
	 	}while((hole > (prevHole + 2)) && (hole < (prevHole - 2)) );

	 	prevHole = hole;

	    //Keep creating tiles next to each other until we have an entire row
	    //Don't add tiles where the random hole is
	    for (var i = 0; i < tilesNeeded; i++){
	        if (i != hole && (i != hole+1 && i != hole-1) && (i != hole+2 && i != hole-2)){
	            addTile(game.world.width, i * tileHeight); 
	        }      
	    }
	}

	function gameOver()
	{
		saveScore(score);
		scoreLbl.destroy();
		var scoreString = 'Score: ' + score;
		game.paused = true;
		gameOverLbl = game.add.text(500, 200, 'Game Over', { font: '30px Roboto', fill: '#aaaaaa' });
		scoreLbl = game.add.text(520, 240, scoreString, { font: '30px Roboto', fill: '#aaaaaa' });
		restartInstructionLbl = game.add.text(420, 280, 'Press Esc key to Restart', { font: '30px Roboto', fill: '#aaaaaa' });
		player.kill();
		game.state.start(game.state.current);
	}
}