var buildUrl = "Build";
var config = {
    dataUrl: buildUrl + "/baf78f1d5db7d19b64f6e8b2114d1d7f.data",
    frameworkUrl: buildUrl + "/fad1a8ac27451f942030423074d5558a.js",
    codeUrl: buildUrl + "/9ff93fc5fdcab8c1a010fe8416de83e3.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "PAZH PLANET",
    productName: "PAZH COIN",
    productVersion: "0.5.2.8",
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

var loaderUrl = buildUrl + "/Build.loader.js";
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
        gameInstance = unityInstance;
        loadingBar.style.display = "none";
        
        onGameLoaded();
    }).catch((message) => {
        alert(message);
    });
};

window.onbeforeunload = function (e) {
    gameInstance.SendMessage("OnCloseListener", "OnClose");
};

document.body.appendChild(script);

function onGameLoaded() {
    gameInstance.SendMessage("TelegramIntegration", "SetUserInfo", window.Telegram.WebApp.initData);
}
