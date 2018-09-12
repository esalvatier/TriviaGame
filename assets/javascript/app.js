$(document).ready(function(){

  var triviaGame = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    questions: [{
      question: "Which animal has, according to research, an estimate 95% success rate when hunting?",
      answers:[{text:"Wolves",
        value: false},
        {text:"Blue Whale",
        value: false},
        {text:"Dragonfly",
         value: true},
        {text:"Eagle",
        value: false}],
      correct: " the dragonfly"
    },
    {question: "In 1932 Australia fought in this war and lost.",
      answers:[{text:"Emu War",
        value: true},
        {text:"Chaco War",
        value: false},
        {text:"Second Sino-Japanese War",
         value: false},
        {text:"West Australian War",
        value: false}],
      correct: "Emu War",
      correct: " the Emu War."
    },
    {question: "On average,human dreams last how long?",
      answers:[{text:"Less than 1 second",
        value: false},
        {text:"15 seconds",
        value: false},
        {text:"4 minutes",
         value: false},
        {text:"2 to 3 seconds",
        value: true}],
      correct: " 2 to 3 seconds."
    },
    {question: "In 1921 Evan O'Neill Kane performed surgery on himself to remove this.",
      answers:[{text:"A Tumor",
        value: false},
        {text:"Part of his right kidney",
        value: false},
        {text:"A bullet",
         value: false},
        {text:"His Appendix",
        value: true}],
        correct: " his appendix."
    },
    {question: "Technically speaking the pluralof Octopus, is this.",
      answers:[{text:"Octopi",
        value: false},
        {text:"Octopusses",
        value: false},
        {text:"Octopus",
         value: false},
        {text:"Octopodes",
        value: true}],
        correct: " Octopodes."
    },
    {question: "In Curling a clockwise spin will cause the stone to move towards which direction?",
      answers:[{text:"Left",
        value: false},
        {text:"Neither",
        value: false},
        {text:"Up",
         value: false},
        {text:"Right",
        value: true}],
        correct: " to the right."
    }],

    startGame: function() {
      this.right = 0;
      this.wrong = 0;
      this.unanswered = 0;
      this.shuffle(this.questions);

    },
    pickQ: function(position) {
      this.shuffle(this.questions[position].answers);
      var qDisp = $("<div>").addClass("row playing-area");
      var questDispl = $("<div>").addClass("question-display col-md-12 text-center").text(this.questions[position].question);
      var ans = $("<div>").addClass("answer-options col-md-12 text-center")
      this.questions[position].answers.forEach(function(curr){
        var currentAns =  $("<button>").addClass("btnOptns btn btn-primary").attr("value", curr.value).text(curr.text);
        ans.append(currentAns);
      });

      qDisp.append(questDispl, ans);
      $(".gameSpace").append(qDisp);
    },

    shuffle: function(arr) {
      var length = arr.length;
      var temp;
      var randIndex;

      while (length) {
        randIndex = Math.floor(Math.random() * length--);
        temp = arr[length];
        arr[length] = arr[randIndex];
        arr[randIndex] = temp;
      }
      return arr;
    }
  }


  var clock;
  var countingClock = 30;
  var pauseTime = 4;
  var pauseTimer;
  var currentPos = 0;
  var maxPos = triviaGame.questions.length;
  var ending = false;
  var currentQuestion;

  triviaGame.startGame();
  
    $(".buttonSpace").on("click", ".strtBtn", function(){
      $(".instructions").remove();
      strtTimer($(this));
      clock = setInterval(timer, 1000);
    });
  
    $(".buttonSpace").on("click",".nxtQ", function(){
      strtTimer($(this));
      clock = setInterval(timer, 1000);
    });
  
    $(".gameSpace").on("click", ".btnOptns", function(){
      clearInterval(clock);
      pauseTimer = setInterval(pauseOnAnswer, 1000);
      var ansText;
      if ($(this).attr("value") == "true") {
        ansText = "<p>Congratulations! That is correct!</p>";
        triviaGame.right++;
      } else {
        triviaGame.wrong++;
        ansText = "<p>Incorrect!</p> <p>The right answer is" + currentQuestion.correct +"</p>";
      }
      $(".answer-options").empty();
      $(".question-display").html(ansText);

    });

    $(".buttonSpace").on("click", ".rstrt", function(){
      reset();
      $(".rstrt").remove();
      $(".score-display").remove();
      triviaGame.startGame();
      clock = setInterval(timer, 1000);
      currentPos = 0;
      ending = false;
      strtTimer($(this));
    });

  var timer = function() {
    countingClock--;
    $("#display").text(countingClock);
    if (countingClock === 0){
      clearInterval(clock);
      triviaGame.unanswered++;
      $(".question-display").text("You took too long! :(");
      $(".answer-options").empty();
      pauseTimer = setInterval(pauseOnAnswer, 1000);
    }
  };

  var pauseOnAnswer = function() {
    pauseTime--;
    if (pauseTime === 0) {
      reset();
      clearInterval(pauseTimer);
    }
  }

  var reset =  function() {
    clearInterval(clock);
    $(".gameSpace").empty();
    $(".buttonSpace").empty();
    var newBtn;
    if (ending) {
      var score = $("<div>").addClass("score-display").html("<p>Game Over.</p> <p> You answered " + triviaGame.right + " question(s) correctly.</p>" + "<p>" + triviaGame.wrong + " question(s) incorrectly.</p>" + "<p>And failed to answer " + triviaGame.unanswered + " question(s).");
      newBtn = $("<button>Restart</button>").addClass("rstrt btn btn-danger");
      $(".gameSpace").append(score);
      $(".buttonSpace").append(newBtn);
    } else {
      newBtn = $("<button>Next</button>").addClass("nxtQ btn btn-success");
      $(".buttonSpace").append(newBtn);
    }
    pauseTime = 4;
    countingClock = 30;
  }

  var strtTimer = function(oldBtn) {
    currentQuestion = triviaGame.questions[currentPos];
    oldBtn.remove();
    var display = $("<div>").attr("id", "display").text("30");
    $(".gameSpace").append(display);
    triviaGame.pickQ(currentPos);
    currentPos++;
    if (currentPos === maxPos) {
      ending = true;
    }
  }
});