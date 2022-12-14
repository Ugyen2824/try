let broom = document.getElementById("broom");
let container = document.getElementById("container");
let pumpkin = document.getElementById("pumpkin");
let mousePosX;
let gravity = 0.3;
let speedY = 0;
let score = 0;
let scoreText = document.querySelector("h1");

container.addEventListener("click", flyUp);

function flyUp(event) {
    speedY = -10;
    mousePosX = event.clientX - container.offsetLeft;
}

function update() {
    updateBroom();
    updatePumpkin();
    checkForItemCollect();
    window.requestAnimationFrame(update);
}

function updateBroom() {
    // horizontal moves
    let diffX = mousePosX - broom.offsetLeft - (broom.offsetWidth/2);
    let broomTargetX = broom.offsetLeft + (diffX * 0.015);
    broom.style.left = broomTargetX + "px";


    // vertical moves
    speedY += gravity;
    let broomTargetY = broom.offsetTop + speedY;
    if (broomTargetY > container.offsetHeight) {
        broomTargetY = container.offsetHeight;
    }
    broom.style.top = broomTargetY + "px";


    // rotate
    if (speedY < -5) {
        // going up
        broom.style.transform = "rotate(-25deg)";
    }
    else if (speedY > 5) {
        // falling down
        broom.style.transform = "rotate(25deg)";
    }
    else {
        broom.style.transform = "rotate(0deg)";
    }
}

function updatePumpkin() {
    let targetPumpkinX = pumpkin.offsetLeft - 5;
    if (targetPumpkinX < -pumpkin.offsetWidth) {
        targetPumpkinX = container.offsetWidth;
        pumpkin.style.top = (Math.random() * 400) + "px";
    }
    pumpkin.style.left = targetPumpkinX + "px";
}

function checkForItemCollect() {
    let diffX = (pumpkin.offsetLeft + (pumpkin.offsetWidth/2)) - (broom.offsetLeft + (broom.offsetWidth/2));
    //console.log(diffX);
    
    let diffY = (pumpkin.offsetTop + (pumpkin.offsetHeight/2)) - (broom.offsetTop + (broom.offsetHeight/2));
    //console.log(diffY);

    if (Math.abs(diffX) < 40 && Math.abs(diffY) < 40) {
        //console.log("collect item");
        pumpkin.style.left = container.offsetWidth + "px";
        pumpkin.style.top = (Math.random() * 400) + "px";

        score++;
        scoreText.innerHTML = "Score: " + score;
    }
}

window.requestAnimationFrame(update);




window.onload = window.onresize = resizeGame;

function resizeGame() {
    let gameRatio = container.offsetWidth / container.offsetHeight;
    let windowRatio = window.innerWidth / window.innerHeight;
    
    container.style.position = "absolute";
    container.style.left = `${(window.innerWidth - container.offsetWidth) / 2}px`;
    container.style.top = `${(window.innerHeight - container.offsetHeight) / 2}px`;

    let newScale;
    if (gameRatio > windowRatio) {
        newScale = window.innerWidth / container.offsetWidth;
        if (newScale > 1) newScale = 1;
    }
    else {
        newScale = window.innerHeight / container.offsetHeight;
        if (newScale > 1) newScale = 1;
    }
    container.style.transform = `scale(${newScale})`;
}

