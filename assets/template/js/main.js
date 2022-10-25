$(document).ready(function(){
	

    function menuHidden(){
        $('.menu_list').toggle();
        $(this).toggleClass('active');
        $('.menu_sidebar,.menu_list').toggleClass('active')
    }
    $('.menu-btn').on('click',menuHidden);


    // manufacturer slider

    $('.manufacturer_list').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow:$('.manufacturer-nav .slick-prev'),
        nextArrow:$('.manufacturer-nav .slick-next'),
        
    });
});