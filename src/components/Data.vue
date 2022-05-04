<template>
	<div class="scenic_data">
		<!-- 面包屑区域 -->
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>景区概览</el-breadcrumb-item>
				<el-breadcrumb-item>实时数据</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 数字数据区域 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>数据统计</span>
			</div>
			<el-row type="flex" justify="space-around" :gutter="20">
				<el-col :span="8">
					<el-card><img src="../assets/img/scenic_user.png">
						<div class="fr">
							游客总数：{{scenic_user}}
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card><img src="../assets/img/scenic_message.png">
						<div class="fr">
							新收消息：{{scenic_message}}
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card><img src="../assets/img/scenic_money.png">
						<div class="fr">
							日营业额：{{scenic_money}}
						</div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card><img src="../assets/img/scenic_shopping.png">
						<div class="fr">
							购物人数：{{scenic_shopping}}
						</div>
					</el-card>
				</el-col>
			</el-row>
		</el-card>

		<!-- 图表数据区域 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>景区人流统计</span>
			</div>
			<div id="chart1" ref="chart1"></div>
		</el-card>

		<el-row type="flex" justify="space-around" :gutter="20">
			<el-col :span="8">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>图表统计1</span>
					</div>
					<div id="chart2" ref="chart2"></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>图表统计2</span>
					</div>
					<div id="chart3" ref="chart3"></div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>图表统计3</span>
					</div>
					<div id="chart4" ref="chart4"></div>
				</el-card>
			</el-col>
		</el-row>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				scenic_user: 5351,
				scenic_message: '56',
				scenic_shopping: '302',
				scenic_money: '6960',
			}
		},
		methods: {
			myEcharts() {
				// 基于准备好的dom，初始化echarts实例
				var myChart1 = this.$echarts.init(this.$refs.chart1, 'westeros');
				// var myChart1 = this.$echarts.init(document.getElementById('chart1'), 'westeros');
				// 指定图表的配置项和数据
				var option1 = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							},
						}
					},
					xAxis: {
						type: 'category',
						data: ['9：00', '10：00', '11：00', '12：00', '13：00', '14：00', '15：00', '16：00', '17：00', '18：00', '19：00', '20：00']
					},
					yAxis: {
						type: 'value'
					},
					grid: {
						left: '0%',
						width: '100%',
						top: '0%'
					},
					series: [{
						data: [111, 441, 144, 242, 525, 535, 394, 291, 234, 124, 124, 654],
						type: 'line',
					}]
				};
				var myChart2 = this.$echarts.init(this.$refs.chart2, 'westeros');
				// var myChart2 = this.$echarts.init(document.getElementById('chart2'), 'westeros');
				var option2 = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar'
					}]
				}
				var myChart3 = this.$echarts.init(this.$refs.chart3, 'westeros');
				// var myChart3 = this.$echarts.init(document.getElementById('chart3'), 'westeros');
				var option3 = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					series: [{
						type: 'pie',
						radius: [30, 110],
						center: ['50%', '50%'],
						roseType: 'area',
						data: [{
								value: 10,
								name: 'rose1'
							},
							{
								value: 5,
								name: 'rose2'
							},
							{
								value: 15,
								name: 'rose3'
							},
							{
								value: 25,
								name: 'rose4'
							},
							{
								value: 20,
								name: 'rose5'
							},
							{
								value: 35,
								name: 'rose6'
							},
							{
								value: 30,
								name: 'rose7'
							},
							{
								value: 40,
								name: 'rose8'
							}
						]
					}]
				}
				// var myChart4 = this.$echarts.init(this.$refs.chart4,'westeros');
				var myChart4 = this.$echarts.init(document.getElementById('chart4'), 'westeros');
				var option4 = {
					xAxis: {},
					yAxis: {},
					series: [{
						symbolSize: 20,
						data: [
							[10.0, 8.04],
							[8.0, 6.95],
							[13.0, 7.58],
							[9.0, 8.81],
							[11.0, 8.33],
							[14.0, 9.96],
							[6.0, 7.24],
							[4.0, 4.26],
							[12.0, 10.84],
							[7.0, 4.82],
							[5.0, 5.68]
						],
						type: 'scatter'
					}]
				}

				// 使用刚指定的配置项和数据显示图表。
				myChart1.setOption(option1);
				myChart2.setOption(option2);
				myChart3.setOption(option3);
				myChart4.setOption(option4);

				//图表响应式
				window.onresize = function() {
					myChart1.resize();
					myChart2.resize();
					myChart3.resize();
					myChart4.resize();
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.myEcharts();
			});
		},

	}
</script>



<style scoped>
	/* 面包屑样式 */
	.bread {
		width: 100%;
		margin-bottom: 10px;
		padding-top: 10px;
		padding-left: 10px;
		height: 20px;
		background-color: white;
	}

	/* 数字数据区域样式 */
	.box-card {
		margin-bottom: 10px;
	}

	.box-card img {
		width: 20px;
	}

	#chart1 {
		height: 400px;
		width: 100%;
	}

	#chart2 {
		height: 400px;
		width: 100%;
	}

	#chart3 {
		height: 400px;
		width: 100%;
	}

	#chart4 {
		height: 400px;
		width: 100%;
	}
</style>
