// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    var random1 = Math.floor(Math.random() * 3);
    var random2 = Math.floor(Math.random() * 3);
    if (this.x > 505) {
        this.x = -100;
        this.y = 40 + random1 * 100;
        this.speed = 100 + 100 * random2;
    }
    this.checkCollisions();
};

// Checks if the player collided with enemy,
// in which case, the player is brought back to the beginning position
Enemy.prototype.checkCollisions = function() {
    if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
        player.playerReset();
        player.score = 0;
        player.checkScore();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player is defined.
var Player = function(x, y, score) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};
// Player.prototype will fall through Enemy.prototype
Player.prototype = Object.create(Enemy.prototype);


// If the player reached the water, the player wins.
// The player is then brought back to the beginning position.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y < 5) {
        this.score += 100;
        this.checkScore();
        this.playerReset();
    }
};

// Brings player back to beginning position
Player.prototype.playerReset = function() {
    this.x = 205;
    this.y = 430;
};

// Depending on which key is pressed, the player moves accordingly.
// The player cannot move off screen.
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 5) {
                this.x -= 100;
            }
            break;
        case 'up':
            if (this.y > 5) {
                this.y -= 100;
            }
            break;
        case ('right'):
            if (this.x < 405) {
                this.x += 100;
            }
            break;
        case ('down'):
            if (this.y < 405) {
                this.y += 100;
            }
            break;
    }
};


// Player and enemys instantiated.
var bug1 = new Enemy(-100, 40, 100);
var bug2 = new Enemy(-100, 130, 200);
var bug3 = new Enemy(-100, 230, 300);
var allEnemies = [bug1, bug2, bug3];
var player = new Player(205, 430, 0);

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

// Adds 100 points to score once the player reaches the water.
// Score resets to 0 when the player is hit by an enemy.
Player.prototype.checkScore = function() {
    ctx.clearRect(0, 0, 200, 50);
    ctx.font = '20px Arial';
    ctx.fillText("score: " + this.score, 10, 50);
};
