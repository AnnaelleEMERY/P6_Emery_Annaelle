"use strict";

import { LikeButton } from "./buttons.js";

class PhotographerCardFocusableArea {
    /**
     * @constructs
     * @param {Photographer} photographer
     */
    constructor(photographer) {
        this._photographer = photographer;
    }

    get html() {
        return `<a href="#photographer:${this._photographer.slug}&tous&date">
              <img 
                src="img/photographers/${this._photographer.portrait}" 
                alt="${this._photographer.name}" width="200" height="200" 
              />
              <h2>${this._photographer.name}</h2>
            </a>`;
    }
}

class PhotographerCardInfos {
    /**
     * @constructs
     * @param {Photographer} photographer
     */
    constructor(photographer) {
        this._photographer = photographer;
    }

    get html() {
        return `<p class="c-photographer-card__location">
              ${this._photographer.city}, ${this._photographer.country}
            </p>
            <p class="c-photographer-card__tagline">
              ${this._photographer.tagline}
            </p>
            <p>${this._photographer.price}&nbsp;€/jour</p>`;
    }
}

export class PhotographerCard {
    /**
     * @constructs
     * @param {Photographer} photographer
     * @param {string} checkedTag
     */
    constructor(photographer) {
        this._photographer = photographer;
    }

    get html() {
        return `<article class="c-photographer-card lg4 md6 sm12">
  ${new PhotographerCardFocusableArea(this._photographer).html}
  ${new PhotographerCardInfos(this._photographer).html}
            </article>`;
    }
}

export class MediumCard {
    /**
     * @constructs
     * @param {Photographer} photographer
     * @param {Medium} medium
     */
    constructor(photographer, medium) {
        this._photographer = photographer;
        this._medium = medium;
    }

    get html() {
        let htmlContent = `<article class="lg4 md6 sm12 c-medium-card">
                        <div class="c-medium-card__img" tabindex="0"
                         data-medium-id="${this._medium.id}">
                          <img
                            src="img/${this._photographer.mediaFolder}/${this._medium.image}" 
                            alt="${this._medium.altText}" 
                            width="350" height="300"
                          />`;

        htmlContent += "</div>";
        htmlContent += `<div class="row-12 c-medium-card__infos">
                    <h2 class="lg7 md7 sm8" lang="en">
                      ${this._medium.title}
                    </h2>
                    <p class="lg2 md2 sm2">${this._medium.price}&nbsp;€</p>`;
        htmlContent += new LikeButton(
            "lg3 md3 sm2 c-btn",
            "button",
            this._medium.likes,
            this._medium.id,
            this._medium.isLiked
        ).html;
        htmlContent += "</div></article>";

        return htmlContent;
    }
}
