//var params = BotChat.queryParams(location.search);
//window['botchatDebug'] = params['debug'] && params['debug'] === "true";

var userId = localStorage.getItem("userId");
if (userId == null) {
    userId = "dl_" + Math.random().toString(36).substring(7);
    localStorage.setItem("userId", userId);
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
    secret: environment.directLineSecret
    //token: params['t'],
    //domain: params['domain'],
    //webSocket: true // defaults to true
});

console.log("Trigger conversation update");
//HACK: ConversationUpdate type does not have access to the user bot data, use event instead
botConnection
    .postActivity({ type: "event", from: user, name: "ConversationUpdate", value: "" })
    .subscribe(id => console.log("Conversation updated"));

console.log("Initialize BotChat App");
BotChat.App({
    botConnection: botConnection,
    bot: bot,
    user: user,
    resize: 'detect'
    // sendTyping: true // defaults to false. set to true to send 'typing' activities to bot (and other users) when user is typing
}, document.getElementById("BotChatGoesHere"));