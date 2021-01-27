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
      },
      
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
      const { data } = await updateUserInfo(this.userInfo)
      console.log(data)
      // console.log('1111')
    }
  }
}
</script>

<style>

</style>