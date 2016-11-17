//Date at top of screen
        
var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var timeNow = new Date();
var day = timeNow.getDate();
var month = theMonths[timeNow.getMonth()];
var year = timeNow.getFullYear();
var dayName = dayOfWeek[timeNow.getDay()];

$("#theDay").html(dayName);
$("#theDate").html(month + " " + day + " " + year);
        
//List variables
var percentRound;        
var someNumber = 0;
var currentValue;
var listLength;
var itemsDone = 0;
        
        
//Start app 
        
$("#getStarted").on("click", function() {
  $("#getStarted").hide();
  $("#startIntro").hide();
  $("div.startApp").slideDown(500);

});

//Keyboard Support for Enterting Lists //
$("#input").keyup(function(event){
    if(event.keyCode == 13){
        $("#add").click();
    }
});

//Add items to list

$("#add").on("click", function() {
   currentValue = $("#input").val();
   if (currentValue === "") {
     $('#input').focus();
   }
   else {
  $("#theList").append("<li class='animatedFast slideInLeft'>" + "<span class='delete'><i class='fa fa-trash aria-hidden='true'></i></span>" + "<input type='checkbox' class='done theCheckBox'>" + currentValue + "</li>"); 
  $("#input").val("");
   }
   $('#input').focus();
});

        
//Delete items
//since the new list item(s) did not exist when .on() was called, it does not get the event handler.So we must use event delegation. 
//Solved by attaching a single event listener to the <ul> instead of <li>. 
//When a button within a <ul> with the class 'delete' is clicked, it will remove the parent element <li>. 

$("ul").on("click", "span.delete", function() {
  $(this).parent().remove();
     $('#input').focus();
});

        
//Completed Items - Calculate the number of list items then use basic math for determing %. Send % as parameter to graph. 
        
$("ul").on("click", "input.done", function() {
  if ($(this).is(':checked')) { 
    $(this).parent().addClass("itemDone");
    itemsDone++;
    $("#completedItems").html(itemsDone);
      percentRound = itemsDone/listLength;
      percentRound = percentRound.toFixed(2);
    $("#percentDone").html((percentRound)*100 + "%");
      calcPie((percentRound)*100)
      if (itemsDone === listLength) {
        $("#greatJob").slideDown(5000);
      }
   }
   else {
    $(this).parent().removeClass("itemDone");
    itemsDone--;
    $("#completedItems").html(itemsDone);
     percentRound = itemsDone/listLength;
     percentRound = percentRound.toFixed(2);
    $("#percentDone").html((percentRound)*100 + "%")
    calcPie((percentRound)*100)
   }
});

$("#start").on("click", function() {
  $("#completedItems").html(itemsDone);
  listLength = $("#theList li").length;
  
  if (listLength === 0) {
    $('#input').focus();
  }
  else {
  $("#totalItems").html(listLength);
  $('span.delete').hide(300);
  $('input.done').show(300);
  $("#progress").show(300);
  $("#start").hide(300);
  $("#add").hide(300);
  $("#input").hide(300);
  $("#timer").show(600);
  $("#motivate").show(900);
      calcPie(0);
  }
});
      
        
//Close Great job congratulations 
        
$("#closeGreatJob").on("click", function() {
    $("#greatJob").slideUp();
});
        
//Timer options
        
$("#timer").on("click", function() {
    $("#timer").hide();
    $("#min15").slideDown();
    $("#min30").slideDown();
    $("#hour1").slideDown();
    $("#pomodoro").slideDown();
    $("#cancelTimer").show();
});
        
$("#cancelTimer").on("click", function() {
    $("#cancelTimer").hide();
    $("#timer").show();
    $("#min15").slideUp();
    $("#min30").slideUp();
    $("#hour1").slideUp();
    $("#pomodoro").slideUp();
    
});
        
//Timer Options. If the timer reaches zero, it will flash to indicate it's over. The flash animation is removed when the timer is started again.
        
$("#min15").on("click", function() {
   $("#timerCountDown").removeClass("animated infinite flash");
   clearInterval(theTimer);
   $("#timerCountDown").slideDown();
   myTimer(0, 10);
});
        
