$(document).ready(function(){

  var triviaGame = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    questions: [{
      question: "Q1",
      answers:[{text:"incorrect",
        value: false},
        {text:"incorrect",
        value: false},
        {text:"correct",
         value: true},
        {text:"incorrect",
        value: false}]
    },
    {question: "Q2",
      answers:[{text:"correct",
        value: true},
        {text:"incorrect",
        value: false},
        {text:"incorrect",
         value: false},
        {text:"incorrect",
        value: false}]
    },
    {question: "Q3",
      answers:[{text:"incorrect",
        value: false},
        {text:"incorrect",
        value: false},
        {text:"incorrect",
         value: false},
        {text:"correct",
        value: true}]
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
        var currentAns =  $("<button>").addClass("btnOptns").attr("value", curr.value).text(curr.text);
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

  triviaGame.startGame();
  
    $(".buttonSpace").on("click", ".strtBtn", function(){
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
        ansText = "Congratulations! That is correct!";
        triviaGame.right++;
      } else {
        triviaGame.wrong++;
        ansText = "Incorrect!";
      }
      $(".answer-options").empty();
      $(".question-display").text(ansText);

    });

    $(".buttonSpace").on("click", ".rstrt", function(){
      reset();
      $(".rstrt").remove();
      triviaGame.shuffle(triviaGame.questions);
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
      newBtn = $("<button>Restart</button>").addClass("rstrt");
      $(".gameSpace").append(score);
      $(".buttonSpace").append(newBtn);
    } else {
      newBtn = $("<button>Next</button>").addClass("nxtQ");
      $(".buttonSpace").append(newBtn);
    }
    pauseTime = 4;
    countingClock = 30;
  }

  var strtTimer = function(oldBtn) {
    oldBtn.remove();
    var display = $("<div>").attr("id", "display").text("30");
    $(".gameSpace").append(display);
    triviaGame.pickQ(currentPos);
    console.log(currentPos);
    currentPos++;
    if (currentPos === maxPos) {
      ending = true;
    }
  }
});