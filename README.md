# Vocaverse

## 项目搭建

- **本项目采用 Vite + Vue3 + TypeScript**
    对于其未安装的依赖，使用 pnpm 进行安装，此文不赘述。

    ```shell
    pnpm create vite@latest
    ```

## TailwindCSS 配置

1. 安装依赖

    ```shell
    pnpm i -D tailwindcss postcss autoprefixer
    ```

2. 配置 taiwind.config.ts

    ```TypeScript
     import type { Config } from 'tailwindcss';

     const config: Config = {
         content: [
             "./index.html",
             "./src/**/*.{vue,js,ts,jsx,tsx}",
         ],
         theme: {
             extend: {},
         },
         plugins: [],
         mode:'jit',// 启用jit模式 更快的编译速度 更好的开发体验
     }

     export default config;
    ```

3. 配置 postcss.config.ts

    ```TypeScript
    import tailwindcss from 'tailwindcss';
    import autoprefixer from 'autoprefixer';
    import { Plugin } from 'postcss';

    const config: { plugins: Plugin[] } = {
        plugins: [tailwindcss(), autoprefixer()],
    };

    export default config;
    ```

4. 配置 tailwind.css

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

5. 配置 main.ts

    ```TypeScript
    import { createApp } from 'vue'
    import './style.css'
    import './tailwind.css' // 引入 tailwind
    import App from './App.vue'

    const app = createApp(App);
    app.mount('#app');
    ```

6. 测试配置

    ```html
    <template>
     <div class="text-center p-6 bg-blue-500 text-white">
      <p class="text-5xl font-bold">Hello, Tailwind CSS with Vue!</p>
     </div>
    </template>
    ```

## PrimeVue UI 组件库配置

1. 安装依赖

    ```shell
    pnpm add primevue primeicons # 安装 UI icon
    pnpm add @primevue/themes
    pnpm i unplugin-vue-components -D # 安装组件自动引入依赖
    pnpm i @primevue/auto-import-resolver -D # 安装组件自动引入依赖
    ```

2. 配置 vite.config.ts

    ```TypeScript
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import postcssConfig from './postcss.config.ts';
    import Components from 'unplugin-vue-components/vite';
    import { PrimeVueResolver } from '@primevue/auto-import-resolver';
    // https://vitejs.dev/config/
    export default defineConfig({
        css: {
            postcss: postcssConfig,
        },
        plugins: [
            vue(),
            Components({
                resolvers: [PrimeVueResolver()],
            }),
        ],
    });
    ```

3. 配置 main.ts

    ```TypeScript
    import { createApp } from 'vue';
    import './style.css';
    import './tailwind.css'; // 引入 tailwind
    import PrimeVue from 'primevue/config';
    import Aura from '@primevue/themes/aura';
    import 'primeicons/primeicons.css'; // 图标样式
    import App from './App.vue';

    const app = createApp(App);
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: false,
            },
        },
    });
    app.mount('#app');
    ```

4. 测试配置

    ```HTML
    <template>
        <div class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label for="integeronly" class="font-bold block mb-2"> Integer Only </label>
                <InputNumber v-model="value1" inputId="integeronly" fluid />
            </div>
            <div class="flex-auto">
                <label for="withoutgrouping" class="font-bold block mb-2"> Without Grouping </label>
                <InputNumber v-model="value2" inputId="withoutgrouping" :useGrouping="false" fluid />
            </div>
            <div class="flex-auto">
                <label for="minmaxfraction" class="font-bold block mb-2"> Min-Max Fraction Digits </label>
                <InputNumber v-model="value3" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid />
            </div>
            <div class="flex-auto">
                <label for="minmax" class="font-bold block mb-2"> Min-Max Boundaries </label>
                <InputNumber v-model="value4" inputId="minmax" :min="0" :max="100" fluid />
            </div>
        </div>
    </template>

    <script setup>
    import { ref } from 'vue';

    const value1 = ref(42723);
    const value2 = ref(58151);
    const value3 = ref(2351.35);
    const value4 = ref(50);
    </script>
    ```

## Router 配置

1. 安装 Vue Router

    ```shell
    pnpm i vue-router@4
    ```

2. 配置 .env

    ```env
    # .env 文件
    VITE_API_URL=https://api.example.com
    ```

3. 配置 router.ts

    ```TypeScript
    import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
    import Home from '../views/Home.vue';
    import About from '../views/About.vue';

    // 定义路由规则
    const routes: Array<RouteRecordRaw> = [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/about',
            name: 'About',
            component: About,
        },
    ];

    // 创建路由实例并传递 `routes` 配置
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 的历史记录模式
        routes,
    });

    export default router;
    ```

4. 修改 App.vue

    ```html
    <template>
     <div>
      <RouterView />
     </div>
    </template>
    ```

## Pinia 配置

1. 安装 Pinia

    ```shell
    pnpm i pinia
    ```

2. 配置 main.ts

    ```TypeScript
     import { createApp } from 'vue';
     import './style.css';
     import './tailwind.css'; // 引入 tailwind
     import PrimeVue from 'primevue/config';
     import Aura from '@primevue/themes/aura';
     import 'primeicons/primeicons.css'; // 图标样式
     import App from './App.vue';
     import router from './router/router';
     import { createPinia } from 'pinia';

     const app = createApp(App);
     const pinia = createPinia();
     const primeVueConf = {
         theme: {
             preset: Aura,
             options: {
                 prefix: 'p',
                 darkModeSelector: 'system',
                 cssLayer: false,
             },
         },
     };

     app.use(router); // 挂载路由
     app.use(pinia);

     app.use(PrimeVue,primeVueConf);
     app.mount('#app');

    ```

### 项目开发可能遇到的 bug / warning

#### 无法找到模块 “ _.vue ” 的声明文件。“_.vue ” 隐式拥有 " any " 类型

1. 在项目中添加类型声明：在 src 目录下的任意位置创建一个类型声明文件，例如 vue-shims.d.ts。
2. 确保 tsconfig.json 中包含正确的文件类型
   在 tsconfig.json 文件中，确保 include 字段包含了所有可能的 .ts 和 .vue 文件：

```typescript
// src/vue-shims.d.ts
declare module '*.vue' {
 import { DefineComponent } from 'vue';
 const component: DefineComponent<{}, {}, any>;
 export default component;
}
```

```json
{
 "files": [],
 "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
 "include": ["src/**/*.ts", "src/**/*.vue", "src/vue-shims.d.ts"]
}
```
