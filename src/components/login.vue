<template>
	<div class="login_container">
		登录组件
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px">
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" prefix-icon="iconfont icon-canyin"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-mima"></el-input>
			</el-form-item>
			<el-button type="primary" round @click="login">提交</el-button>
			<el-button type="info" round @click="resetLoginForm">重置</el-button>
		</el-form>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				loginForm:{
					username:"",
					password:""
				},
				loginFormRules:{
					username:[
						{required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password:[
						 {required: true, message: '请输入密码', trigger: 'change' }
					]
				}
			}
		},
		methods:{
			resetLoginForm(){//重置表单
				this.$refs.loginFormRef.resetFields();
			},
			login(){
				//表单预验证
				this.$refs.loginFormRef.validate(async valid=>{
					if(!valid) return;
				const {data : res} =await this.$http.post("/login",this.loginForm);
				if(res.meta.status!=200)
					this.$message.error("登录失败");
				else{
					//使用elementui消息弹框，此时为全局注册
					this.$message.success("登录成功");
					//保证除了登录接口以外，都需登录后才能访问
					window.sessionStorage.setItem("token",res.data.token);
					//进入其它组件，路由时/home
					this.$router.push("/home");
				}
				})
			}
		}
	}
</script>

<style lang="css" scoped="scoped">
	.login_container{
		text-align: center;
		width: 300px;
		height: 300px;
		/* 居中 */
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
