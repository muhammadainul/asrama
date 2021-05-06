jQuery(document).ready(function() {
    var table = jQuery("#dataTableTamu").DataTable({
        paging     : true,
        sDom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari berdasarkan nama.."
        },
        ajax       : {
            type : "POST",
            url  : "/tamu/getAll",
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
            { "data": null,"sortable": false, 
                    render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1
                }  
            },
            { data: "nama_lengkap", orderable: false },
            { data: "nik", orderable: true },
            { data: "jenis_kelamin", orderable: true },
            { data: "no_telepon", orderable: true },  
            { data: "nama_kamar", 
            render: function ( data, type, row ) {
                if (data == null) {
                    console.log('row', row)
                    return `<span class='badge badge-dark'>Sudah Check-out</span>`
                } else {
                    let nama_asrama = row.nama_asrama
                    let res = nama_asrama.toUpperCase()
                        return `<b>Asrama :</b> ` + `<span class="badge badge-pill badge-success" style='font-weight: normal;'><i class='fa fa-university'></i> <b>` + res + `
                            </b></span><br><small>Kamar : ` +  `<span class="badge badge-pill badge-primary" style='font-weight: normal;'><i class='fa fa-bed'></i> ` + 
                            row.nama_kamar + `</span><br>`
                }
               
            }, orderable: true }
        ],
        columnDefs: [
            {
                targets     :3  ,
                createdCell : (td, cellData, rowData, row, col) => {
                    if (cellData == 'l') {
                        jQuery(td).html('<span>Laki-laki</span>')
                    } else {
                        jQuery(td).html('<span>Perempuan</span>')
                    }
                    
                }
            }
            // {
            //     targets     :5 ,
            //     createdCell : (td, cellData, rowData, row, col) => {
            //         if (cellData == null) {
            //             jQuery(td).html('<span>Sudah keluar</span>')
            //         } 

            //     }
            // }
        ]
    });
    // jQuery("#buttonFilterPricelist").click(() => {
    //     table.draw();
    // });
    jQuery('#dataTableTamu_filter input').unbind()
    jQuery('#dataTableTamu_filter input').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            table.search(this.value).draw()
        }
    })
});
