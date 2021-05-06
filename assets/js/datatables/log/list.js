jQuery(document).ready(function() {
    var table = jQuery("#dataTableLogs").DataTable({
        paging     : true,
        sDom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        scrollX : true,
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari berdasarkan nama.."
        },
        ajax       : {
            type : "POST",
            url  : "/logs/getAll",
            data : data => {
                // Read values
                // var hashTag  = jQuery("#searchByHashTag").val();
                // var username = jQuery("#searchByUsername").val();
                var start    = jQuery("#startDate").val();
                var end      = jQuery("#endDate").val();

                console.log('data', data)
                // Append to data
                // data.searchByHashTag  = hashTag;
                // data.searchByUsername = username;
                data.startDate        = start;
                data.endDate          = end;
                // data.query            = 'com';
            }
        },
        orderCellsTop : true,
        fixedHeader   : true,
        columns       : [
            { "data": null, "sortable": false, 
                    render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1
                }  
            },
            { data: "logtime", orderable: false },
            { data: "user.nama_lengkap", orderable: false },
            { data: "ipaddress", orderable: false },
            { data: "browser", orderable: true },
            { data: "browser_version", orderable: true },
            { data: "os", orderable: true },
            { data: "hostname", orderable: false },
            { data: "logdetail", orderable: false }
        ],
        columnDefs: [
            {
                targets     : 1,
                createdCell : (td, cellData, rowData, row, col) => {
                    let now = new Date(cellData).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false })
                    // var date = new Date(cellData);
                    // var tahun = date.getFullYear();
                    // var bulan = date.getMonth();
                    // var tanggal = date.getDate();
                    // var hari = date.getDay();
                    // var jam = date.getUTCHours();
                    // var menit = date.getUTCMinutes();
                    // var detik = date.getUTCSeconds();
                    // switch(hari) {
                    //     case 0: hari = "Minggu"; break;
                    //     case 1: hari = "Senin"; break;
                    //     case 2: hari = "Selasa"; break;
                    //     case 3: hari = "Rabu"; break;
                    //     case 4: hari = "Kamis"; break;
                    //     case 5: hari = "Jum'at"; break;
                    //     case 6: hari = "Sabtu"; break;
                    // } switch(bulan) {
                    //     case 0: bulan = "Januari"; break;
                    //     case 1: bulan = "Februari"; break;
                    //     case 2: bulan = "Maret"; break;
                    //     case 3: bulan = "April"; break;
                    //     case 4: bulan = "Mei"; break;
                    //     case 5: bulan = "Juni"; break;
                    //     case 6: bulan = "Juli"; break;
                    //     case 7: bulan = "Agustus"; break;
                    //     case 8: bulan = "September"; break;
                    //     case 9: bulan = "Oktober"; break;
                    //     case 10: bulan = "November"; break;
                    //     case 11: bulan = "Desember"; break;
                    // }           
                    jQuery(td).html(now)
                }
            },
            {
                targets     : 8,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html("<i class='fa fa-pencil' aria-hidden='true'></i> " + cellData)
                }
            }
        ]
    });
    // jQuery("#buttonFilterPricelist").click(() => {
    //     table.draw();
    // });
    // jQuery('#dataTableLogs_filter input').unbind()
    // jQuery('#dataTableLogs_filter input').bind('keyup', function (e) {
    //     if (e.keyCode == 13) {
    //         table.search(this.value).draw()
    //     }
    // })
});
