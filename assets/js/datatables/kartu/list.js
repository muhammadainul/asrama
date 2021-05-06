jQuery(document).ready(function() {
    var table = jQuery("#datatableCard").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari kartu.."
        },
        ajax       : {
            type : "POST",
            url  : "/kartu/getAll",
            data : data => {
                // Read values
                var status  = jQuery("#status").val()
                var idAsrama = jQuery("#idAsrama").val()
                var namaKamar = jQuery("#namaKamar").val()
                // var start    = jQuery("#startDate").val();
                // var end      = jQuery("#endDate").val();

                // Append to data
                data.searchByStatus  = status
                data.searchByAsrama  = idAsrama
                data.searchByKamar   = namaKamar
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
            { data: "rfid", orderable: false },
            { data: "kamar.asrama.nama_asrama", 
                render: function (data, type, row){
                    console.log('row', row)
                    if (row.kamar == null) return '<span>Tidak ada informasi</span>'
                    let nama_asrama = row.kamar.asrama.nama_asrama
                    let res = nama_asrama.toUpperCase()
                    return `<b>Asrama : </b>` + `<span class="badge badge-pill badge-success" style='font-weight: normal;'><i class='fa fa-university'></i> <b>` + res + `
                    </b></span><br><small>Kamar : ` + `<span class="badge badge-pill badge-primary" style='font-weight: normal;'><i class='fa fa-bed'></i> ` + 
                    row.kamar.nama_kamar + `</span>`
                } 
            },
            { data: "status", orderable: false },
            { data: "created_at", orderable: false },
            { data: "id", orderable: true },
        ],
        columnDefs: [
            {
                targets: 3,
                createdCell: (td, cellData, rowData, row, col) => {
                    console.log('cellData', cellData)
                    if (cellData == 1) {
                        jQuery(td).html(`<span class='badge badge-pill badge-warning'>Digunakan</span>`)
                    } else if (cellData == 2) {
                        jQuery(td).html(`<span class='badge badge-pill badge-success'>Riwayat</span>`)
                    } else {
                        jQuery(td).html(`<span class='badge badge-pill badge-primary'>Tersedia</span>`)
                    }
                }
            },
            {
                targets : 4,
                createdCell: (td, cellData, rowData, row, col) => {
                    let date = new Date(cellData).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false })
                    jQuery(td).html(date)
                }
            },
            {
                targets     : 5,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html(`<center>
                    <a href='/kartu/edit/${cellData}' class='btn btn-outline-success btn-sm' data-toggle='tooltip' data-placement='top' title='Edit Kartu'>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></center>`)
                }
            }
        ]
    });
    jQuery("#buttonFilterKartu").click(() => {
        table.draw()
    })
})
