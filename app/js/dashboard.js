$(document).ready(function() {
	var currentPage = $(".nav-sidebar li:first-child").attr("attr"), newPage;

	$(".nav-sidebar li, .navbar-collapse li").click(function() {
		newPage = $(this).attr("attr");
		if(newPage == currentPage)
			return;
		else
			currentPage = newPage;
		$(".navbar-collapse li").attr("class", "");
		$(".nav-sidebar li").attr("class", "");
		$(".navbar-collapse li[attr='" + newPage + "']").attr("class", "active");
		$(".nav-sidebar li[attr='" + newPage + "']").attr("class", "active");
	});

});