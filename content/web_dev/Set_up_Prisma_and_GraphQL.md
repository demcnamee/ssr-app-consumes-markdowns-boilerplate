# Set up Prisma and GraphQL

There are two servers, a GraphQL server on node, and a Prisma server which runs on Docker (Docker-compose).

---

---

## Set up Prisma

```jsx
prisma init hello-world
```

Follow the interactive wizard. With a database already set and with some data, this command generates the datamodel, prisma client, docker-compose file and prisma.yml file. This hasn’t deploy the prisma project on Docker.

And inside the new directory, start prisma server in Docker-compose. To start Prisma and connect it to your database.

```jsx
docker-compose up -d
```

With this, we have the minimal setup ready to deploy your Prisma datamodel. The project is now running on Docker.

Since we are telling which database to connect, prisma creates the datamodel base on database data.

### Fix before continue

The .prisma file throw an error in vscode. Change it for .grapql. Modify datamodel in prisma.yml.

If using mongodb, change in docker-compose.yml the schema, for database. Since mongodb does not use schemas.

---

## Set up node.js

As normal create an index.js and use npm init -y. Install graphql-yoga (GraphQL server library based on Express.js). Also install prisma-client-lib, this includes all dependencies besides GraphQL needed in order to run Prisma client in JavaScript.

> Every GraphQL API is based on a GraphQL schema that specifies all API operations and data structures. The schema is a contract between client and server.

Define the schema.graphql file. Also we will need the resolvers object. This will be pass to the GraphQL server of graphql-yoga.

```jsx
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))
```

---

## Extra Info

[Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container Docker applications. In Compose, you use a YAML file to configure your application’s services. Then, you create and start all the services from your configuration by running a single command.

datamodel.prisma file and prisma.yml are needed for generate prisma client.

```yaml
endpoint: http://localhost:4466
datamodel: datamodel.prisma
databaseType: document

generate:
  - generator: javascript-client
    output: ./generated/prisma-client/
```

In index.js, import prisma from *prisma client*. With this we could make CRUD operations in the database.

Make changes on the scheme in *data model.prisma*, then regenerated the prisma client. This is needed every time data model is updated. If the prisma layer is running on Docker, deploy again.

```jsx
prisma generate // prisma client
prisma deploy // docker image
```