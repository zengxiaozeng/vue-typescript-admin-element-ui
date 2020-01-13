# 掘金博客：https://juejin.im/user/579570d679bc44006638c738/posts

# vue-typescript-admin-element-ui
基于Vue+typescript版的后台管理系统模板。

## 项目预览

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c4f830e52ebf?w=480&h=296&f=gif&s=2863431)

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c38738097c03?w=2154&h=1350&f=png&s=1595150)

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c3932101039a?w=2160&h=1350&f=png&s=2216780)

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c3981b0c483d?w=2430&h=1400&f=png&s=213171)

分享不易，喜欢的话一定别忘了点<font color=red size=12>💖</font>

只关注不点<font color=red size=12>💖</font>的都是`耍流氓`

只收藏也不点<font color=red size=12>💖</font>的也一样是`耍流氓`。

## 简介

ts香不香这里我就不做过多吹捧了，基础[api官方文档](https://typescript.bootcss.com/)有比较清晰的介绍，本篇博客主要分享Vue+typescript+element-ui，后台管理系统实战篇。

简单来说，ts属于强类型语言，它的优势在于静态类型检查，概括来说主要包括以下几点：

- 静态类型检查
- IDE 智能提示
- 代码重构
- 可读性

## 一、技术栈

- Typescript
- vue-cli 3.x+
- Yarn
- Sass
- Element-ui
- Vuex
- ...

## 二、项目说明
```
yarn install  //依赖安装
yarn run serve //项目启动
yarn run build:prod //打包
```

## 三、ts用法介绍

本次项目基础框架为Vue，跟正常的Vue项目还是或多或少有不少差距的。众所周知，js是一门弱类型的语言，尤其是在变量赋值时，永远都是给变量直接赋值各种类型值来初始化，线上一些隐藏的bug就冷不防会暴露出来。把这种错误扼杀在项目开发编译阶段而非上线阶段，所有就有了typescript超集的出现。

那Vue中是怎么引用typescript项目的呢，项目开始之前，先大致介绍一番ts在Vue项目中的基础用法

> [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

`vue-property-decorator`在`vue-class-component`的基础上增加了更多与`Vue`相关的装饰器，使`Vue`组件更好的跟TS结合使用。这两者都是离不开装饰器的，（decorator）装饰器已在ES提案中。`Decorator`是装饰器模式的实践。装饰器模式呢，它是继承关系的一个替代方案。动态地给对象添加额外的职责。在不改变接口的前提下，增强类的性能。

`vue-property-decorator`是这个Vue项目文件中完全依赖的库，它是Vue官方推荐的并且依赖于[vue-class-component](https://github.com/vuejs/vue-class-component)，先介绍下它在项目中的常见用法。

- @Component
- @Emit
- @Provice @Inject
- @Prop
- @Watch
- @Model
- @Minxins

### @Component 类装饰器

首先，Vue页面中的script部分要加一个lang=ts，这样安装好typescript正能引用

```
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import BaseHeader from '@/components/BaseHeader'; 
    
    //公共头部组件
    @Component({
        components: {
            BaseHeader
        }
    })
    export default class extends Vue {
        private stateA:boolean = true
        private stateB:string = ''
        private stateC:number = 0
        private stateD:any = {}
        stateE:any[] = []
    }
</script>
```

等同于

```
<script>
    import Vue from 'vue';
    import BaseHeader from '@/components/BaseHeader'; //公共头部组件

    export default {
        components: {
            BaseHeader
        },
        
        data(){
            return {
                stateA: true,
                stateB: '',
                stateC: 0,
                stateD: {},
                stateE: []
            }	
        }
    }
</script>
```

`vue-property-decorator`在项目中的应用最主要是起一个装饰器的作用，差异化的话看对比就非常直观了

data变量的定义比较多元化，这里区别有加private，不加就是public，当变量标记为private时，它就不能在声明它的类的外部访问。

`@Component`装饰器属性名必须得写上

-------

### @Prop

父子组件之间的属性传值

```
export default class extends Vue {
    @Prop({ default: 0 }) private propA!: number
    @Prop({ default: () => [10, 20, 30, 50] }) private propB!: number[]
    @Prop({ default: 'total, sizes, prev, pager, next, jumper' }) private propC!: string
    @Prop({ default: true }) private propD!: boolean,
    @prop([String, Boolean]) propE: string | boolean;
}    
```

等同于

```
export default {
  props: {
    propA: {
	    type: Number
    },
    propB: {
    	type: Array,
    	default: [10, 20, 30, 50]
    },
    propC: {
    	type: String,
    	default: 'total, sizes, prev, pager, next, jumper'
    },
    propD: {
    	type: String,
    	default: 'total, sizes, prev, pager, next, jumper'
    },
    propE: {
    	type: [String, Boolean]
    }
  }
}
```

这里有两个常用修饰符`!``?`，`!`和可选参数`?`是相对的, `!`表示强制解析（也就是告诉typescript编译器，我这里一定有值），你写`?`的时候再调用，`typescript`会提示可能为`undefined`

--------

### @Emit

```
Component
export default class YourComponent extends Vue {
  count = 0

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  onInputChange(e) {
    return e.target.value
  }
}
```

等同于

```
export default {
  data() {
    return {
      count: 0
    }
  },
  
  methods: {
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    
    returnValue() {
      this.$emit('return-value', 10)
    },
    
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    }
  }
}
```

`@Emit装饰器`的函数会在运行之后触发等同于其函数名`(驼峰式会转为横杠式写法)`的事件, 并将其函数传递给`$emit`

@Emit触发事件有两种写法

- @Emit()不传参数,那么它触发的事件名就是它所修饰的函数名.
- @Emit(name: string),里面传递一个字符串,该字符串为要触发的事件名

-----------

### @Watch 观察属性装饰器

@Watch装饰器主要用于替代`Vue`属性中的`watch`属性，监听依赖的变量值变化而做一系列的操作

```
@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) {}
}
```

等同于

```
export default {
  watch: {
	child(val, oldVal) {},
	person: {
		handler(val, oldVal) {},
		immediate: true,
		deep: true
	}
  }
}
```

watch 是一个对象，对象就有键，有值。

- 第一个handler：其值是一个回调函数。即监听到变化时应该执行的函数。
- 第二个是deep：其值是true或false；确认是否深入监听。deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器（受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除）
- 第三个是immediate：其值是true或false；immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行

`@Watch`使用非常简单,接受第一个参数为要监听的属性名, 第二个属性为可选对象。@Watch所装饰的函数即监听到属性变化之后应该执行的函数。

`@Watch`装饰的函数的函数名并非如上`onStateChanged`严格命名，它是多元化的，你可以随心所欲的命名，当然，能按照规范化的命名会使你的代码阅读性更好。

------------

### @Minxins

```
// myMixin.ts

@Component
export default class MyMixin extends Vue {
  mixinValue:string = 'Hello World!!!'
}
```

```
// 引用mixins
import MyMixin from './myMixin.js'

@Component
export default class extends mixins(MyMixin) {
  created () {
    console.log(this.mixinValue) // -> Hello World!!!
  }
}
```

然后我又偷学到了另外一种mixins写法，记录一下

先改造一下`myMixin.ts`,定义`vue/type/vue`模块,实现`Vue接口`

```
// myMixin.ts
import { Vue, Component } from 'vue-property-decorator';


declare module 'vue/types/vue' {
    interface Vue {
        mixinValue: string;
    }
}

@Component
export default class myMixins extends Vue {
    mixinValue: string = 'Hello World!!!'
}
```

引用

```
import { Vue, Component, Prop } from 'vue-property-decorator';
import MyMixin from './myMixin.js'

@Component({
    mixins: [MyMixin]
})
export default class extends Vue{
    created(){
        console.log(mixinValue) // => Hello World!!!
    }
}
```

两种方式不同在于定义`mixins`时如果没有定义`vue/type/vue`模块, 那么在混入的时候就要继承该`mixins`; 如果定义`vue/type/vue`模块,在混入时可以在`@Component`中`mixins`直接混入。

----------------

### @Model

`@Model装饰器`允许我们在一个组件上自定义`v-model`，接收两个参数：

- event: string 事件名。
- options: Constructor | Constructor[] | PropOptions 与@Prop的第一个参数一致。

```
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class MyInput extends Vue {
  @Model('change', { type: String, default: 'Hello world!!!' }) readonly value!: string
}
```

等同于

```
<template>
  <input
    type="text"
    :value="value"
    @change="$emit('change', $event.target.value)"
  />
</template>

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: 'Hello world!!!'
    }
  }
}
```
---------

### @Provide @Inject

`@Provide` 声明一个值 , 在其他地方用 `@Inject` 接收，在实战项目中用得不多，一般用于不依赖于任何第三方状态管理库<font color=red>（如vuex）</font>的组件编写

----------

### @Ref(refKey?: string)

`@Ref`装饰器接收一个可选参数，用来指向元素或子组件的引用信息。如果没有提供这个参数，会使用装饰器后面的属性名充当参数

```
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Form } from 'element-ui'

@Componentexport default class MyComponent extends Vue {
  @Ref() readonly loginForm!: Form
  @Ref('changePasswordForm') readonly passwordForm!: Form

  public handleLogin() {
    this.loginForm.validate(valide => {
      if (valide) {
        // login...
      } else {
        // error tips
      }
    })
  }
}
```

等同于

```
export default {
  computed: {
    loginForm: {
      cache: false,
      get() {
        return this.$refs.loginForm
      }
    },
    passwordForm: {
      cache: false,
      get() {
        return this.$refs.changePasswordForm
      }
    }
  }
}
```

----------

<Font size=4 color=red>使用时切记要引入修饰器</Font>

```
import {
	Vue,
	Component,
	Prop,
	Component,
	Emit,
	Provice,
	Inject,
	Watch,
	Model,
	Minxins,
} from 'vue-property-decorator'
```
--------

### 钩子函数

以下的`public、private`在引入tslint后是必写的，否则会有警告，如果没有引的话是可以不写的

| 			       Ts             |               Js            |     说明       |
|:----------------------------- |:---------------------------:| -------------:|
| public created() {}           | created() {}                 |   初始化 |
| public mounted() {}           | mounted() {}        |     挂载完毕 |
| private _getInitData() {}     | methods: { _getInitData() {} }   |  方法 |
| private get _userName() {} | computed: { _userName() {} } | 计算属性 |
| public destroyed() {}         | destroyed() {} |   销毁生命周期   |

--------

## 搭建环境

### 安装

安装`vue-cli`最新版

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli

//查看是否安装正确
vue --version


```
>创建项目
```
? Please pick a preset:(使用上下箭头)
 ◯ default (babel, eslint)        //默认配置
❯◉ Manually select features       //手动选择
```

```
? Check the features needed for your project:
 ◉ Babel                                    // javascript转译器
 ◉ TypeScript                               // 使用 TypeScript 书写源码
 ◯ Progressive Web App (PWA) Support        // 渐进式WEB应用
 ◉ Router                                   // 使用vue-router
 ◉ Vuex                                     // 使用vuex
 ◉ CSS Pre-processors                       // 使用css预处理器
❯◉ Linter / Formatter                       // 代码规范标准
 ◯ Unit Testing                             // 单元测试
 ◯ E2E Testing                              // e2e测试
```

是否使用class风格的组件语法：
使用前：home = new Vue()创建vue实例
使用后：class home extends Vue{}

```
? Use class-style component syntax? (Y/n) Y

// 使用Babel与TypeScript一起用于自动检测的填充
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n) Y

// 路由
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) Y

// 预处理器
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
❯◉ Sass/SCSS (with dart-sass)    // 保存后编译
 ◯ Sass/SCSS (with node-sass)    // 实时编译 
 ◯ Less
 ◯ Stylus

// 代码格式化检测
? Pick a linter / formatter config: (Use arrow keys)
 ◯ ESLint with error prevention only     // 只进行报错提醒
 ◯ ESLint + Airbnb config                // 不严谨模式
 ◯ ESLint + Standard config              // 正常模式
 ◯ ESLint + Prettier                     // 严格模式
❯◉ TSLint(deprecated)                    // typescript格式验证工具

// 代码检查方式
? Pick additional lint features: (Press <space> to select, <a>
to toggle all, <i> to invert selection)
❯◉ Lint on save             // 保存检查
 ◯ Lint and fix on commit   // commit时fix

// 文件配置
? Where do you prefer placing config for Babel, ESLint, etc.? (
Use arrow keys)
❯ In dedicated config files // 配置在独立的文件中
  In package.json
  
// 保存上述配置，保存后下一次可直接根据上述配置生成项目
? Save this as a preset for future projects? (y/N) N

// 创建成功
🎉  Successfully created project vue-typescript-admin-demo.
```
`yarn run serve`运行项目之后会报一堆莫名的错误，这都是 *tslint.json* 搞的鬼，配置一下重新运行即可
```
// tsconfig.json
Error: Calls to 'console.log' are not allowed.

Error: 去除行尾必加';'

Error: 禁止自动检测末尾行必须使用逗号，always总是检测，never从不检测，ignore忽略检测

"rules": {
    "no-console": false,
    "semicolon": [
        false,
        "always"
    ],
    "trailing-comma": [true, {
        "singleline": "never",
        "multiline": {
            "objects": "ignore",
            "arrays": "ignore",
            "functions": "never",
            "typeLiterals": "ignore"
        }
    }]
}
```
至此，整个项目算是正常运行起来了。But... 这还是传统的Vue项目，我们要开发的是Vue+ts实战项目，所以需要改造一番，详细的目录结构，等改造完之后再附上吧。

----------------

### 改造成typescript项目

按照以下的目录结构改造项目

```
.
├─ public/             # 模板文件
├─ dist/               # build 生成的生产环境下的项目
├─ src/                # 源码目录（开发都在这里进行）
│   ├─ api/            # 服务（SERVICE，统一Api管理）
│   ├─ assets/         # 静态资源文件
│   ├─ components/     # 组件
│   ├─ filters/        # 全局过滤器
│   ├─ icons/          # svg转ts格式的icon
│   ├─ lang/           # 国际化语言
│   ├─ layout/         # 架构布局
│   ├─ router/         # 路由（ROUTE）
│   ├─ store/          # 模块化状态管理vuex
│   ├─ styles/         # 公共样式
│   ├─ utils/          # 工具库
│   ├─ views/          # 视图页（pages）
│   ├─ App.vue         # 启动文件
│   ├─ main.ts         # 主入口页
│   ├─ permission.ts   # 路由鉴权
│   ├─ shims-tsx.d.ts   # 相关 tsx 模块注入
│   ├─ shims-vue.d.ts   # Vue 模块注入
│   ├─ .env.development  # 开发环境默认API属性配置
│   ├─ .env.production   # 线上环境默认API属性配置
│   ├─ babel.config.js   # babel配置
```

主要涉及 `shims-tsx.d.ts` 和 `shims-vue.d.ts` 两个文件

- `shims-tsx.d.ts` ，允许你以 `.tsx` 结尾的文件，在 `Vue` 项目中编写 `jsx` 代码
- `shims-vue.d.ts` 主要用于 `TypeScript` 识别 `.vue` 文件， `ts` 默认并不支持导入 `.vue 文件`，这个文件告诉 `ts` 导入 `.vue 文件`都按 `VueConstructor<Vue>` 处理。


#### ① 删除多余的文件

把vue-cli携带的home about文件删除，清空components文件夹的内容，把路由的指向到主入口App.vue文件，修改App.vue的内容

```
<!--App.vue-->
<template>
  <div id="app">
    <p>hello world!!!</p>
    <img alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'app'
})
export default class extends Vue {
  private created() {
    console.log(12345)
  }
}
</script>
```

第一个ts的文件就这么搞定了，接下来大刀阔斧的改造吧。

修改路由，新增`login`登录页和主骨架搭建页面、以及`dashboard首页`

路由对象都以懒加载的形式引入，并且备注`webpackChunkName`，便于查找。

根路由`/`重定向到`/dashboard`

```
const routes = [
  {
    // webpackChunkName：懒加载后的文件名
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    ...
  }
]
```

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c3e17cf9245c?w=632&h=401&f=png&s=31363)

### ② 按需引入element-ui

安装`normalize.css`初始化css
> yarn add normalize.css

安装`element-ui`最新版

按需引入

配置`babel.config.js`

```
"plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
]
```

运行后报错，需要安装`babel-plugin-component`解析
```
ERROR : Cannot find module 'babel-plugin-component' from '/Users/zeng/Desktop/hello/vue-typescript-admin-demo'
```

> yarn add babel-plugin-component --dev

在`main.ts`主入口文件里面引用`normalize.css`和`element-ui`

```
// main.ts
import 'normalize.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
```

现在去`Vue`页面里面就能随心所欲的引用`element-ui`的组件了，而且不需要在任何页面里再次`import`。

### ③ 定制主题

定制主题本想在搭建后管理后台的主骨架的时候写的，但转眼一想，要开始搭建页面UI了，到时候再回头改一遍太折腾了，so...就先来个定制主题吧

每个项目都有自己风格的主题，由于在项目中应用的是sass预处理器，定制化修改UI颜色背景，当然要结合sass来完成

```
.
├─ src/                # 源码目录（开发都在这里进行）
│   ├─ styles/
│   ├─── element-variables.scss  
│   ├─── element-variables.scss.d.ts 
   
