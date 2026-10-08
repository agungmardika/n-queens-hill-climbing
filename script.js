// ==========================================
// AREA AGUNG: MENGGAMBAR UI PAPAN KOSONG
// ==========================================
const boardElement = document.getElementById('chessboard');
const N = 8; 

function drawBoard() {
    boardElement.innerHTML = ''; 
    
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            
            // Warna papan catur selang-seling
            if ((row + col) % 2 === 0) {
                square.classList.add('white');
            } else {
                square.classList.add('black');
            }
            
            // ID unik untuk Haikal menempatkan innerHTML '♛'
            square.id = `kotak-${row}-${col}`;
            boardElement.appendChild(square);
        }
    }
}
// Render papan kosong saat pertama kali web dibuka
drawBoard();


// ==========================================
// AREA HABI: CORE LOGIC ALGORITMA
// ==========================================
// TODO untuk Habi:
// 1. Buat variabel state array (misal: let state = [0, 1, 2, ...])
// 2. Buat fungsi inisialisasiAcak()
// 3. Buat fungsi hitungCost(stateSekarang)
// 4. Buat fungsi cariTetangga(stateSekarang) untuk menggeser Ratu


// ==========================================
// AREA HAIKAL: DOM MANIPULATION & EVENT LISTENER
// ==========================================
// TODO untuk Haikal:

document.getElementById('btn-acak').addEventListener('click', () => {
    // 1. Panggil fungsi inisialisasiAcak() dari Habi
    // 2. Bersihkan papan dari ratu sebelumnya
    // 3. Looping hasil dari Habi, lalu tembak innerHTML = '<span class="queen">♛</span>' ke kotak yang sesuai
    // 4. Update span #cost-value dengan cost hitungan awal Habi
});

document.getElementById('btn-jalan').addEventListener('click', () => {
    // 1. Jalankan looping iterasi cariTetangga() dari Habi
    // 2. Update posisi '♛' di layar sesuai hasil geseran Habi
    // 3. Update text di #iterasi-value dan #cost-value
    // 4. (Opsional) Beri class 'conflict' kalau ada ratu yang bentrok
    // 5. Update #status-text jadi "Selesai" atau "Terjebak di Local Maximum"
});

document.getElementById('btn-restart').addEventListener('click', () => {
    // Bersihkan papan dan kembalikan angka ke 0
    drawBoard();
    // Update dashboard HTML kembali seperti semula
});