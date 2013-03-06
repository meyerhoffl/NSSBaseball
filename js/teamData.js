
// ********************************************* Function for Writing Schedule to Page ***************************************

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
		
				$(elem2).append('<label>' + data[team1].team_name + '</label>' + '<input class="number" id="input-' + data[team1].id + '"" />');
				$(elem2).append('<label>' + data[team2].team_name + '</label>' + '<input class="number" id="input-' + data[team2].id + '"" /><br/>');
				$(elem2).append('<br /><button class="score btn-small">Tally Score</button>');
			});//end elem next
		});//end schedule.each
	};//end schedule

	// ************************************* Function for Evaluating Winner and Loser, Writing to Server **********************

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
			debugger;
		
					if(parseInt($('#input-' + data[team1].id).val()) > parseInt($('#input-' + data[team2].id).val())){
						console.log(data[team1].team_name + "wins!");
						alert($('#input-' + data[team1].id).val());
	
							data[team1].wins += 1;
							data[team2].losses += 1;
							
	
								$.ajax({
									url: '/backliftapp/nssbaseballtesting',
									type: 'post',
									// dataType: 'json',
									// data: teamInfo,
									success: function(data) {
					
					
									},//end success
		
									error: function(data) {
										alert("fail post");
									}//end error
								})//end post
					}//end if

	
					else {
						console.log(data[team2].team_name + "wins!");
						alert($('#input-' + data[team2].id).val());
	
	
							data[team2].wins += 1;
							data[team1].losses += 1;
					
	
								$.ajax({
									url: '/backliftapp/nssbaseballtesting',
									type: 'post',
										success: function(data) {
						
										},//end success
		
										error: function(data) {
											alert("fail post");
										}//end error
								})//end post
					}//end else
				});//end elem next
			});//end schedule each
	};//end tallyScores


// ********************************************* Function to Clear Data from Add Team Form ***************************

	function clearForm(){
				$(".required").each(function(){
				$(this).val("");
				});		
				};//end clearForm

// ********************************************* Function to Write Teams to Page *************************************

	function loadTeams(){
		$.ajax({
			url: 'backliftapp/nssbaseballtesting',
			type: 'get',
			// dataType: 'text',
			success: function(data) {
				league=data;
				$('tbody').html(" ");
			
					for (i=0; i < data.length; i++){
			    		$("#standings").append('<tr><td id='+ data[i].id +'><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + data[i].team_name + '</span></td><td>' + data[i].wins + '</td><td>' + data[i].losses + '</td><td>' + data[i].percentage + '</td><td><button name="delete" class="btn-small delete" id="delete-'+ data[i].id +'">Delete</button></td></tr>')
		
						var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + data[i].first_name + ' ' + data[i].last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + data[i].phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + data[i].sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + data[i].zipcode + '</p></div>';
						
						$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})//end popover
				
					}// end for statement
		
			},//end success
		
			error: function(data) {
				alert("fail get")
				}//end error
		});//end get

	};//end loadTeams

		loadTeams();
// ********************************************* Adding Teams to Server ********************************************

	$("#addteambutton").click(function(){
		if (league.length >= 6){

			("league is full");
		}

		else

		{$(".submit").one('click', function(){
			
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
					}//end percentage
			};//end var teamInfo
			
			
				$.ajax({
					url: '/backliftapp/nssbaseballtesting',
					type: 'post',
					dataType: 'json',
					data: teamInfo,
					success: function(data) {
		
						function writeTeam(teamInfo){
					    $("#standings").append('<tr><td id=' + teamInfo.id +'><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + teamInfo.team_name + '</span></td><td>' + teamInfo.wins + '</td><td>' + teamInfo.losses + '</td><td>' + teamInfo.percentage + '</td><td><button name="delete" class="btn-small delete" id="delete-'+ teamInfo.id +'">Delete</button></td></tr>');
					   	
						var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + teamInfo.first_name + ' ' + teamInfo.last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + teamInfo.phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + teamInfo.sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + teamInfo.zipcode + '</p></div>';
						$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})//end popover
			
						};//close writeTeam
		
							writeTeam(data);
							league.push(teamInfo);
					
					},//end success
			
						error: function(data) {
							alert("fail post");
						}//end error
			
					})//end post
			
				clearForm();
				$.colorbox.close()
		
			});//end submit click
		}//end else	
	}); // addteambutton END CLICK

// ********************************************* Deleting a Team ******************************************************

	$('table').on("click", ".delete", function(event){
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

	// ********************************************* Writing Schedule to Page ****************************************

	$("#updateSchedule").click(function(){
	
		$.ajax({
			url: 'backliftapp/nssbaseballtesting',
			type: 'get',
			// dataType: 'text',
			success: function(data) {
				
				schedule(data);
	
			},//end success
	
			error: function(data) {
				alert("fail get")
			}//end error
		});//end get
	});//end update schedule click

	// ************************************* Evaluating Winner and Loser, Writing to Server **************************

	$("#updateresults").click(function(){
	
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
	});//end update results
}); //end ready
