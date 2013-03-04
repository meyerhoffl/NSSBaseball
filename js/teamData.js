
$(document).ready(function(){
	var schedule=function(data){
		var teamSchedule=[ 
			[ [1, 6], [2, 5], [3, 4] ],
			[ [1, 5], [4, 6], [2, 3] ],
			[ [1, 4], [3, 5], [2, 6] ],
			[ [1, 3], [2, 4], [5, 6] ],
			[ [1, 2], [3, 6], [4, 5] ],
		];

		$(".schedule").each(function(i, elem){
			$(elem).find(".week").text(i + 1);
			$(elem).next().find(".span4").each(function(j, elem2){
				var game = teamSchedule[i][j];
				var team1 = game[0] - 1;
				var team2 = game[1] - 1;
	
				$(elem2).append('<label>' + data[team1].team_name + '</label>' + '<input class="number" id=' + data[team1].id + ' />');
				$(elem2).append('<label>' + data[team2].team_name + '</label>' + '<input class="number" id=' + data[team2].id + ' /><br/>');
				$(elem2).append('<br /><button class="score btn-small">Tally Score</button>');


	
			});//end elem next
		});//end schedule.each

		
	};//end schedule

	var tallyScores=function(data){
		alert("tallying score");

var teamSchedule=[ 
			[ [1, 6], [2, 5], [3, 4] ],
			[ [1, 5], [4, 6], [2, 3] ],
			[ [1, 4], [3, 5], [2, 6] ],
			[ [1, 3], [2, 4], [5, 6] ],
			[ [1, 2], [3, 6], [4, 5] ],
		];

		$(".schedule").each(function(i, elem){
			$(elem).find(".week").text(i + 1);
			$(elem).next().find(".span4").each(function(j, elem2){
				var game = teamSchedule[i][j];
				var team1 = game[0] - 1;
				var team2 = game[1] - 1;
	

	if ($(data[team1].id).val() > $(data[team2].id).val()){
			alert(data[team1].team_name + "wins!");
			}//end if
	
	else($(data[team1].id).val() < $(data[team2].id).val())
		{
				alert("second team wins");
		}//end else

	
	});//end elem next
});//end schedule each


	};//end tallyScores



		loadTeams();
		function loadTeams(){
		$.ajax({
		url: 'backliftapp/nssbaseballtesting',
		type: 'get',
		// dataType: 'text',
		success: function(data) {
			league=data;
			// schedule(data);
			
			$('tbody').html(" ");
			// alert("clearing");
			
			
			for (i=0; i < data.length; i++){
		    $("#standings").append('<tr><td id='+ data[i].id +'><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + data[i].team_name + '</span></td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + data[i].percentage + '</td><td><button name="delete" class="btn-small delete" id="'+ data[i].id +'">Delete</button></td></tr>')
		

			var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + data[i].first_name + ' ' + data[i].last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + data[i].phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + data[i].sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + data[i].zipcode + '</p></div>';
			$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})//end popover
			
			var key = data[i].team_name;
			
			}// end for statement
		


		},//end success
		error: function(data) {
			alert("fail get")
		}//end fail
	});//end get

};//end loadTeams




$("#addteambutton").click(function(){
if (league.length >= 6){
	$('#addteambutton').unwrap();

alert("league is full");


	}
	else
	{

$(".submit").one('click', function(){

	var teamInfo={
		team_name: $("#teamname").val(),
		first_name: $("#firstname").val(),
		last_name: $("#lastname").val(),
		phone: $("#phone").val(),
		sponsor: $("#sponsor").val(),
		zipcode: $("#zipcode").val(),
		wins: 1,
		losses: 5,
		percentage: function() {
			return teamInfo.wins / (teamInfo.wins + teamInfo.losses); 
		}//end percentage
		

	};//end var teamInfo


	$.ajax({
		url: '/backliftapp/nssbaseballtesting',
		type: 'post',
		dataType: 'json',
		data: teamInfo,
		success: function(data) {
			// console.log(teamInfo);
			function writeTeam(teamInfo){
		    $("#standings").append('<tr><td id=' + teamInfo.id +'><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + teamInfo.team_name + '</span></td><td>' + teamInfo.wins + '</td><td>' + teamInfo.losses + '</td><td>' + teamInfo.percentage + '</td><td><button name="delete" class="btn-small delete" id=' + teamInfo.id +'>Delete</button></td></tr>');
		   		

			var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + teamInfo.first_name + ' ' + teamInfo.last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + teamInfo.phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + teamInfo.sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + teamInfo.zipcode + '</p></div>';
			$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})//end popover

			// var key = teamInfo.team_name;
			// console.log("<p id=" + teamInfo.id + ">" + key + "</p>");
			// return key;

		};//close writeTeam

		
		
			
			// alert("adding team");
			writeTeam(data);
			
			league.push(teamInfo);
			// console.log(league);

			
		
		},//end success
	
		error: function(data) {
			alert("fail post");
		}//end error
	})//end post
	

	clearForm();
	$.colorbox.close()


	});//end submit click


function clearForm(){
	$(".required").each(function(){
		$(this).val("");
	});		
};//end clearForm




}//end else

	
 }); // addteambutton END CLICK


$('table').on("click", ".delete", function(event) {
// alert("deleting");

$.ajax({
	url: 'backliftapp/nssbaseballtesting/' + $(this).attr('id'),
	type: 'DELETE',
	success: function(data) {

		
		$(this).closest('tr').remove();
		console.log("deleted");
		loadTeams();
		
		},//end success
	error: function(data){
		alert("fail delete");
	}//end error 


})//end delete


})//end delete click

$("#updateSchedule").click(function(){

$.ajax({
		url: 'backliftapp/nssbaseballtesting',
		type: 'get',
		// dataType: 'text',
		success: function(data) {
			// league=data;
			schedule(data);

		},//end success
		error: function(data) {
			alert("fail get")
		}//end fail
	});//end get
});//end update schedule click

$(".score").click(function(){

$.ajax({
		url: '/backliftapp/nssbaseballtesting',
		type: 'get',
		// dataType: 'json',
		// data: teamInfo,
		success: function(data) {
		tallyScores(data);

		},//end success


	
		error: function(data) {
			alert("fail post");
		}//end error
	})//end post




});//end score click





}); //end ready
