import SchemaBuilder from '@pothos/core'

const builder = new SchemaBuilder({})

builder.queryType({
  fields: t => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World2'}`,
    }),
  }),
})

builder.mutationType({
  fields: t => ({
    createZeroIndexV1: t.string({
      args: {
        zeroId: t.arg.string({ required: true }),
        ownerId: t.arg.string({ required: true }),
        accessUpdateId: t.arg.stringList(),
        accessFetchId: t.arg.stringList(),
        creationDate: t.arg.string(),
        lastModifiedDate: t.arg.string(),
        expirationDate: t.arg.string(),
        name: t.arg.string({ required: true }),
        description: t.arg.string(),
        versionId: t.arg.string(),
        tagsId: t.arg.stringList(),
        zeroType: t.arg.string({ required: true }),
        values: t.arg.string({ required: true }),
      },
      resolve: (parent, { zeroId }) => `hello, ${zeroId}`,
    }),
  }),
})

export const PhotosSchema = builder.toSchema()