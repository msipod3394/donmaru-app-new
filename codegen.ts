import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/gql/graphql.ts': {
      // preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHOC: true, // Hookを作ることを許可
        withComponent: false,
        scalars: {
          uniqueidentifier: 'string',
        },
      },
    },
  },
}

export default config
