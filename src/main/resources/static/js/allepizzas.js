"use strict";
import { byId, toon, verberg } from "./util.js"; // util.js dosyasından gerekli fonksiyonları içeri aktarır

const response = await fetch("pizzas"); // pizzas endpoint'ine bir GET isteği gönderir
if (response.ok) { // yanıt başarılı ise devam eder
    const pizzas = await response.json(); // yanıtı JSON formatına dönüştürür
    const pizzasBody = byId("pizzasBody"); // DOM'da pizzasBody öğesini alır
    console.log(pizzasBody); // pizzasBody öğesini konsola yazdırır
    for (const pizza of pizzas) { // her pizza için döngü başlatır
        const tr = pizzasBody.insertRow(); // bir satır ekler
        tr.insertCell().innerText = pizza.id; // satırın bir hücresine pizza ID'sini ekler
        tr.insertCell().innerText = pizza.naam; // satırın bir hücresine pizza adını ekler
        tr.insertCell().innerText = pizza.prijs; // satırın bir hücresine pizza fiyatını ekler

        // Pizza silme düğmesi oluşturma
        const td = tr.insertCell(); // bir hücre ekler
        const button = document.createElement("button"); // bir düğme oluşturur
        td.appendChild(button); // hücreye düğmeyi ekler
        button.innerText = "verwijder"; // düğmenin metnini ayarlar
        button.onclick = async function () { // düğmeye tıklama olayı ekler
            const response = await fetch(`pizzas/${pizza.id}`, { method: "DELETE" }); // belirli bir pizza ID'sini silmek için bir DELETE isteği gönderir
            if (response.ok) { // yanıt başarılı ise
                verberg("storing"); // "storing" öğesini gizler
                tr.remove(); // ilgili satırı DOM'dan kaldırır
            } else { // yanıt başarısız ise
                toon("storing"); // "storing" öğesini gösterir
            }
        };
    }
} else { // yanıt başarısız ise
    toon("storing"); // "storing" öğesini gösterir
}
