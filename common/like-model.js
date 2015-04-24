/**
 * A model of a like which is connected to another database object
 * @class Like
 */
Like = LinkableModel.extend();

/**
 * Get the User instance of the account which created the like
 * @returns {User} The user who created the like
 */
Like.prototype.user = function () {
    return Meteor.users.findOne(this.userId);
};

/**
 * Check if the user has already liked the linked object
 * @returns {[[Type]]} [[Description]]
 */
Like.prototype.isDuplicate = function () {
    return !!LikesCollection.findOne({userId:this.userId, linkedObjectId:this.linkedObjectId});
};

//create the collection and assign a reference to Like.prototype._collection so BaseModel knows how to access it.
LikesCollection = Like.prototype._collection = new Mongo.Collection("likes", {
    transform: function (like) {
        return new Like(like);
    }
});

//attach a reference to Meteor namespace for easy access
Meteor.likes = LikesCollection;

//create the schema for a like
var LikeSchema = new SimpleSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert && !this.isSet){
                return Meteor.userId();
            }
        },
        optional:true,
        denyUpdate:true
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        optional:true,
        denyUpdate:true
    }
});

//attach the schema for a like
LikesCollection.attachSchema(LikeSchema);
//and attach the schema for a LinkableModel since we've extended it
LikesCollection.attachSchema(LinkableModel.LinkableSchema);
