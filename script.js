// script.js

// Initialize Firebase
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID"
});

// Get elements
const publicChatMessages = document.getElementById("public-chat-messages");
const publicChatInput = document.getElementById("public-chat-input");
const publicChatSend = document.getElementById("public-chat-send");
const privateChatMessages = document.getElementById("private-chat-messages");
const privateChatInput = document.getElementById("private-chat-input");
const privateChatSend = document.getElementById("private-chat-send");
const clearChat = document.getElementById("clear-chat");
const searchUser = document.getElementById("search-user");
const searchBtn = document.getElementById("search-btn");
const registerUsername = document.getElementById("register-username");
const registerBtn = document.getElementById("register-btn");

// Set up real-time database
const db = firebase.database();
const publicChatRef = db.ref("public-chat");
const privateChatRef = db.ref("private-chat");

// Add event listeners
publicChatSend.addEventListener("click", sendPublicMessage);
privateChatSend.addEventListener("click", sendPrivateMessage);
clearChat.addEventListener("click", clearPrivateChat);
searchBtn.addEventListener("click", searchUserByUsername);
registerBtn.addEventListener("click", registerNewUser);

// Functions
function sendPublicMessage() {
    const message = publicChatInput.value.trim();
    if (message !== "") {
        publicChatRef.push({
            message: message,
            username: firebase.auth().currentUser.displayName
        });
        publicChatInput.value = "";
    }
}

function sendPrivateMessage() {
    const message = privateChatInput.value.trim();
    if (message !== "") {
        privateChatRef.push({
            message: message,
            username: firebase.auth().currentUser.displayName
        });
        privateChatInput.value = "";
    }
}

function clearPrivateChat() {
    privateChatRef.remove();
}

function searchUserByUsername() {
    const username = searchUser.value.trim();
    // TO DO: Implement search functionality
}

function registerNewUser() {
    const username = registerUsername.value.trim();
    if (username !== "") {
        firebase.auth().currentUser.updateProfile({
            displayName: username
        });
        registerUsername.value = "";
    }
}

// Real-time database listeners
publicChatRef.on("child_added", (data) => {
    const message = data.val();
    const messageElement = document.createElement("p");
    messageElement.textContent = `${message.username}: ${message.message}`;
    publicChatMessages.appendChild(messageElement);
});

privateChatRef.on("child_added", (data) => {
    const message = data.val();
    const messageElement = document.createElement("p");
    messageElement.textContent = `${message.username}: ${message.message}`;
    privateChatMessages.appendChild(messageElement);
});