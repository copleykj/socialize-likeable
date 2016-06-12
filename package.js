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
