// Initialize visible sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.search-page').style.display = 'none';
    document.querySelector('.plus-page').style.display = 'none';
    document.querySelector('.about-bank').style.display = 'none';
    document.querySelector('.tuman-search').style.display = 'none';
    document.querySelector('.search-ism').style.display = 'none';
});

// Carousel functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach((slide, i) => {
        slide.style.display = i === slideIndex ? 'block' : 'none';
    });
}

function nextSlide() {
    showSlide(++slideIndex);
}

function prevSlide() {
    showSlide(--slideIndex);
}

document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);

// Optional: Auto-slide
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Footer icon functionality
const homeSection = document.querySelector('.hero');
const searchPage = document.querySelector('.search-page');
const plusPage = document.querySelector('.plus-page');
const aboutPage = document.querySelector('.about-bank');

document.getElementById('home').addEventListener('click', () => {
    homeSection.style.display = 'block';
    searchPage.style.display = 'none';
    plusPage.style.display = 'none';
    aboutPage.style.display = 'none';
    document.querySelector('.tuman-search').style.display = 'none';
    document.querySelector('.search-ism').style.display = 'none';
});

document.getElementById('search').addEventListener('click', () => {
    homeSection.style.display = 'none';
    searchPage.style.display = 'block';
    plusPage.style.display = 'none';
    aboutPage.style.display = 'none';
    document.querySelector('.tuman-search').style.display = 'none';
    document.querySelector('.search-ism').style.display = 'none';
});

document.getElementById('plus').addEventListener('click', () => {
    homeSection.style.display = 'none';
    searchPage.style.display = 'none';
    plusPage.style.display = 'block';
    aboutPage.style.display = 'none';
    document.querySelector('.tuman-search').style.display = 'none';
    document.querySelector('.search-ism').style.display = 'none';
});

document.getElementById('about').addEventListener('click', () => {
    homeSection.style.display = 'none';
    searchPage.style.display = 'none';
    plusPage.style.display = 'none';
    aboutPage.style.display = 'block';
    document.querySelector('.tuman-search').style.display = 'none';
    document.querySelector('.search-ism').style.display = 'none';
});

// Search Page functionality
const tumanSearch = document.querySelector('.tuman-search');
const searchIsm = document.querySelector('.search-ism');
const closeSearchBtn = document.getElementById('close-search');
const closeSearchIsmBtn = document.getElementById('close-search-ism');
const byDistrictBtn = document.getElementById('by-district');
const byNameBtn = document.getElementById('by-name');

byDistrictBtn.addEventListener('click', () => {
    tumanSearch.style.display = 'flex';
    searchIsm.style.display = 'none';
});

byNameBtn.addEventListener('click', () => {
    tumanSearch.style.display = 'none';
    searchIsm.style.display = 'flex';
});

closeSearchBtn.addEventListener('click', () => {
    tumanSearch.style.display = 'none';
    searchPage.style.display = 'block';
});

closeSearchIsmBtn.addEventListener('click', () => {
    searchIsm.style.display = 'none';
    searchPage.style.display = 'block';
});

/// Excel faylini yuklash va uni qayta ishlash
async function loadExcelData() {
    try {
        const response = await fetch('/public/data.xlsx'); // To'g'ri yo'lni yangilang
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        return jsonData;
    } catch (error) {
        console.error('Excel faylini yuklashda xato:', error);
    }
}

// Ma'lumotlarni ko'rsatish
function displayData(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h4>Ma\'lumotlar:</h4>';
    
    data.forEach((row, index) => {
        if (index === 0) {
            // Sarlavha qatorini o'tkazib yuborish
            return;
        }
        
        resultDiv.innerHTML += `
            <div class="card">
                <p><strong>Ismi:</strong> ${row[0]}</p>
                <p><strong>Telefon:</strong> ${row[1]}</p>
                <p><strong>ID:</strong> ${row[2]}</p>
                <p><strong>Qarzi:</strong> ${row[3]}</p>
                <p><strong>Qarzdorligi:</strong> ${row[4]}</p>
                <p><strong>Tuman:</strong> ${row[5]}</p>
                <p><strong>Manzili:</strong> ${row[6]}</p>
            </div>`;
    });
}

// Tuman bo'yicha qidiruv
async function searchByDistrict(district) {
    const data = await loadExcelData();
    if (data) {
        const filteredData = data.filter(row => row[5] === district && row[4] > 0); // Qarzdorligi 0 dan katta bo'lganlarni tanlash
        displayData(filteredData);
    }
}

// ID bo'yicha qidiruv
async function searchById() {
    const searchId = document.getElementById('search-id').value.trim();
    if (!searchId) {
        alert('ID raqamini kiriting.');
        return;
    }
    const data = await loadExcelData();
    if (data) {
        const foundData = data.find(row => row[2] == searchId);
        if (foundData) {
            displayData([foundData]);
        } else {
            document.getElementById('result').innerHTML = '<p>ID raqami topilmadi.</p>';
        }
    }
}

// Tuman tanlanganida qidiruv
document.querySelectorAll('.district-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const selectedDistrict = this.innerText; // Tugma matnidan tumanni olish
        searchByDistrict(selectedDistrict);
    });
});

// ID bo'yicha qidirish tugmasiga hodisa qo'shish
document.querySelector('.search-page button').addEventListener('click', searchById);
