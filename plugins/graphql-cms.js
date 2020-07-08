const { GraphQLClient } = require('graphql-request')

function getGraphqlClient(token) {
  return new GraphQLClient(process.env.CMS_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default getGraphqlClient
