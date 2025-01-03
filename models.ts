import {UUID as UID, uuidv7obj} from "uuidv7";
import type {Ref} from "vue";

// @ts-ignore
export class UUID extends UID {
  constructor(data?: string | UUID) {
    super()
    if (typeof data === 'string') {
      // @ts-ignore
      this.bytes = UUID.parse(data).bytes
    } else if (typeof data === 'object') {
      Object.assign(this, data)
    } else {
      // @ts-ignore
      this.bytes = uuidv7obj().bytes
    }
  }

  getTime() {
    const dataView = new DataView(this.bytes.buffer)
    return new Date(
      dataView.getUint32(0, false) * 2 ** 16
      + dataView.getUint16(4, false)
    )
  }
}

class Model {
  static exclude: string[] = []

  // noinspection JSUnusedLocalSymbols
  constructor(obj: any) {
  }

  static fromArray<T>(arr?: any[]): T[] {
    if (!arr) return <T[]>[]
    return arr.map(obj => <T>new this(obj))
  }

  toJSON() {
    const obj = {...this}
    // @ts-ignore
    this.constructor.exclude?.forEach(key => delete obj[key])
    return obj
  }
}

export const toJSONArray = (arr: Model[]) => arr.map(obj => obj.toJSON())

export class Board extends Model {
  public id: string
  public name: string
  public description?: string

  constructor(obj: any) {
    super(obj)
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
  }
}

export class Content extends Model {
  static override exclude = ['is_me', 'rank', 'liked', 'user']
  public id: UUID
  public parent_id: UUID
  public type: string
  public title?: string
  public text: string
  public is_me?: boolean
  public views: number
  public likes: number
  public liked?: boolean
  public rank?: number
  public user?: User

  constructor(obj: any) {
    super(obj)
    this.id = new UUID(obj.id)
    this.parent_id = new UUID(obj.parent_id)
    this.type = obj.type
    this.title = obj.title
    this.text = obj.text || ''
    this.views = obj.views
    this.likes = obj.likes
    this.is_me = obj.is_me
    this.liked = obj.liked
    this.rank = obj.rank
    this.user = obj.user
  }

  async changeLike(loading?: Ref<boolean>) {
    needAuth()
    if (loading) loading.value = true
    const supabase = useSupabaseClient()
    let result
    if (!this.liked) {
      result = await supabase.from('like').upsert({
        content_id: this.id,
        type: this.type,
      } as never, {ignoreDuplicates: true})
    } else {
      result = await supabase.from('like').delete().eq('content_id', this.id)
    }
    const {error} = result
    if (error) {
      console.error(error)
      useToast().Error(error.message)
      return
    }
    this.liked = !this.liked
    this.likes += this.liked ? 1 : -1
    if (loading) loading.value = false
  }
}

export class Comment extends Content {
  public reply_to?: UUID
  public deleted?: boolean

  constructor(obj: any) {
    super(obj)
    this.reply_to = obj.reply_to ? new UUID(obj.reply_to) : undefined
    this.deleted = obj.deleted
    this.type = 'comment'
  }
}

export class PollOption extends Content {
  static override exclude = ['anonymous', ...Content.exclude]

  constructor(obj: any) {
    super(obj)
    this.type = 'poll_option'
  }
}

export class Blog extends Content {
  static override exclude = [
    'updated_at', 'reply', 'tags', 'comments',
    ...Content.exclude,
  ]

  published: boolean
  excerpt?: string
  updated_at?: Date
  reply?: number
  locked?: boolean
  images?: string[]
  tags?: Tag[]
  comments?: Comment[]

  constructor(obj: any) {
    super(obj)
    this.published = obj.published
    this.updated_at = new Date(obj.updated_at)
    this.excerpt = obj.excerpt
    this.reply = obj.reply
    this.locked = obj.locked
    this.tags = Tag.fromArray(obj.tags)
    this.comments = Comment.fromArray(obj.comments)
    this.images = obj.images || []
    this.type = 'blog'
  }
}

export class Tag extends Model {
  id: UUID;
  name: string;
  popularity: number;

  constructor(obj: any) {
    super(obj)
    if (typeof obj === 'string') {
      this.id = new UUID()
      this.name = obj
      this.popularity = 0
    } else {
      this.id = new UUID(obj.id)
      this.name = obj.name
      this.popularity = obj.popularity
    }
  }
}

export class User extends Model {
  id: UUID
  name?: string
  email?: string

  constructor(obj: any) {
    super(obj)
    Object.assign(this, obj)
    this.id = new UUID(obj.id)
  }
}

export type OrderField = 'updated_at' | 'id'
