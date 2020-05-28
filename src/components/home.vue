<template>

	<el-container class="home-container">
	  <el-header>
		  <div>
			  <img src="../assets/heima.png"/>
			  <span>电商管理系统</span>
		  </div>
		  <el-button type="info" @click="exit">退出</el-button>
	 </el-header>
	  <el-container>
		 <!-- 侧边栏 -->
	    <el-aside :width="isCollapse?'64px':'200px'">
			<div class="toggle-button" @click="toggleMenu">|||</div>
			<el-menu background-color="#002025" :collapse-transition="false" text-color="#fff" 
			active-text-color="#6a89cc" :unique-opened="true" :collapse="isCollapse" router
			:default-active="$route.path">
				<!-- 一级菜单   index需为整数 -->
			      <el-submenu :index="item.id+''" v-for="item in MenuList" :key="item.id">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>{{item.authName}}</span>
			        </template>
					<!-- 二级菜单 -->
			          <el-menu-item :index="'/'+subItems.path" v-for="subItems in item.children" :key="subItems.id">
						  <i class="el-icon-location"></i>
						  <span>{{subItems.authName}}</span>						  
					  </el-menu-item>
			      </el-submenu>
			      
			    </el-menu>
		</el-aside>
		<!-- main -->
	    <el-main>
			<!-- 路由占位符 -->
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	export default{
		data(){
			return{
				MenuList:[],
				isCollapse:false
			}
		},
		methods:{
			//退出登录
			exit(){
				//清空sessionStorage
				window.sessionStorage.clear();
				//跳转到登录
				this.$router.push("/login")
			},
			async getMemuList(){
				const { data:res } = await this.$http.get('menus')
				if(res.meta.status!=200) return this.$message.error(res.meta.message)
				this.MenuList=res.data
				console.log(res.data)
			},
			toggleMenu(){
				this.isCollapse=!this.isCollapse;
			}
		},
		created() {
			this.getMemuList()
		}
	}
</script>

<style lang="less" scoped="scoped">
	.home-container{
		height: 100%;
	}
	.el-header{
		background-color: #222;
		/* 左右贴边对齐 */
		display: flex;
		justify-content: space-between;
		/* 使item上下居中 */
		align-items: center;
		padding-left: 0;
		color: #FFF;
		font-size: 20px;
		>div{
				display: flex;
				align-items: center;
				span{
					margin-left: 0.9375rem;
				}
			}
	}
	
	.el-aside{
		background-color: #002025;
		.toggle-button{
			// 鼠标变小手
			cursor: pointer;
			text-align: center;
			font-size: 20px;
			color: #FFF;
			background-color: #006085;
			letter-spacing: 0.2rem;
		}
		.el-menu{
			border-right: none;
			
		}
	}
	.el-main{
		background-color: #f4f4f4;
	}
</style>
