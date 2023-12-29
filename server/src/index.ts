import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import depthLimit from "graphql-depth-limit";
import MongoLib from "./mongo";
import config from "./config";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["https://www.dicesea.io", "http://localhost:3000"], // Update this with the allowed origin domains
    methods: ["GET", "POST"], // Update this with the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Update this with the allowed headers
    credentials: true, // Allow sending cookies across domains
  })
);

app.use(bodyParser.json({ limit: "10mb" }));

// Use morgan for logging requests
app.use(morgan("dev"));

const server = new ApolloServer({
  schema,
  introspection: true,
  context: async () => new MongoLib().connect(),
  validationRules: [depthLimit(10)],
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(config.port, () => {
    console.log(
      `Server running on http://localhost:${config.port}${server.graphqlPath}`
    );
  });
}

startServer().catch((err) => {
  console.error(err);
});
