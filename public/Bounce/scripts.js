const ball = document.getElementById("ball");
const gameArea = $("#gameArea");
const ballJQ = $("#ball");
const gravity = 500;
var bottom = 40;
ball.style.bottom = bottom + "%";
var upForce = 0;
var intervaL;
var barrierArray = [];
var count = -100;
var i = 0;
var score = 0;

function Barrier(a) {
    this.ID = a;
    this.right = -10;
    this.height = Math.floor(Math.random() * (60 - 20) + 20);
    this.height2 = 75 - this.height;
    $(gameArea).append(`<div class="barrierUpper commonBarrier" id='barrierUpper${this.ID}'> </div><div class="barrierBottom commonBarrier" id='barrierBottom${this.ID}'></div>`);
    $(`#barrierUpper${this.ID}`).css({
        "height": `${this.height}%`,
        "right": `${-10}%`
    });
    $(`#barrierBottom${this.ID}`).css({
        "height": `${this.height2}%`,
        "right": `${-10}%`
    });
}

function startGame() {
    intervaL = setInterval(Frame, 7);
}

function Frame() {
    ball.style.bottom = bottom + "%";
    if (upForce <= gravity && bottom >= 0.5) {
        bottom = bottom - 0.5;
    } else if (gravity < upForce) {
        upForce = upForce - 10;
        bottom = bottom + calculateDiff(0);
    }
    if (bottom <= 0.5 || bottom >= 94.5) {
        alert("YOU LOST, GAME WILL BE RESTARTED");
        clearInterval(intervaL);
    }
    count++;
    if (count % 400 == 0 && barrierArray.length <= 5 && count < 5001) {
        barrierArray.push(new Barrier(i));
        score++;
        i++;
    } else if (barrierArray.length >= 3 || count > 5001) {
        count = 0;
        let temp = barrierArray.shift().ID;
        $(`#barrierUpper${temp}`).remove();
        $(`#barrierBottom${temp}`).remove();
    }
    for (let i = 0; i < barrierArray.length; i++) {
        barrierArray[i].right += 0.2;
        temp = barrierArray[i].right;
        checkCollision(i);
        $(`#barrierUpper${barrierArray[i].ID}`).css('right', `${temp}%`);
        $(`#barrierBottom${barrierArray[i].ID}`).css('right', `${temp}%`);
    }

}

function calculateDiff(a = 0) {
    let diff;
    if (a == 0) {
        diff = upForce - gravity;
        return (diff) / 1200;
    } else if (a == 1) {
        diff = upForce - gravity;
        return (diff) / 1200;
    }
}

function checkCollision(i) {
    const barr = $(`#barrierBottom${barrierArray[i].ID}`)
    if (parseInt(barr.css("right")) + parseInt(barr.css("width")) >= parseInt(ballJQ.css("right")) && parseInt(ballJQ.css("left")) <= parseInt(barr.css("left")) ||
    parseInt(barr.css("left")) + parseInt(barr.css("width")) >= parseInt(ballJQ.css("left")) && parseInt(ballJQ.css("right")) <= parseInt(barr.css("right"))) {
        // score++;
        const timeout = setTimeout( () => $("#score").text(score), 400);
        if (!(barrierArray[i].height2 < bottom && (barrierArray[i].height2 + 25) > bottom) ||
         (parseInt(ballJQ.css("bottom")) + parseInt(ballJQ.css("height"))) > parseInt($(`#barrierUpper${barrierArray[i].ID}`).css("bottom"))) {
            alert("YOU LOST, GAME WILL BE RESTARTED");
            clearTimeout(timeout);
            clearInterval(intervaL);
        }
    }   
    
}

function jumpBall() {
    upForce = 1200;
}

function restart() {
    clearInterval(intervaL);
    bottom = 40;
    ball.style.bottom = bottom + "%";
    upForce = 0;
    count = -100;
    i = 0;
    score = 0;
    $("#score").text("")
    removeBarriers();
    startGame();
}
function removeBarriers(){
    barrierArray.forEach(sample => {
       temp = sample.ID;
       console.log(temp);
       $(`#barrierUpper${temp}`).remove();
       $(`#barrierBottom${temp}`).remove();
    })
    barrierArray = [];
}