import "graphql-import-node";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import collection from "./collection.graphql";
import record from "./record.graphql";
import user from "./user.graphql";

const mergedTypeDefs = mergeTypeDefs([collection, record, user]);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
});

export default schema;
