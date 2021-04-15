import { NotFoundException } from '@nestjs/common'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { admin } from 'src/modules/admin'
import { User } from './user.model'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    console.log('UserResolver#user')

    const user = await admin
      .firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((snap) => snap.data())
    if (user === undefined) throw new NotFoundException()
    return { id, ...user } as User
  }
}
