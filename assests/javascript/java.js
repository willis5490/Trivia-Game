var triviaQuestions = [{
	question: "What Basketball player starred in Space Jam?",
	answerList: ["Scotty Pippen", "Michael Jorden", "Charles Barkley", "Larry Bird"],
	answer: 1
},{
	question: "Who was the host of the Nickelodeon show Guts?",
	answerList: ["Mike O'Malley", "Drew Carrey", "Bob Hope", "Biggie Smalls"],
	answer: 0
},{
	question: "Mr. Feeney was the teacher in what show?",
	answerList: ["Fresh Prince of Bel Air", "Saved by The Bell", "Boy Meets World", "The Simpsons"],
	answer: 2
},{
	question: "What was Tommy's last name in the Rugrats?",
	answerList: ["Finster", "Repunzel", "Pickles"],
	answer: 2
},{
	question: "Who wrote Goosebumps?",
	answerList: ["Lois Lowry", "Steven King", "R.L Stine", "Mr. Hankey"],
	answer: 2
},{
	question: "What was the main characters name in Pokemon",
	answerList: ["Ash", "Bill", "Carl", "Leo"],
	answer: 0
},{
	question: "Rocko from Rocko's Modern Life, was what animal?",
    answerList: ["Dog", "Cat", "Wallaby", "Kangaroo"],
	answer: 2
},{
	question: "When was Beavis and Butthead released?",
	answerList: ["1990", "1993", "1996", "1997"],
	answer: 1
},{
	question: "Full House took place in what city?",
	answerList: ["New York", "L.A", "Boston", "San Fransisco"],
	answer: 3
},{
	question: "Bop Its three features were Bob-it, Twist-it, and ___",
	answerList: ["Pull-it", "Slap-it", "Yank-it", "Push-it"],
	answer: 0

}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yay, You Rock Dude!",
	incorrect: "No, Get Your Facts Str8!",
	endTime: "Wow Look at You, You Cant Even Keep Track of Time!!",
	finished: "Alright! Let's see how you did."
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
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
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
	//clicking an answer will pause the time and setup answerPage
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
	//sets timer to go down
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
	
	//checks to see correct, incorrect, or unanswered
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
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
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