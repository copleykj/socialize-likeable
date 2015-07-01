/**
 * A model of a like which is connected to another database object
 * @class Like
 */
Like = LinkableModel.extendAndSetupCollection("likes");

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

LikesCollection = Like.collection;

//create the schema for a like
Like.appendSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert || !this.isFromTrustedCode){
                return Meteor.userId();
            }
        },
        denyUpdate:true
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert || !this.isFromTrustedCode){
                return new Date();
            }
        },
        denyUpdate:true
    }
});

Like.appendSchema(LinkableModel.LinkableSchema);