```

```
/* Element Variables */

// Override Element UI variables
$--color-primary: #1890ff;
...

// Icon font path, required
$--font-path: '~element-ui/lib/theme-chalk/fonts';

// Apply overrided variables in Element UI
@import '~element-ui/packages/theme-chalk/src/index';

// The :export directive is the magic sauce for webpack
// https://mattferderer.com/use-sass-variables-in-typescript-and-javascript
:export {
  theme: $--color-primary;
}
```
由于这里引用到了`:export`，你没看错，确实是`:export`，具体的解释等大佬指教吧.... 官方是这么解释的 *:export directive is the magic sauce for webpack`*，充满魔法，webpack的语法糖???

在ts的规则里，你必须按照它的规范来进行每一步的开发，因此你要加上`element-variables.scss.d.ts`对应的`.d.ts`文件

```
// element-variables.scss.d.ts
export interface IScssVariables {
    theme: string
}

export const variables: IScssVariables

export default variables
```

好了，现在你可以在主入口文件里面引用定制主题的文件配置了。

```
// main.ts
import '@/styles/element-variables.scss'
```


简单的框架主题定制就这么完成了，后面会加深扩展，加一个换肤的功能，先继续下一步。定义全局的统一sass变量，方便统一规范`css颜色`

为了防止后期再次声明这个统一变量，这里暂且把之后的菜单栏的变量也加上吧

