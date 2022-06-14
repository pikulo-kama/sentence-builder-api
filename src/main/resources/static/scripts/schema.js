let schemas = [];
let tempExample = "";

let schemaWords = {};

$(document).ready(function () {
    let request = new XMLHttpRequest();
    request.open("GET", "/api/v2/schemas");

    request.onload = function () {
        formatRawSchemas(JSON.parse(request.responseText));
        visualizeSchemas(schemas);
    }
    request.send();
});

function formatRawSchemas(rawSchemas) {
    let iconMappings = getGenderIconMappings();
    let colorMappings = getSpeechPartColorMappings();
    let shortcuts = getShortcuts();

    for (let schema of rawSchemas) {
        let schemaId = schema["sentenceSchemaId"];
        getSentenceExample(schemaId);

        let rawSchemaWords = schema["words"];

        let exampleString = [];
        for (let word of rawSchemaWords) {
            let gender = word['wordGender'] ?? 'general';
            let speechPart = word["speechPart"];

            exampleString.push(`<p class="${colorMappings[speechPart]}">${iconMappings[gender]} ${shortcuts[speechPart]}</p>`);
        }
        schemas.push({
            "sentenceSchemaId": schemaId,
            "schema": exampleString.join("  "),
            "example": tempExample
        });
    }

}

function visualizeSchemas(schemas) {
    let schemaTable = $("#schema-table-body");
    schemaTable.empty();

    for (let schema of schemas) {
        schemaTable.append(`<tr>
                                <td>${schema["sentenceSchemaId"]}</td>
                                <td>${schema["schema"]}</td>
                                <td><mark>${schema["example"]}</mark></td>
                                <td>${getDeleteIcon('schema-delete-btn')}</td>
                            </tr>`);
    }
}

$('#add-schema-word').on('click', function () {
    let gender = $('#schema-word-gender-select').find(':selected').val();
    let speechPart = $('#schema-word-speech-select').find(':selected').val();

    let schemaWordId = String(Object.keys(schemaWords).length + 1);

    schemaWords[schemaWordId] = {
        "speechPart": speechPart,
        "wordGender": gender
    };

    visualizeSchemaWordsTable(schemaWords);
});

$('#create-schema-btn').on('click', function () {
    $('#schema-word-table-body').empty();
    let wordList = [];
    for (let wordId in schemaWords) {
        let wordInfo = schemaWords[wordId];
        wordInfo['wordOrder'] = parseInt(wordId);
        wordList.push(wordInfo);
    }
    schemaWords = {};

    let request = openPostRequest('/api/v2/schemas/create');
    request.onload = function () {
        let response = JSON.parse(request.responseText);
        if (response['responseType'] === SUCCESS) {
            let createdSchema = response['responseData']['sentenceSchema'];
            formatRawSchemas(createdSchema);
            visualizeSchemas(schemas);
        }
        openMessageWindow(response['message'], response['responseType']);
    }

    request.send(JSON.stringify({
        "words": wordList
    }));

    $('#close-schema-window-btn').trigger('click');
});

$(document).on('click', '.schema-word-delete-btn', function () {
    let wordId = $(this).closest('tr').find('td').first().html();
    delete schemaWords[wordId];
    reorderSchemaWords();
    visualizeSchemaWordsTable(schemaWords);
})


$(document).on('click', '.schema-delete-btn', function () {
    let schemaId = $(this).closest('tr').find('td').first().text();
    openConfirmWindow(schemaId, "handleSchemaDeletion");
});

function reorderSchemaWords() {
    let newSchemaWords = {};
    let id = 0;

    for (let wordId of Object.keys(schemaWords)) {
        newSchemaWords[++id] = schemaWords[wordId];
    }
    schemaWords = newSchemaWords;
}

function visualizeSchemaWordsTable(words) {
    let iconMappings = getGenderIconMappings();
    let schemaWordsTable = $('#schema-word-table-body');
    schemaWordsTable.empty();

    for (let wordId of Object.keys(words)) {
        let word = words[wordId];
        schemaWordsTable.append(`<tr>
                                    <td scope="row">${wordId}</td>
                                    <td>${word["speechPart"]}</td>
                                    <td>${iconMappings[word["wordGender"]]}</td>
                                    <td>${getDeleteIcon('schema-word-delete-btn')}</td>
                                 </tr>`);
    }
}

function getSentenceExample(schemaId) {
    let request = new XMLHttpRequest();
    request.open("GET", "/api/v2/sentences/generate-by-schema?id=".concat(schemaId), false);
    request.onload = function () {
        tempExample = JSON.parse(request.responseText)["sentences"][0];
    }
    request.send();
}

function handleSchemaDeletion(schemaId) {
    let request = openPostRequest('/api/v2/schemas/delete/'.concat(schemaId))
    request.onload = function () {
        schemas = schemas.filter(schema => schema["sentenceSchemaId"] !== parseInt(schemaId));
        visualizeSchemas(schemas);

        let response = JSON.parse(request.responseText);
        openMessageWindow(response['message'], response['responseType']);
    }

    request.send();
    closeConfirmWindow();
}
