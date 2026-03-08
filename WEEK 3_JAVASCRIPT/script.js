//menampilkan/ sembunyikan pesan error
function showError(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

// Cek format email pakai regex(filter/ ngecek apak sdh sesuai dgn format/polanya)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Ambil nilai radio button yang dipilih, menggunakan querySelctor dengan selector CSS.
function getRadioValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : '';
}

// Ambil semua checkbox yang dicentang, jika lebih dari 1 ceklis gabung jadi satu string yg dipisahkan dengan koma
function getCheckboxValues(name) {
  const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
  const values = Array.from(checked).map(el => el.value);
  return values.length > 0 ? values.join(', ') : 'Tidak ada pilihan';
}

// Validasi seluruh form, dimana seluruh field  harus diisi
function validateForm() {
  let valid = true;

  const nama     = document.getElementById('nama').value.trim();
  const email    = document.getElementById('email').value.trim();
  const wa       = document.getElementById('wa').value.trim();
  const gender   = getRadioValue('gender');
  const kategori = document.getElementById('kategori').value;

  // Nama
  const namaOk = nama.length > 0;
  showError('errNama', !namaOk);
  if (!namaOk) valid = false;

  // Email
  const emailOk = isValidEmail(email);
  showError('errEmail', !emailOk);
  if (!emailOk) valid = false;

  // WA
  const waOk = wa.length > 0;
  showError('errWa', !waOk);
  if (!waOk) valid = false;

  // Gender
  const genderOk = gender !== '';
  showError('errGender', !genderOk);
  if (!genderOk) valid = false;

  // Kategori Lomba
  const kategoriOk = kategori !== '';
  showError('errKategori', !kategoriOk);
  if (!kategoriOk) valid = false;

  return valid;
}

//Tampilkan hasil ke kartu result
function displayResult(data) {
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('result-item');
    div.innerHTML = `
      <div class="r-label">${item.label}</div>
      <div class="r-value">${item.value}</div>
    `;
    grid.appendChild(div);
  });

  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Reset form ──
function resetForm() {
  document.getElementById('registrationForm').reset();
  ['errNama', 'errEmail', 'errWa', 'errGender', 'errKategori'].forEach(id => showError(id, false));
  document.getElementById('result').style.display = 'none';
}

// Event: submit form, memastikan script berjalan setelah semua elemen HTML siap, baru kemudian script
//  mulai mendengarkan event submit pada form. menggunakan preventDefault untuk mencegah Mencegah 
// halaman reload saat form disubmit
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = [
      { label: 'Nama Lengkap',      value: document.getElementById('nama').value.trim() },
      { label: 'Email',             value: document.getElementById('email').value.trim() },
      { label: 'No. Telepon / WA',  value: document.getElementById('wa').value.trim() },
      { label: 'Jenis Kelamin',     value: getRadioValue('gender') },
      { label: 'Kategori Lomba',    value: document.getElementById('kategori').value },
      { label: 'Keahlian',          value: getCheckboxValues('hobi') },
      { label: 'Motivasi',          value: document.getElementById('pesan').value.trim() || '(tidak diisi)' },
      { label: 'Waktu Kirim',       value: new Date().toLocaleString('id-ID') },
    ];

    displayResult(formData);
  });
});