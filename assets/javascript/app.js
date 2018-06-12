var triviaQuestions = [{
	question: "Who is the office Temp?",
	answerList: ["Jim Halpert", "Ryan Howard", "Erin Hannon", "Michael Scott"],
	answer: 1
},{
	question: "What is the name of 'Box of Paper Snowshoe Racing' in the Office Olympics?",
	answerList: ["Flonkerton", "Icelandic Snowshoe Racing", "Bixing", "Pegerhosen"],
	answer: 0
},{
	question: "Which of the following is NOT one of Jim's Halloween costumes?",
	answerList: ["Rational Consumer", "Dave", "Three Hole Punch Jim", "Popeye the Sailor"],
	answer: 0
},{
	question: "Where do Michael and Jan take the Lackawanna County rep for a business meeting?",
	answerList: ["Applebee's", "Olive Garden", "Chili's", "The Raddison"],
	answer: 2
},{
	question: "Who ends up with the Video iPod at the end of the Yankee Swap episode?",
	answerList: ["Michael", "Ryan", "Pam", "Dwight"],
	answer: 3
},{
	question: "During Michael's birthday party, who is in the midst of a cancer scare?",
	answerList: ["Kevin", "Creed", "Meredith", "Kelly"],
	answer: 0
},{
	question: "What does Michael mistakenly believe the celebration of Diwali is?",
	answerList: ["Hindu Hannukah", "Hindu Halloween", "Hindu Flag Day", "Hindu Christmas"],
	answer: 1
},{
	question: "What is the name of Andy's college acapella group?",
	answerList: ["The Bass Ace in your Face", "Ransom Notes", "Here Comes Treble", "Pitch Slapped"],
	answer: 2
},{
	question: "During Phyllis' wedding, who breaks etiquette and wears white as a wedding guest?",
	answerList: ["Erin", "Kelly", "Meredith", "Angela"],
	answer: 1
},{
	question: "During Beach Day, who gets abandoned in the lake wearing a sumo costume?",
	answerList: ["Ryan", "Stanley", "Daryl", "Andy"],
	answer: 3
},{
	question: "Dwight mercy kills Angela's cat. Name that cat.",
	answerList: ["Sprinkles", "Bandit", "Garbage", "Fluffy"],
	answer: 0
},{
	question: "When Creed gets into financial trouble, who does he say he transfers his debt to?",
	answerList: ["Michael Scott", "William Charles Schneider", "Creed Bratton Jr.", "Stanley Hudson"],
	answer: 1
},{
	question: "Toby temporarily moves to what country?",
	answerList: ["Peru", "Puerto Rico", "Brazil", "Costa Rica"],
	answer: 3
},{
	question: "Where does David Wallance send Michael on his first international business trip?",
	answerList: ["Winnipeg", "London", "Tokoyo", "Paris"],
	answer: 0
},{
	question: "When trying to frame Toby, what does Michael buy from the warehouse guys thinking it is marijuana?",
	answerList: ["Oregano", "Sage", "Caprese Salad", "Arugula"],
	answer: 2
}];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
    
    
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}