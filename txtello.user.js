// ==UserScript==
// @name         Txtello
// @namespace    dubrox
// @version      0.1
// @description  Trello as text
// @author       dubrox
// @match        https://trello.com/*/*.json
// @icon         https://www.google.com/s2/favicons?domain=trello.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Chrome renders the JSON in a <pre> tag
    const el = document.querySelector('pre');
    const data = JSON.parse(el.innerText);
    const lists = data.lists.reduce((all, {id, name}, index) => ({...all, [id]: {name, index}}), {});
    const cards = data.cards.sort((a, b) => lists[a.idList].index - lists[b.idList].index || a.pos - b.pos)
    const text = cards.map(c => `[${lists[c.idList].name}] ${c.name}`).join(".\n");
    el.innerText = text;
})();
