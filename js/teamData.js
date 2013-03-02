
$(document).ready(function(){


		loadTeams();
		function loadTeams(){
		$.ajax({
		url: 'backliftapp/nssbaseballtesting',
		type: 'get',
		// dataType: 'text',
		success: function(data) {
			league=data;
			$('tbody').html(" ");
			// alert("clearing");
			
			
			for (i=0; i < data.length; i++){
		    $("#standings").append('<tr><td id='+ data[i].id +'><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + data[i].team_name + '</span></td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + data[i].percentage + '</td><td><button name="delete" class="btn-small delete" id="'+ data[i].id +'">Delete</button></td></tr>')
		

			var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + data[i].first_name + ' ' + data[i].last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + data[i].phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + data[i].sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + data[i].zipcode + '</p></div>';
			$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})//end popover
			
			var key = data[i].team_name;
			console.log("<p id="+ data[i].id + ">" + key + "</p>");


			}// end for statement
		


		},//end success
		error: function(data) {
			alert("fail get");
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
		// team_number: function(){
		// var teamNumber = 0;
		// teamNumber += 1;
		// return teamNumber;

		
		// },//end team_number
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




}); //end ready
