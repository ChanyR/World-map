import countryModule from "./countryClass.js"
import { declareEvents } from "./event.js";
import {fillSelectBox,saveCountries,createHomeCountries,showLoading} from "./funcCountry.js"

const init = () => {
    doApi();
    declareEvents();
}

const doApi = async() => {
    showLoading();
    let url = `https://restcountries.com/v3.1/all?fields=name,region,population,capital,languages,flags,latlng,cca3,borders,maps`;

    let response = await fetch(url);
    let data = await response.json();

    saveCountries(data);
    fillSelectBox();
    createHomeCountries();
}

init();