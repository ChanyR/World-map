import { createCountry, createCountryByCode, createHomeCountries } from "./funcCountry.js"

export const declareEvents = () => {

    let input = document.querySelector("#id_input");
    let search_btn = document.querySelector("#id_search_btn");
    let select = document.querySelector("#id_select_country");

    search_btn.addEventListener("click", () => {
        createCountry(id_input.value);
    })

    input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            createCountry(id_input.value);
        }
    })

    select.addEventListener("change", () => {
        if (select.value != "0") {
            createCountry(select.value);
        }
    })

    let id_home=document.querySelector("#id_home");
    let id_israel = document.querySelector("#id_israel");
    let id_france = document.querySelector("#id_france");
    let id_thailand = document.querySelector("#id_thailand");
    let id_UK = document.querySelector("#id_UK");
    let id_USA = document.querySelector("#id_USA");

    id_home.addEventListener("click", () => {
        createHomeCountries();
    })
    id_france.addEventListener("click", () => {
        createCountryByCode("FRA")
    })
    id_israel.addEventListener("click", () => {
        createCountryByCode("ISR")
    })
    id_thailand.addEventListener("click", () => {
        createCountryByCode("THA")
    })
    id_UK.addEventListener("click", () => {
        createCountryByCode("GBR")
    })
    id_USA.addEventListener("click", () => {
        createCountryByCode("USA")
    })
}