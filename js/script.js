document.addEventListener('DOMContentLoaded', function() {
    // 1. Mengisi Nama di Ucapan Selamat Datang
    let userName = sessionStorage.getItem('userName'); // Coba ambil nama dari sessionStorage

    if (!userName) { // Jika nama belum ada di sessionStorage
        userName = prompt("Masukkan nama Anda untuk ucapan selamat datang:");
        if (userName) {
            sessionStorage.setItem('userName', userName); // Simpan nama ke sessionStorage
        }
    }

    if (userName) {
        // Pesan sambutan disesuaikan untuk portofolio pribadi
        document.getElementById('welcome-message').textContent = `Hai ${userName}, Selamat Datang di Portofolio Saya!`;
    } else {
        document.getElementById('welcome-message').textContent = `Hai, Selamat Datang di Portofolio Surya!`; // Default jika tidak ada nama
    }

    // 2. Menampilkan Waktu Saat Ini
    function updateCurrentTime() {
        const now = new Date();
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'shortOffset'
        };
        document.getElementById('currentTime').textContent = now.toLocaleString('en-US', options);
    }
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // 3. Validasi Formulir "Hubungi Saya" & Menampilkan Nilai
    const messageForm = document.getElementById('messageForm');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const tanggalLahir = document.getElementById('tanggalLahir').value;
        const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
        const pesan = document.getElementById('pesan').value;

        if (nama === '' || tanggalLahir === '' || !jenisKelamin || pesan === '') {
            alert('Semua bidang harus diisi!');
            return;
        }

        document.getElementById('outputNama').textContent = nama;
        document.getElementById('outputTanggalLahir').textContent = tanggalLahir;
        document.getElementById('outputJenisKelamin').textContent = jenisKelamin.value;
        document.getElementById('outputPesan').textContent = pesan;

        messageForm.reset();
        alert('Pesan Anda telah terkirim!');
    });

    // 4. Navigasi Antar Bagian (Single Page)
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            sections.forEach(sec => sec.style.display = 'none');

            // ID target sekarang disesuaikan dengan struktur portofolio pribadi
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.style.display = 'block';
            }

            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Set 'Home' sebagai aktif secara default saat halaman pertama kali dimuat
    document.querySelector('nav ul li a[href="#home"]').click();
});