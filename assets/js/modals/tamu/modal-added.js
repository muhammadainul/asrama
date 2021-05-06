jQuery(document).on('click', '.openActionAddPricelist', function (){
    jQuery("#actionAddedConfirmation").modal('show')

    setTimeout(function (){
        window.location.href='/pricelist'
    }, 3000)
})