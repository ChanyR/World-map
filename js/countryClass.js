export default class CountryClass {

    constructor(_parent, _item, _getNameByCode, _createCountryByCode) {
        this.getNameByCode = _getNameByCode;
        this.createCountryByCode = _createCountryByCode;

        this.parent = _parent;
        this.name = _item.name.common;
        this.region = _item.region;
        this.population = _item.population.toLocaleString();
        this.capital = _item.capital ? _item.capital : "none";
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.countryCode = _item.cca3;
        this.borders = _item.borders;
        this.maps = _item.maps.googleMaps;
    }

    render() {
        let countryCard = document.createElement("div");
        document.querySelector(this.parent).className = "row"
        countryCard.className = "d-flex text-center justify-content-center";
        document.querySelector(this.parent).append(countryCard);


        countryCard.innerHTML += `
        <div class="row w-75 bigBox " data-aos="zoom-out-down" data-aos-duration="1000">
            <div class="col-xl-6 p-4">
                <h2 class="m-3 fw-bold name-state">${this.name}</h2>
                        <table class="table table-striped table-light">
                        <tbody>
                        <tr>
                        <th scope="row">Population: </th>
                        <td> ${this.population}</td>
                        </tr>
                        <tr>
                        <th scope="row">Region: </th>
                        <td> ${this.region}</td>
                        </tr>  
                        <tr>
                        <th scope="row">Capital: </th>
                        <td> ${this.capital}</td>
                        </tr>  
                        <tr>
                        <th scope="row">Languages: </th>
                        <td> ${this.languages}</td>
                    </tr>  
                    <tr>
                    <th scope="row">Borders:   </th>
                    <td id="id_borders"></td>
                    </tr>   
                        </tbody>
                    </table>
                <img src="${this.flag}" width="100%"  alt="${this.name}_flag" >
            </div>
            <div class="col-xl-6 p-4">
                <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=en&z=7&amp;output=embed">
                </iframe>
            </div>
        </div>`;

        //map in Hebrow
        // <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        //     src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=wi&z=7&amp;output=embed">
        // </iframe>

        //link and full name borders
        if (this.borders.length > 0) {
            let id_borders = countryCard.querySelector("#id_borders");
            this.borders.forEach(async (element, i) => {
                let fullName = await this.getNameByCode(element);
                let span = document.createElement("span");
                span.innerHTML = fullName;
                span.style.cursor = "pointer";
                id_borders.append(span);

                span.addEventListener("click", async () => {
                    document.querySelector(this.parent).innerHTML = "";
                    await this.createCountryByCode(element);
                })

                if (i < this.borders.length - 1) {
                    span.innerHTML += ", ";
                }
                else {
                    span.innerHTML += ".";
                }
            });
        }
        else {
            id_borders.innerHTML += "none";
        }

    }

    smallerRender() {
        let countryCard = document.createElement("div");
        countryCard.className = "d-flex justify-content-center my-3 text-center ";
        document.querySelector(this.parent).append(countryCard);
        document.querySelector(this.parent).className = "row row-cols-lg-3 row-cols-md-2 justify-content-around"
        countryCard.innerHTML += `
        <div class="homeBox card h-100" data-aos="fade-up" data-aos-duration="1500">
        <img src="${this.flag}" class="homeBoxImg card-img-top shadow" width="100%" alt="${this.name}_flag">
        <div class="card-body">
        <p class="homeBoxP card-text Mcard-text m-0 p-3">Name: ${this.name} </p>
        </div></div>`;

        countryCard.addEventListener("click", () => {
            document.querySelector(this.parent).innerHTML = "";
            this.render();
        })
    }
}