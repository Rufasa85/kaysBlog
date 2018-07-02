$(document).ready(function(){
	$('.deleteBtn').on('click', function(e) {
		e.preventDefault();
		var myUrl = $(this).attr('href');
	    // console.log(myUrl);
	    $.ajax({
	        method:'DELETE',
	        url:myUrl
	    }).done(function(){
	        window.location.href='/'
	    });
	})
})