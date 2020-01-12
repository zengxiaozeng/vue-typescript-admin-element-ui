<template>
    <div class="navbar">
        <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />
        <breadcrumb
            id="breadcrumb-container"
            class="breadcrumb-container"
        />
        <div class="right-menu">
            <theme-picker
                class="theme-cnt"
                @change="themeChange"
            />
            <template>
                <lang-select class="right-menu-item hover-effect" />
            </template>
            <el-dropdown
                class="avatar-container right-menu-item hover-effect"
                id="personal-center"
                trigger="click"
            >
                <div class="avatar-wrapper">
                    <img
                        :src="avatar"
                        class="user-avatar"
                    >
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/">
                        <el-dropdown-item>
                            个人中心
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
            <span
                style="display:block;"
                @click="logout"
            >退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {AppModule} from '@/store/modules/app'
    import {UserModule} from '@/store/modules/user'
    import Breadcrumb from '@/components/Breadcrumb/index.vue'
    import Hamburger from '@/components/Hamburger/index.vue'
    import LangSelect from '@/components/LangSelect/index.vue'
    import { SettingsModule } from '@/store/modules/settings'
    import ThemePicker from '@/components/ThemePicker/index.vue'


    @Component({
        name: 'Navbar',
        components: {
            Breadcrumb,
            Hamburger,
            LangSelect,
            ThemePicker
        }
    })
    export default class extends Vue {
        get sidebar() {
            return AppModule.sidebar
        }

        get device() {
            return AppModule.device.toString()
        }

        get avatar() {
            return require('@/assets/avatar.gif')
        }

        private toggleSideBar() {
            AppModule.ToggleSideBar(false)
        }

        private async logout() {
            UserModule.ResetToken()
            console.log('退出了退出了')
        }

        private themeChange(value: string) {
            SettingsModule.ChangeSetting({ key: 'theme', value })
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            padding: 0 15px;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;
            display: flex;
            align-items: center;

            .theme-cnt {
                margin: 12px 10px 0 0;
            }

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
