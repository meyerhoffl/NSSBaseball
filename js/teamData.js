// ********************************************* Function for Writing Schedule to Page ***************************************

$(document).ready(function(){

	var schedule=function(league){
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
		
				$(elem2).append('<label>' + league[team1].team_name + '</label>' + '<input class="number" id="'+ i + league[team1].id +'" />');
				$(elem2).append('<label>' + league[team2].team_name + '</label>' + '<input class="number" id="'+ i + league[team2].id +'" /><br/>');
				
			});//end elem next
		});//end schedule.each
	};//end schedule

// ************************************* Function for Evaluating Winner and Loser, Writing to Server **********************

	var tallyScores=function(league){

		alert("tallying score");

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
	
							
							alert("team1 is higher");
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
						alert("team2 is higher");
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


//********************************************** Function to play again with same teams ******************************


// $("#playAgain").click(function() {

//       for (var i = 0; i < league.length; i ++) {
//         $.ajax({
//           url: '/backliftapp/nssbaseballtesting',
//           type: "PUT",
//           dataType: "JSON",
//           data:{ data[i].wins: 0, data[i].losses:0, data[i].percentage: 0
//           },
//             success: function (data) {
           
//             loadTeams();
           
//           }//end success
//         }); // end PUT
//       };//end for
//   });//end click

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

		
// ********************************************* Adding Teams to Server ********************************************
loadTeams();

	$("#addteambutton").click(function(){
		// if (league.length >= 6){

		// 	("league is full");
		// }

		// else

		// {
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
		// }//end else	
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

	$("#updateSchedule").click(function(){
	
		$.ajax({
			url: 'backliftapp/nssbaseballtesting',
			type: 'get',
			// dataType: 'text',
			success: function(league) {
				
				schedule(league);
	
			},//end success
	
			error: function(league) {
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
			success: function(league) {
	
			tallyScores(league);
			loadTeams();
			
			
	
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
