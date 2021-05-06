// function getNotif() {
//     jQuery(document).ready(function($){
//         $.ajax({
//             method: "POST",
//             url: "/notif/get",
//             cache: false,
//             success: function(result) {
//                 // console.log('results', result.totalKeluhanBaru.totalKeluhanBaru)
//                 if (result.totalKeluhanBaru.totalKeluhanBaru == 0) {
//                     $("#notifKeluhan").html(`<a class='btn btn-secondary dropdown-toggle button-hover' href='/keluhan' data-toggle='tooltip' data-placement='bottom' data-container='body' title='Belum ada keluhan baru' id='notification'>
//                     <i class='fa fa-comments'></i>
//                     <span class='count button-hover' data-toggle='tooltip' data-placement='top' title='Belum ada keluhan baru'></span></a>`);
//                 } else {
//                     $("#notifKeluhan").html(`<a class='btn btn-secondary dropdown-toggle button-hover' href='/keluhan' data-toggle='tooltip' data-placement='top' title='Keluhan baru'>
//                     <i class='fa fa-comments'></i>
//                     <span class='count button-hover' style='background-color: #654321;' data-toggle='tooltip' data-placement='top' title='Keluhan baru'>
//                     ` + result.totalKeluhanBaru.totalKeluhanBaru + `</span></a>`);
//                     $('#notifAlert').html(`<div id="messageKeluhan" class="alert alert-success alert-dismissible animated show" role="alert"><span class="badge badge-pill badge-success">Baru</span> 
//                                             <b>Keluhan baru! Silahkan diproses.</b>
//                                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                                 <span aria-hidden="true">&times;</span>
//                                             </button>
//                                             </div>`)
//                 } 
                
//                 if (result.totalReservasiBaru.totalReservasiBaru == 0) {
//                     $("#notifReservasi").html(`<a class="btn btn-secondary dropdown-toggle button-hover" href='reservasi' id='message' data-toggle='tooltip' data-placement='top' title=Belum ada reservasi baru'><i class='fa fa-h-square></i><span class='count bg-primary' id='notifReservasi'></span></a>`)
//                 } else {
//                     $("#notifReservasi").html(`<a class="btn btn-secondary dropdown-toggle button-hover" href='reservasi' id='message' data-toggle='tooltip' data-placement='top' title='Reservasi baru'>
//                     <i class='fa fa-h-square'></i>
//                     <span class='count button-hover' id='notifReservasi' style='background-color: #654321;' data-toggle='tooltip' data-placement='top' title='Reservasi baru'>
//                     ` + result.totalReservasiBaru.totalReservasiBaru + `</span></a>`)
//                 }
                
//             },
//             error: function(error) {
//                 // console.log("Could not get posts, server response: " + error);
//             }
//         })
//     })
// }
// setInterval(function() { getNotif() }, 1000)