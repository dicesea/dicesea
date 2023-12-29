import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
// import collection from "./collection.graphql";
import record from "./record.graphql";

const schema = makeExecutableSchema({
  // typeDefs: collection,
  typeDefs: record,
});

export default schema;
