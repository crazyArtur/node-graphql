const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    description: "Fullstack TT for GQL",
    url: "www.howtographql.com"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a HN Clone`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
