const express = require('express');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const PORT = 3001;

// Statik fayllarni ulash
app.use(express.static('public'));

// Excel faylini o'qish va filterlash
app.get('/search', (req, res) => {
    const { id, district } = req.query; // So'rovdan ID va tuman olinadi

    // Excel faylini yuklash
    const workbook = xlsx.readFile('./public/data.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Excelni JSON formatiga o'tkazish
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Qidiruv natijalarini saqlash uchun massiv
    let result = [];

    // Agar tuman bo'yicha qidirilsa
    if (district) {
        result = data.filter(row => row.Tuman === district && row.Qarzdorlik > 0);
    }

    // Agar ID bo'yicha qidirilsa
    if (id) {
        result = data.filter(row => row.Id == parseInt(id)); // 'Id' raqamga aylantirilmoqda
    }

    // Topilgan natijalarni JSON formatida qaytarish
    res.json(result);
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
