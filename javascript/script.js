<script>
    var loaderUrl = "Build/Build.loader.js";
    var config = {
        dataUrl: "{{DATA_URL}}",
        frameworkUrl: "{{FRAMEWORK_URL}}",
        codeUrl: "{{CODE_URL}}",
        streamingAssetsUrl: "{{STREAMING_ASSETS_URL}}",
        companyName: "{{COMPANY_NAME}}",
        productName: "{{PRODUCT_NAME}}",
        productVersion: "{{PRODUCT_VERSION}}",
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
</script>
