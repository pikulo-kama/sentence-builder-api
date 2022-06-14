let wordGroups = {};
let activeGroupWords = [];

$(document).ready(function () {
    let request = new XMLHttpRequest();
    request.open("GET", "/api/v2/words");

    request.onload = function () {
        let wordGroupCollection = JSON.parse(request.responseText);
        for (let group of wordGroupCollection["wordSets"]) {
            wordGroups[group["speechPart"]] = group["words"];
        }
        visualizeActiveGroup();
    }
    request.send();
});

$(document).on('click', '.word-delete-btn', function () {
    let wordContent = $(this).closest('tr').find('td').first().text();
    openConfirmWindow(wordContent, "handleWordDeletion");

});

$('#word-speech-select').on('change', function () {
    visualizeActiveGroup();
});

$('#word-gender-select').on('change', function () {
    filterByActiveGender();
});

$('#word-search-input').on('change keyup paste', function () {
    let input = $('#word-search-input').val();
    if (input === '') {
        visualizeWordGroup(activeGroupWords);
    } else {
        filterWordByInput(input);
    }
});

function visualizeActiveGroup() {
    activeGroupWords = getActiveGroupWords();
    visualizeWordGroup(activeGroupWords);
}

function visualizeWordGroup(words) {
    let tableBody = $("#word-table-body");
    let genderIconMappings = getGenderIconMappings();
    tableBody.empty();

    for (let word of words) {
        tableBody.append(`<tr>
                    <td>${word["content"]}</td>
                    <td>${genderIconMappings[word["wordGender"]]}</td>
                    <td>${getDeleteIcon('word-delete-btn')}</td>
                    <td></td>
        </tr>`);
    }
}

function handleWordDeletion(wordContent) {
    let request = openPostRequest("/api/v2/words/delete");
    request.onload = function () {
        let response = JSON.parse(request.responseText);
        if (response['responseType'] === SUCCESS) {
            let speechPart = getActiveGroupName();
            wordGroups[speechPart] = wordGroups[speechPart].filter(word => word['content'] !== wordContent);
            activeGroupWords = wordGroups[speechPart];
            visualizeActiveGroup();
        }
        openMessageWindow(response['message'], response['responseType']);
    }
    request.send(JSON.stringify({
        "wordContent": wordContent
    }));

    closeConfirmWindow();
}

function filterByActiveGender() {
    let activeGender = getActiveGender();
    activeGroupWords = activeGroupWords.filter(word => word["wordGender"] === activeGender);
    if (activeGender === '') {
        activeGroupWords = getActiveGroupWords();
    }
    visualizeWordGroup(activeGroupWords)
}

function filterWordByInput(input) {
    let filteredWords = activeGroupWords.filter(word => String(word["content"]).toLowerCase().includes(String(input).toLowerCase()));
    visualizeWordGroup(filteredWords);
}

function getActiveGroupWords() {
    return wordGroups[getActiveGroupName()];
}

function getActiveGroupName() {
    return $('#word-speech-select').find(':selected').val();
}

function getActiveGender() {
    return $('#word-gender-select').find(':selected').val();
}
