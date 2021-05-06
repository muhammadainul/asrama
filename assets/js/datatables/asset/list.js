jQuery(document).ready(function() {
    var table = jQuery("#datatableAsset").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        scrollX : true,
        language : {
            search : "Cari : ",
            searchPlaceholder: "Cari berdasarkan nama.."
        },
        ajax       : {
            type : "POST",
            url  : "/asset/getAll",
            data : data => {
                // Read values
                // var hashTag  = jQuery("#searchByHashTag").val();
                var idAsrama = jQuery("#idAsrama").val()
                var kategori = jQuery("#kategori").val()
                // var start    = jQuery("#startDate").val();
                // var end      = jQuery("#endDate").val();

                // Append to data
                // data.searchByHashTag  = hashTag;
                // data.searchByUsername = username;
                data.searchByAsrama     = idAsrama
                data.searchByKategori   = kategori
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
            { data: "nama_asset", orderable: false },
            { data: "gambar.filename", orderable: true },
            { data: "kamar.nama_kamar",
                render: function ( data, type, row ) {
                    let nama_asrama = row.asrama.nama_asrama
                    let res = nama_asrama.toUpperCase()
                    return `<b>Asrama :</b> ` + `<span class="badge badge-pill badge-success" style='font-weight: normal;'><i class='fa fa-university'></i> <b>` + res + `
                    </b></span><br><small>Kamar : ` +  `<span class="badge badge-pill badge-primary" style='font-weight: normal;'><i class='fa fa-bed'></i> ` + 
                    row.kamar.nama_kamar + `</span><br><span>Kategori : ` + row.kategori_asset.nama_kategori + `</span><br>
                    <span>Deskripsi : ` + row.kategori_asset.deskripsi + `</span>`;
                }, orderable: true },
            { data: "created_at", orderable: false },
            { data: "id", orderable: false }
        ],
        columnDefs: [
            {
                targets     : 2,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html(`<img src='/images/uploads/${cellData}' class='img-rounded' width='80%' alt='No image yet'>`)
                }
            },
            {
                targets     : 4,
                createdCell : (td, cellData, rowData, row, col) => {
                    let date = new Date(cellData).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false })
                    jQuery(td).html(date)
                }
            },
            {
                targets     : 5,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html(`<center>
                    <a href='/asset/edit/${cellData}' class='btn btn-outline-success btn-sm style='margin: 5px' data-toggle='tooltip' data-placement='top' title='Edit Asset'>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href='#' class='btn btn-outline-danger btn-sm openDeleteAssetConfirmation' data-id=` + cellData + ` style='margin: 5px' data-toggle='modal' data-target='
                    deleteKategoriAssetConfirmation' data-toggle='tooltip' data-placement='top' title='Hapus Asset'>
                    <i class="fa fa-trash" aria-hidden="true"></i></a>
                    </center>`);
                }
            }
        ]
    });
    jQuery("#buttonFilterAsset").click(() => {
        table.draw()
    })
});
