var params = BotChat.queryParams(location.search);

window['botchatDebug'] = params['debug'] && params['debug'] === "true";

// Do not hard-code user Id, channel user Id updated once logged in.
var user = {
    id: params['userid'] || 'userid',
    name: params["username"] || 'username'
};

var bot = {
    id: environment.botId,
    name: params["botname"] || 'botname'
};

var botConnection = new BotChat.DirectLine({
    secret: environment.directLineSecret,
    //token: params['t'],
    //domain: params['domain'],
    webSocket: params['webSocket'] && params['webSocket'] === "true" // defaults to true
});

BotChat.App({
    botConnection: botConnection,
    bot: bot,
    user: user,
    resize: 'detect'
    // sendTyping: true,    // defaults to false. set to true to send 'typing' activities to bot (and other users) when user is typing
}, document.getElementById("BotChatGoesHere"));

const initialize = () => {
    console.log("Trigger conversation update on load");

    botConnection
        .postActivity({ type: "ConversationUpdate", value: "", from: { id: user.id }, name: "" })
        .subscribe(id => console.log("Conversation updated"));
}

//botConnection.activity$
//    .filter(activity => activity.type === "event" && activity.name === "changeBackground")
//    .subscribe(activity => changeBackgroundColor(activity.value))

//const changeBackgroundColor = (newColor) => {
//    document.body.style.backgroundColor = newColor;
//}

//const postButtonMessage = () => {
//    botConnection
//        .postActivity({ type: "event", value: "", from: { id: user.id }, name: "buttonClicked" })
//        .subscribe(id => console.log("success"));
//}