```
// variables.scss

// Base color
$blue:#324157;
...

// Sidebar
$subMenuBg:#1f2d3d;
...

// Login page
$loginBg: #2d3a4b;
...

// The :export directive is the magic sauce for webpack
// https://mattferderer.com/use-sass-variables-in-typescript-and-javascript
:export {
  menuBg: $menuBg;
}
```
同上，对应的解析文件
```
// variables.scss.d.ts
export interface IScssVariables {
    menuBg: string
}

export const variables: IScssVariables

export default variables
```

全局变量定义好了，那如何加入到项目中呢？直接在主入口文件`main.ts`里面引用是不生效的，所以这里我们要换个思路，放在`style-resources-loader`里面去引入，在整个项目的配置文件里去配置。

`style-resources-loader`是个什么鬼，搜索了个全局都没发现这个配置项，`vue-li 3.0+`的配置干干净净的，不想老版本`vue-li 2.0`，有对应的config文件夹对应各种不同的环境来做选项配置，那怎么配置`vue-li 3.0+`呢

就不卖关子了，直接上代码吧。首先我们要在根目录的同级新建一个`vue.config.js`，也就是说，对应`vue-li 2.0`版本干的事，在`vue-li 3.0`里面就需要我们自己按需配置了

新建`vue.config.js`文件

