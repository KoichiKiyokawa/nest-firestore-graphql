import { NotFoundException } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { admin } from 'src/modules/admin'
import { User } from 'src/user/user.model'
import { Post } from './post.model'

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    console.log('PostResolver#post')

    const post = await admin
      .firestore()
      .collection('posts')
      .doc(id)
      .get()
      .then((snap) => snap.data())
    if (post === undefined) throw new NotFoundException()
    return { id, ...post } as Post
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    console.log('PostResolver#posts')

    return (await admin
      .firestore()
      .collection('posts')
      .get()
      .then((snap) =>
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      )) as Post[]
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    console.log('PostResolver#user')
    const user = admin
      .firestore()
      .collection('users')
      .doc(post.userId)
      .get()
      .then((snap) => ({ id: snap.id, ...snap.data() }))
    if (user === undefined) throw new NotFoundException()
    return user
  }
}
