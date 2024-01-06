import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import collection from "./schemas";
import record from "./schemas";
import user from "./schemas";
import { collectionResolver, recordResolver, userResolver } from "./resolvers";

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [collection, record, user],
  resolvers: [collectionResolver, recordResolver, userResolver],
});
