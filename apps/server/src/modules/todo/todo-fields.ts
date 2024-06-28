import { TodoType, TodoConnection } from './todo-type';
import { TodoLoader } from './todo-loader';
import { connectionArgs } from 'graphql-relay';

export const todoField = (key: string) => ({
  [key]: {
    type: TodoType,
    resolve: async (obj: Record<string, unknown>, _: any, context: any) =>
      TodoLoader.load(context, obj.message as string),
  },
});

export const todoConnectionField = (key: string) => ({
  [key]: {
    type: TodoConnection.connectionType,
    args: {
      ...connectionArgs,
    },
    resolve: async (_: any, args: any, context: any) => {
      return await TodoLoader.loadAll(context, args);
    },
  },
});
