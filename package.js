Package.describe({
    name: "socialize:likeable",
    summary: "A package implementing social \"liking\" or \"starring\"",
    version: "1.0.0",
    git: "https://github.com/copleykj/socialize-likeable.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.3");

    api.use("ecmascript");

    api.use("socialize:linkable-model@1.0.0");

    api.imply("socialize:linkable-model");

    api.mainModule("server/server.js", "server");
    api.mainModule("common/common.js");

});

Package.onTest(function(api){
    api.use([
        "ecmascript",
        "accounts-password",
        "autopublish",
        "socialize:likeable",
        "socialize:linkable-model@1.0.0",
        "practicalmeteor:mocha"
    ]);

    api.mainModule("tests/server.js", "server");
    api.mainModule("tests/client.js", "client");
});
