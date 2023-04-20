import { createSSRApp } from "vue";
import App from "./App.vue";
import uViewXL from "./uview-xl";
import { registerStore } from "./store";
import vuexStore from "./store/$u.mixin.js";
// 引入uView对小程序分享的mixin封装
import mpShare from "./uview-xl/libs/mixin/mpShare.js";
// i18n部分的配置
// 引入语言包，注意路径
import Chinese from "./common/locales/zh.js";
import English from "./common/locales/en.js";
// VueI18n
import { createI18n } from "vue-i18n";
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from "./common/http.interceptor.js";

const i18n = createI18n({
  // 默认语言
  locale: "zh",
  // 引入语言文件
  messages: {
    zh: Chinese,
    en: English,
  },
});
export function createApp() {
  const app = createSSRApp(App);
  app.use(uViewXL);
  registerStore(app);
  app.mixin(vuexStore);
  app.mixin(mpShare);
  app.use(i18n);
  app.use(httpInterceptor);
  return {
    app,
  };
}
