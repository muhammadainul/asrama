jQuery(document).ready(function() {
    var table = jQuery("#datatableRoom").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        scrollX : true,
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari nomor kamar.."
        },
        ajax       : {
            type : "POST",
            url  : "/kamar/getAll",
            data : data => {
                // Read values
                var status  = jQuery("#status").val()
                var idAsrama = jQuery("#idAsrama").val()
                // var start    = jQuery("#startDate").val();
                // var end      = jQuery("#endDate").val();

                // Append to data
                data.searchByStatus  = status
                data.searchByAsrama  = idAsrama
                // data.startDate        = start;
                // data.endDate          = end;
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
            { data: "nama_kamar", orderable: false },
            { data: "gambar.filename", orderable: true },
            { data: "asrama.nama_asrama", orderable: false },
            { data: "kapasitas", orderable: false },
            { data: "status", orderable: true },
            { data: "created_at", orderable: false },
            { data: "id", orderable: false },
        ],
        columnDefs: [
            {
                targets     : 2,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html(`<img src='/images/uploads/${cellData}' class='img-rounded' width='80%' alt='No image yet'>`)
                }
            },
            {
                targets     : 5,
                createdCell : (td, cellData, rowData, row, col) => {
                    if (cellData == 0) {
                        jQuery(td).html(`<span class='badge badge-success' style='width: 100%;'>Tersedia</span>`);
                    } else { 
                        jQuery(td).html(`<span class='badge badge-danger' style='width: 100%;'>Tidak Tersedia</span>`);
                    }
                }
            },
            {
                targets     : 6,
                createdCell : (td, cellData, rowData, row, col) => {
                    let date = new Date(cellData).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false })
                    jQuery(td).html(date)
                }
            },
            {
                targets     : 7,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html(`<center>
                    <a href='/kamar/detail/${cellData}' class='btn btn-outline-info btn-sm' data-toggle='tooltip' data-placement='top' title='Detail Kamar'>
                    <i class="fa fa-eye" aria-hidden="true"></i></a>
                    <a href='/kamar/edit/${cellData}' class='btn btn-outline-success btn-sm' data-toggle='tooltip' data-placement='top' title='Edit Kamar'>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href='#' class='btn btn-outline-danger btn-sm openDeleteKamarConfirmation' data-placement='top' title='Hapus Kamar'
                    data-id=` + cellData + ` data-toggle='modal' data-target='
                    deleteKamarConfirmation'>
                    <i class="fa fa-trash" aria-hidden="true"></i></a>
                    </center>`);
                }
            }
        ]
    });
    jQuery("#buttonFilterKamar").click(() => {
        table.draw()
    })
})
