import { LikeableModel } from 'meteor/socialize:likeable'
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model'
import { ThingsCollection } from './common'

class LikeableThing extends LikeableModel(LinkParent){
    constructor(document){
        super(document)
    }
}

Accounts.createUser({
    username: "user1",
    password: "password"
}, function(error){

    if(!error){

        describe('LinkableModel', function(){
            let thing = new LikeableThing();
            describe('LinkableModel.like()', function(){
                
            });
        })

    }

});
