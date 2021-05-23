<template>
  <div>
    <!-- query from -->
    <el-form :inline="true" class="query-form" :model="query" ref="query">
      <c-query-form :query="query" :items="queryItems"></c-query-form>
      <el-form-item>
        <el-button type="primary" @click="buttonQuery">查询</el-button>
        <el-button @click="resetForm('query')">重置</el-button>
        <el-button type="warning" @click="buttonAdd">{{
          addButtonText
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- list table -->
    <c-table
      :getHeaders="getHeaders"
      :getTableData="getData"
      :beforeRender="beforeRender"
      :pagination="pagination"
      ref="pageTable"
    ></c-table>
    <!-- add + edit -->
    <el-dialog
      :title="operDailog.title"
      :visible.sync="operDailog.visible"
      width="600px"
      append-to-body
    >
      <el-form
        :rules="operDailog.rules"
        :model="operDailog.entity"
        ref="operForm"
        label-width="100px"
        label-position="right"
        style="width: 500px"
      >
        <element-form
          :formData="operDailog.entity"
          :items="operDailog.items"
          :rules="operDailog.rules"
          :viewFields="operDailog.viewFields"
          :textFields="operDailog.textFields"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dailog 操作按钮 -->
        <c-buttons
          refForm="operForm"
          :buttons="operDailog.buttons"
          :submitCallback="handleSave"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
    <!-- view -->
    <el-dialog
      :title="viewDailog.title"
      :visible.sync="viewDailog.visible"
      width="600px"
      append-to-body
    >
      <el-form
        :rules="viewDailog.rules"
        :model="viewDailog.entity"
        ref="viewForm"
        label-width="100px"
        label-position="right"
        style="width: 500px"
      >
        <element-form
          :formData="viewDailog.entity"
          :items="viewDailog.items"
          :rules="viewDailog.rules"
          :viewFields="viewDailog.viewFields"
          :textFields="viewDailog.textFields"
          :isForm="false"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dailog 操作按钮 -->
        <c-buttons
          refForm="viewForm"
          :buttons="viewDailog.buttons"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入包
import EPage from "./page";
import { copy } from "@qingbing/helper";

// 导入包
export default {
  extends: EPage,
  data() {
    return {
      operType: "add",
      addButtonText: "", // 添加按钮文字
      addDailogTitle: "", // 添加时 operDailog 的标题
      editButtonTitle: "", // 编辑时 operDailog 的标题
      query: {}, // 查询条件
      queryItems: {}, // 查询条件项目
      // 操作的 dailog
      operDailog: {
        title: "", // dailog 标题
        visible: false, // 是否打开 dailog
        entity: {}, // 当前操作实体
        rules: {}, // 规则，这个定义为数组，不用赋值
        items: {}, // 项目
        viewFields: [], // 需要展示的项目
        textFields: [], // 强制 view
        buttons: ["submit", "cancel"], // 默认展示按钮
        // 默认的操作实体，为新增时复制使用
        defaultEntity: {},
      },
      // 查看的 dailog
      viewDailog: {
        title: "", // dailog 标题
        visible: false, // 是否打开 dailog
        entity: {}, // 当前操作实体
        rules: {}, // 规则，这个定义为数组，不用赋值
        items: {}, // 项目
        viewFields: [], // 需要展示的项目
        textFields: [], // 强制 view
        buttons: ["cancel"], // 默认展示按钮
        defaultEntity: {}, // 默认的操作实体
      },
    };
  },
  components: {
    CTable: () => import("@qingbing/element-table"),
    CQueryForm: () => import("@/components/query-form"),
    CButtons: () => import("@/components/formButton"),
  },
  methods: {
    // 列数据渲染前可修改列数据
    beforeRender(item, idx) {},
    // 页面查询按钮
    buttonQuery() {
      this.$refs["pageTable"].refreshTable();
    },
    // 添加按钮
    buttonAdd() {
      this.operType = "add";
      // 设置 operDailog 表单数据
      this.operDailog.entity = copy(this.operDailog.defaultEntity);
      this.operDailog.title = this.addButtonText;
      // 打开 dailog
      this.openDialog("operDailog");
    },
    // 编辑按钮
    buttonEdit(entity) {
      this.operType = "edit";
      // 设置 operDailog 表单数据
      this.operDailog.entity = copy(entity);
      this.operDailog.title = this.editButtonTitle;
      // 打开 dailog
      this.openDialog("operDailog");
    },
    // 查看按钮
    buttonView(entity) {
      this.operType = "view";
      // 设置 operDailog 表单数据
      this.viewDailog.entity = copy(entity);
      // 打开 dailog
      this.openDialog("viewDailog");
    },
    // 关闭 dailog
    handleCancel() {
      this.operType = "";
      // 关闭 dailog
      this.closeDialog();
    },
    // 判断是否添加操作
    isAdd() {
      return "add" === this.operType;
    },
  },
};
</script>
