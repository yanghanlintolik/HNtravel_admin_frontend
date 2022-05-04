<template>
	<div class="heat_map">
		
		<!-- 面包屑区域 -->
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>实时热力</el-breadcrumb-item>
				<el-breadcrumb-item>景点热力图</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<!-- 地图区域 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-row :gutter="20">
					<el-col :span="3">
						<span>实时热力地图</span>
					</el-col>
					<el-col :span="3" :offset="15">
						<el-switch v-model="touristHeat" @change='changeTouristHeat' active-text="显示游客热力">
						</el-switch>
					</el-col>
					<el-col :span="3">
					<el-switch v-model="areaDivision" @change='changeAreaDivision' active-text="显示景区划分">
					</el-switch>
					</el-col>
				</el-row>
			</div>
			<div id="container"></div>
		</el-card>

		<!-- 热力占比 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-row :gutter="20">
					<el-col :span="3">
						<span>实时热力数据</span>
					</el-col>
				</el-row>
			</div>
			<div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column label="景区" prop="name" width="150px" align="center"></el-table-column>
					<el-table-column label="实时数值(人)" prop="heatValue" width="150px" align="center"> </el-table-column>
					<el-table-column label="景区最大承载量(人)" prop="maxValue" width="150px" align="center"> </el-table-column>
					<el-table-column label="承载量百分比" align="center">
						<template slot-scope="scope">
							<el-progress :text-inside="true" :color="customColors" :stroke-width="20" :percentage="scope.row.percentage"></el-progress>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200px" align="center">
						<template >
							<el-button type="text" size="small" >修改最大承载量</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		
		<!-- 分流日志 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-row :gutter="20">
					<el-col :span="3">
						<span>景区分流日志</span>
					</el-col>
					<el-col :span="4" :offset="17">
						<el-switch   active-text="开启景区自动分流">
						</el-switch>
					</el-col>
				</el-row>
			</div>
			<div style="width: 100%;">
			  <div v-for="o in 4" :key="o" class="text item">
			    {{'分流日志 ' + o }}
			  </div>
			  </div>
		</el-card>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//景区承载量进度条颜色配置
				customColors: [{
						color: '#6f7ad3',
						percentage: 20
					},
					{
						color: '#1989fa',
						percentage: 40
					},
					{
						color: '#5cb87a',
						percentage: 60
					},
					{
						color: '#e6a23c',
						percentage: 80
					},
					{
						color: '#f56c6c',
						percentage: 85
					},
					{
						color: '#f52e2e',
						percentage: 90
					},],
				// 热力表格数据
				tableData: [{
						name: '园区入口',
						heatValue: '3213',
						percentage: 40,
						maxValue:'5403',
					}, {
						name: '1942风景区',
						heatValue: '1298',
						percentage: 80,
						maxValue:'6530',
					},
					{
						name: '南洋风景区',
						heatValue: '4312',
						percentage: 90,
						maxValue:'8537',
					}
				],
				touristHeat: true,
				areaDivision: true,
				map: {},
				heatMap: {},
				heatMapData: [{
						"lng": 110.350544,
						"lat": 19.918925,
						"count": 10
					},
					{
						"lng": 110.348166,
						"lat": 19.920048,
						"count": 7
					},
					{
						"lng": 110.351094,
						"lat": 19.918535,
						"count": 6
					},
					{
						"lng": 110.347967,
						"lat": 19.916818,
						"count": 9
					},
					{
						"lng": 110.350191,
						"lat": 19.919637,
						"count": 5
					},
				],
				areaDivisionData1: [{
						"lng": 110.347168,
						"lat": 19.917432,
					},
					{
						"lng": 110.346815,
						"lat": 19.917036,
					},
					{
						"lng": 110.346965,
						"lat": 19.916525,
					},
					{
						"lng": 110.346041,
						"lat": 19.916321,
					},
					{
						"lng": 110.346068,
						"lat": 19.915874,
					},
					{
						"lng": 110.347983,
						"lat": 19.915746,
					},
					{
						"lng": 110.348567,
						"lat": 19.916857,
					}
				],
				areaDivisionData2: [{
						"lng": 110.350799,
						"lat": 19.919167,
					},
					{
						"lng": 110.351511,
						"lat": 19.918585,
					},
					{
						"lng": 110.351435,
						"lat": 19.918102,
					},
					{
						"lng": 110.350026,
						"lat": 19.917508,
					},
					{
						"lng": 110.349246,
						"lat": 19.917827,
					},
					{
						"lng": 110.349093,
						"lat": 19.91821,
					},
					{
						"lng": 110.350408,
						"lat": 19.918976,
					}
				],
				areaDivisionData3: [{
						"lng": 110.347589,
						"lat": 19.921199,
					},
					{
						"lng": 110.347345,
						"lat": 19.920637,
					},
					{
						"lng": 110.347005,
						"lat": 19.919513,
					},
					{
						"lng": 110.347616,
						"lat": 19.919373,
					},
					{
						"lng": 110.347929,
						"lat": 19.918045,
					},
					{
						"lng": 110.348635,
						"lat": 19.917904,
					},
					{
						"lng": 110.349491,
						"lat": 19.92056,
					}, {
						"lng": 110.348785,
						"lat": 19.921148,
					}
				],
				polygon1: {},
				polygon2: {},
				polygon3: {},

			}
		},
		mounted() {
			this.initMap();
			this.createHeatMap();
			this.createAreaDivision();
		},
		methods: {
			initMap() {
				// 初始化map对象
				this.map = new AMap.Map("container", {
					resizeEnable: true,
					center: [110.350544, 19.918925],
					zoom: 16.5,
				});
			},
			createHeatMap() {
				AMap.plugin(["AMap.HeatMap"], () => {
					//初始化heatmap对象
					this.heatMap = new AMap.HeatMap(this.map, {
						radius: 25, //给定半径
						opacity: [0, 0.8]
					});
					this.heatMap.setDataSet({
						data: this.heatMapData,
						max: 10
					});
				});
			},
			createAreaDivision() {
				var path1 = []
				var path2 = []
				var path3 = []

				for (var i = 0; i < this.areaDivisionData1.length; i++) {
					path1.push(new AMap.LngLat(this.areaDivisionData1[i].lng, this.areaDivisionData1[i].lat))
				}
				console.log(path1)
				this.polygon1 = new AMap.Polygon({
					path: path1,
					fillColor: '#BBDEFB', // 多边形填充颜色
					strokeOpacity: 0,
				})

				for (var i = 0; i < this.areaDivisionData2.length; i++) {
					path2.push(new AMap.LngLat(this.areaDivisionData2[i].lng, this.areaDivisionData2[i].lat))
				}
				console.log(path2)
				this.polygon2 = new AMap.Polygon({
					path: path2,
					fillColor: '#BBDEFB', // 多边形填充颜色
					strokeOpacity: 0,
				})
				for (var i = 0; i < this.areaDivisionData3.length; i++) {
					path3.push(new AMap.LngLat(this.areaDivisionData3[i].lng, this.areaDivisionData3[i].lat))
				}
				console.log(path3)
				this.polygon3 = new AMap.Polygon({
					path: path3,
					fillColor: '#BBDEFB', // 多边形填充颜色
					strokeOpacity: 0,
				})
				this.map.add(this.polygon1);
				this.map.add(this.polygon2);
				this.map.add(this.polygon3);
			},

			changeTouristHeat(callback) {
				if (callback === false) {
					this.heatMap.hide()
				} else if (callback === true) {
					this.heatMap.show()
				}
			},
			changeAreaDivision(callback) {
				if (callback === false) {
					this.polygon1.hide()
					this.polygon2.hide()
					this.polygon3.hide()
				} else if (callback === true) {
					this.polygon1.show()
					this.polygon2.show()
					this.polygon3.show()
				}
			},
			// 热力表格方法
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
		}
	}
</script>

<style>
	/* 面包屑样式 */
	.bread {
		width: 100%;
		margin-bottom: 10px;
		padding-top: 10px;
		padding-left: 10px;
		height: 20px;
		background-color: white;
	}

	.box-card {
		margin-bottom: 10px;
	}

	#container {
		width: 100%;
		height: 500px;
	}
	
</style>
