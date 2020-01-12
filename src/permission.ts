import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { PermissionModule } from '@/store/modules/permission'
import { UserModule } from '@/store/modules/user'
import { Route } from 'vue-router'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async(to: Route, _: Route, next: any) => {
    NProgress.start()
    if (UserModule.id_token) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            // Check whether the user has obtained his permission roles
            if (UserModule.roles.length === 0) {
                try {
                    // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
                    await UserModule.GetUserInfo()
                    const roles = UserModule.roles
                    // Generate accessible routes map based on role
                    PermissionModule.GenerateRoutes(roles)
                    // Dynamically add accessible routes
                    router.addRoutes(PermissionModule.dynamicRoutes)
                    // Hack: ensure addRoutes is complete
                    // Set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (err) {
                    // Remove token and redirect to login page
                    UserModule.ResetToken()
                    Message.error(err || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
    // next()
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
