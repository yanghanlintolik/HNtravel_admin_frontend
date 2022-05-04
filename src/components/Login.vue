<template>
	<div class="login_container">
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="avatar_box">
				<img src="../assets/img/logo.png" alt="头像框">
			</div>
			<!-- 登录表单区域 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
			
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				
				<el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-edit"></el-input>
				</el-form-item>
				
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="water-group">
			<div class="water water1" ></div>
			<div class="water water2" ></div>
			<div class="water water3" ></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editableTabsValue: 'scenic_admin',		
				//登录表单的数据绑定
				loginForm: {
					username: '',
					password: '',
				},
				// 表单验证规则
				loginFormRules: {
					username: [{
						required: true,
						message: '请输入登录名称',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],
				},
				responseResult: [],
			}
		},
		methods: {
			// 点击重置
			resetLoginForm() {
				this.$refs.loginFormRef.resetFields();
			},
			login() {
				this.$refs.loginFormRef.validate(async (valid) => {
					// 预验证不通过则返回,不发起请求
					if (!valid) return;
					// 预验证通过再发起请求
					this.$axios.post('/administrator_login2', {
							username: this.loginForm.username,
							password: this.loginForm.password
						})
						.then(successResponse => {
							if (successResponse.data.code === 200) {
								console.log(successResponse)
								this.$message.success('登录成功');
								this.$store.commit("set_token",successResponse.data.token)		 //保存token		
								this.$router.replace({   //跳转页面
									path: '/home'
								})
							} else this.$message.error('登录失败');
						})
						.catch(failResponse => {})

				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_box {
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;

		// less语法嵌套
		.avatar_box {
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}

	.login-form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		// 把边框的值归入盒子内部，不占据文档流的宽度或者高度
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: flex-end;
	}

	.water-group {
		position: relative;
		top: 100%;
		transform: translateY(-100%);
		z-index: 1;
		height: 110px;
		width: 100%;
		overflow: hidden;
	}

	.water-group .water {
		position: absolute;
		width: 200%;
		height: 100%;
		background-size: 50% 100%;
		background-image: url(../assets/img/wave.png);
	}

	.water-group .water1 {
		top: 20px;
		left: -100%;
		opacity: 0.2;
		animation: water-right 20s infinite linear;
	}

	.water-group .water2 {
		top: 30px;
		left: 0;
		opacity: 0.3;
		animation: water-left 30s infinite linear;
	}

	.water-group .water3 {
		top: 45px;
		left: -100%;
		animation: water-right 40s infinite linear;
	}

	@keyframes water-right {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1)
		}

		50% {
			transform: translateX(25%) translateZ(0) scaleY(0.85)
		}

		100% {
			transform: translateX(50%) translateZ(0) scaleY(1)
		}
	}

	@keyframes water-left {
		from {
			transform: translate(0%, 0px);
		}

		to {
			transform: translate(-50%, 0px);
		}
	}
</style>
