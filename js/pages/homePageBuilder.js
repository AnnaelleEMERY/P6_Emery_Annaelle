"use strict";

import { PhotographerCard } from "./components/cards.js";
import { Logo } from "./components/logo.js";

export class HomePageBuilder {
    /**
     * @constructs
     */
    constructor(photographersList) {
        this._photographersList = photographersList;
    }

    render() {
        const contentWrapper = document.getElementById("p-spa-wrapper");

        contentWrapper.className = "p-home";

        this._renderHeader();
        this._renderMain();
    }

    _renderHeader() {
        const header = document.querySelector("header");
        let htmlContent = "";

        htmlContent += new Logo().html;

        header.innerHTML = htmlContent;
    }

    _renderMain() {
        const main = document.querySelector("main");
        let htmlContent = "<h1>Nos photographes</h1>";

        htmlContent += this._templatePhotographersCards(this._checkedTag);

        main.innerHTML = htmlContent;
    }

    _templatePhotographersCards() {
        let cardsHtml = "";

        for (let photographer of this._photographersList.photographers) {
            cardsHtml += new PhotographerCard(photographer).html;
        }

        return `<div class=row-12>${cardsHtml}</div>`;
    }
}
