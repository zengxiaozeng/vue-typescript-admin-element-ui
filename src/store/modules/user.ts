import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { login, getUserInfo } from '@/api/users'
import store from '@/store'

export interface IUserState {
  id_token: string
  username: string
  password: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public id_token = getToken() || ''
  public username = ''
  public password = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.id_token = token
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    location.reload()
  }

  @Action
  public async Login(params: any) {
    let { mobilePhone, password, router } = params
    mobilePhone = mobilePhone.trim()
    const { data } = await login({ mobilePhone, password })
    console.log(`Bearer ${data.id_token}`)
    setToken(`Bearer ${data.id_token}`)
    this.SET_TOKEN(`Bearer ${data.id_token}`)
    router.push('/')
  }

  @Action
  public async GetUserInfo() {
    if (this.id_token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo()
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { authorities } = data
    // roles must be a non-empty array
    if (!authorities || authorities.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(authorities)
  }
}

export const UserModule = getModule(User)
