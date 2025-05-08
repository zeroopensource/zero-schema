import { createModel } from 'schemix'
import { createRelationMixin } from './../utilities/createRelationMixin'

// const AuthorMixin = createRelationMixin('author')
// const TagsMixin = createRelationMixin('tags')
// const CategoryMixin = createRelationMixin('category')

export default createModel(BlogPostV1Model => {
  BlogPostV1Model.string('postId', { id: true })
    // .mixin(AuthorMixin)
    // .mixin(TagsMixin)
    // .mixin(CategoryMixin)
    .dateTime('publishedDate', { optional: true })
    .dateTime('lastModifiedDate', { optional: true })
    .string('title')
    .string('content')
    .string('excerpt', { optional: true })
    .boolean('isPublished', { default: false })
    .string('slug')
    .string('featuredImageUrl', { optional: true })
})
