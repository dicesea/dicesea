// import {
//   ApolloClient,
//   InMemoryCache,
//   NormalizedCacheObject,
// } from "@apollo/client";
// import merge from "deepmerge";
// import { isEqual } from "lodash-es";

// const PROD_URI = "https://aesecid.vercel.app/graphql";
// const DEV_URI = "http://localhost:4000/graphql";

// const BASE_URI = process.env.NODE_ENV !== "development" ? PROD_URI : DEV_URI;

// let apolloClient: ApolloClient<NormalizedCacheObject> | null;

// export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

// function createApolloClient() {
//   return new ApolloClient({
//     ssrMode: typeof window === "undefined",
//     uri: BASE_URI,
//     cache: new InMemoryCache(),
//   });
// }

// export function initializeApollo(initialState?: any) {
//   const _apolloClient = apolloClient ?? createApolloClient();

//   if (initialState) {
//     const existingCache = _apolloClient.cache.extract();

//     const data = merge(initialState, existingCache, {
//       arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
//         ...sourceArray,
//         ...destinationArray.filter((d: any) =>
//           sourceArray.every((s: any) => !isEqual(d, s))
//         ),
//       ],
//     });
//     _apolloClient.cache.restore(data);
//   }

//   if (typeof window === "undefined") {
//     return _apolloClient;
//   }

//   if (!apolloClient) {
//     apolloClient = _apolloClient;
//   }

//   return _apolloClient;
// }

// export function addApolloState(
//   client: ApolloClient<NormalizedCacheObject>,
//   pageProps: any
// ) {
//   if (pageProps?.props) {
//     pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
//   }

//   return pageProps;
// }

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import { isEqual } from "lodash-es";
import Cors from "cors"; // Import the cors package
import express from "express"; // Import express for creating a middleware

const PROD_URI = "https://aesecid.vercel.app/graphql";
const DEV_URI = "http://localhost:4000/graphql";

const BASE_URI = process.env.NODE_ENV !== "development" ? PROD_URI : DEV_URI;

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

function createApolloClient() {
  const corsMiddleware = Cors({
    origin: "*", // Adjust this to the actual origin you want to allow
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  const app = express();
  app.use(corsMiddleware);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: BASE_URI,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
