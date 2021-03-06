/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
    GraphQLInt as IntType,
} from 'graphql';

const TodoType = new ObjectType({
  name: 'Todo',
  fields: {
    content: { type: new NonNull(StringType) },
    state: { type: new NonNull(StringType) },
    process: { type: new NonNull(IntType) },
    id: { type: new NonNull(IntType) },
  },
});

export default TodoType;
