<template>
  <!-- 历史通知页 -->
  <div class="scenic_notice">
    <!-- 面包屑区域 -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>景区通知</el-breadcrumb-item>
        <el-breadcrumb-item>历史通知</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <!-- element栅格系统，每一行24个格子，span指定所占格数 -->
      <el-row>
        <el-col :span="7">
          <el-input placeholder="请输入需要搜索的通知标题">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-refresh"
            style="margin-left: 15px"
            >全部通知</el-button
          >
        </el-col>
      </el-row>

      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column
          prop="createDate"
          label="通知时间"
          sortable
          column-key="date"
        >
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="操作" prop="id">
          <template slot-scope="scope">
            <el-button
              @click="dialogVisible(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型标签"
          column-key="tag"
          :filters="[
            { text: '其他通知', value: '其他通知' },
            { text: '优惠活动', value: '优惠活动' },
            { text: '紧急通知', value: '紧急通知' },
            { text: '政策通告', value: '政策通告' },
          ]"
          :filter-method="filterTag"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.type === '政策通告'
                  ? 'info'
                  : scope.row.type === '优惠活动'
                  ? 'success'
                  : scope.row.type === '其他通知'
                  ? 'warning'
                  : 'danger'
              "
              disable-transitions
              >{{ scope.row.type }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <div
        class="block"
        style="
          float: right;
          margin-top: 15px;
          margin-bottom: 10px;
          margin-left: 10px;
        "
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog title="详细内容" :visible.sync="dialogVisibleflag" fullscreen=true>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>{{ details.title }}</h3>
        </div>
        <div>
          <p id="details" v-html="details.text"></p>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0, // 总通知数
      dialogVisibleflag: false, //通知详细弹出页
      articletitle: "",
      articlemain: "",
      queryInfo: {
        // 当前页数
        page: 1,
        // 当前每夜显示数
        pageSize: 10,
      },
      tableData: [],
      details: {
        createDate: "",
        id: "",
        text: "",
        title: "",
        type: "",
      },
    };
  },
  created() {
    // 页面创建时发送请求获取所有通知
    this.getTotalNotice();
  },
  methods: {
    // 监听每页显示量改变
    handleSizeChange(newSize) {
      console.log(newSize);
      // this.queryInfo.pagesize = newSize
      // // 重新获取数据
      // this.getUserList()
    },
    // 监听页码改变
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    async getTotalNotice() {
      const totalNotice = await this.$axios.get("/totalNotice");
      if (totalNotice.status == 200) {
        this.total = totalNotice.data;
        console.log(totalNotice);
        this.getNoticeList();
      } else {
        this.$messag.error("查询失败");
        return false;
      }
    },
    async getNoticeList() {
      const res = await this.$axios.get("/getAllNotice", {
        params: this.queryInfo,
      });
      if (res.data.code !== "200") {
        return this.$message.error("未查询到通知");
      } else {
        this.tableData = res.data.notices;
        console.log(res);
        console.log(this.tableData);
      }
    },

    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    dialogVisible(row) {
      console.log(row);
      this.details.createDate = row.createDate;
      this.details.text = row.text;
      this.details.title = row.title;
      this.details.type = row.type;
      this.dialogVisibleflag = true;
    },
  },


};
</script>

<style lang="less" scoped>
/* 面包屑样式 */
.bread {
  width: 100%;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  height: 20px;
  background-color: white;
}

/* 弹出框样式 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

</style>

