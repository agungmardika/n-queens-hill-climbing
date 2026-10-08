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

// 1. Variabel state untuk menyimpan posisi papan saat ini
let stateSekarang = [];

// 2. Fungsi inisialisasiAcak()
// Mengembalikan array berisi posisi baris acak untuk setiap kolom (8 kolom)
function inisialisasiAcak(ukuran = 8) {
    let stateBaru = [];
    for (let kolom = 0; kolom < ukuran; kolom++) {
        let barisAcak = Math.floor(Math.random() * ukuran);
        stateBaru.push(barisAcak);
    }
    return stateBaru;
}

// 3. Fungsi hitungCost(state)
// Menghitung berapa pasang Ratu yang saling serang (Horizontal & Diagonal)
function hitungCost(state) {
    let cost = 0;
    let n = state.length;
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Jika baris sama (horizontal) ATAU selisih kolom == selisih baris (diagonal)
            if (state[i] === state[j] || Math.abs(state[i] - state[j]) === Math.abs(i - j)) {
                cost++;
            }
        }
    }
    return cost;
}

// 4. Fungsi cariTetangga(state)
// Mensimulasikan pergerakan satu Ratu ke kotak lain untuk mencari cost terendah
function cariTetangga(state) {
    let n = state.length;
    let stateTerbaik = [...state]; // Copy array state saat ini
    let costTerbaik = hitungCost(state);
    
    // Coba geser Ratu di setiap kolom ke setiap baris yang tersedia
    for (let kolom = 0; kolom < n; kolom++) {
        for (let baris = 0; baris < n; baris++) {
            // Jangan hitung posisi yang saat ini sedang diduduki Ratu
            if (state[kolom] !== baris) {
                
                // Buat salinan papan simulasi dan pindahkan Ratu
                let stateSimulasi = [...state];
                stateSimulasi[kolom] = baris;
                
                let costSimulasi = hitungCost(stateSimulasi);
                
                // Jika posisi baru ini cost-nya lebih rendah (lebih baik), catat!
                if (costSimulasi < costTerbaik) {
                    costTerbaik = costSimulasi;
                    stateTerbaik = [...stateSimulasi];
                }
            }
        }
    }
    
    // Mengembalikan objek berisi array state yang baru dan nilai cost-nya
    return {
        stateBaru: stateTerbaik,
        costBaru: costTerbaik
    };
}


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