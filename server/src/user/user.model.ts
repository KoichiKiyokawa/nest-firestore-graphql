import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/post/models/post.model'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  name!: string

  posts!: Post[]
}
