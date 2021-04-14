import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'src/base/base.repository'
import { CreatePostInput } from './models/createPostInput.model'
import { Post } from './models/post.model'

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  get collectionName() {
    return 'posts'
  }

  constructor() {
    super()
  }

  async create(data: CreatePostInput) {
    return super.create({ ...data, userId: 'cs1Idhv1UKSqwruPGnKC' } as Post)
  }
}
