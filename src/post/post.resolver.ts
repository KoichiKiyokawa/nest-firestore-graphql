import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Post } from './post.model';

const dummyUsers = [
  { id: '1', name: 'demo-name' },
  { id: '2', name: 'demo-name' },
];

const dummyPosts = [
  { id: '1', title: 'demo-title', body: 'body1', userId: '1' },
  { id: '2', title: 'demo-title', body: 'body2', userId: '1' },
];

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    const post = dummyPosts.find((post) => post.id === id);
    if (post === undefined) throw new NotFoundException();
    return post;
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return dummyPosts;
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    const user = dummyUsers.find((u) => u.id === post.userId);
    if (user === undefined) throw new NotFoundException();
    return user;
  }
}
