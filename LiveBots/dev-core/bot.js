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

// Subscribe to backchannel Config, the bot will post the config when settings has been loaded or changed
botConnection.activity$
    .filter(activity => activity.type === "event" && activity.name === "Config")
    .subscribe(activity => loadBotConfig(activity.value))

//console.log("Trigger get bot config");
//botConnection
//    .postActivity({ type: "event", from: user, name: "Config", value: "" })
//    .subscribe(id => console.log("Config request posted"));

const loadBotConfig = (jConfig) => {
    var config = JSON.parse(jConfig);
    brandColor = config.BotColor;
    //TODO: Set bot logo
}

console.log("Initialize the bot and trigger a conversation update");
botConnection
    .postActivity({
        type: "event", from: user, name: "Initialize", value: JSON.stringify(
            {
                "botId": "", // If null the default bot is used
                "draft": false, // If true, the published version is used 
                "authToken": "" // If null, the bot will request the user to login
            })
    })
    .subscribe(id => console.log("Bot initialized"));

console.log("Initialize BotChat App");
BotChat.App({
    botConnection: botConnection,
    bot: bot,
    user: user,
    resize: 'detect'
    // sendTyping: true // defaults to false. set to true to send 'typing' activities to bot (and other users) when user is typing
}, document.getElementById("BotChatGoesHere"));