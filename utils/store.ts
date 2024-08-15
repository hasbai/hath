import {Blog, Comment, User, UUID} from "@/models";
import {capitalize} from "@/utils/index";

export const mainStore = defineStore('main', () => {
  const blogs = reactive<Blog[]>([])
  let user = {} as User

  const toast = useToast()
  const supabase = useSupabaseClient()

  let profileLock = false
  const getProfile = async () => {
    if (user.id) return user
    if (profileLock) return
    profileLock = true
    const u = useSupabaseUser()
    if (!u.value) return
    const {data, error} = await supabase.from('user').select().eq('id', u.value.id).single<User>()
    if (error) {
      toast.Error(error.message)
      return
    }
    user = new User(data)
    profileLock = false
    return user
  }
  return {blogs, user, getProfile}
})

export const commentStore = defineStore('comment', () => {
  const toast = useToast()
  const supabase = useSupabaseClient()
  const PAGE_SIZE = 50
  const value = reactive<Map<string, Comment[]>>(new Map())
  const current = reactive(<Comment>{})

  const load = async (id: string) => {
    const comments = value.get(id)!
    const {data, error} = await supabase.from('comments').select()
      .eq('parent_id', id)
      .order('id')
      .range(comments.length, comments.length + PAGE_SIZE - 1)
    if (error) {
      console.error(error)
      toast.Error(error.message)
      return
    }
    const result = Comment.fromArray<Comment>(data)
    comments.push(...result)
    if (comments.length != 0 && result.length === 0) {
      toast.Info('没有更多了')
    }
    return result
  }

  const get = async (id: UUID) => {
    const {data, error} = await supabase.from('comment').select().eq('id', id).single<Comment>()
    if (error) {
      toast.Error(error.message)
      return
    }
    return new Comment(data!)
  }

  const list = (blogId: string | UUID) => {
    if (typeof blogId === 'object') blogId = blogId.toString()
    if (!value.has(blogId)) value.set(blogId, [])
    return value.get(blogId)!
  }

  const edit = (comment: Comment) => {
    needAuth()
    // @ts-ignore
    if (current.__proto__.constructor.name === 'Object') {
      Object.setPrototypeOf(current, comment.constructor.prototype)
    }
    if (!current.text) {
      Object.assign(current, comment)
    }
    const dialog = <HTMLDialogElement>document.getElementById(`edit_${comment.type}`)
    dialog?.showModal()
  }
  const dropDraft = () => {
    Object.assign(current, new Comment({}))
  }
  const upsert = async () => {
    const {
      data,
      error
    } = await supabase.from('comment').upsert(current as never).select().single<Comment>()
    if (error) {
      toast.Error(error.message)
      return
    }
    const comment = new Comment(data!)
    comment.is_me = true
    const comments = value.get(current.parent_id.toString())!
    const index = comments.findIndex(p => p.id.toString() === current.id.toString())
    if (index !== -1) comments[index] = comment // update
    else comments.push(comment) // insert
    toast.Success('Success')
    Object.assign(current, new Comment({}))
  }

  const softDelete = async (comment: Comment) => {
    if (!confirm(`Are you sure you want to delete this ${comment.type}?`)) return
    const {error} = await supabase.from(comment.type).update({
      deleted: true // soft delete
    } as never).eq('id', comment.id)
    if (error) {
      toast.Error(error.message)
    } else {
      comment.deleted = true
      toast.Success(`${capitalize(comment.type)} deleted`)
    }
  }

  const del = async (comment: Comment) => {
    if (comment.type != 'comment') return
    if (!confirm(`Admin sure to permanently delete this ${comment.type}?`)) return
    const {error} = await supabase.from(comment.type).delete().eq('id', comment.id)
    if (error) {
      toast.Error(error.message)
    } else {
      toast.Success(`${capitalize(comment.type)} deleted`)
      const comments = value.get(comment.parent_id.toString())!
      comments.splice(comments.indexOf(comment), 1)
    }
  }
  return {value, current, get, list, load, edit, dropDraft, upsert, softDelete, del, PAGE_SIZE}
})

export const configStore = defineStore('config', {
  state: () => {
    return {
      color: '#00796B',
    }
  },
  actions: {},
  persist: true,
})

export enum MsgType {
  Success = 'alert-success',
  Info = 'alert-info',
  Warning = 'alert-warning',
  Error = 'alert-error',
}

export const useToast = defineStore('toast', () => {
  const show = ref(false)

  const type = ref(MsgType.Info)
  const message = ref('')
  const duration = ref(3000)
  const atTop = ref(false)

  const run = (t: MsgType, m: string, d: number, top = false) => {
    show.value = true
    message.value = m
    type.value = t
    atTop.value = top
    const toast = document.getElementById('toast') as HTMLElement
    try {
      toast.showPopover()
    } catch {
      console.log('Popover API not supported, please upgrade your browser to the latest version.' +
        '\n See https://developer.mozilla.org/en-US/docs/Web/API/Popover_API#browser_compatibility')
    }
    setTimeout(() => {
      try {
        toast.hidePopover()
      } catch {
      }
      show.value = false
      message.value = ''
      type.value = MsgType.Info
      atTop.value = false
    }, d)
  }

  const info = (message: string, duration = 3000) => run(MsgType.Info, message, duration)
  const success = (message: string, duration = 3000) => run(MsgType.Success, message, duration)
  const warning = (message: string, duration = 3000) => run(MsgType.Warning, message, duration)
  const error = (message: string, duration = 3000) => run(MsgType.Error, message, duration)
  const Info = (message: string, duration = 3000) => run(MsgType.Info, message, duration, true)
  const Success = (message: string, duration = 3000) => run(MsgType.Success, message, duration, true)
  const Warning = (message: string, duration = 3000) => run(MsgType.Warning, message, duration, true)
  const Error = (message: string, duration = 3000) => run(MsgType.Error, message, duration, true)

  return {
    show,
    message,
    type,
    duration,
    atTop,
    info,
    success,
    warning,
    error,
    Info,
    Success,
    Warning,
    Error
  }
})
