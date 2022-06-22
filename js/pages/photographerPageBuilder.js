"use strict";

import { Button } from "./components/buttons.js";
import { ContactModal, MediaModal } from "./components/modals.js";
import { MediumCard } from "./components/cards.js";
import { MediaSortingDropdownMenu } from "./components/dropdown.js";
import { Logo } from "./components/logo.js";

export class PhotographerPageBuilder {
    /**
     * @constructs
     * @param {string} photographer
     * @param {MediaList} mediaList
     * @param {string} checkedTag
     * @param {string} sortingCriterion
     */
    constructor(photographer, mediaList) {
        this._photographer = photographer;
        this._mediaList = mediaList;
    }

    render() {
        const contentWrapper = document.getElementById("p-spa-wrapper");

        contentWrapper.className = "p-photographer";

        this._renderHeader();
        this._renderMain();

        this._addOpenContactModalEvent();
        this._addShowFocusOnDropdownMenu();
        this._addOpenMediaModalEvents();
        this._addLikesEvents();
    }

    _renderHeader() {
        const header = document.querySelector("header");

        header.innerHTML = new Logo().html;
    }

    _renderMain() {
        const main = document.querySelector("main");
        let htmlContent = "";

        htmlContent += this._templatePhotographerBanner(this._photographer);

        htmlContent += `<div class="row-12" id="cards-container">
                      ${this._templateMediaCards(this._sortingCriterion)}
                    </div>`;

        htmlContent += this._templatePhotographerSummary();

        main.innerHTML = htmlContent;
    }

    _templatePhotographerBanner() {
        let infosHtml = `<h1>${this._photographer.name}</h1>
                     <p class="p-banner__location">
                       ${this._photographer.city}, ${this._photographer.country}
                     </p>
                     <p class="p-banner__tagline">
                       ${this._photographer.tagline}
                     </p>`;

        let infosPhotographHtml = `<div class="lg4 md6 sm8">
                                ${infosHtml}
                              </div>`;

        let contactButtonHtml = new Button(
            "c-btn c-btn--cta c-btn--contact",
            "button",
            "Contactez-moi"
        ).html;

        let contactWrapperHtml = `<div class="lg4 md3 sm12 p-banner__contact-btn">
                              ${contactButtonHtml}
                             </div>`;

        let portraitHtml = `<div class="lg4 md3 sm4 p-banner__portrait">
          <img 
            src="img/photographers/${this._photographer.portrait}" 
            alt="${this._photographer.name}" width="200" height="200" 
          />
                        </div>`;

        return `<section class="row-12 p-banner">
              ${infosPhotographHtml}
              ${contactWrapperHtml}
              ${portraitHtml}
            </section>`;
    }

    _templateMediaCards() {
        let photographerMedia = this._mediaList;

        let cardsHtml = "";

        for (let medium of photographerMedia.media) {
            cardsHtml += new MediumCard(this._photographer, medium).html;
        }

        return cardsHtml;
    }

    _templatePhotographerSummary() {
        const photographerMedia = this._mediaList;

        let photographerTotalLikes = 0;

        for (let medium of photographerMedia.media) {
            photographerTotalLikes += medium.likes;
        }

        return `<div class="p-photographer-summary">
              <span id="photographer-total-likes">
                ${photographerTotalLikes}
              </span>
              &nbsp;<i class="fas fa-heart"></i>
              <span>${this._photographer.price}&nbsp;€&nbsp;/&nbsp;jour</span>
            </div>`;
    }

    _addOpenContactModalEvent() {
        const contactButton = document.querySelector(".c-btn--contact");

        contactButton.onclick = () => {
            const modalBackground = document.getElementById("modal-bg");
            const modalWindow = document.getElementById("modal-window");

            const contactModal = new ContactModal(this._photographer);

            modalWindow.classList.remove("c-media-modal");
            modalWindow.classList.add("c-contact-modal");

            modalWindow.innerHTML = contactModal.html;

            contactModal.addCloseModalEvents();
            contactModal.addSubmitFormEvent();

            document.getElementById("contact-form").reset();

            const modalFormWrapper = document.getElementById(
                "contact-form-wrapper"
            );
            const modalSuccessWrapper = document.getElementById(
                "contact-success-wrapper"
            );

            modalBackground.classList.add("displayed");
            modalSuccessWrapper.style.height = 0;
            modalFormWrapper.style.height = "auto";

            const firstInput = document.getElementById("first-name");
            firstInput.focus();
        };
    }

    _addShowFocusOnDropdownMenu() {
        const customOptions = document.querySelectorAll("[data-criterion]");
        const firstCustomOption = document.querySelector("[data-criterion");
        const arrowIcon = document.querySelector(".fa-chevron-down");

        const openOnFocus = (key) => {
            if (key.code === "Enter") {
                arrowIcon.classList.toggle("fa-chevron-down");
                arrowIcon.classList.toggle("fa-chevron-up");

                for (const customOption of customOptions) {
                    if (customOption !== firstCustomOption) {
                        customOption.classList.toggle("displayed");
                    }
                }
            }
        };
    }

    _openMediaModal(mediumImage) {
        const mediumToDisplayId = mediumImage.getAttribute("data-medium-id");
        const modalBackground = document.getElementById("modal-bg");
        const modalWindow = document.getElementById("modal-window");

        let photographerMedia = this._mediaList;

        photographerMedia.sortByCriterion(this._sortingCriterion);

        const mediaModal = new MediaModal(
            this._photographer,
            photographerMedia,
            mediumToDisplayId
        );

        modalWindow.classList.remove("c-contact-modal");
        modalWindow.classList.add("c-media-modal");

        modalWindow.innerHTML = mediaModal.html;

        mediaModal.addCloseModalEvents();
        mediaModal.addNavigationEvents();

        modalBackground.classList.add("displayed");
    }

    _addOpenMediaModalEvents() {
        const mediaImages =
            document.getElementsByClassName("c-medium-card__img");

        for (const mediumImage of mediaImages) {
            mediumImage.onclick = () => {
                this._openMediaModal(mediumImage);
            };

            mediumImage.onkeydown = (key) => {
                if (key.code == "Enter") {
                    this._openMediaModal(mediumImage);
                }
            };
        }
    }

    _addLikesEvents() {
        const photographerMedia = this._mediaList;

        for (let medium of photographerMedia.media) {
            const likeButton = document.querySelector(
                `button[data-medium-id="${medium.id}"]`
            );
            const likesQuantitySpan = document.getElementById(
                `likes-quantity-${medium.id}`
            );
            const likeIcon = document.getElementById(`like-icon-${medium.id}`);
            const photographerTotalLikesSpan = document.getElementById(
                "photographer-total-likes"
            );

            likeButton.onclick = () => {
                let totalLikes = parseInt(
                    photographerTotalLikesSpan.textContent
                );

                medium.isLiked = !medium.isLiked;

                if (medium.isLiked) {
                    medium.likes += 1;
                    totalLikes += 1;

                    likeIcon.classList.remove("far");
                    likeIcon.classList.add("fas");
                } else {
                    medium.likes -= 1;
                    totalLikes -= 1;

                    likeIcon.classList.remove("fas");
                    likeIcon.classList.add("far");
                }

                likesQuantitySpan.textContent = medium.likes;
                photographerTotalLikesSpan.textContent = totalLikes;
            };
        }
    }
}
