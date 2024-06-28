import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface } from '@/modules/node/typeRegister';

const AttachmentType = new GraphQLObjectType({
  name: 'Attachment',
  description: 'Represents an attachment file',
  fields: () => ({
    fileName: {
      type: GraphQLString,
      resolve: (attachment) => attachment.fileName,
    },
    fileUrl: {
      type: GraphQLString,
      resolve: (attachment) => attachment.fileUrl,
    },
  }),
});

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'Represents a to-do item',
  fields: () => ({
    id: globalIdField('Todo'),
    title: {
      type: GraphQLString,
      resolve: (todo) => todo.title,
    },
    description: {
      type: GraphQLString,
      resolve: (todo) => todo.description,
    },
    dueDate: {
      type: GraphQLString,
      resolve: (todo) => (todo.dueDate ? todo.dueDate.toISOString() : null),
    },
    attachments: {
      type: new GraphQLList(AttachmentType),
      resolve: (todo) => todo.attachments,
    },
    doneAt: {
      type: GraphQLString,
      resolve: (todo) => (todo.doneAt ? todo.doneAt.toISOString() : null),
    },
    deletedAt: {
      type: GraphQLString,
      resolve: (todo) => (todo.deletedAt ? todo.deletedAt.toISOString() : null),
    },
    createdAt: {
      type: GraphQLString,
      resolve: (todo) => todo.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (todo) => todo.updatedAt.toISOString(),
    },
  }),
  interfaces: () => [nodeInterface],
});

const TodoConnection = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType,
});

export { TodoType, TodoConnection };
