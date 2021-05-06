//for RFID
onScan.attachTo(document, {
    reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
    onScan: function(sCode, iQty) { // Alternative to document.addEventListener('scan')
        // Get the focused element:
        var $focused = $(':focus');

        if($focused.length > 0){
            if($focused[0].tagName === "INPUT" && $focused[0].type === "text" || $focused[0].tagName === "INPUT" && $focused[0].type === "number"){
                var newVal = $("#"+$focused[0].id).val().replace(sCode, '');
                $("#"+$focused[0].id).val(newVal);
            }

            if($focused[0].type === "search"){
                $('input[type=search]').val('');
                if($(".dropdown-menu").hasClass("show")){
                    $("div .dropdown-menu").removeClass("show");
                }
            }
        }
        
        
        $("#patchCardNumber").val(sCode);
        
        //jquery confirm for KTP or Visitor Card
        $.confirm({
            theme: 'material', // 'material', 'bootstrap'
            animationBounce: 1.5,
            boxWidth: '30%',
            useBootstrap: false,
            title: 'Konfirmasi',
            content: 'Tap KTP atau Kartu Pengunjung?',
            buttons: {
                ktp: {
                    text: 'KTP',
                    btnClass: 'btn-green',
                    action: function(){
                        $("#id_card").val($("#patchCardNumber").val());
                        $("#id_card").focus();
                    }
                },
                kartuPengunjung: {
                    text: 'Kartu Pengunjung',
                    btnClass: 'btn-orange',
                    action: function(){
                        $("#no_visitor_card").val($("#patchCardNumber").val());
                        $("#no_visitor_card").focus();
                    }
                }
            },
            columnClass: 'small'
        });
        
        $("#patchCardNumber").focus();
    }
});