# Likeable #

A package for creating likeable models.

## LikeableModel - Extends BaseModel ##

**LikeableModel.prototype.like()** - add a like to the model.

**LikeableModel.prototype.unlike()** - remove like from the model.

**LikeableModel.prototype.likes()** - get the likes for the model.

**LikeableModel.prototype.likeCount()** - get the number of likes for the model.

**LikeableModel.prototype.isLikedBy(user)** - check if a particular user likes this model.

## Like - Extends LinkableModel ##

**Like.prototype.user()** - get a User instance for the user that created the like.

**Like.prototype.isDuplicate()** - check to see if a user has already liked the linked object.

## Usage ##

To create a model that is likeable you'll use the `LikeableModel.extend()` method inherited from BaseModel

Assuming you want to model a post you would extend LikebleModel and use the transform option on your posts collection to create instances of the Post class which will be likeable.

```javascript
var Post = likeableModel.extend()

//BaseModel requires a prototype._collection so we do that here
Post.prototype._collection = Meteor.Collection("posts", {
    transform: function(document){
        return new Post(document);
    }
});

//Add other protypal methods for this model

//expose the collection on the Meteor global
Meteor.posts = Post.prototype._collection;

```

Now you can call the LikeableModels protypal methods such as the `like()` or `unlike()` on the post model.

```javascript
var post = Meteor.posts.findOne();

post.like();
```