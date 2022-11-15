$(document).ready(function(){
    let productPrice =  parseInt($('.product_price').text().replace(/\s/g, '')) ;
    let sumOptions = new Map(); //ассоциативный массив 
    let hardSize = $('.hard-size'); //объем жесткого диска

    function calculated(){
        let headTitle = $(this).closest('.configurator_block').find('.configurator-head').text();
        let radioBtnPrice =  parseInt($(this).closest('.configurator_bottom_item').find('.configurator_bottom_price').text().replace(/\s/g, ''));
        let priceText = $('.product_price');
        let checboxesListIndex = $(this).closest('.configurator_bottom_item').index();

        if(isNaN(radioBtnPrice)) radioBtnPrice = 0;

        if(headTitle == "Оперативная память RAM"){
            sumOptions.set(headTitle + " " + checboxesListIndex + " : ",radioBtnPrice);
            if(!$(this).prop('checked')){
                sumOptions.delete(headTitle + " " + checboxesListIndex + " : ");
            }
        }
        else{
            sumOptions.set(headTitle + " : ",radioBtnPrice);
        }


        finallySum = productPrice + arrayCaclValues();

        priceText.text(finallySum.toLocaleString() + ' руб')
    }

    function checkRamCount(){
        let currentCheckbox = $(this).prop('checked');
        let currentRamInput = $(this).closest('.configurator_bottom_item').find('.ram-count')

        if(currentCheckbox) {
            currentRamInput.show();
            $(this).closest('.configurator_bottom_item').find('.custom-radio').addClass('active')
        }
        else {
            currentRamInput.hide();
            $(this).closest('.configurator_bottom_item').find('.custom-radio').removeClass('active')
        }
    }
    function ramInputValue(){
        let maxSizeRam = parseInt($('.custom-radio-btn.active').attr('data-max-val'));
        let current = $(this);
        let inputParent = $('.configurator_block-ram .configurator_bottom_item').find('.custom-radio')
        let countValus = $('.custom-radio:checked').closest('.configurator_bottom_item').find('.ram-count')
        let countMaxSizeRam = 0;
        let sum = 0;
        let lastValue = current.val()
        countMaxSizeRam = maxSizeRam;  

        countValus.attr({
            "min":0
        })

        countValus.each(function(i){
            sum += parseInt(countValus[i].value);
            if(sum <= 0) sum = 1;  
        })
        countMaxSizeRam = countMaxSizeRam - sum;

        if(sum == maxSizeRam){
            current.val(lastValue)
            inputParent.not('.active').prop('disabled',true)
            inputParent.not('.active').closest('.configurator_bottom_item').addClass('disabled')
            
            countValus.each(function(i){
                if(countValus[i].value == 0){
                    console.log($(countValus[i]).closest('.configurator_bottom_item').find('.custom-radio.active')[0])
                    let currentInput = $(countValus[i]).closest('.configurator_bottom_item').find('.custom-radio.active')[0]
                    $(countValus[i]).closest('.configurator_bottom_item').addClass('disabled')
                    $(currentInput).removeClass('active')
                    $(currentInput).prop('checked',false)
                    $(countValus[i]).hide()
                }
            })
        }
        else{
            inputParent.prop('disabled',false)
            inputParent.closest('.configurator_bottom_item').removeClass('disabled')
        }
        if(countMaxSizeRam < 0){
            current.val(1) 
            inputParent.not('.active').prop('disabled',true)
            inputParent.not('.active').closest('.configurator_bottom_item').addClass('disabled')
        }
        else{
            inputParent.not('.active').prop('disabled',false)
            inputParent.not('.active').closest('.configurator_bottom_item').removeClass('disabled')
        }
        
    }

    //фильтрация по атрибутам
    // function filter(){
    //    let block = $(this),
    //        blockAttr = block.val(),
    //        items = block.closest('.configurator_block').find('.configurator_bottom_item'),
    //        itemsInputDataManuf = items.find(`input[data-manuf="${blockAttr}"]`).closest('.configurator_bottom_item'),
    //        checboxes = $(this).closest('.configurator_checkboxes').find('input')

    //     if(block.prop('checked')){
    //         items.addClass('hidden')
    //         itemsInputDataManuf.removeClass('hidden')

    //     }
    //     else if(!block.prop('checked')){
    //         itemsInputDataManuf.addClass('hidden')
    //     }
        
    //     let checboxFalse = new Map();
    //     checboxes.each(function(i){
    //         if(!checboxes[i].checked){
    //             checboxFalse.set(i,checboxes[i])
    //         }
    //     })

    //     if(checboxes.length == checboxFalse.size){
    //         items.removeClass('hidden')
    //     }
    // }

    function cpuChange(){
        let titleRadioBtn = $(this).closest('.configurator_radio-block').find('label').text();
        let spanInCpuItem = $('.configurator_block-cpu').find('.configurator_bottom_item label span');
        let priceCount = $('.configurator_block-cpu .configurator_bottom_price');
        let currentBtn = $(this).closest('.configurator_btns .configurator_radio-block').index();
        let cpuChecked = $('.configurator_block-cpu .custom-radio:checked')

        

        let priceArray = ['data-x2','data-x4','data-x8'];

        priceCount.each(i => {
            $(priceCount[i]).text(priceCount[i].getAttribute(priceArray[currentBtn]))
        });


        cpuChecked.click();
        spanInCpuItem.html(titleRadioBtn);

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
    //$('.configurator_top_item input').on('click input',filter);

    $('.configurator_radio-block input').on('click',cpuChange)

    $('.configurator_block-ram .custom-radio').on('click',checkRamCount)

    $('.configurator_block-ram .ram-count').on(' input change',ramInputValue)

    $('.custom-radio-btn').on('click',function(){
        $('.custom-radio-btn').removeClass('active')
        $(this).addClass('active')
    }) 
})