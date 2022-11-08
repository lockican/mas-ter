$(document).ready(function(){
    let productPrice =  parseInt($('.product_price').text().replace(/\s/g, '')) ;
    let sumOptions = new Map(); //ассоциативный массив 

    let hardSize = $('.hard-size'); //объем жесткого диска

    function calculated(){
        let headTitle = $(this).closest('.configurator_block').find('.configurator-head').text() + " : ";
        let radioBtnPrice =  parseInt($(this).closest('.configurator_bottom_item').find('.configurator_bottom_price').text().replace(/\s/g, ''));
        let priceText = $('.product_price');
        if(isNaN(radioBtnPrice)) radioBtnPrice = 0;
        sumOptions.set(headTitle,radioBtnPrice);

        finallySum = productPrice + arrayCaclValues();

        priceText.text(finallySum.toLocaleString() + ' руб')
        
    }

    //фильтрация по атрибутам
    function filter(){
       let block = $(this),
           blockAttr = block.val(),
           items = block.closest('.configurator_block').find('.configurator_bottom_item'),
           itemsInputDataManuf = items.find(`input[data-manuf="${blockAttr}"]`).closest('.configurator_bottom_item'),
           checboxes = $(this).closest('.configurator_checkboxes').find('input')

        if(block.prop('checked')){
            items.addClass('hidden')
            itemsInputDataManuf.removeClass('hidden')

        }
        else if(!block.prop('checked')){
            itemsInputDataManuf.addClass('hidden')
        }
        
        let checboxFalse = new Map();
        checboxes.each(function(i){
            if(!checboxes[i].checked){
                checboxFalse.set(i,checboxes[i])
            }
        })

        if(checboxes.length == checboxFalse.size){
            items.removeClass('hidden')
        }
    }

    function addProcessorNumbers(){
        let titleRadioBtn = $(this).closest('.configurator_radio-block').find('label').text();
        let cpuItems = $('.configurator_block-cpu').find('.configurator_bottom_item label');

        cpuItems.prepend(titleRadioBtn + " x ");

         
        
    }

    // получаем сумму значения массива sumOptions
    function arrayCaclValues(){
        let sum = 0;
        for (let value  of sumOptions.values()) {
            sum += value;
        }
        return sum;
    }

    //Преобразование гб в тб

    const convertBytes = function(bytes) {
        const sizes = ["GB", "TB"]
      
        if (bytes == 0) {
          return "n/a"
        }
      
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      
        if (i == 0) {
          return bytes + " " + sizes[i]
        }

        if(sizes[i] === undefined) return;
      
        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
      }

    hardSize.on('click',function(){
        $(this).val('');
    })

    hardSize.on('blur',function(){
        let val = parseInt($(this).val());
        $(this).val(convertBytes(val));
        if(isNaN(val)){
            $(this).val('8 TB')
        }
    })

    $('.configurator_bottom_radio input').on('click',calculated);
    $('.configurator_top_item input').on('click input',filter);

    $('.configurator_radio-block input').on('click',addProcessorNumbers)
})