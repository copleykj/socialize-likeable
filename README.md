# Likeable

A package for implementing models with Liking, Starring, or Favoriting capabilities.

>This is a [Meteor][meteor] package with part of it's code published as a companion NPM package made to work with React Native. This allows your Meteor and React Native projects that use this package to share code between them to give you a competitive advantage when bringing your mobile and web application to market.

## Supporting the Project
In the spirit of keeping this and all of the packages in the [Socialize][socialize] set alive, I ask that if you find this package useful, please donate to it's development.

Litecoin: LXLBD9sC5dV79eQkwj7tFusUHvJA5nhuD3 / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Meteor Installation

This package relies on the npm package `simpl-schema` so you will need to make sure it is installed as well.

```shell
$ meteor npm install --save simpl-schema
$ meteor add socialize:likeable
```

## React Native Installation

When using this package with React Native, the dependency tree ensures that `simpl-schema` is loaded so there's no need to install it as when using within Meteor.

```shell
$ npm install --save @socialize/user-likeable
```
> **Note**
>
>  When using with React Native, you'll need to connect to a server which hosts the server side Meteor code for your app using `Meteor.connect` as per the [@socialize/react-native-meteor](https://www.npmjs.com/package/@socialize/react-native-meteor#example-usage) documentation.

## Usage

Depending on the environment your code will be running in, you'll need to import the classes from the packages specific to that environment, either Meteor or React Native.

```javascript
//Meteor Imports
import { Mongo } from 'meteor/mongo';
import { LikeableModel } from 'meteor/socialize-likeable';
import { LinkParent, LinkableModel } from 'meteor/socialize-linkable';
```

```javascript
//React Native Imports
import { Mongo } from '@socialize/react-native-meteor';
import { LikeableModel } from '@socialize/likeable';
import { LinkParent, LinkableModel } from '@socialize/linkable';
```

```javascript
//This gets imported the same no matter the environment
import SimpleSchema from 'simpl-schema';

//define the collection to hold products
const ProductsCollection = new Mongo.Collection("products");

//define the schema for a product
const ProductsSchema = new SimpleSchema({
    //actual schema excluded for brevity
});

//Create a product class extending LikeableModel and LinkParent
class Product extends LikeableModel(LinkParent) {
    //methods here
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

//We can even query to see if a certain user has liked this product
foundProduct.islikedBy(Meteor.user()); //Publication of proper data necessary if querying client side of course
```

For a more in depth explanation of how to use this package see [API.md](api)

## Scalability - Redis Oplog

This package implements [cultofcoders:redis-oplog][redis-oplog]'s namespaces to provide reactive scalability as an alternative to Meteor's `livedata`. Use of redis-oplog is not required and will not engage until you install the [cultofcoders:redis-oplog][redis-oplog] package and configure it.


[redis-oplog]:https://github.com/cultofcoders/redis-oplog
[meteor]: https://meteor.com
[api]: https://github.com/copleykj/socialize-likeable/blob/master/API.md
[socialize]: https://atmospherejs.com/socialize
