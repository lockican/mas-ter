$(document).ready(function(){
    function menuHidden(){
        $(this).toggleClass('active');

        if ($(window).width() > 769){
            $('.menu_list--desc').toggle();
            $('.menu_sidebar,.menu_list--desc').toggleClass('active')
        }
        else{
            $('.menu_list--mob').toggle();
            $('.menu_sidebar,.menu_list--mob').toggleClass('active')
        }
    }
    $('.menu-btn').on('click',menuHidden);

    // manufacturer slider

    $('.manufacturer_list').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow:$('.manufacturer-nav .slick-prev'),
        nextArrow:$('.manufacturer-nav .slick-next'),
        responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,      
                arrows:false 
              }
            },
        ]
    });

    //

    if ($(window).width() < 768) {
        $('.first_bottom_list').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            arrows:false,
            accessibility: false,
            infinite: true,
        })
    }

    

    // review slider

    $('.reviews_list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:$('.review_btns .slick-prev'),
        nextArrow:$('.review_btns .slick-next'),
        dots:true,
        appendDots:$('.dots'),
        adaptiveHeight: true

    });

    // products slider (cart)

    $('.products_list--slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:$('.bnts_slider .prev'),
        nextArrow:$('.bnts_slider .next'),
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

     //show items configurator

    //  $('.btn-show-more').on('click',function(e){
    //     e.preventDefault();
    //     $(this).closest('.configurator_bottom-list').find('.configurator_bottom_item').show();
    //     $(this).hide();
    //  })

     $('.configurator_btn').on('click',function(e){
        e.preventDefault();
        $('.configurator_btn').removeClass('current');
        $(this).addClass('current');
     })
});