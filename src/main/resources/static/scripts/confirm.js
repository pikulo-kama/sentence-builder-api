$('#dismiss-confirm-window-btn').on('click', function () {
    closeConfirmWindow();
});

$('#confirm-btn').on('click', function () {
    let data = $('#confirm-data-field').val();
    let handler = $('#confirm-handler-name-field').val();

    let funct = eval(handler);
    funct(data);
});

function openConfirmWindow(data, handler) {
    $('#confirm-data-field').val(data);
    $('#confirm-handler-name-field').val(handler);

    let confirmWindow = $('#confirm-modal');
    confirmWindow.addClass("show")
    confirmWindow.show();
}

function closeConfirmWindow() {
    $('#confirm-data-field').val('');
    $('#confirm-handler-name-field').val('');

    $('#confirm-modal').hide();
}