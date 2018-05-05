/* eslint-disable import/no-unresolved */
import Meteor, { Mongo } from '@socialize/react-native-meteor';
import { BaseModel } from '@socialize/base-model';
import { LinkableModel, LinkParent } from '@socialize/linkable-model';
import { ServerTime } from '@socialize/server-time';
/* eslint-enable import/no-unresolved */

import LikeConstruct from './common/like-model.js';
import LikeableConstruct from './common/likeable-model.js';

export const { Like, LikesCollection } = LikeConstruct({ Meteor, Mongo, BaseModel, LinkableModel, ServerTime });

export const { LikeableModel } = LikeableConstruct({ Meteor, LinkParent, LikesCollection, Like });
