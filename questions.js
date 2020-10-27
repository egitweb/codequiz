// Questions Arrays
let questions = [
    {
        //Question #1 
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "How to Make Laughs", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        //Question #2
        question: "Choose the correct HTML element to define emphasized text:",
        choices: ["<i>", "<em>", "<italic>", "<emphasized>"],
        answer: "<em>"
    },
    {
        //Question #3
        question: "How can you make a numbered list?",
        choices: ["<ul>", "<list>", "<ol>", "<dl>"],
        answer: "<ol>"
    },
    {
        //Question #4
        question: "Which HTML element is used to specify a footer for a document or section?",
        choices: ["<bottom>", "<section>", "<footer>", "all of the above"],
        answer: "<footer>"
    }, 
    {
        //Question #5
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: "<h1>"
    },
    {
        ///Question #6
        question: "Which property is used to change the font of an element?",
        choices: ["font-style", "font-family", "font-weight", "font-element"],
        answer: "font-family"
    },


];




let score = 0;
let questionIndex = 0;


let currentTime = document.querySelector("#currentTime");
let timer = document.querySelector("#startTime");
let questionsDiv = document.querySelector("#questionsDiv");
let wrapper = document.querySelector("#wrapper");


// Timer to Start Timer Quiz with:
let secondsLeft = 60;
// Seconds to finish Quiz
let endquiz = 0;
// Seconds to subtract if user get quistion wrong
let subtract = 10;
// This will create a new ul element to display the questions
let ulCreate = document.createElement("ul");




// this will create and display the questions and choices.
function makequestion(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (let i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
        
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
    let listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
})
    
   
}

 


// this will check if the answer is corect or not
function compare(check) {
    let element = check.target;

    if (element.matches("li")) {

        let createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // this will display if the answer is correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;

            alert("✅ You're Correct! The answer is:  " + questions[questionIndex].answer);
            console.log("correct answer");
        } else {

            // display if the answer is wrong
            secondsLeft = secondsLeft - subtract;
            alert("❌ Wrong Answer! The correct answer was:  " + questions[questionIndex].answer);
            console.log("wrong answer");

        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        // when done 
        endQuiz();
       // createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
        alert("📢 End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!");
    } else {
        makequestion(questionIndex);
    }
    //questionsDiv.appendChild(createDiv);

}



// if timer reach 0 will activate edquiz function
timer.addEventListener("click", function () {
    if (endquiz === 0) {
        endquiz = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            //If timer run up  "Time's up!" will replace "time"
            if (secondsLeft <= 0) {
                clearInterval(endquiz);
                endQuiz();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    makequestion(questionIndex);
});


// Show after quiz is done
function endQuiz() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

     // Heading:
    let endH1 = document.createElement("h1");
    endH1.setAttribute("id", "endH1");
    endH1.textContent = "All Done!"

    questionsDiv.appendChild(endH1);
    

    // New Paragraph will be created
    let createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);



    // this will show final score
    if (secondsLeft >= 0) {
        saveScore = secondsLeft;
        let createP2 = document.createElement("p");
        clearInterval(endquiz);
        createP.textContent = "Your final score is: " + saveScore;

        questionsDiv.appendChild(createP2);

    }


    // create label for input for user to enter initials to save score
    let createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
   //Might remove this: createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);


    // create input for user to enter initials to save score
    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    createInput.placeholder = "Enter your initials";

    questionsDiv.appendChild(createInput);

    // submit
    let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);


    // This will save users initials & score in localstorage
    createSubmit.addEventListener("click", function () {
        let initials = createInput.value;

        if (initials === null) {

            console.log("value is empty!");

        } else {
            let finalScore = {
                initials: initials,
                score: saveScore
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}


