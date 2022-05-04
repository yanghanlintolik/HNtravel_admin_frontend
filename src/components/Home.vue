<template>
	<!-- 无需主div -->
	<el-container class="home-container">
		<!-- 头部区域 -->
		<el-header>
			<div>
				<img src="../assets/img/logo.png" alt="Logo图" class="logo-img">
				<span>智慧海南旅游景点管理系统</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<!-- 页面主体区域 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="'200px'" >
				<!-- 侧边栏菜单区域 -->
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
				 text-color="#fff" active-text-color="#409eff" :router="true" >
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-s-data"></i>
							<span>景区概览</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="introduce"><i class="el-icon-caret-right"></i>景点首页</el-menu-item>
							<el-menu-item index="data"><i class="el-icon-caret-right"></i>实时数据</el-menu-item>
							<el-menu-item index="forecast_data"><i class="el-icon-caret-right"></i>预测数据</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-user"></i>
							<span>游客数据</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="user"><i class="el-icon-caret-right"></i>游客信息</el-menu-item>
							<el-menu-item index="ticket"><i class="el-icon-caret-right"></i>票务信息</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-service"></i>
							<span>景区通知</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="releaseNotice"><i class="el-icon-caret-right"></i>发布通知</el-menu-item>
							<el-menu-item index="notice"><i class="el-icon-caret-right"></i>历史通知</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-mobile-phone"></i>
							<span>景区广播</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="releaseBroadcast"><i class="el-icon-caret-right"></i>发布广播</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-key"></i>
							<span>景区热力</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="heatMap"><i class="el-icon-caret-right"></i>实时热力图</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title">
							<i class="el-icon-discover"></i>
							<span>景点路线</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="router"><i class="el-icon-caret-right"></i>路线管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 右侧内容主体 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				// 被激活的链接地址
				activePath: ''
			}
		},
		created() {
		},
		methods: {
			logout() {
				window.sessionStorage.clear()
				this.$store.commit("del_token")
				this.$router.push('/login')
			},
			// 获取所有的菜单
			async getMenuList() {
				const {
					data: res
				} = await this.$http.get('menus')
				if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
				this.menulist = res.data
				console.log(res)
			},
			// 保存链接的激活状态
			saveNavState(activePath) {
				window.sessionStorage.setItem('activePath', activePath)
				this.activePath = activePath
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		}
	}
</script>

<style lang="less" scoped>
	.home-container {
		height: 100%;
	}

	.logo-img {
		width: 40px;
		border-radius: 50%;
		background-color: #eee;
		margin-left: 10px;
		box-shadow: 0 0 10px #ddd;
	}

	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;

		>div {
			display: flex;
			align-items: center;

			span {
				margin-left: 15px;
			}
		}
	}

	.el-aside {
		background-color: #333744;

		.el-menu {
			border-right: none;
		}
	}

	.el-main {
		background-color: #eaedf1;
	}

	.iconfont {
		margin-right: 10px;
	}

	.toggle-button {
		background-color: #4a5064;
		font-size: 10px;
		line-height: 24px;
		color: #fff;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
	
	
</style>
