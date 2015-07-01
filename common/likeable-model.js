/**
 * Extensible model for creating child models which can be "liked"
 * @class LinkableModel
 */
LikeableModel = BaseModel.extend();


/**
 * Add a record to the likes collection which is linked to the model
 */
LikeableModel.prototype.like = function () {
    var type = this._objectType;
    new Like({linkedObjectId:this._id, userId:Meteor.userId(), objectType:type}).save();
};

/**
 * Remove a record from the likes collection that is linked to the model
 */
LikeableModel.prototype.unlike = function () {
    //find and then call call instance.remove() since client
    //is restricted to removing items by their _id
    var like = LikesCollection.findOne({userId:Meteor.userId(), linkedObjectId:this._id});
    like && like.remove();
};

/**
 * Get all the likes for the model
 * @returns {Mongo.Cursor} A mongo cursor which returns Like instances
 */
LikeableModel.prototype.likes = function () {
    return LikesCollection.find({linkedObjectId:this._id});
};

/**
 * Get the total number of likes for the model
 * @returns {Number} The total number of likes
 */
LikeableModel.prototype.likeCount = function() {
    //This creates backwards compatibility for when we stored userId's in an array on the liked object
    return _.isArray(this._likeCount) ? this._likeCount.length : this._likeCount || 0;
};

LikeableModel.prototype.likedBy = function () {
    if(this.likes){
        var likes = this.likes.reverse();
        var likeStrings = [];
        var currentUser = Meteor.users.findOne(Meteor.userId(), {reactive:false});

        var ending = likes.length > 1 ? " like" : " likes";

        _(likes).each( function(userId) {
            var user = Meteor.users.findOne(userId, {reactive:false});
            var username;
            if(user && !currentUser.blocksUser(user)){
                username = user._id === Meteor.userId() ? "You" : user.username;

                var likeString = '<a href="'+user.profileUrl()+'">'+username+'</a>';
                likeStrings.push(likeString);
            }
        });

        if(!_(likeStrings).isEmpty()){
            return Spacebars.SafeString(_.toSentenceSerial(likeStrings, ", ", " and ") + "<wbr>"+ ending + " this") ;
        }
    }
};

/**
 * Check if the model is liked by a certain user
 * @param   {Object}  user A User instance to check against
 * @returns {Boolean} Wheter the user likes the model or not
 */
LikeableModel.prototype.isLikedBy = function (user){
    return !!LikesCollection.findOne({linkedObjectId:this._id, userId:user._id});
};

//a schema which can be attached to other likeable types
//if you extend a model with LikeableModel you will need to
//attach this schema to it's collection as well.
LikeableModel.LikeableSchema = new SimpleSchema({
    _likeCount: {
        type:Number,
        defaultValue:0,
        custom: SimpleSchema.denyUntrusted
    }
});
