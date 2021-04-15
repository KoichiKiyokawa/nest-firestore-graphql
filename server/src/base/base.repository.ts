import { admin } from 'src/modules/admin'

export abstract class BaseRepository<T> {
  abstract get collectionName(): string

  get collectionReference(): admin.firestore.CollectionReference<T> {
    return admin.firestore().collection(this.collectionName) as admin.firestore.CollectionReference<T>
  }

  async find(id: string): Promise<T | undefined> {
    const snap = await this.collectionReference.doc(id).get()
    const data = snap.data()
    if (data === undefined) return undefined
    return { ...data, id: snap.id }
  }

  async all({ limit }: { limit?: number }): Promise<T[]> {
    let ref: admin.firestore.Query = this.collectionReference
    if (limit) ref = ref.limit(limit)
    const snap = await ref.get()
    return snap.docs.map((doc) => ({ ...(doc.data() as T), id: doc.id }))
  }

  async create(data: T): Promise<T> {
    const doc = await this.collectionReference.add(data)
    return { ...data, id: doc.id }
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.collectionReference.doc(id).update(data)
  }
}
