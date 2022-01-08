$(document).ready(function () {
    setRandomSentence();
})

$('#generate-random-sentence').on('click', function () {
   setRandomSentence();
});


function setRandomSentence() {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/v2/sentences/generate');
    request.onload = function () {
        let sentence = JSON.parse(request.responseText)["sentences"][0];
        $('#sentence-field').val(sentence);
    }
    request.send();
}