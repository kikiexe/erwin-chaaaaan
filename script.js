const JOURNALS = [
  {
    title: "Analisis Fungsi Manajemen Operasional di PT So Good Food Wonoayu Sidoarjo",
    year: 2019,
    author: "Vivi Widyanti",
    source: "Agora, Vol. 7, No. 1",
    file: "2019/ANALISIS FUNGSI MANAJEMEN OPERASIONAL DI PT SO GOOD FOOD WONOAYU SIDOARJO.pdf"
  },
  {
    title: "Analisis Teori Antrian dan Pelayanan pada Rumah Makan Tarida Pork Finest",
    year: 2020,
    author: "Alvathena, A. S. & Panday, R.",
    source: "Desember 2020",
    file: "2020/ANALISIS TEORI ANTRIAN DAN PELAYANAN PADA RUMAH MAKAN TARIDA PORK FINEST.pdf"
  },
  {
    title: "Rencana Bisnis Pengembangan Usaha Katering “Paon Jahe Sereh Catering”",
    year: 2021,
    author: "B. P. Yudha",
    source: "Jurnal Manajemen Bisnis dan Kewirausahaan, Vol. 5, No. 2",
    file: "2021/RENCANA BISNIS PENGEMBANGAN USAHA KATERING PAON JAHE SEREH CATERING.pdf"
  },
  {
    title: "Membangun Standar Operasional Prosedur (SOP) Bisnis Kuliner",
    year: 2021,
    author: "Gede Ajusta, A. A., dkk.",
    source: "Akrab Juara, Vol. 6, No. 2",
    file: "2021/MEMBANGUN STANDAR OPERASIONAL PROSEDUR (SOP) BISNIS KULINER.pdf"
  },
  {
    title: "Peranan Penerapan Standar Operasional Prosedur (SOP) terhadap Penjualan dan Kinerja Karyawan",
    year: 2021,
    author: "Soediro, M. & Nurbianto, A. T.",
    source: "JMBI UNSRAT, Vol. 8, No. 3",
    file: "2021/PERANAN PENERAPAN STANDAR OPERASIONAL PROSEDUR (SOP) TERHADAP PENJUALAN DAN KINERJA KARYAWAN (SEBUAH KAJIAN TERHADAP BISNIS RESTORAN PADA MASA PANDEMI COVID-19).pdf"
  },
  {
    title: "Model Sistem Antrian pada Pelayanan Restoran Cepat Saji (Studi Kasus di KFC Gajah Mada Kabupaten Jember)",
    year: 2021,
    author: "Purnomo, B. H., dkk.",
    source: "Jurnal Agroteknologi, Vol. 15, No. 1",
    file: "2021/MODEL SISTEM ANTRIAN PADA PELAYANAN RESTORAN CEPAT SAJI (Studi Kasus di KFC Gajah Mada Kabupaten Jember).pdf"
  },
  {
    title: "Membangun Bisnis Kuliner Sebagai Pemula",
    year: 2021,
    author: "Gede Ajusta, A. A. & Sururi Afif, N.",
    source: "Akrab Juara, Vol. 6, No. 4",
    file: "2021/MEMBANGUN BISNIS KULINERSEBAGAI PEMULA.pdf"
  }
].sort((a, b) => a.year - b.year);

const grid = document.getElementById("card-grid");
const emptyState = document.getElementById("empty-state");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search-input");
const yearPills = document.querySelectorAll(".year-pill");

let activeYear = "all";
let query = "";

function downloadIcon() {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 1.5V10.5" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M4.5 7L8 10.5L11.5 7" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.5 13H13.5" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`;
}

function render() {
  const filtered = JOURNALS.filter((j) => {
    const matchesYear = activeYear === "all" || String(j.year) === activeYear;
    const matchesQuery = j.title.toLowerCase().includes(query) || j.author.toLowerCase().includes(query);
    return matchesYear && matchesQuery;
  });

  grid.innerHTML = filtered.map((j) => `
    <article class="journal-card">
      <span class="journal-card__year">${j.year}</span>
      <h3 class="journal-card__title">${j.title}</h3>
      <p class="journal-card__meta">${j.author} &middot; ${j.source}</p>
      <a class="button-primary" href="${encodeURI(j.file)}" download>
        ${downloadIcon()} Unduh PDF
      </a>
    </article>
  `).join("");

  resultCount.textContent = `${filtered.length} jurnal ditemukan`;
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
}

searchInput.addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  render();
});

yearPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    yearPills.forEach((p) => p.classList.remove("year-pill--active"));
    pill.classList.add("year-pill--active");
    activeYear = pill.dataset.year;
    render();
  });
});

render();
