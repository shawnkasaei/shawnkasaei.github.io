var config = {
    dataUrl: buildUrl + "/Build.data",
    frameworkUrl: buildUrl + "/Build.framework.js",
    codeUrl: buildUrl + "/Build.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "ShawnKasaei",
    productName: "SheepCoin",
    productVersion: "0.1.0.5",
    // additional options can go here, see below
  };
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var gameInstance = null;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    config.devicePixelRatio = 1;
}

loadingBar.style.display = "block";

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Build.loader.js";
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
        gameInstance = unityInstance;
        loadingBar.style.display = "none";
        
        // Run your custom code here after the game has fully loaded
        onGameLoaded();
    }).catch((message) => {
        alert(message);
    });
};

window.onbeforeunload = function (e) {
    gameInstance.SendMessage("OnCloseListener", "OnClose");
};

document.body.appendChild(script);

// Custom function that runs after the game is loaded
function onGameLoaded() {
    // Add your custom JS logic here
    gameInstance.SendMessage("TelegramIntegration", "SetUserName", "userName");
}
