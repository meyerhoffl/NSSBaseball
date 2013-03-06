$(document).ready(function(){

	function loadteams(){
		$.ajax({
		url: '/backliftapp/nssbaseball',
		type: 'get',
		// dataType: 'text',
		success: function(data) {
			league=data;
			$('tbody').html(' ');
			for (i=0; i< data.length; i++){
		    $("#standings").append('<tr><td><span class="infopopover"  id=' + data[i].id + ' rel="popover" data-original-title="Team info:"> ' + data[i].team_name + '</span></td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + data[i].percentage + '</td><td><button id=' + data[i].id + ' class="btn btn-small exterminate">Exterminate</button></td></tr>')
			var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + data[i].first_name + ' ' + data[i].last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + data[i].phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + data[i].sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + data[i].zipcode + '</p></div>';
			$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})
		}},
		error: function(data) {
			alert("fail");
		}
	});
};

	function printSchedule(){
	$.ajax({
			url: 'backliftapp/nssbaseball',
			type: 'get',
			// dataType: 'text',
			success: function(data) {
				league = data;
				makeSchedule(data);

			},//end success
			error: function(data) {
				alert("fail get")
			}//end fail
		});//end get

	function makeSchedule(data) {
				var sched=[ 
		[ [1, 6], [2, 5], [3, 4] ],
		[ [1, 5], [4, 6], [2, 3] ],
		[ [1, 4], [3, 5], [2, 6] ],
		[ [1, 3], [2, 4], [5, 6] ],
		[ [1, 2], [3, 6], [4, 5] ],
		];

		for (w=0; w < sched.length; w++) {
			$('a #week'+w).append("<h3>Week"+ " " + w + " Games:</h3>");
			$("#week"+(w+1)).html(' ');


			for (g=0; g < sched[w].length; g++) {
				var teamOne = data[sched[w][g][0]-1].team_name;
				var teamTwo = data[sched[w][g][1]-1].team_name;

			$("#week"+(w+1)).append("<p>" + teamOne + " " + "<input type='num' class='scorefield score-teamOne'/>" + " vs. " + teamTwo + "<input type='num' class='scorefield score-teamTwo'/>" + "</p>");

			}

		}
	}
};

 	printSchedule();
	loadteams();


$("#updateScores").click(function(){
		var sched=[ 
		[ [1, 6], [2, 5], [3, 4] ],
		[ [1, 5], [4, 6], [2, 3] ],
		[ [1, 4], [3, 5], [2, 6] ],
		[ [1, 3], [2, 4], [5, 6] ],
		[ [1, 2], [3, 6], [4, 5] ],
		];

		$.ajax({
			url: 'backliftapp/nssbaseball',
			type: 'get',
			// dataType: 'text',
			success: function(data) {
				compare(data);
			},//end success
			error: function(data) {
				alert("fail get")
			}//end fail
		});//end get

		function compare(data){
		var teamOneScore = $(".score-teamOne").val();
		var teamTwoScore = $(".score-teamTwo").val();
		console.log(isNaN(teamOneScore));
		if (isNaN(teamOneScore)){
			return false;
		}

		else {

		for (w=0; w < sched.length; w++) {
		for (g=0; g < sched[w].length; g++) {
			var teamOne = data[sched[w][g][0]-1].team_name;
			var teamTwo = data[sched[w][g][1]-1].team_name;

		if (parseInt(teamOneScore) > parseInt(teamTwoScore)) {
			alert(teamOne + " wins");
		}
		else {
			alert(teamTwo + " wins");
		}}};
	};
	};





				// function compare(){
				// if teamOneScore > teamTwoScore {					
				// 	data[teamOne].wins += 1;
				// 	data[teamTwo].losses += 1;

				// }

				// else {
				// 	data[teamOne].losses += 1;
				// 	data[teamTwo].wins += 1;


				// }};





})



// BEGIN ADD Team

$("#addteambutton").click(function(){
	if (league.length >= 6) 
	 {
		alert("There are too many teams");
		$.colorbox.close()
	}
	else {
	$(".submit").one('click', function(){
	var teamInfo={
		team_name: $("#teamname").val(),
		first_name: $("#firstname").val(),
		last_name: $("#lastname").val(),
		phone: $("#phone").val(),
		sponsor: $("#sponsor").val(),
		zipcode: $("#zipcode").val(),
		wins: 0,
		losses: 0,
		percentage: function() {
			return teamInfo.wins / (teamInfo.wins + teamInfo.losses);
		}
	};
	console.log(teamInfo);
	$.ajax({
		url: '/backliftapp/nssbaseball',
		type: 'post',
		dataType: 'json',
		data: teamInfo,
		success: function(data) {
			function addTeam(teamInfo){
		$("#standings").append('<tr><td><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + teamInfo.team_name + '</span></td><td>' + teamInfo.wins + '</td><td>' + teamInfo.losses + '</td><td>' + teamInfo.percentage + '</td><td><button id=' + teamInfo.id + ' class="btn btn-small exterminate">Exterminate</button></tr>');

		var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + teamInfo.first_name + ' ' + teamInfo.last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + teamInfo.phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + teamInfo.sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + teamInfo.zipcode + '</p></div>';
		$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})
	};
			// console.log(data);
			addTeam(data);
			league.push(teamInfo);
		},
		error: function(data) {
			alert("fail");
		}
	})
	
	// addTeam(teamInfo);
	clearForm();
	$.colorbox.close()
	});//end click




function clearForm(){
	$(".required").each(function(){
		$(this).val("");
	});		
};
	}

 }); // END ADD TEAM


 // ----- EXTERMINATE BUTTON ------
 $('table').on("click", ".exterminate", function(event) {
	console.log("you are being exterminated");
	$.ajax({
		url: 'backliftapp/nssbaseball/' + $(this).attr('id'),
		type: 'DELETE',
		success: function(data) {
			console.log(data);
			$(this).closest('tr').remove();
			alert("You have been exterminated");
			loadteams();
		},
		error: function(data) {
			alert("fail");
		}
	});
});  //--- END EXTERMINATE BUTTON ----

});