把统一的scss变量引入到插件选项卡中去，这里需要安装两个类库，否则会无法解析

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c3ef7b9dd447?w=244&h=66&f=png&s=4117)

> yarn add vue-cli-plugin-style-resources-loader
	yarn add style-resources-loader --dev   // 开发环境loader编译

```
// vue.config.js
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/styles/variables.scss'),
                path.resolve(__dirname, 'src/styles/mixins.scss')
            ]
        }
    },
}

```
除了`variables.scss`，对应还新增了一个`mixins.scss`，即全局混入的mixins混合变量。


好了，公共的sass变量就完成了，可以应用到项目中去了。

具体的全局各个样式设定可以参考`@/styles/`目录下的文件。

现在可以正式开始搭建页面了。

### Warn 警告修复


![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c409d1270955?w=627&h=109&f=png&s=78391)

在`tslint`添加如下配置

```
// tslint.json
// 不检测隐式类型
"arrow-parens": [
	false,
	"as-needed"
]
```

---------------------

## 登录页面开发

登录页面比较简洁，没有什么酷炫的样式

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c4185b9c1d9d?w=624&h=441&f=png&s=20923)

再强调一遍，开发新页面，一定要转换观念，不要把原始的写法风格引入进来，那就达不到引入`ts`的目的了

`template`模块是几乎没有变化，`script`需要加上`lang="ts"`