$("#min30").on("click", function() {
   $("#timerCountDown").removeClass("animated infinite flash");
   clearInterval(theTimer);
   $("#timerCountDown").slideDown();
   myTimer(0, 25);
});  
        
$("#hour1").on("click", function() {
   $("#timerCountDown").removeClass("animated infinite flash");
   clearInterval(theTimer);
   $("#timerCountDown").slideDown();
   myTimer(0, 60);
});
        
//Timer Function
        
//The initial call sets the global variables and begins the interval. 

//In JavaScript, all function parameters are optional. Check if they exist -- if they do then set the parameters to their respective global variables and the interval will begin. 

//As the interval runs and keeps executing the function, there are not any parameters sent so the function will continue counting down the time as it should.  
var seconds;
var minutes;
var theTimer;
        
function myTimer(sec, min) {
 
  if (typeof sec !== 'undefined' && typeof min !== 'undefined') {
  	seconds = sec;
    minutes = min;
  	theTimer = setInterval(function(){ myTimer() }, 1000);
  }
  else {
  	seconds--;
  }
  $("#seconds").html(seconds);
  $("#minutes").html(minutes);
  
  if (seconds === 0 && minutes === 0) {
    clearInterval(theTimer);
    $("#timerCountDown").addClass("animated infinite flash");
  }
  else if (seconds === 0) {
    minutes--;
    seconds = 60;
  } 
};
    
//Close Timer
     
$("#stopCount").on("click", function() {
     clearInterval(theTimer); 
    $("#timerCountDown").slideUp();
});
        
 //Pomodoro Info
$("#pomodoro").on("click", function() {
    $("#pomodoro-info").slideDown(500);
});
        
$("#closePomodoro").on("click", function() {
   $("#pomodoro-info").slideUp(); 
});

//Momentum Popup
        
$("#momentumPower").on("click", function() {
    $("#motivate-info").slideDown(500);
});

      
$("#closeMomentum").on("click", function() {
   $("#motivate-info").slideUp(); 
});    
        
//Motivational Boost Options        
        
$("#motivate").on("click", function() {
   $("#motivate").hide();
   $("#motivateClose").show();
   $("#tip").slideDown(); 
   $("#quote").slideDown(); 
   $("#momentumPower").slideDown(); 
});
        
$("#motivateClose").on("click", function() {
   $("#motivateClose").hide();
   $("#motivate").show();
   $("#tip").slideUp(); 
   $("#quote").slideUp(); 
   $("#momentumPower").slideUp(); 
})

//Get Random Quote

var quote;
var randomNumber;
var theQuote;

var quoteArray = ["To live a creative life, we must lose our fear of being wrong.", "Trust because you are willing to accept the risk, not because it's safe or certain.", "If you do what you always did, you will get what you always got.", "Success is walking from failure to failure with no loss of enthusiasm.", "The ones who are crazy enough to think they can change the world, are the ones who do.", "The meaning of life is to find your gift. The purpose of life is to give it away.", "The distance between insanity and genius is measured only by success.", "Life is not about finding yourself. Life is about creating yourself.", "Your problem isn't the problem. Your reaction is the problem." ];

function getQuote(num) {
  if (num === 0) {
    quote =  quoteArray[0];
  }
  else if (num === 1) {
    quote = quoteArray[1];
  }
  else if (num === 2) {
    quote = quoteArray[2];
  }
  else if (num === 3) {
    quote = quoteArray[3];
  }
  else if (num === 4) {
    quote = quoteArray[4];
  }
  else if (num === 5) {
    quote = quoteArray[5];
  }
  else if (num === 6) {
    quote = quoteArray[6];
  }
  else if (num === 7) {
    quote = quoteArray[7];
  }
  else if (num === 8) {
    quote = quoteArray[8];
  }
  else if (num === 9) {
    quote = quoteArray[9];
  }
  return quote;
}
$("#quote").on("click", function() {
    randomNumber = Math.random();
    randomNumber = (randomNumber * 9);
    randomNumber = Math.round(randomNumber);
    theQuote = getQuote(randomNumber);
    $("#quoteHere").html(theQuote);
    $("#quote-top").slideDown(500);
});

        
$("#closeQuoteTop").on("click", function() {
    $("#quote-top").slideUp(500);
});

