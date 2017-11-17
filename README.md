# Likeable #

A package for implementing models with Liking, Starring, or Favoriting capabilities.

## Supporting the Project ##
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

[Bitcoin](https://www.coinbase.com/checkouts/4a52f56a76e565c552b6ecf118461287) / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation ##

```shell
$ meteor add socialize:likeable
```

## Usage ##

```javascript
import { Mongo } from 'meteor/mongo';
import { LikeableModel } from 'meteor/socialize-likeable';
import { LinkParent, LinkableModel } from 'meteor/socialize-linkable';
import SimpleSchema from 'simpl-schema';

//define the collection to hold products
const ProductsCollection = new Mongo.Collection("products");

//define the schema for a product
const ProductsSchema = new SimpleSchema({
    //actual schema excluded for brevity
});

//Create a product class extending LikeableModel and LinkParent
class Product extends LikeableModel(LinkParent) {
    constructor(document){
        super(document);
    }

    //Add any instance(helper) methods here
}

//Attach the collection to the model so we can use BaseModel's CRUD methods
Product.attachCollection(ProductsCollection);

//Register the Model as a potential Parent of a LinkableModel
LinkableModel.registerParentModel(Product);

//Create a new product and save it to the database using BaseModel's save method.
new Product({name:"All Stars", brand:"Converse", price:"39.99"}).save();

//Get an instance of Product using a findOne call.
let foundProduct = ProductsCollection.findOne();

//This is an instance of product and since we've extended LikeableModel we can now just call it's like method
foundProduct.like();

//and we can unlike it
foundProduct.unlike()

//and retrieve the number of times it was liked
foundProduct.likeCount();

//We can even query to see if a certain user has liked this product
foundProduct.islikedBy(Meteor.user()); //Publication of proper data necessary if querying client side of course
```

## Optional Scalability ##

This package implements [cultofcoders:redis-oplog][1]'s namespaces to provide reactive scalability as an alternative to Meteor's `livedata`. Use of redis-oplog is not required. At the point that scalability becomes a concern, you can add redis-oplog and where necessary add some `namespace` options to any custom publications. Other packages in the Socialize set that implement this package have namespaces for their publications.

When redis-oplog is installed in your meteor app, Liking and unliking a model that implements `LikeableModel` will publish changes to redis-oplog. The `likes()` method that returns all of the like instances for that particular model also listens on the models \_id as a namespace which allows it's usage inside publications so likes for the model will be reactively published.

[1]:https://github.com/cultofcoders/redis-oplog
