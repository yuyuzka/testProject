import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import sign from '../components/sign.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users.vue'

Vue.use(VueRouter)

  const routes = [
  {
	  //地址的重定向，表示若用户访问的目录为/,则重定向到/login
	path:'/',  redirect:'/login'
  },
  {
	  path:'/login',
	  name:'login',
	  component:login
  },
  {
	  path:'/sign',
	  name:'sign',
	  component:sign
  },
  {
  	  path:'/home',
  	  name:'home',
  	  component:home,
	  redirect:'/welcome',
	  children:[
		  {
			  path:'/welcome',
			  name:'welcome',
			  component:welcome
		  },
		  {
		  	 path:'/users',
		  	 name:'user',
		  	 component:users
		  }
	  ]
  }
]

const router = new VueRouter({
  routes
})
//路由守卫函数
//当没有登录时，访问其它vue跳转到login
router.beforeEach((to,from,next)=>{
	//to表示将要访问的路径
	//from代表从哪个路径跳转而来
	//next表示是一个函数，表示放行
	//next()表示直接放行， next("/login")强制跳转到/login
	if(to.path=='/login') return next();
	const tokenstr=window.sessionStorage.getItem("token");
	if(!tokenstr) return next('/login');
	next();
})

export default router
