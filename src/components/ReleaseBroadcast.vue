<template>
	<!-- 发布通知页 -->
	<div class="scenic_releasenews">
		<!-- 面包屑区域 -->
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>景区广播</el-breadcrumb-item>
				<el-breadcrumb-item>发布广播</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 发布区域-->
		<el-card class="box">
			<div slot="header" class="clearfix">
				<span>发布景区广播</span>
			</div>
			<div class="box">
				<el-row :gutter="20">
					<!-- 标题区域 -->
					<el-col :span="15">
						<el-input autosize v-model="text" maxlength="50" show-word-limit placeholder="请输入景区广播内容">
						</el-input>
					</el-col>
					<el-col :span="4">
						<template>
							<el-select v-model="value" placeholder="请选择广播类型">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" @click="releaseBroadcast" style="width:175px;" :disabled="disabled=!show">
							{{content}}
						</el-button>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="box">
			<div slot="header" class="clearfix">
				<span>今日已发送景区广播（每日24:00清空数据，请即时保存重要内容）</span>
			</div>
			<!-- 用户列表区域 -->
			<el-table :data="broadcastlist" :row-class-name="tableRowClassName" ref="filterTable">
				<el-table-column label="发布时间" prop="release_time" sortable></el-table-column>
				<el-table-column label="广播内容" prop="broadcast_content" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column label="广播类型" :filters="[{text: '天气预报', value: '天气预报'},{text: '商品广告', value: '商品广告'},{text: '拥堵提示', value: '拥堵提示'},{text: '寻人广播', value: '寻人广播'},{text: '其他广播', value: '其他广播'},{text: '演出开始', value: '演出开始'}]" :filter-method="filterHandler" prop="broadcast_type" :show-overflow-tooltip='true'></el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 广播类型可选项
				options: [{
					value: '演出开始',
					label: '演出开始'
				}, {
					value: '寻人广播',
					label: '寻人广播'
				}, {
					value: '天气预报',
					label: '天气预报'
				}, {
					value: '商品广告',
					label: '商品广告'
				}, {
					value: '拥堵提示',
					label: '拥堵提示'
				}, {
					value: '其他广播',
					label: '其他广播'
				}],
				// 广播类型已选
				value: '其他广播',
				// 倒计时按钮内容
				content: '发布景区广播', // 按钮里显示的内容
				countNum: 10, //记录具体倒计时时间
				show: true,
				//广播具体内容
				text: '',
				//以发送广播内容
				broadcastlist: [],
				//维护一个待插入的广播对象
				broadcast: {
					release_time: '',
					broadcast_content: '',
					broadcast_type: '',
				},
				metaBroadcast: {
					release_time: '',
					broadcast_content: '',
					broadcast_type: '',
				}
			}
		},
		created() {
			this.queryBoradcast()
		},
		methods: {
			// 表格状态
			tableRowClassName({
				row
			}) {
				if (row.broadcast_type === '寻人广播') {
					return 'missing-row';
				} else if (row.broadcast_type === '演出开始') {
					return 'show-row';
				} else if (row.broadcast_type === '天气预报') {
					return 'weather-row';
				} else if (row.broadcast_type === '商品广告') {
					return 'advertising-row';
				} else if (row.broadcast_type === '拥堵提示') {
					return 'congestion-row';
				} 
				return '';
			},
			async releaseBroadcast() {
				// 获取当前时间
				let time = new Date()
				this.broadcast.release_time = time.toLocaleString()
				this.broadcast.broadcast_content = this.text
				this.broadcast.broadcast_type = this.value
				const res1 = await this.$axios.post('https://cyye.lbj.wiki/zhangqidi/push/pushAll?msg=' + this.text)
				if (res1.status == '200') {
					this.releaseClock()
					this.saveBroadcast()
					return this.$message.success('发布成功')
				}
				return this.$message.warning('发布失败')
			},
			async saveBroadcast() {
				if (this.broadcast.broadcast_content == null) {
					return this.$message.info('请输入广播内容')
				};
				const res2 = await this.$axios.post('/saveBroadcast', this.broadcast)
				if (res2.data.code == '200') {
					this.queryBoradcast()
					return this.$message.success('保存成功')
				}
				return this.$message.info('保存失败')
			},
			async queryBoradcast() {
				//发送get请求，第一个参数请求地址,第二个参数存放get对象
				//await获取到数据对象，从数据对象上结构赋值出一个data属性，重命名为res
				const res = await this.$axios.get('/queryBroadcast')
				//先执行判断状态码，是否未获取到数据，未获取到时，直接return
				if (res.data.code == '400') {
					return this.$message.error('今日还未发送过广播')
				}
				this.$nextTick(() => {this.broadcastlist = res.data.broadcasts})
				console.log(this.broadcastlist)
			},
			//倒计时
			releaseClock() {
				this.content = this.countNum + 's后重新发送'
				let clock = window.setInterval(() => {
					this.show = false
					this.countNum--
					this.content = this.countNum + 's后重新发送'
					if (this.countNum < 0) { //当倒计时小于0时清除定时器
						window.clearInterval(clock)
						this.content = '发布景区广播'
						this.countNum = 10
						this.show = true
					}
				}, 1000)
			},
			// 表格过滤器
			filterHandler(value, row, column) {
			        const property = column['property'];
			        return row[property] === value;
			}, 
		},

	}
</script>

<style>
	.box {
		margin-bottom: 15px;
	}

	/* 演出开始 */
	.el-table .show-row {
		background: #fff9d5;
	}
	/* 寻人广播 */
	.el-table .missing-row {
		background: #fff0dc;
	}
	/* 天气预报 */
	.el-table .weather-row {
		background: #d6eafb;
	}
	/* 商品广告 */
	.el-table .advertising-row {
		background: #e2edd5;
	}
	/* 拥堵提示 */
	.el-table .congestion-row {
		background: #e0f7fa;
	}
</style>
