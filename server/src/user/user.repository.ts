import { BaseRepository } from 'src/base/base.repository'
import { User } from './user.model'

export class UserRepository extends BaseRepository<User> {
  get collectionName() {
    return 'users'
  }
}
