jQuery(document).on('click', '.openDeleteReservasiConfirmation', function() {
    var nVer = navigator.appVersion
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion); 
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset=nAgt.indexOf("Version")) != -1) 
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset=nAgt.indexOf("Version")) != -1) 
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=nAgt.lastIndexOf(' ') + 1) < 
        (verOffset=nAgt.lastIndexOf('/'))) 
    {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";")) != -1)
        fullVersion=fullVersion.substring(0, ix);
    if ((ix=fullVersion.indexOf(" ")) != -1)
        fullVersion=fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion  = ' ' + parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    jQuery("#browser").val(browserName)
    jQuery("#browser_version").val(fullVersion) 
    jQuery("#os").val(OSName)

    var myVal = jQuery(this).attr('data-id')
    jQuery('.deleteReservasi').html("<form id='deleteConfirm' method='post' action='/reservasi/delete'>" +
        "<input type='hidden' name='id' id='id' value=" + myVal + ">" +
        "<input type='hidden' name='browser' id='browser' value=" + browserName + ">" +
        "<input type='hidden' name='browser_version' id='browser_version' value=" + fullVersion + ">" +
        "<input type='hidden' name='os' id='os' value=" + OSName + ">" +
        "<button type='button' class='btn btn-secondary btn-sm' data-dismiss='modal'><i class='fa fa-times' aria-hidden='true'></i> Cancel</button>" +
        " <button type='submit' id='deleted' class='openActionDeleteReservasiConfirmation btn btn-primary btn-sm' name='deleted' data-toggle='modal'>" +
        "<i class='fa fa-check' aria-hidden='true'></i> Delete</button></form>")
    jQuery("#deleteReservasiConfirmation").modal('show')

    jQuery(".openActionDeleteReservasiConfirmation").click(function (){
        jQuery("#actionDeletedReservasiConfirmation").modal('show')
        jQuery("#deleteReservasiConfirmation").modal('hide')
        setTimeout(function (){
            window.location.href='/reservasi'
        }, 2000)
    })
});