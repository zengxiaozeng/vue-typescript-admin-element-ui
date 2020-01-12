<template>
    <div class="login-container">
        <LoginCanvas/>
        <section>
            <div>
                <span>ts demo</span>
                <lang-select class="set-language" />
            </div>
            <el-form
                status-icon
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form">
                <el-form-item prop="mobilePhone">
                    <el-input
                        type="password"
                        autocomplete="off"
                        :placeholder="$t('login.mobilePhone')"
                        v-model="loginForm.mobilePhone"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        autocomplete="off"
                        :placeholder="$t('login.password')"
                        v-model="loginForm.password"
                    >
                    </el-input>
                </el-form-item>
                <footer>
                    <el-button type="primary" @click.native.prevent="handleLogin">{{$t('login.btn')}}</el-button>
                </footer>
            </el-form>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import LangSelect from '@/components/LangSelect/index.vue'
import LoginCanvas from './login-canvas.vue'

@Component({
    name: 'login',
    components: {
        LangSelect,
        LoginCanvas
    }
})

export default class extends Vue {

    private validateMobilePhone = (rule: any, value: string, callback: Function) => {
        if (!value.trim()) {
            callback(new Error('Please enter the correct mobilePhone'))
        } else {
            callback()
        }
    }

    private validatePassword = (rule: any, value: string, callback: Function) => {
        if (value.length < 6) {
            callback(new Error('The password can not be less than 6 digits'))
        } else {
            callback()
        }
    }

    private loginRules = {
        mobilePhone: [{ validator: this.validateMobilePhone, trigger: 'blur' }],
        password: [{ validator: this.validatePassword, trigger: 'blur' }]
    }

    private loading = false
    private loginForm = {
        mobilePhone: '17091647779',
        password: 'a123456'
    }

    created() {
    }

    private handleLogin() {
        (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
            console.log(typeof this.$router)
            if (valid) {
                this.loading = true
                await UserModule.Login({
                    ...this.loginForm,
                    router: this.$router
                })

                setTimeout(() => {
                    this.loading = false
                }, 0.5 * 1000)
            } else {
                return false
            }
        })

    }
}


</script>

<style lang="scss" scoped>
.login-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: $loginBg;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    >section {
        position: absolute;
        background-color: rgba(250, 250, 250, 0.8);
        border-radius: 5px;
        >div {
            width: 300px;
            position: relative;
            height: 80px;
            text-align: center;
            >span {
                line-height: 80px;
                font-size: 30px;
                color: #000;
                display: inline-block;
                text-align: center;
            }
            .international {
                position: absolute;
                right: 0;
                top: 33px;
                right: 20px;
                cursor: pointer;
            }
        }

        .login-form {
            padding: 30px 20px 20px 20px;
            position: relative;
            width: 300px;
            max-width: 300px;
            margin: 0 auto;
            overflow: hidden;
            >footer {
                text-align: center;
                width: 100%;
                >button {
                    width: 100%;
                }
            }
        }
    }
}
</style>
