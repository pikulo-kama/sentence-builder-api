$('#close-message-modal-btn').on('click', function () {
    closeMessageWindow();
})

function openMessageWindow(message, messageType) {
    let userMessageTypeField = $("#user-message-type-field");
    let messageModal = $("#message-modal");
    let messageTypeClass = (messageType === SUCCESS) ? 'text-success' : 'text-danger';

    userMessageTypeField.removeClass("text-danger text-success");

    userMessageTypeField.addClass(messageTypeClass);
    userMessageTypeField.text(messageType.concat(":"));
    $("#user-message-field").text(message);
    messageModal.addClass("show");
    messageModal.show();
}

function closeMessageWindow() {
    $("#user-message-type-field").val("");
    $("#user-message-field").val("");

    let messageModal = $("#message-modal");
    messageModal.removeClass("show");
    messageModal.hide();
}