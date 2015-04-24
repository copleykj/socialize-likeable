LikesCollection.allow({
    insert: function (userId, like) {
        return userId && like.checkOwnership() && !like.isDuplicate();
    },
    remove: function (userId, like) {
        return userId && like.checkOwnership();
    }
});

LikesCollection.after.insert(function (userId, like) {
    var collection = Like.getCollectionForRegisteredType(like.objectType);

    userId && collection && collection.update(like.linkedObjectId, {$inc:{_likeCount:1}});
});

LikesCollection.after.remove(function (userId, like) {
    var collection = Like.getCollectionForRegisteredType(like.objectType);
    userId && collection && collection.update(like.linkedObjectId, {$inc:{_likeCount:-1}});
});
