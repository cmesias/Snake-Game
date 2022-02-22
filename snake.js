// JavaScript Snake example
// Author Carl Mesias (Original Jan Bodnar)

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;                   // how many dots the snake starts with
var apple_x;                // x coordinate of apple
var apple_y;                // y coordinate of apple

// Player movement
var moveLeft = false;
var moveRight = true;
var moveUp = false;
var moveDown = false;
var inGame = true;

const DOT_SIZE = 10;        // Size of apple and dot of snake
const ALL_DOTS = 900;       // Maximum number of possible dots on the canvas
const MAX_RAND = 29;        // Random position for an apple
const DELAY = 140;          // Speed of the game
const C_HEIGHT = 300;       // Height of Canvas
const C_WIDTH = 300;        // Width of Canvas

// Keyboard keycodes
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const SPACEBAR_KEY = 32;

// These two arrays store the x and y coordinate of all joints of a snake
var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();

    // Starts the animation
    setTimeout("gameCycle()", DELAY);
}

// Load images for the game
function loadImages() {

    head = new Image();
    head.src = 'head.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = 'apple.png';
}

// Create snake object, at the start it has three joints
function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

// If head collides with apple, increase number of joints of snake.
// If the snakes head is the same coordinate as the apple, increase number of dots for snake
// After above, randomly position the apple object
function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {
        
        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }
    } else {

        gameOver();
    }
}

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over.\nSpacebar to restart.', C_WIDTH/2, C_HEIGHT/2);

}

function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

// Moves the snake. When the head moves it is the '0' index,
// the following indexes will follow where the last one was previously
function move() {

    for (var z = dots; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (moveLeft) {

        x[0] -= DOT_SIZE;
    }

    if (moveRight) {

        x[0] += DOT_SIZE;
    }

    if (moveUp) {

        y[0] -= DOT_SIZE;
    }

    if (moveDown) {
        y[0] += DOT_SIZE;
    }
}

// Check if snake hits one of its joints with its head, then game over
function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    // Check if snake hits the borders of the Canvas, if so game over
    if (y[0] >= C_HEIGHT) {

        inGame = false;
    }

    if (y[0] < 0) {

        inGame = false;
    }

    if (x[0] >= C_WIDTH) {

        inGame = false;
    }

    if (x[0] < 0) {

        inGame = false;
    }
}

// Randomly select x and y coordinates for the apple
// The apple_x and apple_y are the coordinates of the upper-left point
// of the apple image
function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}

// This is the main game loop, if the game is going on,
// continue collision detection, do movement and drawing
function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

// Player movement
onkeydown = function(e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!moveRight)) {

        moveLeft = true;
        moveUp = false;
        moveDown = false;
    }

    if ((key == RIGHT_KEY) && (!moveLeft)) {

        moveRight = true;
        moveUp = false;
        moveDown = false;
    }

    if ((key == UP_KEY) && (!moveDown)) {

        moveUp = true;
        moveRight = false;
        moveLeft = false;
    }

    if ((key == DOWN_KEY) && (!moveUp)) {

        moveDown = true;
        moveRight = false;
        moveLeft = false;
    }

    // Restart game with space bar
    if (!inGame) {
        if ((key == SPACEBAR_KEY)) {
            inGame = true;
            init();
        }
    }
};