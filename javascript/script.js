const firebaseConfig = {
  apiKey: "AIzaSyCFTjmT2AKkcB7_IodwCDHye0OpJA1jN2I",
  authDomain: "pazh-9da5e.firebaseapp.com",
  projectId: "pazh-9da5e",
  storageBucket: "pazh-9da5e.appspot.com",
  messagingSenderId: "208774180749",
  appId: "1:208774180749:web:9d21688ee09369c06c57c4",
  measurementId: "G-MYS5FGLM9K"
};

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

var buildUrl = "Build";
var config = {
    dataUrl: buildUrl + "/94e4ada330788453ea8decfeba78db16.data",
    frameworkUrl: buildUrl + "/5b920c7e1d3e73278a34756755584b63.js",
    codeUrl: buildUrl + "/ca24fe735e581a95f50bb8c762e1b397.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "PAZH PLANET",
    productName: "PAZH COIN",
    productVersion: "0.5.3.1",
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

document.body.appendChild(script);

function onGameLoaded() {
    gameInstance.SendMessage("TelegramIntegration", "SetUserInfo", window.Telegram.WebApp.initData);
}
