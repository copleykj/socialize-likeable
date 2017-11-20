/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { LinkParent } from 'meteor/socialize:linkable-model';
import SimpleSchema from 'simpl-schema';
/* eslint-enable import/no-unresolved */

import { LikesCollection, Like } from './like-model';


/**
 * LikeableModel - a mixin providing Likeable behavior for a model
 */
export const LikeableModel = Base => class extends Base { //eslint-disable-line
    constructor(document) {
        super(document);
        if (!(this instanceof LinkParent)) {
            throw new Meteor.Error('MustExtendParentLink', 'LikeableModel must extend ParentLink from socialize:linkable-model');
        }
    }

    /**
     * Add a record to the likes collection which is linked to the model
     */
    like() {
        new Like(this.getLinkObject()).save();
    }

    /**
     * Remove a record from the likes collection that is linked to the model
     */
    unlike() {
        // find and then call call instance.remove() since client
        // is restricted to removing items by their _id
        const like = LikesCollection.findOne({ userId: Meteor.userId(), linkedObjectId: this._id });
        like && like.remove();
    }

    /**
     * Get all the likes for the model
     * @returns {Mongo.Cursor} A mongo cursor which returns Like instances
     */
    likes(options = {}) {
        return LikesCollection.find({ linkedObjectId: this._id }, options);
    }

    /**
     * Get the total number of likes for the model
     * @returns {Number} The total number of likes
     */
    likeCount() {
        // This creates backwards compatibility for when we stored userId's in an array on the liked object
        return _.isArray(this._likeCount) ? this._likeCount.length : this._likeCount || 0;
    }

    /**
     * Check if the model is liked by a certain user
     * @param   {Object}  user A User instance to check against
     * @returns {Boolean} Wheter the user likes the model or not
     */
    isLikedBy(user) {
        return !!LikesCollection.findOne({ linkedObjectId: this._id, userId: user._id });
    }
};


// a schema which can be attached to other likeable types
// if you extend a model with LikeableModel you will need to
// attach this schema to it's collection as well.
LikeableModel.LikeableSchema = new SimpleSchema({
    _likeCount: {
        type: Number,
        defaultValue: 0,
        custom: SimpleSchema.denyUntrusted,
    },
});
