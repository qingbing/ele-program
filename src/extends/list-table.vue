<template>
  <div>
    <!-- query from -->
    <el-form
      :inline="true"
      class="query-form"
      :model="query.search"
      ref="query-form"
    >
      <c-query-form
        :query="query.search"
        :items="query.searchItems"
      ></c-query-form>
      <el-form-item>
        <c-buttons refForm="query-form" :buttons="query.buttons"></c-buttons>
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
    <!-- add -->
    <el-dialog
      :title="addDailog.title"
      :visible.sync="addDailog.visible"
      width="600px"
      append-to-body
    >
      <el-form
        :rules="addDailog.rules"
        :model="addDailog.entity"
        ref="add-form"
        label-width="100px"
        label-position="right"
        style="width: 500px"
      >
        <element-form
          :formData="addDailog.entity"
          :items="addDailog.items"
          :rules="addDailog.rules"
          :viewFields="addDailog.viewFields"
          :textFields="addDailog.textFields"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dailog 操作按钮 -->
        <c-buttons
          refForm="add-form"
          :buttons="addDailog.buttons"
          :submitCallback="handleAdd"
          :cancelCallback="handleCancel"
        ></c-buttons>
      </div>
    </el-dialog>
    <!-- edit -->
    <el-dialog
      :title="editDailog.title"
      :visible.sync="editDailog.visible"
      width="600px"
      append-to-body
    >
      <el-form
        :rules="editDailog.rules"
        :model="editDailog.entity"
        ref="edit-form"
        label-width="100px"
        label-position="right"
        style="width: 500px"
      >
        <element-form
          :formData="editDailog.entity"
          :items="editDailog.items"
          :rules="editDailog.rules"
          :viewFields="editDailog.viewFields"
          :textFields="editDailog.textFields"
        ></element-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- dailog 操作按钮 -->
        <c-buttons
          refForm="edit-form"
          :buttons="editDailog.buttons"
          :submitCallback="handleEdit"
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
import EBase from "./base";
import { copy } from "@qingbing/helper";

// 导入包
export default {
  extends: EBase,
  data() {
    return {
      // 查询栏目配置
      query: {
        search: {}, // 默认参数
        searchItems: {}, // 项目
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset",
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      // 操作的 dailog
      addDailog: {
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
      // 操作的 dailog
      editDailog: {
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
    getAddButtonText() {
      return "添加";
    },
    // 列数据渲染前可修改列数据
    beforeRender(item, idx) {},
    // 页面查询按钮
    buttonQuery() {
      this.$refs["pageTable"].refreshTable();
    },
    // 添加按钮
    buttonAdd() {
      // 设置 addDailog 表单数据
      this.addDailog.entity = copy(this.addDailog.defaultEntity);
      // 打开 dailog
      this.openDialog("addDailog");
    },
    // 编辑按钮
    buttonEdit(entity) {
      // 设置 editDailog 表单数据
      this.editDailog.entity = copy(entity);
      // 打开 dailog
      this.openDialog("editDailog");
    },
    // 查看按钮
    buttonView(entity) {
      // 设置 viewDailog 表单数据
      this.viewDailog.entity = copy(entity);
      // 打开 dailog
      this.openDialog("viewDailog");
    },
    // 关闭 dailog
    handleCancel() {
      // 关闭 dailog
      this.closeDialog();
    },
    // 添加保存
    handleAdd(successCb, failureCb) {
      console.log(successCb, failureCb);
    },
    // 编辑保存
    handleEdit(successCb, failureCb) {
      console.log(successCb, failureCb);
    },
  },
};
</script>
