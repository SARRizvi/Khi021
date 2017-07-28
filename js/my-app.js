// Initialize your app
var myApp = new Framework7({
	material: true,
	swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

var authhh = window.localStorage.getItem("auth");
if(authhh == 'false' || authhh == null || authhh == 'null'){
	mainView.router.loadPage('login.html');
}

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

$$(document).on('pageInit', function (e) {



	$(".swipebox").swipebox();
	$(".videocontainer").fitVids();
	
	var page = e.detail.page;


	if(page.name === 'ywc'){



		$.post('http://mmsonline.website/test/data.php',{action:'get district'},function(e){
			$("#district").html(e);
		});
		$.post('http://mmsonline.website/test/data.php',{action:'get crimes'},function(e){
			$("#crimes").html(e);
		});
		$.post('http://mmsonline.website/test/data.php',{action:'get years'},function(e){
			$(".years").html(e);
		});
	}
	if(page.name === 'hc'){
		$.post('http://mmsonline.website/test/data.php',{action:'get district'},function(e){
			$("#district").html(e);
		});
		$.post('http://mmsonline.website/test/data.php',{action:'get years'},function(e){
			$(".years").html(e);
		});

	}
	if(page.name === 'tc'){
		$.post('http://mmsonline.website/test/data.php',{action:'get district'},function(e){
			$("#district").html(e);
		});
	}

	if (page.name === 'login') {
		myApp.params.swipePanel = false;
	} else if(page.name === 'register') {
		myApp.params.swipePanel = false;
	} else if(page.name === 'remember') {
		myApp.params.swipePanel = false;
	} else {
		myApp.params.swipePanel = 'left';
	}
	// Action Sheet to Share Posts
	$('.share-post').on('click', function () {

		var buttons = [
			{
				text: '<span class="text-thiny">Share this post with your friends</span>',
				label: true
			},
			{
				text: '<span class="text-small share-post-icon share-post-facebook"><i class="flaticon-facebook"></i> Share on Facebook</span>',
			},
			{
				text: '<span class="text-small share-post-icon share-post-twitter"><i class="flaticon-twitter"></i> Share on Twitter</span>',
			},
			{
				text: '<span class="text-small share-post-icon share-post-whatsapp"><i class="flaticon-whatsapp"></i> Share on Whatsapp</span>',
			},
			{
				text: '<span class="text-small">Cancel</span>',
				color: 'red'
			},
		];
		myApp.actions(buttons);
	});
});

function getResult(){
	$('.chartWala').html('Loading');

	var dist = $("#district").val() , crime = $("#crimes").val(), from = $("#from").val(), to= $("#to").val();
	$.post('http://mmsonline.website/test/data.php',{action:'get result',dist:dist,crime:crime,to:to,from:from},function(e){
		var jsonData = JSON.parse(e);
		var a = '<canvas id="myChart" width="400" height="400"></canvas>';
		$('.chartWala').html(a);
		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: jsonData.year,
				datasets: [{
					label: '# of Votes',
					data: jsonData.sum,
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});

	});
}
function getResult2(){
	$('.chartWala').html('Loading');
	var dist = $("#district").val();
	var from = $("#from").val();
	var to = $("#to").val();
	$.post('http://mmsonline.website/test/data.php',{action:'get result2',dist:dist,from:from,to:to},function(e){
		console.log(e);
		var jsonData = JSON.parse(e);
		var a = '<canvas id="myChart" width="400" height="600"></canvas>';
		$('.chartWala').html(a);
		var ctx = document.getElementById("myChart");
		var data = {
			labels: jsonData.crime,
			datasets: [
				{
					data: jsonData.sum,
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					]
				}
			]
		};
		var myChart = new Chart(ctx, {
			type: 'doughnut',
			data: data
		});

	});
}
function getResult3(){
	$('.chartWala').html('Loading');
	var dist = $("#district").val();
	$.post('http://mmsonline.website/test/data.php',{action:'get result3',dist:dist},function(e){
		console.log(e);
		var jsonData = JSON.parse(e);
		var a = '<canvas id="myChart" width="400" height="600"></canvas>';
		$('.chartWala').html(a);
		var ctx = document.getElementById("myChart");
		var data = {
			labels: jsonData.crime,
			datasets: [
				{
					data: jsonData.sum,
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					]
				}
			]
		};
		var myChart = new Chart(ctx, {
			type: 'pie',
			data: data
		});

	});
}
function doLogin(){
	var a = $("#user").val();
	var b = $("#pwd").val();
	if(a == 'admin' && b == '123'){
		window.localStorage.setItem("auth","true");
		window.location.reload();
	}else{
		$("#errror").html("Invalid Credentials");
		window.localStorage.setItem("auth","false");
	}
}