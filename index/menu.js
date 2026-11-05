// Ждем загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    
    // Находим кнопку и блок для вывода
    const calcBtn = document.getElementById('calcBtn');
    const totalPriceDiv = document.getElementById('total-price');
    const form = document.getElementById('calcForm');

    // Базовые цены для расчета (можно менять по своему усмотрению)
    const PRICES = {
        type: {
            townhouse: 1000000, // Базовая цена за таунхаус
            blocked: 1200000,
            attached: 1500000
        },
        floors: {
            "1": 0,    // Надбавка за этаж
            "2": 300000,
            "3": 600000
        },
        material: {
            brick: 500000,  // Надбавка за материал
            gas: 300000,
            wood: 400000,
            foam: 200000
        },
        areaMultiplier: 15000, // Цена за 1 кв.м.
        garage: {
            "0": 250000,
            "1": 350000,
            "2": 200000,
            "3": 0
        },
        extras: {
            terrace: 100000,
            balcony: 80000,
            fireplace: 120000,
            basement: 400000
        }
    };

    // Функция расчета
    function calculateTotal() {
        let total = 0;

        // 1. Тип объекта
        const type = form.querySelector('input[name="type"]:checked').value;
        total += PRICES.type[type];

        // 2. Этажность
        const floors = form.querySelector('input[name="floors"]:checked').value;
        total += PRICES.floors[floors];

        // 3. Материал
        const material = form.querySelector('select[name="material"]').value;
        total += PRICES.material[material];

        // 4. Площадь
        const area = parseInt(form.querySelector('select[name="area"]').value);
        total += area * PRICES.areaMultiplier;

        // 5. Гараж
        const garage = form.querySelector('select[name="garage"]').value;
        total += PRICES.garage[garage];

        // 6. Дополнительно (чекбоксы)
        const extras = form.querySelectorAll('input[name="extras"]:checked');
        extras.forEach(function(checkbox) {
            total += PRICES.extras[checkbox.value];
        });

        // Вывод результата с форматированием (разделение тысяч пробелом)
        totalPriceDiv.textContent = "Примерная стоимость: " + total.toLocaleString('ru-RU') + " руб.";
    }

    // Вешаем событие на кнопку
    calcBtn.addEventListener('click', calculateTotal);
});