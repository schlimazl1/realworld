<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateSettings">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="userInfo.image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="userInfo.username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="userInfo.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="userInfo.email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="userInfo.password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined // 仅在客户端加载 js-cookie
export default {
  // 在路由匹配组件之前会先执行中间件处理
  middleware: ['authenticated'],
  name: 'settingsIndex',
  data () {
    return {
      userInfo: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '********'
      }
    }
  },
  async mounted () {
    const { data } = await getUserInfo()
    this.userInfo.image = data.user.image
    this.userInfo.username = data.user.username
    this.userInfo.email = data.user.email
    this.userInfo.bio = data.user.bio
    this.userInfo.password = data.user.password
  },
  methods: {
    async updateSettings () {
      try {
        const { data } = await updateUserInfo({user: {
          image: this.userInfo.image,
          username: this.userInfo.username,
          bio: this.userInfo.bio,
          email: this.userInfo.email,
          password: this.userInfo.password,
        }})
        // 保存登录状态
        this.$store.commit('setUser', data.user)
        // 为了在服务端也能获取用户数据
        Cookie.set('user', data.user)
        this.$router.push(`/profile/${data.user.username}`)
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style>

</style>