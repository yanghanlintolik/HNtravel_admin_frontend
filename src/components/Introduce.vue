<template>
	<div class="introduce">
		<!-- 面包屑区域 -->
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>景区概览</el-breadcrumb-item>
				<el-breadcrumb-item>景点首页</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	
		<!-- 数字数据区域 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>欢迎您！{{name}} <i class="icon-happy"></i></span>
			</div>
			 <el-carousel :interval="4000" height="400px" indicator-position="outside"  type="card">
			    <el-carousel-item v-for="item in 6" :key="item">
			      <h3 class="medium"></h3>
			    </el-carousel-item>
			  </el-carousel>
		</el-card>
	
		<!-- 图表数据区域 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>联系我们</span>
			</div>
		</el-card>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name:'冯小刚电影公社',
			}
		},
		methods: {},
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
	
	/* 数字数据区域样式 */
	.box-card {
		margin-bottom: 10px;
	}
	
	  .el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 200px;
	    margin: 0;
	  }
	  
	  .el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
</style>
