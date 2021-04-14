import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field((type) => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  body!: string;
}
