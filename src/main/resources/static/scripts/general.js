const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

const DEFAULT_SCREEN_ID = 'home-screen-link';

const screens = {
    "home-screen-link": "home-screen",
    "word-screen-link": "word-screen",
    "schema-screen-link": "schema-screen"
};

const locationScreensMapping = {
    "#home": "home-screen-link",
    "#schemas": "schema-screen-link",
    "#words": "word-screen-link"
};

$(document).ready(function () {
    let locationHash = window.location.hash;
    if (locationHash) {
        let screenId = locationScreensMapping[locationHash];
        setActiveScreen(screenId);
    } else {
        setActiveScreen(DEFAULT_SCREEN_ID);
    }
});

function openPostRequest(url) {
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    return request;
}

$("#home-screen-link, #word-screen-link, #schema-screen-link").on('click', function () {
    let currentScreenId = $(this).attr('id');
    setActiveScreen(currentScreenId);
});

function setActiveScreen(screenId) {
    for (const [key, value] of Object.entries(screens)) {
        $('#'.concat(value)).hide();
        if (key === screenId) {
            $('#'.concat(value)).show();
        }
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function getDeleteIcon(className) {
    return `<span class="${className}" style="cursor: pointer;"><i class="fas fa-trash-alt"></i></span>`;
}

function getGenderIconMappings() {
    return {
        "male": "<i class=\"fas fa-mars\"></i>",
        "female": "<i class=\"fas fa-venus\"></i>",
        "middle": "<i class=\"fas fa-balance-scale-right\"></i>",
        "general": "<i class=\"far fa-dot-circle\"></i>"
    };
}

function getSpeechPartColorMappings() {
    return {
        "noun": "text-success",
        "adjective": "text-warning",
        "verb": "text-danger",
        "adverb": "text-secondary"
    }
}

function getShortcuts() {
    return {
        "noun": "N",
        "adjective": "ADJ",
        "verb": "V",
        "adverb": "ADV"
    }
}

function getLastCharacter(str) {
    return str.substring(str.length - 1, str.length);
}