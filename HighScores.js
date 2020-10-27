
let highScore = document.querySelector("#highScore");
let clearbtn = document.querySelector("#clearbtn");
let returnbtn = document.querySelector("#returnbtn");



// display all scores
let allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

//Create list to di
if (allScores !== null) {
    for (let i = 0; i < allScores.length; i++) {
        let createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + ":  " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

// function to clear all scores
clearbtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// button to go back to main page
returnbtn.addEventListener("click", function () {
    window.location.replace("./index.html");
});