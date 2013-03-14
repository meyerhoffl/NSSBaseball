// ********************************************* Function for Writing Schedule to Page ***************************************

$(document).ready(function(){
	$(".schedule, #addScores, #Play").hide();

	var schedule=function(league){
		var teamSchedule=[ 
			[ [1, 6], [2, 5], [3, 4] ],
			[ [1, 5], [4, 6], [2, 3] ],
			[ [1, 4], [3, 5], [2, 6] ],
			[ [1, 3], [2, 4], [5, 6] ],
			[ [1, 2], [3, 6], [4, 5] ],
		];

		$(".schedule").each(function(i, elem){
			$(elem).find(".week").prepend("<h3>Week " + (i +1) + "</h3>");
				$(elem).find(".span4").each(function(j, elem2){

						var game = teamSchedule[i][j];
						var team1 = game[0] - 1;
						var team2 = game[1] - 1;
		
				$(elem2).append('<label>' + league[team1].team_name + '</label>' + '<input class="number" id="'+ i + league[team1].id +'" />');
				$(elem2).append('<label>' + league[team2].team_name + '</label>' + '<input class="number" id="'+ i + league[team2].id +'" /><br/>');
				
			});//end elem next
		});//end schedule.each
	};//end schedule
// ************************************* Function for Evaluating Winner and Loser, Writing to Server **********************

	var tallyScores=function(league){

		

		var teamSchedule=[ 
			[ [1, 6], [2, 5], [3, 4] ],
			[ [1, 5], [4, 6], [2, 3] ],
			[ [1, 4], [3, 5], [2, 6] ],
			[ [1, 3], [2, 4], [5, 6] ],
			[ [1, 2], [3, 6], [4, 5] ],
			];

		$(".schedule").each(function(i, elem){
			$(elem).find(".week");
				$(elem).find(".span4").each(function(j, elem2){
					var game = teamSchedule[i][j];
					var team1 = game[0] - 1;
					var team2 = game[1] - 1;
					

					if(parseInt($('#' + i + league[team1].id).val()) > parseInt($('#' + i + league[team2].id).val())){
						
						// alert($('#input-' + data[team1].id).val());
	
							
							
							console.log($('#' + i + league[team1].id).val() + " is greater than " + $('#' + i + league[team2].id).val())
								$.ajax({
									url: '/backliftapp/nssbaseballtesting/' + league[team1].id,
									type: 'PUT',
									dataType: 'JSON',
									data: {wins: function()
												{parseInt(league[team1].wins = parseInt(1) + parseInt(league[team1].wins));
												return parseInt(league[team1].wins);},
											percentage: function()
													{
													return parseInt(league[team1].wins)/parseInt(league[team1].wins) + parseInt(league[team1].losses);
													}
										  	},
									success: function(league) {
									console.log(league[team1]);
									

									},//end success
		
									error: function(league) {
										alert("fail post");
									}//end error
								})//end post

								$.ajax({
									url: '/backliftapp/nssbaseballtesting/' + league[team2].id,
									type: 'PUT',
									dataType: 'JSON',
									data: {losses: function()
												{parseInt(league[team2].losses = parseInt(1) + parseInt(league[team2].losses));
												return parseInt(league[team2].losses);},
											percentage: function(){
												if (parseInt(league[team2].wins) === 0){
													return 0;
													}
												else{
													return parseInt(league[team2].wins)/parseInt(league[team2].wins) + parseInt(league[team2].losses);
													}
											}
										  },
									success: function(league) {
									

					
									},//end success
		
									error: function(league) {
										alert("fail post");
									}//end error
								})//end post
					}//end if

	
					else {
						
						console.log($('#' + i +  league[team1].id).val() + " is less than " + $('#' + i +  league[team2].id).val());
							
							// data[team2].wins += 1;
							// data[team1].losses += 1;
					
	
								$.ajax({
									url: '/backliftapp/nssbaseballtesting/' + league[team2].id,
									type: 'PUT',
									dataType: 'JSON',
									data: {wins: function()
												{parseInt(league[team2].wins = parseInt(1) + parseInt(league[team2].wins));
												return parseInt(league[team2].wins);},
											percentage: function(){
												return parseInt(league[team2].wins)/parseInt(league[team2].wins) + parseInt(league[team2].losses);
											}
										  },
									success: function(league) {
									
									},//end success
		
									error: function(league) {
										alert("fail post");
									}//end error
								})//end post

								$.ajax({
									url: '/backliftapp/nssbaseballtesting/' + league[team1].id,
									type: 'PUT',
									dataType: 'JSON',
									data: {losses: function()
												{parseInt(league[team1].losses = parseInt(1) + parseInt(league[team1].losses));
												return parseInt(league[team1].losses);},
											percentage: function(){
												if (parseInt(league[team1].wins) === 0){
													return 0;
													}
												else{
													return parseInt(league[team2].wins)/parseInt(league[team2].wins) + parseInt(league[team2].losses);
													}
											}
										  },
									success: function(league) {
					
					
									},//end success
		
									error: function(league) {
										alert("fail post");
									}//end error
								})//end post
					}//end else
				});//end elem next
			});//end schedule each
	};//end tallyScores


//********************************************************* Sorting Function *****************************************

function sort(){
 $("#standings").tablesorter(); 
};

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
			success: function(league) {
				
				
				limitTeams(league);


				$('tbody').html(" ");
			
					for (i=0; i < league.length; i++){
			    		$("#standings").append('<tr><td id='+ league[i].id +'><span class="infopopover" rel="popover" data-original-title="Team info:"> ' + league[i].team_name + '</span></td><td>' + league[i].wins + '</td><td>' + league[i].losses + '</td><td>' + league[i].percentage + '</td><td><button name="delete" class="btn-small delete" id="'+ league[i].id +'">Delete</button></td></tr>')
		
						var popovercontent = '<div class="popover-content"><p><strong>Owner:</strong>' + ' ' + league[i].first_name + ' ' + league[i].last_name + '</p>' + '<p><strong>Phone:</strong>' + ' ' + league[i].phone + '</p>' + '<p><strong>Sponsor:</strong>' + ' ' + league[i].sponsor + '</p>' + '<p><strong>Zip Code:</strong>' + ' ' + league[i].zipcode + '</p></div>';
						
						$('.infopopover').popover({ html : true, trigger: 'hover', content: popovercontent})//end popover
					
					}// end for statement
	
			},//end success

		
			error: function(league) {
				alert("fail get")
				}//end error
		});//end get
		
	

	};//end loadTeams


