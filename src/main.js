import Vue from 'vue';
//import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
//需要加./
import './assets/fonts/iconfont.css';
//import './plugins/element.js'

import axios from 'axios';
import { Button,Input,Form,FormItem,Message,Container,Header,Main,Aside,Menu,Submenu,MenuItem,MenuItemGroup} from 'element-ui'

//须写在前面
Vue.config.productionTip = false


//请求根路径URL需要都大写
axios.defaults.baseURL="https://www.liulongbin.top:8888/api/private/v1/";
//配置拦截器
axios.interceptors.request.use(config=>{
	//为headers添加一个authorization属性
	config.headers.Authorization=window.sessionStorage.getItem('token');
	return config
})
//其余组件可使用this.$http
Vue.prototype.$http=axios;

//Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.prototype.$message=Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

