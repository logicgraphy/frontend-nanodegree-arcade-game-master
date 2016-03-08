'use strict'; 

// Contructor function - Enemies our player must avoid
// Set the image/sprite for enemies
// Set intitial X & Y location of enemies
// Set speed of enemies
var Enemy = function(location, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = location.x;
    this.y = location.y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    //Enermies travel back and forth by reversing their speed,
    //after they reach certain point on the x axis.
    if(this.x < -120){
        this.speed = this.speed * (-1);
    }
    if(this.x > 520){
        this.speed = this.speed * (-1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset the speed and x location on collision
Enemy.prototype.reset = function() {
    this.x = 1;
    if(this.speed < 0) {
        this.speed = this.speed * (-1);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Contructor function - Player 
// Set the image/sprite for player
// Set intitial X & Y location of player
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Update the players's position, required method for game
Player.prototype.update = function() {
    //Check if player reached its goal (water)
    //Restart game by reseting the player
    if(this.y < 70) {
        var self = this;
        setTimeout(function() {
            self.reset();
        }, 200);
    }   
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the player by setting x & y locations.
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 402;
};

// Handles the gamer input and moves player accordingly
Player.prototype.handleInput = function(e) {

    if (e === 'up' && this.y > 1) {
        this.y -= 83;
    }

    else if (e === 'down' && this.y < 402) {
        this.y += 83;
    }

    else if (e === 'left' && this.x > 1) {
        this.x -= 101;
    }

    else if (e === 'right' && this.x < 400) {
        this.x += 101;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var e1 = new Enemy({x: 1, y: 70}, 100);
var e2 = new Enemy({x: 1, y: 153}, 150);
var e3 = new Enemy({x: 1, y: 236}, 80);
var e4 = new Enemy({x: 1, y: 319}, 120);

var allEnemies = [e1, e2, e3, e4];
var player = new Player(202, 402);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
