    jQuery(document).ready(function($){
        jQuery('#id').on('change', function(){
            $.ajax({
                method: 'POST',
                url: '/kamar/getkamar',
                data: {
                    id: jQuery('#id').val()
                },
                success: function (result) {
                    jQuery('body').html(result)
                },
            })
        })
    })