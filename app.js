document.addEventListener('DOMContentLoaded', function () {
    var socket = io();

    socket.on('chat message', function (msg) {
        displayMessage(msg);
    });

    window.sendMessage = function () {
        var messageInput = document.getElementById('messageInput');
        var message = messageInput.value;
        displayMessage(message);  // Display the sent message on the sender's side
        socket.emit('chat message', message);
        messageInput.value = '';
    };

    function displayMessage(msg) {
        var messages = document.getElementById('messages');
        var li = document.createElement('li');
        li.textContent = msg;
        messages.appendChild(li);
    }
});
