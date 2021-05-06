jQuery(document).ready(function() {
    var table = jQuery("#dataTableAsrama").DataTable({
        dom       : '<"pull-left"l><"pull-right"f>ti<"bottom pull-right"p>',
        responsive: true,
        serverSide : true,
        scrollX : true,
        ajax       : {
            type : "POST",
            url  : "/asrama/getAll",
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
            { data: "nama_asrama", orderable: false },
            { data: "files.filename", orderable: true },
            { data: "jumlah_kamar", orderable: false },
            { data: "jumlah_lantai", orderable: false },
            { data: "fasilitas", orderable: true },
            { data: "created_at", orderable: true },
            { data: "id", orderable: false }
        ],
        columnDefs: [
            {
                targets     : 2,
                createdCell : (td, cellData, rowData, row, col) => {
                    console.log(cellData)
                    jQuery(td).html(`<img id='myImg' src='/images/uploads/${cellData}' class='img-rounded' width='80%' alt='No image yet'>`)
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
                    <a href='/asrama/edit/${cellData}' class='btn btn-outline-success btn-sm style='margin: 5px' data-toggle='tooltip' data-placement='top' title='Edit Asrama'>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    <a href='#' class='btn btn-outline-danger btn-sm openDeleteConfirmation' data-id=` + cellData + ` style='margin: 5px' data-toggle='modal' data-target='
                    deleteAsramaConfirmation' data-toggle='tooltip' data-placement='top' title='Hapus Asrama'>
                    <i class="fa fa-trash" aria-hidden="true"></i></a>
                    </center>`);
                }
            }
        ]
    });
    // jQuery("#buttonFilterCustomer").click(() => {
    //     table.draw();
    // });
});
