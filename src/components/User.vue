<template>
	<div class="scenic_user">
		<!-- 面包屑区域 -->
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>游客数据</el-breadcrumb-item>
				<el-breadcrumb-item>游客信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 卡片视图区域 -->
		<el-card style="width: 100%; box-shadow:0 1px 1px rgba(0,0,0,0.15) ;">
			<!-- 搜索与添加区域 -->
			<!-- element栅格系统，每一行24个格子，span指定所占格数 -->
			<el-row :gutter="20">
				<el-col :span="3">
					 <el-select v-model="queryForm.queryType" placeholder="请选择搜索方式">
					    <el-option
					      v-for="item in searchOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-col>
				<el-col :span="7">
					<el-input placeholder="请输入搜索内容" v-model="queryForm.queryText">
						<el-button slot="append" icon="el-icon-search" @click="queryUsers()"></el-button>
					</el-input>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" icon="el-icon-refresh" @click="getTotalUsers();getUserList();resetQuery()">全部用户</el-button>
				</el-col>
				<el-col :span="2" :offset="10">
					<el-button type="primary" @click="addDialog(); addFlag = true">添加用户</el-button>
				</el-col>
			</el-row>

			<!-- 用户列表区域 -->
			<el-table :data="userlist" border stripe style="margin-top: 15px;"  ref="filterTable">
				<el-table-column label="ID" prop="id" sortable></el-table-column>
				<el-table-column label="姓名" prop="user_name" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column label="标签" prop="user_label" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column label="性别" prop="user_sex" :filters="[{text: '男', value: '男'},{text: '女', value: '女'}]" :filter-method="filterHandler"></el-table-column>
				<el-table-column label="生日" prop="user_birthday"></el-table-column>
				<!-- 超过列的最大宽度后，隐藏超出部分的tooltip提示框 -->
				<el-table-column label="地址" prop="user_address" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column label="电话" prop="user_tell"></el-table-column>
				<el-table-column label="职业" prop="user_profession"  :show-overflow-tooltip='true'></el-table-column>
				<el-table-column label="用户画像" prop="user_image">
					<template slot-scope="scope">
						<el-button @click="imgDialogVisible(scope.row.id)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="modifyUser() ;getUserInfo(scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="getUserInfo(scope.row); delDialogVisibleFlag = true">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页功能 -->
			<div class="block" style="float: right; margin-top: 15px;margin-bottom: 10px;margin-left: 10px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
				 :page-sizes="[2, 5, 10, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
				 :total="queryInfo.totalUsers">
				</el-pagination>

			</div>
		</el-card>

		<!-- 用户画像弹出框 -->
		<el-dialog title="用户画像" :visible.sync="imgDialogVisibleFlag" :close="resetUser">
			<el-card class="box-card">
			</el-card>
		</el-dialog>

		<!-- 增加或修改用户弹出框 -->
		<el-dialog :title="dialogTitle"  :visible.sync="UserDialogVisibleFlag"  :close="resetUser">
			<el-card class="box-card" >
				<el-form ref="form" :model="user" label-width="80px">
					<el-form-item label="姓名">
						<el-input v-model="user.user_name" ></el-input>
					</el-form-item>
					<el-form-item label="标签">
						<el-row type="flex" class="row-bg" justify="space-between"> 
						<el-col :span="7">
							<el-select v-model="hotelLabel" placeholder="请选择酒店">
							<el-option v-for="item in hotelLabelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							</el-col>
							<el-col :span="7">
						<el-select v-model="restaurantLabel" placeholder="请选择美食" >
						<el-option v-for="item in restaurantLabelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						</el-col>
						<el-col :span="7">
						<el-select v-model="scenicLabel" placeholder="请选择景点">
						<el-option v-for="item in scenicLabelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="性别">
							<el-radio v-model="user.user_sex" label="男">男</el-radio>
							<el-radio v-model="user.user_sex" label="女">女</el-radio>
					</el-form-item>
					<el-form-item label="生日">
							<el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy/MM/dd" v-model="user.user_birthday" ></el-date-picker>
					</el-form-item>
					<el-form-item label="地址">
						<div class="block">
							 <el-cascader
								  id="area"
							      :options="addressOptions"
							      v-model="address">
							 </el-cascader>
						</div>
					</el-form-item>
					<el-form-item label="电话">
						<el-input v-model="user.user_tell"></el-input>
					</el-form-item>
					<el-form-item label="职业">
						<el-select v-model="user.user_profession" placeholder="请选择职业" style="width: 100%;">
							<el-option v-for="item in professionOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					 <el-form-item class="fr">
					    <el-button type="primary" @click="updateUsers">确定</el-button>
					    <el-button >取消</el-button>
					  </el-form-item>
				</el-form>
			</el-card>
		</el-dialog>
		
		<!-- 确定删除弹出框 -->
		<el-dialog title="确定删除该用户？" :visible.sync="delDialogVisibleFlag" width="15%">
			   <el-button type="primary" @click="delUsers">确定</el-button>
			   <el-button @click="cancelAdd">取消</el-button>
		</el-dialog>
	</div>

</template>

<script>
	import { regionData,CodeToText,TextToCode } from 'element-china-area-data'
	import { professionOptions } from '../assets/data/professionOptions.js'
	import { hotelLabelOptions } from '../assets/data/hotelLabelOptions.js'
	import { restaurantLabelOptions } from '../assets/data/restaurantLabelOptions.js'
	import { scenicLabelOptions } from '../assets/data/scenicLabelOptions.js'
 	export default {
		data() {
			return {
				//外部引入js文件
				addressOptions: regionData,
				professionOptions: professionOptions,
				hotelLabelOptions: hotelLabelOptions,
				restaurantLabelOptions: restaurantLabelOptions,
				scenicLabelOptions: scenicLabelOptions,
				
				// 弹出框标志
				dialogTitle:'',
				imgDialogVisibleFlag: false,
				imgDialogid: 0,
				UserDialogVisibleFlag: false,
				delDialogVisibleFlag: false,
				addFlag: true,
				
				//搜索选项
				queryForm:{
					queryText:'',
					//选中的搜索方式
					queryType:'',
					//搜索可选项
				},
				searchOptions:[{
					value:'id',
					label:'按id搜索',
				},{
					value:'name',
					label:'按姓名搜索',
				}],
				
				//待拼接的用户标签内容
				hotelLabel:'',
				restaurantLabel: '',
				scenicLabel: '',
				
				//带拼接的用户居住地内容
				address:'',
				
				// 维护一个待操作的user对象
				user: {
					id:'',
					user_name:'',
					user_label:'',
					user_sex:'',
					user_birthday:'',
					user_address:'',
					user_tell:'',
					user_profession:'',
					user_image:'',
				},
				
				//重置user对象的原数据
				metaUser: {
					id:'',
					user_name:'',
					user_label:'',
					user_sex:'',
					user_birthday:'',
					user_address:'',
					user_tell:'',
					user_profession:'',
					user_image:'',
				},
				
				//获取用户列表的参数对象
				queryInfo: {
					//当前数据库中总的用户数
					totalUsers: 10,
					//页数
					page: 1,
					// 每页显示数
					size: 10
				},
				//获取到的用户对象列表
				userlist: []
			}
		},
		created() {
			//页面创建时发送请求获取总的用户数
			this.getTotalUsers();
			//页面创建时发送请求获取用户列表
			// this.getUserList();
		},
		methods: {
			//<---获取用户列表--->
			// 监听每页显示量改变
			handleSizeChange(newSize) {
				console.log(newSize)
				this.queryInfo.size = newSize
				// 重新获取数据
				this.getUserList()
			},
			// 监听页码改变
			handleCurrentChange(newPage) {
				this.queryInfo.page = newPage
				// 重新获取数据
				this.getUserList()
			},
			//获取数据库存有的用户总数
			async getTotalUsers() {
				const totalUsers = await this.$axios.get('/totalUsers')
				this.queryInfo.totalUsers = totalUsers.data
				console.log(totalUsers)
				console.log(totalUsers.data.state)
				if (totalUsers.data.state==false){
					return false;
				}
				else {
					this.getUserList();
				}
			},
			//asynv await 优化异步promise请求
			async getUserList() {
				//发送get请求，第一个参数请求地址,第二个参数存放get对象
				//await获取到数据对象，从数据对象上结构赋值出一个data属性，重命名为res
				const res = await this.$axios.get('/users', {
					params: this.queryInfo
				})
				//先执行判断状态码，是否未获取到数据，未获取到时，直接return
				if (res.data.code !== '200') {
					return this.$message.error('未查询到用户数据')
				}
				this.userlist = res.data.users
				this.total = res.data.total
			},
			
			// 表格过滤器
			filterHandler(value, row, column) {
			        const property = column['property'];
			        return row[property] === value;
			}, 
			
			//<---用户画像--->
			imgDialogVisible(id) {
				console.log(id)
				this.imgDialogid = id;
				this.imgDialogVisibleFlag = true;
			},
			
			//<---添加用户--->
			addDialog(){
				this.dialogTitle = '添加用户'
				this.resetUser()
				this.UserDialogVisibleFlag = true ;
			},
			//取消添加
			cancelAdd(){
				this.resetUser();
				this.addDialogVisibleFlag = false;
			},
			//确定添加
			async updateUsers(){
				if(this.hotelLabel !== null || this.restaurantLabel !== null || this.scenicLabel !== null){
				this.user.user_label=this.hotelLabel+','+this.restaurantLabel+','+this.scenicLabel
				};
				if(this.address !== null){
				this.user.user_address = CodeToText[this.address[0]]+'/'+CodeToText[this.address[1]]+'/'+CodeToText[this.address[2]]
				};
				console.log('添加或修改的用户数据为：')
				console.log(this.user)
				const res = await this.$axios.post((this.addFlag == true)?('/addUsers'):('/modifyUsers'),this.user)
				if(res.data.code == '200'){
					this.UserDialogVisibleFlag = false;
					this.getUserList()
					this.getTotalUsers()
					this.resetUser()
					return this.$message.success((this.addFlag == true)?('添加成功'):('修改成功'))
				}
				this.UserDialogVisibleFlag = false;
				return this.$message.error('操作失败！')
			},
			
			//<---删除用户--->	
			//取消删除
			cancelDel() {
				this.delDialogVisibleFlag = false;
			},
			//确定删除
			async delUsers() {
				const res = await this.$axios.post('/deleteUsers', this.user)
				console.log(res)
				if (res.data.code == '200') {
					this.delDialogVisibleFlag = false;
					this.getUserList()
					this.getTotalUsers()
					this.resetUser()
					return this.$message.success('删除成功！')
				}
				 this.delDialogVisibleFlag = false;
				 return this.$message.error('删除失败！')
			},
			
			//<---修改用户--->
			modifyUser(){
				this.dialogTitle = '修改用户信息'
				this.UserDialogVisibleFlag = true
				this.addFlag = false
			},
			
			//<---条件查询用户--->
			async queryUsers(){
					console.log(this.queryForm.queryText)
					console.log(this.queryForm.queryType)
					if (this.queryForm.queryType == ''){
						return this.$message.info('请先选择搜索方式')
					}
					const res = await this.$axios.get('/queryUsers', {
						params: {
							'queryType':this.queryForm.queryType,
							'queryText':this.queryForm.queryText,
						}
						})
					//先执行判断状态码，是否未获取到数据，未获取到时，直接return
					if (res.data.code !== '200') {
						return this.$message.error('未查询到用户数据')
					}
					console.log(res)
					this.$message.success('查询成功')
					this.userlist = res.data.users
					this.queryInfo.totalUsers = res.data.total
			},
			resetQuery(){
				this.queryForm.queryText=''
			},
			
			//<---重置user对象--->
			resetUser(){
				this.user = this.metaUser
				this.address = ''
				this.hotelLabel = ''
				this.restaurantLabel = ''
				this.scenicLabel = ''
			},
			
			//<---编辑时把用户信息渲染到当前维护的对象中--->
			getUserInfo(userInfo){
				this.user = userInfo
				if(userInfo.user_label !== null){
					var label = userInfo.user_label.split(",")
					this.hotelLabel = label[0]
					this.restaurantLabel = label[1]
					this.scenicLabel = label[2]
				} else if(userInfo.user == null){
					this.hotelLabel = ''
					this.restaurantLabel = ''
					this.scenicLabel = ''
				}
				if(userInfo.user_address !== null){
					var selectedAddress = userInfo.user_address.split("/")
					this.address = TextToCode[selectedAddress[0]][selectedAddress[1]][selectedAddress[2]].code
				}
				console.log(this.user)

			},

		},
	}
</script>

<style scoped>
	.bread {
		width: 100%;
		margin-bottom: 10px;
		padding-top: 10px;
		padding-left: 10px;
		height: 20px;
		background-color: white;
	}
</style>
