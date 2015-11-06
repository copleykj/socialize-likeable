# Likeable #

A package for implementing models with "liking" or "starring" capabilities.

## LikeableModel ##

LikeableModel is used to add liking or starring capabilities to a model that is built on Socialize's BaseModel class. To make a model likeable just call `LikeableModel.makeLikeable(Model, "typeAsString")` passing in a model class and a string that will be used to tag the like records for later retrieval. 

```javascript
var Post = BaseModel.extendAndSetupCollection("posts");

LikeableModel.makeLikeable(Post, "post");
```

This will add the following methods to the prototype of the model.

**like()** - Like an instance of the model.

**unlike()** - Unlike an instance of the model.

**likes()** - Returns a cursor of `Like` instances.

**likeCount()** - Returns the number of likes for the instance of a model.

**isLikedBy(user)** - check if a particular user likes this instance of a model.

### Examples ###

```javascript
var post = Meteor.posts.findOne();

post.like(); // likes the post

post.unlike(); // unlikes the post

post.likes().forEach(function(like){
    console.log(like.user().username);
});

post.likeCount(); //=> 0

post.isLikedBy(Meteor.user()); //=> false
```

## Like - Extends [LinkableModel](https://github.com/copleykj/socialize-linkable-model)##

A like is a record of a user liking an instance of a model with a reference to that instance.

### Instance Methods ###

*All examples assume an instance of `Like` named `like`*

**user()** - get a User instance for the user that created the like.

```javascript
like.user(); //=> {_id:"xxxxx", username:"johnDoe"}
```

**isDuplicate()** - check to see if a user has already liked the linked object.

```javascript
like.isDuplicate(); => true
```