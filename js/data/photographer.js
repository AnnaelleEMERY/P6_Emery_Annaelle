"use strict";

export class Photographer {
    /**
     * @constructs
     * @param {number} id
     * @param {string} name
     * @param {string} city
     * @param {string} country
     * @param {string} tagline
     * @param {number} price
     * @param {string} portrait
     */
    constructor(id, name, city, country, tagline, price, portrait) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
}

export class PhotographersList {
    /**
     * @constructs
     * @param {Array.Photographer} photographers
     */
    constructor(photographers) {
        this.photographers = photographers;

        this.sortByName();
    }

    findByName(name) {
        const slugToMatch = name.toLowerCase().replace(/ /, "-");

        for (let photographer of this.photographers) {
            if (photographer.slug === slugToMatch) {
                return photographer;
            }
        }
        return `No photographer finded for the name '${name}'`;
    }

    sortByName() {
        this.photographers.sort((p1, p2) => {
            const name1 = p1.name.toLowerCase();
            const name2 = p2.name.toLowerCase();

            if (name1 > name2) return 1;
            if (name1 < name2) return -1;
            return 0;
        });
    }
}
