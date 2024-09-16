var buildUrl = "Build";
var config = {
    dataUrl: buildUrl + "/151cc8b204d9d169962890919282c246.data",
    frameworkUrl: buildUrl + "/a4c134c9974c56d2aef8742a88751793.js",
    codeUrl: buildUrl + "/d25bc3019efbd793e0cf42ff7a8c332a.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "PAZH PLANET",
    productName: "PAZH COIN",
    productVersion: "0.5.3.6",
  };
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    config.devicePixelRatio = 1;
}

loadingBar.style.display = "block";

var loaderUrl = buildUrl + "/v0.5.3.5.loader.js";
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
        window.unityInstance = unityInstance;
        loadingBar.style.display = "none";
        
        onGameLoaded();
    }).catch((message) => {
        alert(message);
    });
};

document.body.appendChild(script);

function onGameLoaded() {
  window.unityInstance.SendMessage("TelegramIntegration", "SetUserInfo", window.Telegram.WebApp.initData);
}
