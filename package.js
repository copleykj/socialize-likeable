Package.describe({
    name: "socialize:likeable",
    summary: "A package implementing social \"liking\" or \"starring\"",
    version: "0.2.0",
    git: "https://github.com/copleykj/socialize-likeable.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use("socialize:linkable-model@0.2.1");

    api.imply("socialize:linkable-model");

    //Add the friend-model files
    api.addFiles("common/likeable-model.js");
    api.addFiles("common/like-model.js");
    api.addFiles("server/server.js", "server");


    api.export(["LikeableModel", "Like"]);
});
