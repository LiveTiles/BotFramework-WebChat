const colorOverride = () => {
    console.log("Overriding brand color");

    var style = document.createElement("style");
    css = ".wc-header {background-color: " + brandColor + ";} " +
        ".wc-card button {color: " + brandColor + "; } " +   
        ".wc-card button:hover {border-color: " + brandColor + "; color: " + brandColor + "; } " +
        ".wc-card button:active {background-color: " + brandColor + "; border-color: " + brandColor + "; } " +
        ".wc-console .wc-send-btn {background-color: " + brandColor + "; } " +
        ".wc-console.has-text .wc-send svg {fill: " + brandColor + "; } " +
        ".wc-message-from-me .wc-message-content {background-color: " + brandColor + "; } " +
        ".wc-message-from-me svg.wc-message-callout path {fill: " + brandColor + "; } ";

    if (style.styleSheet) {
        // IE
        style.styleSheet.cssText = css;
    } else {
        // Other browsers
        style.innerHTML = css;
    }
        
    document.head.appendChild(style);
}