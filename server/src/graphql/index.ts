import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "@graphql-tools/schema";
import record from "./schemas";
import { recordResolver } from "./resolvers";

export const schema: GraphQLSchema = mergeSchemas({
  schemas: [record],
  resolvers: [recordResolver],
});
