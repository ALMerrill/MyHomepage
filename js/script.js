$(document).ready(function() {
	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	}

	var submitButton = $("#triviaSubmit");
	var answers = ["No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet"];

	submitButton.click(function(e) {
		e.preventDefault();
    	var myurl= "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
		$.ajax({
		    url : myurl,
		    dataType : "json",
		    success : function(json) {
				console.log(json);
				var results = "";
				results += "<ol>";
				for(var i = 0; i < json.results.length; i++) {
					answer_list = [];
					results += "<li>" + json.results[i].question;
					answer_list.push("<li id='correct'>"+ json.results[i].correct_answer +"</li>");
					for(var j = 0; j < 3; j++){
						answer_list.push("<li>"+ json.results[i].incorrect_answers[j] +"</li>");
					}
					results += "<ul style='list-style: none;'>"; 
					//add answers in a random order
					shuffle(answer_list);
					for(var j = 0; j < 4; j++){
						results += answer_list[j];
					}
					results += "</ul></li>";
					// results += "<button id='answer" + i + "' type='submit' class='btn btn-primary'>Answer</button><div id='show_correct'></div>"
					answers[i] = json.results[i].correct_answer;
				}
				results += "</ol>";
				// results += "<button id='show_answers' type='submit' class='btn btn-primary'>Show Answers</button>";
				$("#triviaResults").html(results);
				$("#show_answers").prop('disabled', false);
	    	}
		});
    });

	var answerButton = $("#show_answers");
	answerButton.click(function(e) {
		e.preventDefault();
		var answers_html = "<p>Answers: ";
		for(var i = 1; i <= 10; i++) {
			if(i == 10)
				answers_html += i + ". " + answers[i-1];
			else
				answers_html += i + ". " + answers[i-1] + " | ";
		}
		answers_html += "</p>";
		$('#answer_block').html(answers_html);
	})
});