//Smart Tips
        
var tip;
var randomNumberTip;
var theTip;

var tipArray = ["<b>Every project requires an action plan.</b> There is always a most efficient series of steps for each project. To save effort and time, we must identify what that series is and follow it. Prior to starting any project, attempt to identify this series and jot it down.", "<b>Schedule the most vital activities first.</b> If you first deal with your most critical tasks first, it'll be easier to discover time for less important tasks. If you permit yourself to become sidetracked on busywork or unimportant tasks, odds are you never will get to the things that really matter.", "<b>Track your time.</b> To figure out where your time is heading, attempt to keep a time log for one or two weeks. How much time is actually being lost on unimportant tasks? Where will the majority of your interruptions come from? Will they happen within specific periods of time or on certain days of the week? Once you have this data, it'll be simpler to eliminate time-wasting tasks, along with interruptions and distractions.", "<b>Schedule less.</b> If you're cramming too much into your schedule, you'll always feel frustrated and rushed--and ultimately, you will not get much accomplished. Attempt to be realistic concerning how many things are scheduled into your day. One ounce of accomplishment is better than one pound of frustration.", "<b>Minimize all interruptions.</b> Block off parts of your day during which you aren't to be distracted unless absolutely necessary. When possible, turn off your phone, instant messenger, pop-ups, Twitter notifications, and all other things that usually get your focus off the project. Learn to concentrate on one activity.", "<b>Expect the unexpected.</b> Things happen, that is just the way it is. If your schedule is so tight that you do not allow for the unexpected, you drastically increase your odds of feeling chaotic throughout the day. If you must be somewhere and you're able to make it in 15 minutes, permit 25. Leave tiny, unscheduled time blocks all through your day in order for you to have a buffer against the unexpected.", "<b>Utilize transition time to your advantage.</b> If you're commuting, attempt to utilize this time for something productive. Can you find a method of listening to crucial data that you normally would need to read later? Have something around that you're able to do whenever you're stuck waiting around. Making use of time that normally would be wasted is an easy way to create more time for those things you have a desire to accomplish.", "<b>Take occasional breaks.</b> After 45 minutes, our ability to focus starts to taper off and we no longer optimally perform. I utilize those 15 minutes for strolling around, getting something to drink, answering calls, or anything else that distracts me from the activity at hand. Oftentimes, that's when my best ideas come to mind, and I wind up feeling invigorated and prepared to make things work.", "<b>Think on paper.</b> If you feel stuck, jot the issue down. Defining the issue on paper is going to assist you in sorting it out. Create a list of as many solutions as possible. Odds are, you have just solved your issue.", "<b>Be flexible.</b> These are just suggestions; they aren't fast and hard rules. Experiment, discover what will work for you personally, and don't be frightened of customizing the thoughts to match your individual needs and circumstances. Some of them might work for you and some of them might not, yet you never will know until you try."];

function getTip(numTip) {
  if (numTip === 0) {
    tip =  tipArray[0];
  }
  else if (numTip === 1) {
    tip = tipArray[1];
  }
  else if (numTip === 2) {
    tip = tipArray[2];
  }
  else if (numTip === 3) {
    tip = tipArray[3];
  }
  else if (numTip === 4) {
    tip = tipArray[4];
  }
  else if (numTip === 5) {
    tip = tipArray[5];
  }
  else if (numTip === 6) {
    tip = tipArray[6];
  }
  else if (numTip === 7) {
    tip = tipArray[7];
  }
  else if (numTip === 8) {
    tip = tipArray[8];
  }
  else if (numTip === 9) {
    tip = tipArray[9];
  }
  return tip;
}
                
$("#tip").on("click", function() {
    randomNumberTip = Math.random();
    randomNumberTip = (randomNumberTip * 9);
    randomNumberTip = Math.round(randomNumberTip);
    theTip = getTip(randomNumberTip);
    $("#tipHere").html(theTip);
    $("#tip-top").slideDown(500);
});

        
$("#closeTip").on("click", function() {
    $("#tip-top").slideUp(500);
});