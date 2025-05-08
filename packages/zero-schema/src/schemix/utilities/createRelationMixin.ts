import { createMixin, PrismaModel } from 'schemix'
import ZeroIndexV1Model from '../models/ZeroIndexV1.model'

export const createRelationMixin = (fieldName: string) =>
  createMixin(Mixin => {
    Mixin.relation(`${fieldName}Parent`, ZeroIndexV1Model, {
      list: true,
      name: fieldName,
    }).relation(`${fieldName}Child`, ZeroIndexV1Model, {
      list: true,
      name: fieldName,
    })
  })