```
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

//类组件@Component 必写
@Component({
  name: 'login'
})
export default class extends Vue {
  private loading:bollen = false // data变量

  private get pageSize() { // 计算属性
	return 10
  }

  private created() { ... }
  
  private mounted() { ... }

  private handleLogin() { ... } // methods方法 
  

  public destroyed() {} // 销毁声明周期
}
</script>
```

登录页用了`element-ui`的`Form表单`组件。虽然`template`模板部分没有什么变化，但是js `Form表单`部分差异化还是比较大的

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c41cff7e6e7c?w=591&h=556&f=png&s=213450)

<font size=8 color=red>!!!关闭tslint</font>

这个tslint真的是让有强迫症的我没法在继续下去了，关了吧，一堆的`warn`....
```
// tslint.json
{
	"defaultSeverity": "none", // 值为warn时为警告
	"rules": {
		...
	}
}

```

世界顿时清净了~~~ 有硬需要的朋友可以自行打开，前提是一定要配置好`tslint`规则，否则还是有点痛苦不堪的，毕竟`warn`多了看着难受。告辞

回归主题。

这里要提别提一下表单校验，对，就是`el-form`的`rules`属性值，通过`Form-Item Attributes`的`prop`达到表单校验的功能

```
import { Form as ElForm } from 'element-ui'

export default class extends Vue {
	private validateMobilePhone = (
	  rule: any,
	  value: string,
	  callback: Function
	) => {
	  if (!value.trim()) {
	    callback(new Error('请输入手机号'))
	  } else {
	    callback()
	  }
	}
	
	private validatePassword = (rule: any, value: string, callback: Function) => {
	  if (value.length < 6) {
	    callback(new Error('密码长度不能小于6位'))
	  } else {
	    callback()
	  }
	}
	
	private loginRules = {
	  mobilePhone: [{ validator: this.validateMobilePhone, trigger: 'blur' }],
	  password: [{ validator: this.validatePassword, trigger: 'blur' }]
	}
	
	private handleLogin() {
	  (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
	    if (valid) {
	      ...
	    }
	  });
	}
}

```

以上即为表单登录校验，需要特别提醒的就是，登录事件是`(this.$refs.loginForm as ElForm).validate() => {}`，而非`this.$refs.loginForm.validate() => {}`，与原始有着较为明显的差异。

直接用后者的话，是会直接报错的

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c42594873e33?w=758&h=109&f=png&s=26818)

所以这里你要先引用`element-ui`的`Form`组件，然后再使用`this.$refs.loginForm as ElForm`，这样你就有`Form`组件的`validate`方法了，自此登录页表单校验就搭建完成了

接下来是`api`请求

## axios api

本项目使用`axios api`请求工具库

> yarn add axios

封装`api`工具库

```
/**
    src->untils->request.ts
**/
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add Authorization header to every request, you can add other custom headers here
    config.headers['Authorization'] = 'token信息配置'
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    拦截操作...
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
```

总的来说，跟原始版本的工具库封装没什么明显差异，主要就是配置一下几个点
- 响应超时时间`timeout`
- `api`公共请求头`baseURL`
- 请求拦截`Request interceptors`
- 响应拦截`Response interceptors`
- `config.headers` `token`权限配置

具体的api工具类可以参考源码

这里有个`process.env.VUE_APP_BASE_API`变量值，你可以直接在当前的工具类根据环境配置，也可以根据`vue-cli 3.0`内置的文件配置，第二种方案在根目录下

```
.
├─ src/   
├─ .env.development   // 开发环境配置
├─ .env.production    // 线上环境配置   
...
```
`VUE_APP_BASE_API`  变量名为固定命名，无法修改
```
// .env.development
VUE_APP_BASE_API = '192.168.1.1:8090'   

// .env.production
VUE_APP_BASE_API = 'https://www.baidu.con' 
```
<font color=red>注意:</font>

在这里配置好`VUE_APP_BASE_API`，前提是服务端已经做好跨域处理，如果服务端接口没有做跨域处理，那这里配置api的请求头就无效了。你可以在`vue.config.js`里面配置跨域代理属性，本项目接口已做跨域处理，所以这里注释了，需要可以自行打开

```
const mockServerPort = 8090

module.exports = {
  devServer: {
    proxy: {
        [process.env.VUE_APP_BASE_API]: {
            target: `http://localhost:${mockServerPort}/mock-api/v1`,
            changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            // ws: true,// proxy websockets
            pathRewrite: { // pathRewrite方法重写url
                ['^' + process.env.VUE_APP_BASE_API]: ''
            }
        }
    }
  }
}
```

配置好请求头后，后面所有的接口调用都是

> `url = VUE_APP_BASE_API + url`

好了，接下来按照顺序应该安利一下使用，为了体验性和可维护性更友好点，`api`接口模块会分页面定义

```
.
├─ src/                # 源码目录
│   ├─ api/
│   ├─── pageA.ts  
│   ├─── pageB.ts
...
```
定义`api`接口
```
import request from '@/utils/request'

export const login = (data: any) =>
    request({
        url: '/api/login',
        method: 'post',
        data
    })
