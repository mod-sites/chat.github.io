document.addEventListener('DOMContentLoaded', function () {
    var socket = io();
    var broadcastChannel = new BroadcastChannel('chat');

    socket.on('chat message', function (msg) {
        displayMessage(msg);
        broadcastChannel.postMessage({ type: 'message', data: msg });
    });

    window.sendMessage = function () {
        var messageInput = document.getElementById('messageInput');
        var message = messageInput.value;
        socket.emit('chat message', message);
        messageInput.value = '';
    };

    function displayMessage(msg) {
        var messages = document.getElementById('messages');
        var p = document.createElement('p');
        p.innerHTML = `<a href="#">${msg}</a>`;
        messages.appendChild(p);
    }

    // Listen for messages from other tabs
    broadcastChannel.onmessage = function (event) {
        if (event.data.type === 'message') {
            displayMessage(event.data.data);
        }
    };
});
