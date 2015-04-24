Package.describe({
    name: "socialize:likeable",
    summary: "A package implementing social \"liking\" or \"starring\"",
    version: "0.1.0",
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use([
        "meteor", "mongo", "underscore", "socialize:base-model@0.1.2", "socialize:linkable-model", "tmeasday:publish-with-relations@0.2.0",
        "aldeed:simple-schema@1.3.0", "aldeed:collection2@2.3.2", "matb33:collection-hooks@0.7.9",
        "meteorhacks:unblock@1.1.0"
    ]);

    //Add the friend-model files
    api.addFiles("common/likeable-model.js");
    api.addFiles("common/like-model.js");
    api.addFiles("server/server.js", "server");


    api.export(["LikeableModel", "Like"]);
});
