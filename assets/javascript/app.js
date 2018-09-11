$(document).ready(function(){

  var triviaGame = {
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

    pickQ: function(position) { 
      var qDisp = $("<div>").addClass("row playing-area");
      var questDispl = $("<div>").addClass("question-display col-md-12 text-center").text(triviaGame.questions[position].question);
      var ans = $("<div>").addClass("answer-options col-md-12 text-center")
      triviaGame.questions[position].answers.forEach(function(curr){
        var currentAns =  $("<button>").addClass("btnOptns").attr("value", curr.value).text(curr.text);
        ans.append(currentAns);
      });

      qDisp.append(questDispl, ans);
      $(".gameSpace").append(qDisp);
    }

  }


  var clock;
  var countingClock = 30;
  var pauseTime = 4;
  var pauseTimer;
  var currentPos = 0;
  var maxPos = triviaGame.questions.length;
  var ending = false;
  
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
      } else {
        ansText = "Incorrect!";
      }
      $(".answer-options").empty();
      $(".question-display").text(ansText);

    });

    $(".buttonSpace").on("click", ".rstrt", function(){
      reset();
      $(".rstrt").remove();
      strtTimer($(this));
      currentPos = 0;
      triviaGame.pickQ(currentPos);
    });

  var timer = function() {
    $("#display").text(countingClock);
    if (countingClock === 0){
      clearInterval(clock);
      pauseTimer = setInterval(pauseOnAnswer, 1000);
    }
    countingClock--;
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
      newBtn = $("<button>Restart</button>").addClass("rstrt");
      $(".question-display").text("Game over.");
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
    var display = $("<div>").attr("id", "display");
    $(".gameSpace").append(display);
    triviaGame.pickQ(currentPos);
    currentPos++;
    if (currentPos === maxPos) {
      ending = true;
    }
  }
});