```

`api`工具类封装完成，在开始使用之前，先了解一波`vuex+ts`版的状态管理吧，因为调用`login`接口成功后会存储用户和`token`信息，会用到状态管理

--------------------

## 状态管理Vuex

传统的vuex在vue+ts的项目里面是行不通的，`vue 2.0`版本对ts的兼容性本身并不是特别友好，所以要达到状态管理的效果，这里要额外引用一个类库`vuex-module-decorators`，它是基于`vue-class-component` 所做的拓展，它提供了一系列的装饰器，让`vue+ts`结合的项目达到状态管理的作用。

`vue-class-component` 主要提供了以下的装饰器，接下来让我们一一的了解一遍吧

> import { VuexModule, Module, Action, Mutation, getModule, State } from 'vuex-module-decorators'

先来看看要完成的模块化管理的目录结构

```
.
├─ src/        
│   ├─ store/
│   ├─── modules/
│   │ 		├─ app.ts 
│   │ 		├─ user.ts
│   ├─── index.ts   
```

动手改造`index.ts`

```
import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'

Vue.use(Vuex)

export interface IRootState {
    app: IAppState
    user: IUserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
```
等同于

```
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  }
})

export default store
```

这样，模块化状态管理的雏形就完成了。对比来看，只是语法风格的变化，其它的变化不大。`ts`版的状态管理最大的改变体现在各个功能功能函数上


先看一看原始的vuex配置，轻车熟路

```
export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
});
```
为了显得不那么啰嗦，直接上版`ts`版的状态管理吧，可以有个直观的对比

```
// user.ts
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IUserState {
    id_token: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public id_token = ''
    
    @Mutation
    private SET_TOKEN(token: string) {
        this.id_token = token
    }
    
    @Action
    public async Login(params: any) {
        this.SET_TOKEN(`token!!!`)
    }
}

export const UserModule = getModule(User)

```

解析：

我们看到了一堆的`@`开头的装饰器函数`@Mutation` `@Mutation` `@Module`...

先来一张表格对比一下差异化吧

| 	  	  Ts  	    |     Js      |
|:-----------------:|:-----------:|
| public State 		| state       |
| @Mutations        | mutations   |
| @Action           | action      |
| get     			| getters 	  |

### 定义module

定义一个`modules`，直接使用装饰器`@Module`

<font color=red>注意：</font>原始的vuex同样有一个名为`Module`的类，但它不是一个装饰器，所以别用混淆了

> @Module({ dynamic: true, store, name: 'user' })

从上面可以看到，我们定义`modules`不单单用了装饰器，还带了参数值，这个是表明是通过命名空间的形式来使用`module`，如上，这里的`namespaced`值即为`user`

详细`vuex命名空间`的说明，可以参考[vuex命名空间](https://vuex.vuejs.org/zh/guide/modules.html)

除了`namespaced`，我们看到还有另外一个参数值`store`，它即为主入口页对应的整个vuex模块的`store`

> import store from '@/store'

如果去掉它的话，浏览器会报以下错误

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c42da8b2ea71?w=1212&h=169&f=png&s=64515)

### state

这里所有的state属性因为加了`tslint`都会添加上`public`修饰，其它的用法都是相似的

### Getters

原始的`getters`计算函数，在这里对应的即使`get`方法，即

```
@Module
export default class UserModule extends VuexModule {
  countsNum = 2020
  
  get calculatCount() {
    return countsNum / 2
  }
}
```

等同于

```
export default {
  state: {
    countsNum: 2
  },
  getters: {
    calculatCount: (state) => state.countsNum / 2
  }
}
```
### Mutations

```
@Mutation
private SET_TOKEN(token: string) {
    this.token = token
}

@Mutation
...
```

等同于

```
mutations: {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    ...
}
```

说明：

- 两者的区别其实就是语法糖，原始的`Mutation`同步方法都是定义在`mutations`内，而`ts`版的每一个`Mutation`都要加上装饰器`@Mutation`修饰

<font color=red>注意：</font>
一旦使用`@Mutation装饰`某一函数后, 函数内的`this上下文`即指向当前的`state`，所以想引用`state`的值，可以直接`this.token`访问即可。

`Muation函数`不可为`async函数`, 也不能使用`箭头函数`来定义, 因为在代码需要在运行重新绑定执行的上下文

### Action

```
@Action
public async Login(userInfo: { username: string, password: string}) {
    ...
    this.SET_TOKEN(data.accessToken)
}
```

等同于

```
actions: {
    async Login({ commit }, data) {
        ...
        commit('SET_TOKEN', data.accessToken)
    }
}
```
说明：

异步函数`Action`和同步函数`Mutation`使用方法大同小异，区别就是一个是同步，一个是异步，只要做好区分即可

<font color=red>注意：</font>

- 如果需要在action函数中运行耗时很长的任务/函数, 建议将该任务定义为异步函数*（async methods）*
- 千万不要使用箭头函数`=>`来定义action函数, 因为在运行时需要动态绑定`this`上下文

`vuex+ts`版的配置搭建成功，接下来我们把它运用到项目中来吧，这里抽一个登陆页面的模块做介绍

```
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { login } from '@/api/users' //调用api方法
import store from '@/store'

//声明user模块的state变量类型
//export interface 只是对一个东西的声明（不能具体的操作）
//export class 导出一个类 类里面可有参数 ，函数，方法（干一些具体的事情）
export interface IUserState {
  id_token: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public id_token = ''

  @Mutation
  private SET_TOKEN(token: string) {
    //同步存储id_token变量
    this.id_token = token
  }

  @Action
  public async Login(params: any) {
    let { mobilePhone, password } = params
    const { data } = await login({ mobilePhone, password })
    this.SET_TOKEN(`Bearer ${data.id_token}`)
  }
}

export const UserModule = getModule(User)
```

在login页面中调用

```
import { UserModule } from '@/store/modules/user'

