import { LikesCollection } from '../common/like-model';
import './publications.js';

LikesCollection.allow({
    insert(userId, like) {
        // allow liking to occur if a user is logged in, the current user added the like, and they haven't already liked the object
        return userId && like.checkOwnership() && !like.isDuplicate();
    },
    remove(userId, like) {
        // allow unliking if there is a current user and the current user was the one who liked the object
        return userId && like.checkOwnership();
    },
});

LikesCollection.after.insert(function afterInsert(userId, like) {
    // after a successful like, increment the linked object's likeCount property
    const collection = this.transform().getCollectionForParentLink();
    userId && collection && collection.update({ _id: like.linkedObjectId }, { $inc: { likeCount: 1 } });
});

LikesCollection.after.remove(function afterRemove(userId, like) {
    // if the user unlikes an object, decrement the linked objects likeCount property
    const collection = this.transform().getCollectionForParentLink();
    userId && collection && collection.update({ _id: like.linkedObjectId }, { $inc: { likeCount: -1 } });
});
