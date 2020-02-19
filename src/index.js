const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,

    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                description: args.description,
                url: args.url,
            })
        },
    },
}

// 3
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))