await UserModule.Login({
  ...this.loginForm,
  router: this.$router
})
```

把路由对象作为参数传过去是为了根据不同的响应状态做判断，当请求成功后，可以直接应用传过来的路由对象参数跳转页面。

> `router.push('/')`

<font color=red>注意：</font>

这一步操作其实是调用了vuex的Action操作，即原始的`this.$store.commit('action')`，但是在`vuex+ts`项目中，调用异步函数`Action`，不需要再用`this.$store.commit('action')`这种方法，引用模块后，直接调用里面的`Action`方法就好了，同样的，同步的`Mutation`也是这样调用。这些都要归功于`vuex-module-decorators`类库的封装

好了，调用`Action`后粗发`Mutation`同步操作，保存好`token`令牌，因为登录之后所有的请求都要把`token`值放在`header`头中发起请求

除了`vuex`状态管理，在项目中可能我们还会结合工具类`js-cookie`一起使用，管理各种变量的值，具体用法跟原始版没有什么区别，最主要的是安装类库的过程中，还得安装一个开发`ts`编译版

> yarn add js-cookie     // dependencies
> yarn add @types/js-cookie --dev // devDependencies(必装)

登录页面至此就完成了，它会直接重定向到首页。接下来让我们来搭建项目的的骨架导航菜单

## layout 导航菜单

这里其实没太多可介绍的，直接用`element-ui`的`NavMenu 导航菜单`组件即可


Error:

> Cannot find module '@/assets/401-images/401.gif'

解决：
加上模块定义

```
//shims-vue.d.ts

declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
```
Error:

> 在.vue文件里 "import path from 'path' ’" 报错 Cannot find module 'path'

解决：
在tsconfig.json的type项添加"node"即可。

```
"types": [
  "node",
]
```

Error:
> SassError: expected selector

解决：
> yarn add node-sass --dev

如果安装了`node-sass`之后还有报错，那有可能是你的`sass`类库安装错误，检查下`package.json`中是否在`devDependencies`开发依赖中安装了`sass`，如果有的话`yarn remove sass`即可，留一个`sass-loader`就好了

Error:
在使用`path-to-regexp`中出现如下错误警告

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c432c41d5410?w=591&h=110&f=png&s=12004)

解决：

主要是 import 使用的问题：在引入path-to-regexp时应使用以下的方法
> import * as pathToRegexp from 'path-to-regexp'

### layout 步骤：

#### 定义菜单路由结构

```
export const constantRoutes: RouteConfig[] = [
]

export const asyncRoutes: RouteConfig[] = [
]

const createRouter = () =>
  new Router({
    // scrollBehavior功能只在 HTML5 history 模式下可用，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样
    // mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        // 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  })

const router = createRouter()

export default router
```

这里有两个路由数组对象`asyncRoutes`，`constantRoutes`，字面量理解意思就行了

### 路由守卫

为了让项目体验性更友好，当然要增加路由守卫功能，与此同时，会添加一个路由进度条`nprogress`类库

> yarn add nprogress
> yarn add @types/nprogress --save

```
// @/src/permission.ts

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
```

当然，要在主入口文件引入这个路由守卫文件

> `import '@/permission'`  // main.ts

在这个路由守卫工具类中可以通过角色控制来限制菜单栏的路由地址，各种不同的角色配置不同的路由

接下来构建骨架，比较中规中矩

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c437a2fc5770?w=834&h=510&f=png&s=17297)

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c43bb9e26527?w=1350&h=510&f=png&s=28388)

### 404 错误路径

该有的功能还是得有的，体验性要友好。具体的就不细讲了，可以参照源码，在这里，你可以随心所欲的搭建你想要的UI风格。

### 路由Icon配置

本项目中的Icon，都是`svg`类型的矢量图标经过`vue-svgicon`类库转化成的组件，用法较为灵活，方便

1、安装依赖
> yarn add vue-svgicon

2、配置svg图标目录路径（任意目录）和输出路径

```
// package.json

"scripts": {
    ...
    "svg": "vsvg -s ./src/icons/svg -t ./src/icons/components --ext ts --es6"
}
```

3、在主入口`main.ts`中引入`svgIcon`组件，并且全局注册

```
// main.ts

import SvgIcon from 'vue-svgicon'

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})
```

4、执行命令，生成Icon 组件引用
> yarn run svg

5、使用参考[SvgIcon](https://github.com/MMF-FE/vue-svgicon)

好了，至此，`vue+ts`的整个模板后台就搭建好了。因为每个人的业务需求肯定不一样，所以到这里算是一个比较干净的模板框架了。

当然，你以为到这里就结束了吗，当然不是，肯定要多几个功能，不然，辛辛苦苦玩一次`ts`项目，肯定要玩得尽兴一点

言归正传。

## 国际化

国际化对于大厂或者某些有国际化业务的公司来说，是必不可少的，那我们就先扩展个国际化的功能玩玩吧。

1、首先，安装`vue-i18n`库

> yarn add vue-i18n

2、定制国际化语言包，这里暂且就只搞中英两种语言，其它都是共通的

值得注意的是，所谓的国际化语言包，在前端部分，你只能体现在一些固定的位置，比如菜单栏的页面名称，表单的label值，`placeholder`属性值...即所有非服务端响应的数据，因为服务端响应的数据是不固定的，你是没法做成语言包翻译成对应语言的。所以，真正的国际化项目，应该是前后端协调好，当切换到对应语言后，传值对应的国际化参数值，然后服务端同时也配置国际化的数据响应，从而达到整个项目的国际化

```
├─ src/                # 源码目录
│   ├─ lang/
│   ├─── en.ts  
│   ├─── zh.ts
│   ├─── index.ts
...
```

英文版

```
// en.ts

