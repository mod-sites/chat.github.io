document.addEventListener('DOMContentLoaded', function () {
    var socket = io();

    socket.on('chat message', function (msg) {
        var messages = document.getElementById('messages');
        var li = document.createElement('li');
        li.textContent = msg;
        messages.appendChild(li);
    });

    window.sendMessage = function () {
        var messageInput = document.getElementById('messageInput');
        var message = messageInput.value;
        socket.emit('chat message', message);
        messageInput.value = '';
    };
});
