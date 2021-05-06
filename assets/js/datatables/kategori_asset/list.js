jQuery(document).ready(function() {
    var table = jQuery("#datatableKategoriAsset").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        scrollX : true,
        ajax       : {
            type : "POST",
            url  : "/kategori_asset/getAll",
            data : data => {
                // Read values
                // var hashTag  = jQuery("#searchByHashTag").val();
                // var username = jQuery("#searchByUsername").val();
                var start    = jQuery("#startDate").val();
                var end      = jQuery("#endDate").val();

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
            { data: "nama_kategori", orderable: false },
            { data: "deskripsi", orderable: true },
            { data: "created_at", orderable: false },
            { data: "id", orderable: false }
        ],
        columnDefs: [
            {
                targets     : 3,
                createdCell : (td, cellData, rowData, row, col) => {
                    let date = new Date(cellData)
                    jQuery(td).html(date)
                }
            },
            {
                targets     : 4,
                createdCell : (td, cellData, rowData, row, col) => {
                    jQuery(td).html(`<center>
                    <a href='/kategori_asset/edit/${cellData}' class='btn btn-outline-success btn-sm' style='margin: 5px' data-toggle='tooltip' data-placement='top' title='Edit Kategori Asset'>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href='#' class='btn btn-outline-danger btn-sm openDeleteKategoriAssetConfirmation' data-id=` + cellData + ` 
                    style='margin: 5px' data-toggle='modal' data-toggle='tooltip' data-placement='top' title='Hapus Kategori Asset'>
                    <i class='fa fa-trash' aria-hidden='true'></i></a>
                    </center>`);
                }
            }
        ]
    });
    // jQuery("#buttonFilterCustomer").click(() => {
    //     table.draw();
    // });
});
