const router = require('express').Router()
const index = require('../controllers/index')
const dashboard = require('../controllers/dashboard')
const asrama = require('../controllers/asrama')
const upload = require('../controllers/uploads')
const kamar = require('../controllers/kamar')
const reservasi = require('../controllers/reservasi')
const tamu = require('../controllers/tamu')
const kategoriAsset = require('../controllers/kategoriAsset')
const asset = require('../controllers/asset')
const keluhan = require('../controllers/keluhan')
const logs = require('../controllers/logs')
const home = require('../controllers/home')
const profile = require('../controllers/profile')
const about = require('../controllers/about')
const notifikasi = require('../controllers/notifikasi')
const kartu = require('../controllers/kartu')
const isSecured = require('../routes/isSecured')

let isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next()
    } else {
        res.redirect('/')
    }
}

// INDEX
router.get('/', index.loginPage)
router.get('/registrasi', index.registerPage)
router.post('/login', index.login)
router.post('/register', index.register)
router.get('/confirmation/token/:token', index.tokenConfirmPage)
router.get('/logout', index.logout)

// DASHBOARD
router.get('/dashboard', isAuthenticated, dashboard.indexPage)
router.post('/dashboard/report', isAuthenticated, dashboard.getReport)

// NOTIF 
router.post('/notif/get', isAuthenticated, notifikasi.getNotif)

// ASRAMA
router.get('/asrama', isAuthenticated, asrama.indexPage)
router.get('/asrama/tambah', isAuthenticated, asrama.addPage)
router.get('/asrama/edit/:id', isAuthenticated, asrama.editPage)
router.post('/asrama/getAll', isAuthenticated, asrama.getAll)
router.post('/asrama/tambah/tambahasrama', isAuthenticated, upload.single('gambar'), asrama.addAsrama)
router.post('/asrama/edit/editasrama', isAuthenticated, upload.single('gambar'), asrama.editAsrama)
router.post('/asrama/delete', isAuthenticated, asrama.deleteAsrama)

// KARTU
router.get('/kartu', isAuthenticated, kartu.indexPage)
router.get('/kartu/tambah', isAuthenticated, kartu.addPage)
router.get('/kartu/edit/:id', isAuthenticated, kartu.editPage)
router.post('/kartu/getAll', isAuthenticated, kartu.getAll)
router.post('/kartu/tambah/tambahkartu', isAuthenticated, kartu.addKartu)
router.post('/kartu/edit/editkartu', isAuthenticated, kartu.editKartu)

// KAMAR
router.get('/kamar', isAuthenticated, kamar.indexPage)
router.get('/kamar/tambah', isAuthenticated, kamar.addPage)
router.get('/kamar/edit/:id', isAuthenticated, kamar.editPage)
router.get('/kamar/detail/:id', isAuthenticated, kamar.detailKamar)
router.post('/kamar/getAll', isAuthenticated, kamar.getAll)
router.post('/kamar/tambah/tambahkamar', isAuthenticated, upload.single('gambar'), kamar.addKamar)
router.post('/kamar/edit/editkamar', isAuthenticated, upload.single('gambar'), kamar.editKamar)
router.post('/kamar/delete', isAuthenticated, kamar.deleteKamar)
router.post('/kamar/getkamar', isAuthenticated, kamar.getLantai)

// RESERVASI
router.get('/reservasi', isAuthenticated, reservasi.indexPage)
router.get('/reservasi/tambah', isAuthenticated, reservasi.addPage)
router.get('/reservasi/detail/:id', isAuthenticated, reservasi.detailReservasi)
router.get('/reservasi/edit/:id', reservasi.editPage)
router.get('/reservasi/QRCode/:id', isAuthenticated, reservasi.qrCodePage)
router.post('/reservasi/getAll', isAuthenticated, reservasi.getAll)
router.post('/reservasi/tambah/tambahreservasi', isAuthenticated, reservasi.addReservasi)
router.post('/reservasi/edit', isAuthenticated, reservasi.editReservasi)
router.post('/reservasi/checkout', isAuthenticated, reservasi.checkOut)
router.post('/reservasi/delete', isAuthenticated, reservasi.deleteReservasi)

// TAMU
router.get('/penghuni', tamu.indexPage)
router.post('/tamu/getAll', tamu.getAll)

// KATEGORI ASSET
router.get('/kategori_asset', isAuthenticated, kategoriAsset.indexPage)
router.get('/kategori_asset/tambah', isAuthenticated, kategoriAsset.addPage)
router.get('/kategori_asset/edit/:id', isAuthenticated, kategoriAsset.editPage)
router.post('/kategori_asset/getAll', isAuthenticated, kategoriAsset.getAll)
router.post('/kategori_asset/tambah/tambah_kategori_asset', isAuthenticated, kategoriAsset.addKategoriAsset)
router.post('/kategori_asset/edit/edit_kategori_asset', isAuthenticated, kategoriAsset.editKategoriAsset)
router.post('/kategori_asset/delete', isAuthenticated, kategoriAsset.deleteKategoriAsset)

// ASSET
router.get('/asset', isAuthenticated, asset.indexPage)
router.get('/asset/tambah', isAuthenticated, asset.addPage)
router.get('/asset/edit/:id', isAuthenticated, asset.editPage)
router.post('/asset/getAll', isAuthenticated, asset.getAll)
router.post('/asset/tambah/tambahAsset', isAuthenticated, upload.single('gambar'), asset.addAsset)
router.post('/asset/edit/editAsset', isAuthenticated, upload.single('gambar'), asset.editAsset)
router.post('/asset/delete', asset.deleteAsset)

// KELUHAN
router.get('/keluhan', isAuthenticated, keluhan.indexPage)
router.post('/keluhan/getAll', isAuthenticated, keluhan.getAll)
router.post('/keluhan/tambah', isAuthenticated, keluhan.addKeluhan)
router.post('/keluhan/proses', isAuthenticated, keluhan.prosesKeluhan)

// LOGS
router.get('/logs', isAuthenticated, logs.indexPage)
router.post('/logs/getAll', isAuthenticated, logs.getAll)

// HALAMAN PESERTA
// HOME
router.get('/home', isAuthenticated, home.indexPage)

// PROFILE
router.get('/profile', isAuthenticated, profile.indexPage)
router.post('/profile/changePassword', isAuthenticated, profile.changePassword)

// RESERVASI
router.get('/reservasi', isAuthenticated, reservasi.indexPage)

// ABOUT
router.get('/about', isAuthenticated, about.indexPage)

module.exports = router