$(document).ready(function() {
	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	};

	var app = new Vue({
		el: "#app",
		data: {
			current: '',
			answers: [],
			correct: '',
			correctInd: -1, 
			loading: true,
			show_answers: false,
			colored: false,
			numCorrect: 0,
			numIncorrect: 0,
		},
		created: function() {
			this.loading = false;
		},
		methods: {
			getTrivia: function() {
				fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple").then(response => {
					return response.json();
				}).then(json => {
					this.current = json.results[0].question;
					this.answers = json.results[0].incorrect_answers;
					this.answers.push(json.results[0].correct_answer);
					shuffle(this.answers);
					this.correct = json.results[0].correct_answer;
					this.colored = false;
					return true;
				}).catch(err => {
					console.log("Error" + err);
				})

			},
			showAnswers: function() {
				this.show_answers = true;
			},
			checkAnswer: function(answer) {
				this.colored = true;
				if(answer != this.correct){
					console.log("incorrect");
					this.numIncorrect += 1;
				}
				else{
					console.log("correct");
					this.numCorrect += 1;
				}
			},
		},
	});

	var todoApp = new Vue({
		el: "#todoApp",
		data: {
			todos: [],
			numTodos: 0,
			toAdd: '',
			completed: [],
		},
		methods: {
			addTodo: function() {
				this.numTodos++;
				this.todos.push({text: this.toAdd});
			},
			removeCompleted: function(index) {
				this.completed.splice(index, 1);
			},
			dragItem: function(item) {
		      this.drag = item;
		    },
		    dropItem: function(item) {
		      var indexItem = this.todos.indexOf(this.drag);
		      var indexTarget = this.todos.indexOf(item);
		      this.todos.splice(indexItem,1);
		      this.todos.splice(indexTarget,0,this.drag);
		    },
		    completeTodo: function(item) {
		    	var index = this.todos.indexOf(item);
		    	if (index > -1)
		    		this.todos.splice(index,1);
		    	this.completed.push(item);
		    	numTodos -= 1;
		    },
		    deleteTodo: function(item) {
		    	var index = this.todos.indexOf(item);
      			if (index > -1)
        			this.todos.splice(index,1);
		    },
		},
	});

	// var submitButton = $("#triviaSubmit");
	// var answers = ["No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet","No trivia yet"];

	// submitButton.click(function(e) {
	// 	e.preventDefault();
 //    	var myurl= "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
	// 	$.ajax({
	// 	    url : myurl,
	// 	    dataType : "json",
	// 	    success : function(json) {
	// 			console.log(json);
	// 			var results = "";
	// 			results += "<ol>";
	// 			for(var i = 0; i < json.results.length; i++) {
	// 				answer_list = [];
	// 				results += "<li>" + json.results[i].question;
	// 				answer_list.push("<li id='correct'>"+ json.results[i].correct_answer +"</li>");
	// 				for(var j = 0; j < 3; j++){
	// 					answer_list.push("<li>"+ json.results[i].incorrect_answers[j] +"</li>");
	// 				}
	// 				results += "<ul style='list-style: none;'>"; 
	// 				//add answers in a random order
	// 				shuffle(answer_list);
	// 				for(var j = 0; j < 4; j++){
	// 					results += answer_list[j];
	// 				}
	// 				results += "</ul></li>";
	// 				// results += "<button id='answer" + i + "' type='submit' class='btn btn-primary'>Answer</button><div id='show_correct'></div>"
	// 				answers[i] = json.results[i].correct_answer;
	// 			}
	// 			results += "</ol>";
	// 			// results += "<button id='show_answers' type='submit' class='btn btn-primary'>Show Answers</button>";
	// 			$("#triviaResults").html(results);
	// 			$("#show_answers").prop('disabled', false);
	//     	}
	// 	});
 //    });

	// var answerButton = $("#show_answers");
	// answerButton.click(function(e) {
	// 	e.preventDefault();
	// 	var answers_html = "<p>Answers: ";
	// 	for(var i = 1; i <= 10; i++) {
	// 		if(i == 10)
	// 			answers_html += i + ". " + answers[i-1];
	// 		else
	// 			answers_html += i + ". " + answers[i-1] + " | ";
	// 	}
	// 	answers_html += "</p>";
	// 	$('#answer_block').html(answers_html);
	// });
});







