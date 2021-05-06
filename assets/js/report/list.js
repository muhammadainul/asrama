jQuery(document).ready(function($) {
    "use strict"

    $.ajax({
        method: "POST",
        url: "/dashboard/report",
        success: function(result) {
            console.log('result: ', result)
            $("#totalasramaCounts").html(result.totalAsrama);
            $("#totalkamarCounts").html(result.totalKamar);
            $("#totalassetCounts").html(result.totalAsset);
            $("#penghuniCounts").html(result.totalTamu);
            $("#reservasiCounts").html(result.totalReservasi);
            $("#keluhanCounts").html(result.totalKeluhan);
            $("#logsCounts").html(result.totalLogs);

            let ids = [
                "#totalasramaCounts",
                "#totalkamarCounts",
                "#totalassetCounts",
                "#penghuniCounts",
                "#reservasiCounts",
                "#keluhanCounts",
                "#logsCounts",
            ]
            for (let o of ids) {
                $(o).each(function () {
                    var $this = $(this);
                    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 1000,
                        easing: "swing",
                        step: function () {
                        $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
            }
        },
        error: function(error) {
            // console.log("Could not get posts, server response: " + error);
        }
    })
});
