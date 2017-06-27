//var params = BotChat.queryParams(location.search);
//window['botchatDebug'] = params['debug'] && params['debug'] === "true";

var userId = document.cookie;
if (userId == "") {
    userId = Math.random().toString(36).substring(7);
    document.cookie = userId;
}

var user = {
    id: userId,
    name: "You"
};

var bot = {
    id: environment.botId,
    name: "Bot"
};

var botConnection = new BotChat.DirectLine({
    secret: environment.directLineSecret,
    user: user,
    //token: params['t'],
    //domain: params['domain'],
    //webSocket: true // defaults to true
});

console.log("Trigger conversation update");
botConnection
    .postActivity({ type: "ConversationUpdate", from: user })
    .subscribe(id => console.log("Conversation updated"));

console.log("Intialize BotChat App");
BotChat.App({
    botConnection: botConnection,
    bot: bot,
    user: user,
    resize: 'detect'
    // sendTyping: true // defaults to false. set to true to send 'typing' activities to bot (and other users) when user is typing
}, document.getElementById("BotChatGoesHere"));