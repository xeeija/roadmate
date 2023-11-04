import { Storage, Database } from "@ionic/storage"

class AppStorage {
  public store = new Storage()
  private db: Database = undefined

  constructor() {
    if (this.db === undefined) this.init()
  }
  private init() {
    if (!this.db) this.db = this.store.create()
  }
  public get(key: string): Promise<any> {
    this.init()
    return Promise.resolve(this.store?.get(key))
  }
  public set(key: string, data: any): Promise<any> {
    this.init()
    return this.store?.set(key, data)
  }
  public remove(key: string): Promise<any> {
    this.init()
    return this.store?.remove(key)
  }
}

export default AppStorage
