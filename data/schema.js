/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 * / of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  User,
  Widget,
  getUser,
  getViewer,
  getWidget,
  getWidgets,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */


/**
 * Define your own types here
 */

var Schema = (db) => { 

  // let user = {};

    var userType = new GraphQLObjectType({
      name: 'User',
      description: 'A person who uses our app',
      fields: () => ({
        id: globalIdField('User'),
        widgets: {
          // type: widgetConnection,
          type: new GraphQLList(widgetType),
          description: 'A person\'s collection of widgets',
          // args: connectionArgs,
          // resolve: (_, args) => connectionFromArray(getWidgets(), args),
          // resolve: () => getWidgets()
          resolve: () => db.collection('persons').find({}).toArray()
        },
      }),
      // interfaces: [nodeInterface],
    });

    var widgetType = new GraphQLObjectType({
      name: 'Widget',
      description: 'A shiny widget',
      fields: () => ({
        // id: globalIdField('Widget'),
        id: {
          // type: new GraphQLNonNull(GraphQLID),
          type: GraphQLID,
          resolve: (obj) => obj.id
        },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        ip_address: { type: GraphQLString },
      }),
      // interfaces: [nodeInterface],
    });

    /**
     * Define your own connection types here
     */
    var {connectionType: widgetConnection} =
      connectionDefinitions({name: 'Widget', nodeType: widgetType});

    /**
     * This is the type that will be the root of our query,
     * and the entry point into our schema.
     */
    var queryType = new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        // node: nodeField,
        // Add your own root fields here
        viewer: {
          type: userType,
          resolve: () => getViewer(),
        },
      }),
    });

    /**
     * This is the type that will be the root of our mutations,
     * and the entry point into performing writes in our schema.
     */
    let addPersonMutation = mutationWithClientMutationId({
      name: 'AddPerson',
      inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        first_name: { type: new GraphQLNonNull(GraphQLString)},
        last_name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type: new GraphQLNonNull(GraphQLString)},
        gender: { type: new GraphQLNonNull(GraphQLString)},
        ip_address: { type: new GraphQLNonNull(GraphQLString)},
      },
      outputFields: {
        widget: {
          type: widgetType,
          resolve: (obj) => obj.ops[0]
        }
      },
      mutateAndGetPayload: ({id, first_name, last_name, email, gender, ip_address}) => {
        return db.collection('persons').insertOne({id, first_name, last_name, email, gender, ip_address});
      }
    });

    var mutationType = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        // Add your own mutations here
        addPerson: addPersonMutation
      })
    });

    /**
     * Finally, we construct our schema (whose starting query type is the query
     * type we defined above) and export it.
     */
    let schema = new GraphQLSchema({
      query: queryType,
      // Uncomment the following after adding some mutation fields:
      mutation: mutationType
    });
     return schema
}

export default Schema;



// var {nodeInterface, nodeField} = nodeDefinitions(
//   (globalId) => {
//     var {type, id} = fromGlobalId(globalId);
//     if (type === 'User') {
//       return getUser(id);
//     } else if (type === 'Widget') {
//       return getWidget(id);
//     } else {
//       return null;
//     }
//   },
//   (obj) => {
//     if (obj instanceof User) {
//       return userType;
//     } else if (obj instanceof Widget)  {
//       return widgetType;
//     } else {
//       return null;
//     }
//   }
// );