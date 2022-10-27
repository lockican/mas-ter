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

    // cart slider
    $('.cart_list--top').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.cart_list--bottom'
      });
      $('.cart_list--bottom').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.cart_list--top',
        focusOnSelect: true,
        arrows:false,
        variableWidth:true
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


    // Табы 

    $('.js-tab-trigger').click(function() {
        var id = $(this).attr('data-tab'),
            content = $('.js-tab-content[data-tab="'+ id +'"]');
        
        $('.js-tab-trigger.current').removeClass('current');  
        $(this).addClass('current'); 
        
        $('.js-tab-content.current').removeClass('current');  
        content.addClass('current');  
     });
});