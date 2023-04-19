import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Change this to your GraphQL server URL
    cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>

    );
}