// ********************************************* Limit Teams ********************************************


function limitTeams(x){
	if (x.length>=6){
		$("#addteambutton").hide();
		$("#standings").after("<h4 id='full'>League is Full</h4>");
		$("#Play").show();
		$("#addScores").hide();


	}
	else{
		$("#full").hide();
		$("#addteambutton").show();
		$("#Play").hide();
		return false;
	}
}

// ********************************************* Adding Teams to Server ********************************************
loadTeams();

	$("#addteambutton").click(function(){
		
		$(".submit").one('click', function(){
			
			$.ajax({
				url: '/backliftapp/nssbaseballtesting',
				type: 'POST',
				dataType: 'JSON',
				data: {
					team_name: $("#teamname").val(),
					first_name: $("#firstname").val(),
					last_name: $("#lastname").val(),
					phone: $("#phone").val(),
					sponsor: $("#sponsor").val(),
					zipcode: $("#zipcode").val(),
					wins: 0,
					losses: 0,
					percentage: 0,
					},	//end data
				success: function(data) {
						
						loadTeams();

						
				
				},//end success
		
				error: function(data) {
					alert("fail post");
				}//end error
			
			
			})//end post
			
				clearForm();
				$.colorbox.close()

				
		
			});//end submit click
		
	}); // addteambutton END CLICK

// ********************************************* Deleting a Team ******************************************************

	$('table').on("click", ".delete", function(event){
		$.ajax({
			url: 'backliftapp/nssbaseballtesting/' + $(this).attr('id'),
			type: 'DELETE',
			success: function(league) {

				$(this).closest('tr').remove();
				loadTeams();
				
			},//end success

			error: function(league){
				alert("fail delete");
			}//end error 
		})//end delete
	})//end delete click

	// ********************************************* Writing Schedule to Page ****************************************

	$("#Play").click(function(){
	
		$.ajax({
			url: 'backliftapp/nssbaseballtesting',
			type: 'get',
			// dataType: 'text',
			success: function(league) {
				$(".schedule").show();
				schedule(league);
				$("#Play").hide();
				$("#addScores").show();
				$("#full").hide();

	
			},//end success
	
			error: function(league) {
				alert("fail get")
			}//end error
		});//end get

	});//end update schedule click

	// ************************************* Evaluating Winner and Loser, Writing to Server **************************

	$("#addScores").click(function(){
	
		$.ajax({
			url: '/backliftapp/nssbaseballtesting',
			type: 'get',
			// dataType: 'json',
			// data: teamInfo,
			success: function(league) {
	
			tallyScores(league);
			loadTeams();
			$("#addScores").hide();
			$(".schedule").hide();
			
			
			
	
			},//end success
	
			error: function(league) {
				alert("fail post");
			}//end error
		})//end post
	});//end update results



		// ************************************************** Sort Results  ****************************************


		$("#standings").hover(function(){
			sort();
			$("[rel=tooltip]").tooltip();
			
		});

	



}); //end ready
