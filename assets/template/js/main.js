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

    // catalog form

    $('.btn-hide').on('click',function(e){
        e.preventDefault()
        $(this).toggleClass('close');
        $(this).closest('.form-block').find('.form_bottom-wrap').toggle()
        $(this).closest('.form-block').find('.form-top').toggleClass('close')
    })

    $('.sort_grid button').on('click',function(e){
        e.preventDefault(); 
        $('.sort_grid button').removeClass('current')
        $(this).addClass('current');

        let gridEl = $(this).hasClass('grid-column');
        let rowEl = $(this).hasClass('grid-row');

        if(rowEl) $('.products_list').addClass('row-el');
        else $('.products_list').removeClass('row-el');
    });
});