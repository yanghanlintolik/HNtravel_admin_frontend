<template>
  <!-- 发布通知页 -->
  <div class="scenic_releasenotice">
    <!-- 面包屑区域 -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>景区通知</el-breadcrumb-item>
        <el-breadcrumb-item>发布通知</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 发布区域-->
    <el-card>
      <div class="box">
        <el-row type="flex" justify="space-between">
          <!-- 标题区域 -->
          <el-col :span="12">
            <!-- 自动聚焦 -->
            <el-input placeholder="请输入通知标题" v-model="notice.title" autofocus="autofocus"> </el-input>
          </el-col>
          <!-- 类型选择区域 -->
          <el-col :span="8">
            <el-radio-group v-model="notice.type">
              <el-radio-button label="紧急通知"></el-radio-button>
              <el-radio-button label="优惠活动"></el-radio-button>
              <el-radio-button label="政策通告"></el-radio-button>
              <el-radio-button label="其他通知"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <div class="box">
        <el-row>
          <el-col :span="24">
            <!-- 通知内容输入页 -->
            <div id="div1"></div>
          </el-col>
        </el-row>
      </div>
      <!-- 发布通知按钮 -->
      <el-row>
        <el-col :span="2" :offset="20">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定清空当前通知内容吗？"
            @confirm="clearText"
          >
            <el-button slot="reference">清空内容</el-button>
          </el-popconfirm>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="release">发布通知</el-button>
        </el-col>
      </el-row>
      <p v-html="textarea"></p>
      <!-- 输出：html标签在渲染的时候被解析 -->
    </el-card>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
      //通知类型默认项
      // noticeType: "其他通知",
      // 通知正文内容
      textarea: "",
      notice:{
        title:"",//标题
        type:"其他通知",//类型
        text:""//内容
      },
      fullScreenFlag:true,
    };
  },
  mounted() {
    const editor = new E("#div1");
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.config.height = 500;
    editor.config.placeholder =
      "请输入通知标题，选择通知类型，输入内容后提交通知，通知是将长期保留的内容，请发布正式规范的通知内容，若要发布即时广播，请转到发布广播页。";
    editor.config.zIndex = 1;
    editor.config.uploadFileName = "myfile";
    editor.config.uploadImgServer = "http://localhost:8081/api/upload_img";
    editor.config.uploadImgMaxLength = 1; // 一次最多上传1张图片
    editor.config.uploadImgHeaders = {
      //   token: this.$store.state.token, //发送图片携带vuex中的token，刷新会出错，因此用sessionStorage中的token
      token: sessionStorage.getItem("token"),
    };
    editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "indent", //缩进
      "lineHeight", //行高
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "todo", //待完成
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "splitLine", //分割线
      "undo", // 撤销
      "redo", // 重复
    ];
    editor.config.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        layer.msg("OK");
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        layer.msg("响应超时");
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.data;
        insertImg(url);

        // result 必须是一个 JSON 格式字符串！！！否则报错
      },
    };

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
      if(this.fullScreenFlag===true){
        editor.fullScreen()
      } else {
        setTimeout(() =>{
         this.fullScreenFlag=true
      },2000);
      }
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  methods: {
    async release() {
      this.fullScreenFlag=false
      this.notice.text=this.editor.txt.html()
      //console.log(this.editor.txt.html()) //获取html形式的内容
      //console.log(this.editor.txt.getJSON())//获取json形式的内容
      const res = await this.$axios.post('/addNotice',this.notice)
				if(res.data.code == '200'){
          this.editor.txt.clear()
          return this.$message.success(('发布成功'))
        }
        this.$message.error(res.data.message)
				return this.$message.error('操作失败！')
    },
    clearText() {
      //清除已输入的内容
      this.editor.txt.clear();
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
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

.box {
  margin-bottom: 30px;
}
</style>
