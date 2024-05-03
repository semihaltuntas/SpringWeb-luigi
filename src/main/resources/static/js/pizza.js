"use strict";
import {byId, toon, verberg, setText} from "./util.js";

byId("zoek").onclick = async function () {
    verbergPizzaEnFouten();
    const zoekIdInput = byId("zoekId");
    console.log(zoekIdInput)
    if (zoekIdInput.checkValidity()) {
        findById(zoekIdInput.value);
    } else {
        toon("zoekIdFout");
        zoekIdInput.focus();
    }
};
byId("bewaar").onclick = async function () {
    const nieuwePrijsInput = byId("nieuwePrijs");
    if (nieuwePrijsInput.checkValidity()) {
        verberg("nieuwePrijsFout");
        updatePrijs(Number(nieuwePrijsInput.value));
    } else {
        toon("nieuwePrijsFout");
        nieuwePrijsInput.focus();
    }
};

async function updatePrijs(nieuwePrijs) {
    const response = await fetch(`pizzas/${byId("zoekId").value}/prijs`,
        {
            method: "PATCH",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(nieuwePrijs)
        });
    if (response.ok) {
        setText("prijs", nieuwePrijs);
    } else {
        toon("storing");
    }
}

function verbergPizzaEnFouten() {
    verberg("pizza");
    verberg("zoekIdFout");
    verberg("nietGevonden");
    verberg("storing");
    verberg("nieuwePrijsFout")
}

async function findById(id) {
    const response = await fetch(`pizzas/${id}`);
    if (response.ok) {
        const pizza = await response.json();
        console.log(pizza)
        toon("pizza");
        setText("naam", pizza.naam);
        setText("prijs", pizza.prijs);
    } else {
        if (response.status === 404) {
            toon("nietGevonden");
        } else {
            toon("storing");
        }
    }
}