/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { BaseModel } from 'meteor/socialize:base-model';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';
import { ServerTime } from 'meteor/socialize:server-time';
/* eslint-enable import/no-unresolved */

import LikeConstruct from './like-model.js';
import LikeableConstruct from './likeable-model.js';

export const { Like, LikesCollection } = LikeConstruct({ Meteor, Mongo, BaseModel, LinkableModel, ServerTime });

export const { LikeableModel } = LikeableConstruct({ Meteor, LinkParent, LikesCollection, Like });
