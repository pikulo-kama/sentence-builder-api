let newWords = [];

$('#word-create-speech-part-select').on('change', function () {
    clearWindow();
})

$('#add-new-word-btn').on('click', function () {
    let wordPattern = String(getWordPattern()).toLowerCase();
    let duplicateIndex = newWords.findIndex(word => word['content'] === wordPattern);

    if (wordPattern !== '' && duplicateIndex === -1) {
        newWords.push({
            "content": wordPattern,
            "wordGender": wwGetWordGender()
        });
        visualizeWords(newWords);
    }
});

$(document).on('click', '.new-word-delete-btn', function () {
   let wordContent = $(this).closest('li').find('p.new-word-content').first().text();
   newWords = newWords.filter(word => word['content'] !== wordContent);
   visualizeWords(newWords);
});

$('.gender-checkbox').on('change', function () {
    let genders = $(this).closest('div').find('input[type=checkbox]');
    let genderField = $(this).closest('div').find('input[type=hidden]').first();
    genderField.removeAttr('value');

    for (let gender of genders) {
        if ($(gender).attr('id') !== $(this).attr('id')) {
            $(gender).prop('checked', false);
        }
    }
    if ($(this).is(':checked')) {
        let checkboxId = String($(this).attr('id'));
        let gender = checkboxId.substring(0, checkboxId.length - '-checkbox'.length);

        genderField.val(gender);
    }
});

$('#save-words-btn').on('click', function () {
    let request = openPostRequest('/api/v2/words/create');
    request.onload = function () {
        let response = JSON.parse(request.responseText);
        if (response['responseType'] === SUCCESS) {
            clearWindow();
        }
        openMessageWindow(response['message'], response['responseType']);
    }
    request.send(JSON.stringify({
        'speechPart': wwGetActiveSpeechPart(),
        'words': newWords
    }));
});

function visualizeWords(words) {
    clearProposedWordsWindow();
    let iconMappings = getGenderIconMappings();

    for (let word of words) {
        $('#proposed-words-list').append(`
            <li class="list-group-item bg-success text-dark bg-opacity-50 mb-1">
                <div class="d-flex justify-content-between">
                    <div>
                        ${iconMappings[word['wordGender']]}
                        <p class="new-word-content ml-2 mb-0">${word['content']}</p>              
                    </div>
                    <a class="mt-auto mb-auto mr-3">${getDeleteIcon('new-word-delete-btn')}</a>
                </div>
            </li>
        `);
    }
}

function clearWindow() {
    newWords = [];

    clearProposedWordsWindow();
    $('#word-pattern-input-field').val("");
}

function wwGetActiveSpeechPart() {
    return $('#word-create-speech-part-select').find(':selected').val();
}

function wwGetWordGender() {
    return $('#new-word-gender').val();
}

function getWordPattern() {
    return $('#word-pattern-input-field').val();
}

function clearProposedWordsWindow() {
    $('#proposed-words-list').empty();
}
