## LikeableModel (Abstract Class) ##

LikeableModel is used to create models with liking, starring, or favoriting capabilities. Since it is an abstract class, you extend it and then must pass in another class for it to extend itself from. `LikeableModel` is specifically designed to extend `LinkParent` from `socialize:linkable-model`. `LinkParent` extends `BaseModel` and thus all of it's functionality will be available on your new class.

### Instance Methods ###

*All examples assume an instance of a class that extends LikeableModel named `like`*

__like()__ - Like an instance of the model.

__unlike()__ - Unlike an instance of the model.

__likes()__ - Returns a cursor of `Like` instances.

__isLikedBy(user)__ - check if a particular user likes this instance of a model.


## Like - Extends [LinkableModel](https://github.com/copleykj/socialize-linkable-model)##

A like is a record of a user liking an instance of a model with a reference to that instance.

### Instance Methods ###

*All examples assume an instance of `Like` named `like`*

__user()__ - get a User instance for the user that created the like.

```javascript
like.user(); //=> {_id:"xxxxx", username:"johnDoe"}
```

__isDuplicate()__ - check to see if a user has already liked the linked object.

```javascript
like.isDuplicate(); => true
```

## Publications ##

**socialize.likesFor(linkedObjectId, options = { limit: 10, sort: { createdAt: -1 } })** - Publishes the likes and their related data for a certain object.

```javascript
Meteor.subscribe('socialize.likesFor', post._id, { limit: 5, skip: 2 });