export default {
    route: {
        dashboard: 'Dashboard',
        commonTable: 'Common Table',
        helpCenter: 'Help Center',
        salary: 'Salary',
        firstStep: 'First Step',
        secondStep: 'Second Step',
        sendRecord: 'Send Record'
    },
    login: {
        mobilePhone: 'Please enter your mobile number',
        password: 'Please enter your Password',
        btn: 'login'
    }
}
```
中文版

```
export default {
    route: {
        dashboard: '首页',
        commonTable: '表格',
        helpCenter: '帮助中心',
        salary: '工资条',
        firstStep: '第一步',
        secondStep: '第二步',
        sendRecord: '发送记录'
    },
    login: {
        mobilePhone: '请输入手机号码',
        password: '请输入密码',
        btn: '登录'
    }
}
```
总的来说，就是取他们所表达意义的label值做成可配置化的对象

3、综合国际化语言包

```
import Vue from 'vue'
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'

// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const getLanguage = () => Cookies.get('language')

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    ... // 这里如果有其它语言包继续按照规则添加即可
}

export const getLocale = () => {
    const cookieLanguage = getLanguage()
    if (cookieLanguage) {
        return cookieLanguage
    }

    const language = navigator.language.toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }

    // Default language is english
    return 'en'
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages
})

export default i18n
```
4、主入口`main.ts`注入

```
import i18n from '@/lang'
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})

new Vue({
  ...
  i18n,
}).$mount('#app')
```

<font color=red>注意：</font>

`Vue.use`里面的`i18n`只是`element-ui`的框架属性配置，真正全局化的国际化配置，一定要跟路由和状态管理一样注入到`new Vue()`中

国际化到这里就配置完成了，那怎么使用呢

5、国际化配置应用

① 登录页应用

登录页就一个表单，手机号和密码，在这个页面中的国际化就是对他们的`label`和`placeholder`属性名的值做配置

```
<template>
    <div class="login-container">
        <lang-select />
           <el-form>
	           <!--手机号-->
               <el-form-item>
                   <el-input :placeholder="$t('login.mobilePhone')"
                   >
                   </el-input>
               </el-form-item>
               <!--密码-->
               <el-form-item>
                   <el-input :placeholder="$t('login.password')"
                   >
                   </el-input>
               </el-form-item>
               <footer>
                   <el-button>
                    {{ $t('login.btn') }}
                   </el-button>
               </footer>
           </el-form>
    </div>
</template>

<script lang="ts">
import LangSelect from '@/components/LangSelect/index.vue'

@Component({
    name: 'login',
    components: {
        LangSelect
    }
})
export default class extends Vue {}

</script>

```

<font color=red>语法糖：</font>
具体国际化语言切换，就是通过这种变量值取值方式根据之前的国际化语言包取值的`$t('...')`

当然，这里还有个语言切换工具，之前所有的配置都是怎么取值，那这个语言切换工具呢就是设值语言值得工具，即上面`components`中的`LangSelect`

```
@Component
export default class extends Vue {
    get language() { // 把language语言值存进vuex，这里是取值
        return AppModule.language
    }

    private handleSetLanguage(lang: string) {
        this.$i18n.locale = lang
        AppModule.SetLanguage(lang)
        this.$message({
            message: 'Switch Language Success',
            type: 'success'
        })
    }
}
```
切换后报以下错误

![](https://user-gold-cdn.xitu.io/2020/1/13/16f9c440cc28a44c?w=1517&h=42&f=png&s=16358)

<font color=red>解决：</font>
```
// src/shims-vue.d.ts

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}
```

### 扩展内容

### 换肤

换肤和前面的定制主题还是有区别的，概念的话就不做过多介绍了，可以自行体会

这里就不细说了，可以查看`@/components/ThemePicker`，更换的所有主题色在`@/styles/element-variables.scss`配置

### 轮播图和echarts

安装依赖

> yarn add echarts
> yarn add @types/echarts --dev

轮播图和echarts都在首页`Dashboard`页面里，可以自行参考

### 表格分页、搜索

此外，还新加了一个表格分页和搜索的页面供参考

详细请参考表格所在的路由页面

这里，为了体验性友好，表格的分页切换引进了一个滚动到最顶端的小动画

### 登录背景动效图

到这里差不多这个项目就要结束了，整个的项目架构来说，越轻量级越好，所以就不做太多扩展了，尽量开箱即用

在此，为了登录页不显得那么寒碜，还是给加个动效吧

好了，大功告成。撒花撒花~~~

分享不易，喜欢的话一定别忘了点<font color=red size=12>💖！！！</font>

只关注不点<font color=red size=12>💖</font>的都是`耍流氓`，只收藏也不点<font color=red size=12>💖</font>的也一样是`耍流氓`。

结束<font color=red size=12>👍👍👍</font>。

## 源码

[vue-typescript-admin-element-ui](https://github.com/zengxiaozeng/vue-typescript-admin-element-ui)       `typescript+vue`实战

[uni-app 小程序](https://juejin.im/post/5dcb77e9f265da4d260447c8)  uni-app小程序手把手项目实战

[React+antd+Redux-saga实战](手把手带你搭建React16+Router+Redux-saga+Antd后台管理系统)     手把手带你搭建React16+Router+Redux-saga+Antd后台管理系统

## 参考

[vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)











































































