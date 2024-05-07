"use strict";
import {byId, setText, toon, verberg} from "./util.js";

byId("toevoegen").onclick = async function () {
    verbergFouten();
    const naamInput = byId("naam");
    if (!naamInput.checkValidity()) {
        toon("naamFout");
        naamInput.focus();
        return;
    }
    const prijsInput = byId("prijs");
    if (!prijsInput.checkValidity()) {
        toon("prijsFout");
        prijsInput.focus();
        return;
    }
// JavaScript object maken dat een pizza met naam en prijs voorstelt:
    const pizza = {
        naam: naamInput.value,
        prijs: Number(prijsInput.value)
    };
    voegToe(pizza);
};

function verbergFouten() {
    verberg("naamFout");
    verberg("prijsFout");
    verberg("storing");
    verberg("conflict");
}

async function voegToe(pizza) {
    const response = await fetch("pizzas",
        {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(pizza)
        });
    if (response.ok) {
        window.location = "allepizzas.html";
    } else {
        toon("storing");
    }
    if (response.status === 409) {
        const responseBody = await response.json();
       // console.log(responseBody)
        setText("conflict", responseBody.message);
        toon("conflict");
    } else {
        toon("storing");
    }
}