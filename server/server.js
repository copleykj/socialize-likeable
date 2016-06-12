import { LikesCollection } from './like-model';
import { LinkableModel } from 'meteor/socialize:linkable-model';

LikesCollection.allow({
    insert: function (userId, like) {
        //allow liking to occur if a user is logged in, the current user added the like, and they haven't already liked the object
        return userId && like.checkOwnership() && !like.isDuplicate();
    },
    remove: function (userId, like) {
        //allow unliking if there is a current user and the current user was the one who liked the object
        return userId && like.checkOwnership();
    }
});

LikesCollection.after.insert(function (userId, like) {
    //after a successful like, increment the linked object's _likeCount property
    var collection = LinkableModel.getCollectionForRegisteredType(like.objectType);
    userId && collection && collection.update(like.linkedObjectId, {$inc:{_likeCount:1}});
});

LikesCollection.after.remove(function (userId, like) {
    //if the user unlikes an object, decrement the linked objects _likeCount property
    var collection = LinkableModel.getCollectionForRegisteredType(like.objectType);
    userId && collection && collection.update(like.linkedObjectId, {$inc:{_likeCount:-1}});
});
