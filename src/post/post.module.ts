import { Module } from '@nestjs/common'
import { UserRepository } from 'src/user/user.repository'
import { PostRepository } from './post.repository'
import { PostResolver } from './post.resolver'

@Module({
  providers: [PostResolver, PostRepository, UserRepository],
})
export class PostModule {}
