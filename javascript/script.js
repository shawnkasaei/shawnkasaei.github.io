if (window.indexedDB != null) window.indexedDB.deleteDatabase("/idbfs")

var buildUrl = "Build";
var config = {
    dataUrl: buildUrl + "/d0bbe745b5944cd49dfcd8e75863ecef.data",
    frameworkUrl: buildUrl + "/7f55f637c34f1e8288a1a4cf411bcf07.js",
    codeUrl: buildUrl + "/31ec6495b42d2d12b22739e1fa8613f7.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "PAZH PLANET",
    productName: "PAZH COIN",
    productVersion: "0.5.2.15",
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
