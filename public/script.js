 function searchByDistrict(district) {
            fetch(`/search?district=${district}`)
                .then(response => response.json())
                .then(data => {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<h4>Qarzdorlar:</h4>';
                    if (data.length > 0) {
                        data.forEach(row => {
                            resultDiv.innerHTML += `
                                <div class="card">
                                    <p><strong>Ismi:</strong> ${row.Ismi}</p>
                                    <p><strong>Telefon:</strong> ${row.Telefoni}</p>
                                    <p><strong>Id:</strong> ${row.Id}</p>
                                    <p><strong>Qarzi:</strong> ${row.Qarzi}</p>
                                    <p><strong>Qarzdorligi:</strong> ${row.Qarzdorlik}</p>
                                    <p><strong>Tuman:</strong> ${row.Tuman}</p>
                                    <p><strong>Manzili:</strong> ${row.Manzili}</p>
                                </div>`;
                        });
                    } else {
                        resultDiv.innerHTML = '<p>Hech qanday qarzdor topilmadi.</p>';
                    }
                });
        }

        // ID bo'yicha qidiruv funksiyasi
        function searchById() {
            const id = document.getElementById('search-id').value;
            fetch(`/search?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = ''; // Oldingi natijalarni tozalash
                    if (data.length > 0) {
                        data.forEach(row => {
                            resultDiv.innerHTML += `
                                <div class="card">
                                    <p><strong>Ismi:</strong> ${row.Ismi}</p>
                                    <p><strong>Telefon:</strong> ${row.Telefoni}</p>
                                    <p><strong>Id:</strong> ${row.Id}</p>
                                    <p><strong>Qarzi:</strong> ${row.Qarzi}</p>
                                    <p><strong>Qarzdorligi:</strong> ${row.Qarzdorlik}</p>
                                    <p><strong>Tuman:</strong> ${row.Tuman}</p>
                                    <p><strong>Manzili:</strong> ${row.Manzili}</p>
                                </div>`;
                        });
                    } else {
                        resultDiv.innerHTML = '<p>Hech qanday natija topilmadi.</p>';
                    }
                });
        }

        



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
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Optional: Auto-slide
setInterval(nextSlide, 5000); // Change slide every 5 seconds

document.querySelectorAll('.open-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Havolaning asl funksiyasini o'chiradi

        const url = this.getAttribute('data-url');

        // Yashirish va ko'rsatish funksiyalari
        document.querySelectorAll('.link-1').forEach(linkDiv => linkDiv.classList.remove('visible'));
        document.querySelector('.back-button').classList.add('visible');

        // Yangi sahifa yoki kontent ko'rsatish (bu yerda faqat havola ochiladi)
        window.open(url, '_blank'); // Havolani yangi oynada ochish
    });
});

document.getElementById('backButton').addEventListener('click', function() {
    // Orqaga qaytish funksiyasi
    document.querySelectorAll('.link-1').forEach(linkDiv => linkDiv.classList.add('visible'));
    this.classList.remove('visible');
});

function searchData() {
    const name = document.getElementById('search').value;

    fetch(`/search?name=${name}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Clear old results
            if (data.length > 0) {
                data.forEach(row => {
                    resultDiv.innerHTML += `<p>Ismi: ${row.Ismi}, <br> Telefoni: ${row.Telefoni}, <br> Jami olgan qarzi: ${row.Qarzi}, <br> Qarzdorlik: ${row.Qarzdorlik},<br>  Tuman: ${row.Tuman},<br> Manzili: ${row.Manzili}</p>`;
                });
            } else {
                resultDiv.innerHTML = '<p>No results found</p>';
            }
        });
}


const express = require('express');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const PORT = 3000;

// Statik fayllarni ulash
app.use(express.static('project'));

// Excel faylini o'qish va filterlash
app.get('/search', (req, res) => {
    const query = req.query.name.toLowerCase();
    
    // Excel faylini yuklash
    const workbook = xlsx.readFile('/project/qarzdorlar.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Excelni JSON formatiga o'tkazish
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Filterlash
    const result = data.filter(row => row.Name.toLowerCase().includes(query));
    
    // JSON formatida javob qaytarish
    res.json(result);
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
