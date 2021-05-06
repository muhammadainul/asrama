jQuery(document).ready(function() {
    var table = jQuery("#dataTableReservasi").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        serverSide : true,
        scrollX: true,
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari berdasarkan nama.."
        },
        ajax       : {
            type : "POST",
            url  : "/reservasi/getAll",
            data : data => {
                // Read values
                var idAsrama = jQuery("#idAsrama").val()
                var searchByDate = jQuery("#searchByDate span").html()
                var status   = jQuery("#status").val()

                console.log('data', data)
                // Append to data
                data.searchByAsrama   = idAsrama
                data.searchByDate     = searchByDate
                data.status           = status
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
            { data: "penghuni.user.nama_lengkap", orderable: false },
            { data: "nik", orderable: true },
            { data: "penghuni.user.nip", orderable: true },
            { data: "nama_kamar",
                render: function ( data, type, row ) {
                    let nama_asrama = row.nama_asrama
                    let res = nama_asrama.toUpperCase()
                    if (row.status == 1) {
                        return `<b>Asrama :</b> ` + `<span class="badge badge-pill badge-success" style='font-weight: normal;'><i class='fa fa-university'></i> <b>` + res + `
                            </b></span><br><small>Kamar : ` +  `<span class="badge badge-pill badge-primary" style='font-weight: normal;'><i class='fa fa-bed'></i> ` + 
                            row.nama_kamar + `</span><br><small>Status Kamar: <span class='badge badge-pill badge-danger'> Tidak Tersedia</span>`
                    } else {
                        return `<b>Asrama :</b> ` + `<span class="badge badge-pill badge-success" style='font-weight: normal;'><i class='fa fa-university'></i> <b>` + res + `
                            </b></span><br><small>Kamar : ` +  `<span class="badge badge-pill badge-primary" style='font-weight: normal;'><i class='fa fa-bed'></i> ` + 
                            row.nama_kamar + `</span><br><small>Status Kamar: <span class='badge badge-pill badge-primary' style='font-weight: normal;'> Tersedia</span>`
                    }
                }, orderable: true },
            { data: "tgl_reservasi", orderable: false },
            { data: "tgl_cekin", orderable: false },
            { data: "tgl_cekout", orderable: true },
            { data: "statusReservasi", orderable: false },
            { data: "id", orderable: false }
        ],
        columnDefs: [
            {
                targets: 5,
                createdCell: (td, cellData, rowData, row, col) => {
                    let date = new Date(cellData).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false })
                    jQuery(td).html(date)
                }
            },
            {
                width       : "30%",
                targets     : 6,
                createdCell : (td, cellData, rowData, row, col) => {
                    var date = new Date(cellData)
                    var tahun = date.getFullYear();
                    var bulan = date.getMonth();
                    var tanggal = date.getDate();
                    var hari = date.getDay();
                    // var jam = date.getHours();
                    // var menit = date.getMinutes();
                    // var detik = date.getSeconds();
                    switch(hari) {
                        case 0: hari = "Minggu"; break;
                        case 1: hari = "Senin"; break;
                        case 2: hari = "Selasa"; break;
                        case 3: hari = "Rabu"; break;
                        case 4: hari = "Kamis"; break;
                        case 5: hari = "Jum'at"; break;
                        case 6: hari = "Sabtu"; break;
                    } switch(bulan) {
                        case 0: bulan = "Januari"; break;
                        case 1: bulan = "Februari"; break;
                        case 2: bulan = "Maret"; break;
                        case 3: bulan = "April"; break;
                        case 4: bulan = "Mei"; break;
                        case 5: bulan = "Juni"; break;
                        case 6: bulan = "Juli"; break;
                        case 7: bulan = "Agustus"; break;
                        case 8: bulan = "September"; break;
                        case 9: bulan = "Oktober"; break;
                        case 10: bulan = "November"; break;
                        case 11: bulan = "Desember"; break;
                    }           
                    jQuery(td).html(hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun)
                }
            },
            {
                width       : "30%",
                targets     :7,
                createdCell : (td, cellData, rowData, row, col) => {
                    if (cellData == null || cellData.length == 0) {
                        jQuery(td).html(`<span class='badge badge-dark'>Belum check-out</span>`)
                    } else {
                        var date = new Date(cellData)
                        var tahun = date.getFullYear();
                        var bulan = date.getMonth();
                        var tanggal = date.getDate();
                        var hari = date.getDay();
                        // var jam = date.getHours();
                        // var menit = date.getMinutes();
                        // var detik = date.getSeconds();
                        switch(hari) {
                            case 0: hari = "Minggu"; break;
                            case 1: hari = "Senin"; break;
                            case 2: hari = "Selasa"; break;
                            case 3: hari = "Rabu"; break;
                            case 4: hari = "Kamis"; break;
                            case 5: hari = "Jum'at"; break;
                            case 6: hari = "Sabtu"; break;
                        } switch(bulan) {
                            case 0: bulan = "Januari"; break;
                            case 1: bulan = "Februari"; break;
                            case 2: bulan = "Maret"; break;
                            case 3: bulan = "April"; break;
                            case 4: bulan = "Mei"; break;
                            case 5: bulan = "Juni"; break;
                            case 6: bulan = "Juli"; break;
                            case 7: bulan = "Agustus"; break;
                            case 8: bulan = "September"; break;
                            case 9: bulan = "Oktober"; break;
                            case 10: bulan = "November"; break;
                            case 11: bulan = "Desember"; break;
                        }
                        
                        jQuery(td).html(hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun)
                    }
                }
            },
            {
                targets: 8,
                createdCell: (td, cellData, rowData, row, col) => {
                    if (cellData == 1) {
                        jQuery(td).html(`<span class='badge badge-pill badge-warning'>Booked</span>`)
                    } else if (cellData == 2) {
                        jQuery(td).html(`<span class='badge badge-pill badge-primary'>Check-in</span>`)
                    } else if (cellData == 3) {
                        jQuery(td).html(`<span class='badge badge-pill badge-secondary'>Check-out</span>`)
                    }
                }
            },
            {
                width       : "30%",
                targets     : 9,
                createdCell : (td, cellData, rowData, row, col) => {
                    if (rowData.tgl_cekout == null && rowData.statusReservasi == 2) {
                        jQuery(td).html(`<center>
                            <input type='hidden' name='id_kamar' id='id_kamar_`+ cellData + `' value=` + rowData.id_kamar + `>
                            <input type='hidden' name='id_tamu' id='id_tamu_`+ cellData + `' value=` + rowData.id_tamu + `>
                            <a href="/reservasi/QRCode/${cellData}" target='_blank' class="btn btn-outline-primary btn-sm openActionQR" data-toggle='tooltip' data-placement='top' title='Show QRCode'>
                            <i class="fa fa-qrcode" aria-hidden="true"></i></a>
                            <a href="#" data-id=` + cellData + ` class="btn btn-outline-primary btn-sm openActionCheckout" data-toggle='tooltip' data-placement='top' title='Checkout'>
                            <i class="fa fa-sign-out"></i></a>
                            <a href='/reservasi/detail/${cellData}' class='btn btn-outline-info btn-sm' data-toggle='tooltip' data-placement='top' title='Detail Reservasi'>
                            <i class="fa fa-eye" aria-hidden="true"></i></a>
                            <a href='/reservasi/edit/${cellData}' class='btn btn-outline-success btn-sm' data-toggle='tooltip' data-placement='top' title='Edit Reservassi'>
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                            </center>`);    
                    } else if (rowData.tgl_cekout == null && rowData.statusReservasi == 1) {
                        jQuery(td).html(`<center>
                            <a href="#" data-id=` + cellData + ` class="btn btn-outline-primary btn-sm openActionCheckout disabled" data-toggle='tooltip' data-placement='top' title='Show QRCode'>
                            <i class="fa fa-sign-out"></i></a>
                            <a href="/reservasi/QRCode/${cellData}" target='_blank' class="btn btn-outline-primary btn-sm openActionQR" data-toggle='tooltip' data-placement='top' title='Checkout'>
                            <i class="fa fa-qrcode" aria-hidden="true"></i></a>
                            <a href='/reservasi/detail/${cellData}' class='btn btn-outline-info btn-sm' data-toggle='tooltip' data-placement='top' title='Detail Reservasi'>
                            <i class="fa fa-eye" aria-hidden="true"></i></a>
                            <a href='/reservasi/edit/${cellData}' class='btn btn-outline-success btn-sm' data-toggle='tooltip' data-placement='top' title='Edit Reservasi'>
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                            </center>`);
                    } else {
                        jQuery(td).html(`<center>
                            <a href="#" data-id=` + cellData + ` class="btn btn-outline-primary btn-sm openActionCheckout disabled" data-toggle='tooltip' data-placement='top' title='Show QRCode'>
                            <i class="fa fa-sign-out"></i></a>
                            <a href="/reservasi/QRCode/${cellData}" target='_blank' class="btn btn-outline-primary btn-sm openActionQR disabled" data-toggle='tooltip' data-placement='top' title='Checkout'>
                            <i class="fa fa-qrcode" aria-hidden="true"></i></a>
                            <a href='/reservasi/detail/${cellData}' class='btn btn-outline-info btn-sm' data-toggle='tooltip' data-placement='top' title='Detail Reservasi'>
                            <i class="fa fa-eye" aria-hidden="true"></i></a>
                            <a href='/reservasi/edit/${cellData}' class='btn btn-outline-success btn-sm disabled' data-toggle='tooltip' data-placement='top' title='Edit Reservasi'>
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                            </center>`);
                    }
                }
            }
        ]
    });
    jQuery("#buttonFilterReservasi").click(() => {
        table.draw()
    })
    // jQuery('#dataTableReservasi_filter input').unbind()
    // jQuery('#dataTableReservasi_filter input').bind('keyup', function (e) {
    //     if (e.keyCode == 13) {
    //         table.search(this.value).draw()
    //     }
    // })

    var start = moment().startOf('month')
    var end = moment().endOf('month')

    function cb(start, end) {
        jQuery('#searchByDate span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    }

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
