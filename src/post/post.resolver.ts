import { NotFoundException } from '@nestjs/common'
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/user/user.model'
import { UserRepository } from 'src/user/user.repository'
import { CreatePostInput } from './models/createPostInput.model'
import { Post } from './models/post.model'
import { PostRepository } from './post.repository'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postRepository: PostRepository, private readonly userRepository: UserRepository) {}

  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    console.log('PostResolver#post')

    const post = await this.postRepository.find(id)
    if (post === undefined) throw new NotFoundException()
    return { ...post, id } as Post
  }

  @Query(() => [Post])
  async posts(@Args({ name: 'limit', type: () => Int, nullable: true }) limit?: number): Promise<Post[]> {
    console.log('PostResolver#posts')

    return (await this.postRepository.all({ limit })) as Post[]
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    console.log('PostResolver#user')
    const user = this.userRepository.find(post.userId)
    if (user === undefined) throw new NotFoundException()
    return user
  }

  @Mutation(() => Post)
  async createPost(@Args('post') post: CreatePostInput): Promise<Post> {
    return await this.postRepository.create(post)
  }
}
