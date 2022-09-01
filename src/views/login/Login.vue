<!-- eslint-disable no-undef -->
<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="username" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input type="password" v-model="password" class="wrapper__input__content" placeholder="请输入密码" />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage"></Toast>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: ''
  })
  const router = useRouter()
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        // alert('as;dakdlask')
        showToast('请填写用户名或者密码')
        return false
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      console.log(result)
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return {
    username, password, handleLogin
  }
}

// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return {
    handleRegisterClick
  }
}

export default {
  name: 'Login',
  components: {
    Toast
  },

  // 职责就是告诉你，代码执行的一个流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()
    return {
      username,
      password,
      show,
      toastMessage,
      showToast,
      handleLogin,
      handleRegisterClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viribales.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }

  &__input {
    box-sizing: border-box;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    height: .48rem;
    background: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 6px;
    border-radius: 6px;

    &__content {
      width: 100%;
      line-height: .48rem;
      background: none;
      border: none;
      outline: none;
      font-size: .16rem;

      &::placeholder {
        color: $content-notice-fontColor
      }
    }
  }

  &__login-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: $bgColor;
    font-size: .16rem;
    text-align: center;
  }

  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontColor;
  }
}
</style>
