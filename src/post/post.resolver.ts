import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.model';

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    return { id, title: 'demo-title', body: 'body1' };
  }
}
