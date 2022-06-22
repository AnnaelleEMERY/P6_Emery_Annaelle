"use strict";

export class Medium {
    /**
     * @constructs
     * @param {number} id
     * @param {string} photographerId
     * * @param {string} title
     * @param {string} image
     * @param {number} likes
     * @param {string} date
     * @param {number} price
     */
    constructor(id, photographerId, title, image, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.isLiked = false;
        this.date = new Date(date);
        this.price = price;
    }
}

export class MediaList {
    /**
     * @constructs
     * @param {Array.Medium} media
     */
    constructor(media) {
        this.media = media;
    }

    /**
     * @param {number} photographerId
     * @returns {MediaList}
     */

    _sortByDate() {
        return this.media.sort((m1, m2) => {
            if (m1.date - m2.date < 0) return 1;
            if (m1.date - m2.date > 0) return -1;
            return 0;
        });
    }

    _sortByLikes() {
        return this.media.sort((m1, m2) => {
            if (m1.likes < m2.likes) return 1;
            if (m1.likes > m2.likes) return -1;
            return 0;
        });
    }

    _sortByTitle() {
        return this.media.sort((m1, m2) => {
            const title1 = m1.title.toLowerCase();
            const title2 = m2.title.toLowerCase();

            if (title1 > title2) return 1;
            if (title1 < title2) return -1;
            return 0;
        });
    }
}
