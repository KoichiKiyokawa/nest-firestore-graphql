import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string

  title!: string

  body!: string

  userId!: string
}
