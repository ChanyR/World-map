import CountryModule from "./countryClass.js";

let countries_arr = [];
let homeCountriesdata = [];
const firstCountries = [
    "israel",
    "united states",
    "france",
    "united kingdom",
    "thailand",
];
let parent = "#id_row";

export const saveCountries = (_data) => {
    countries_arr = _data;
}

export const createHomeCountries = () => {
    hideLoading();
    if (homeCountriesdata.length <= 0) {
        homeCountriesdata = countries_arr.filter((item) =>
            firstCountries.includes(item.name.common.toLowerCase())
        )
    }
    document.querySelector(parent).innerHTML = "";
    let country;
    homeCountriesdata.forEach(item => {
        country = new CountryModule(parent, item, getNameByCode, createCountryByCode);
        country.smallerRender();
    })
}

export const createCountry = (_searchName) => {
    document.querySelector(parent).innerHTML = "";
    showLoading();
    let arrSearch = countries_arr.filter(item =>
        item.name.common.toLowerCase().includes(_searchName.toLowerCase()))
    hideLoading();
    if (arrSearch.length > 0) {
        let country;
        arrSearch.forEach(item => {
            country = new CountryModule(parent, item, getNameByCode, createCountryByCode);
            country.smallerRender();
        });
    } else {
        document.querySelector(parent).innerHTML = `<h1 class="text-white w-50 text-center">Country ${_searchName} is not found</h1>`;
    }
}

export const createCountryByCode = async (_code) => {
    document.querySelector(parent).innerHTML="";
    let url = `https://restcountries.com/v3.1/alpha/${_code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
    let country = new CountryModule(parent, data[0], getNameByCode, createCountryByCode);
    country.render();
}

export const getNameByCode = async (_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
}

export const fillSelectBox = () => {
    let select = document.querySelector("#id_select_country");
    countries_arr.forEach((item) => {
        select.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`;
    })
}

export const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}
