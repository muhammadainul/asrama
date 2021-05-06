jQuery(document).ready(function() {
    var table = jQuery("#datatableKeluhan").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        colReorder: {
            realtime: true
        },
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari berdasarkan nama.."
        },
        responsive: true,
        serverSide : true,
        scrollX : true,
        ajax       : {
            type : "POST",
            url  : "/keluhan/getAll",
            data : data => {
                // Read values
                var searchByDate  = jQuery("#searchByDate span").html()
                var idAsrama      = jQuery("#idAsrama").val()
                var status        = jQuery("#status").val()

                // Append to data
                data.searchByAsrama   = idAsrama
                data.searchByStatus   = status
                data.searchByDate     = searchByDate
                // data.query            = 'com';
            }
        },
        orderCellsTop : true,
        fixedHeader   : true,
        columns       : [
            { "data": null,"sortable": false, 
                    render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1
                }  
            },
            { data: "nama_asrama", orderable: false },
            { data: "nama_kamar", orderable: true },
            { data: "nama", orderable: false },
            { data: "keluhan", orderable: false },
            { data: "created", orderable: false },
            { data: "status", orderable: false },
            { data: 'id', orderable: false }
        ],
        columnDefs: [
            {
                targets     : 5,
                createdCell : (td, cellData, rowData, row, col) => {
                    let date = new Date(cellData).toLocaleString('en-US', { timeZone: 'UTC', hour12: false })
                    jQuery(td).html(date)
                }
            },
            {
                targets     : 6,
                createdCell : (td, cellData, rowData, row, col) => {
                    console.log('cell', cellData)
                    if (cellData == 0 || cellData == null) {
                        jQuery(td).html(`<a href='#' class='btn btn-outline-danger' data-toggle='tooltip' data-placement='top' title='Belum diproses'><i class='fa fa-times-circle'></i> 
                        <small>Belum diproses</small></a>`)
                    } else {
                        jQuery(td).html(`<a href='#' class='btn btn-outline-success' data-toggle='tooltip' data-placement='top' title='Sudah diproses'><i class='fa fa-check'> 
                        <small>Sudah diproses</small></i>`)
                    }
                }
            },
            {
                targets     : 7,
                createdCell : (td, cellData, rowData, row, col) => {
                    if (rowData.status == 0) {
                        jQuery(td).html(`<a href="#" data-id=` + cellData + ` class="btn btn-outline-primary btn-sm openActionProsesKeluhan" data-toggle='tooltip' data-placement='top' title='Proses'>
                                     <i class="fa fa-arrow-circle-right"></i></a>`)
                    } else {
                        jQuery(td).html(`<a disabled href="#" data-id=` + cellData + ` class="btn btn-outline-primary btn-sm openActionProsesKeluhan disabled" data-toggle='tooltip' data-placement='top' title='Proses'>
                                     <i class="fa fa-arrow-circle-right"></i></a>`)
                    }
                    }
                    
            }
            ]
        });
    jQuery("#buttonFilterKeluhan").click(() => {
        table.draw()
    })

    var start = moment().subtract(29, 'days')
    var end = moment()

    function cb(start, end) {
        jQuery('#searchByDate span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }

    jQuery('#datatableKeluhan_filter input').unbind()
    jQuery('#datatableKeluhan_filter input').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            table.search(this.value).draw()
        }
    })

    jQuery('#searchByDate').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb)

    cb(start, end)
})
