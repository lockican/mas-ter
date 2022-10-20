$(document).ready(function(){
	

    function menuHidden(){
        $('.menu_list').toggle();
        $(this).toggleClass('active');
    }


    $('.menu-btn').on('click',menuHidden);
});