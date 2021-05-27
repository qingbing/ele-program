<template>
  <div>
    <h3>表头选项[{{ header.name }}]</h3>
    <!-- query from -->
    <el-form :inline="true" class="query-form" ref="query">
      <el-form-item>
        <el-button type="warning" @click="buttonAdd">添加表头</el-button>
        <el-button type="primary" @click="buttonRefresh">刷新排序</el-button>
        <el-button type="danger" @click="buttonCloseWindow">关闭页面</el-button>
      </el-form-item>
    </el-form>
    <!-- list table -->
    <c-table
      :getHeaders="getHeaders"
      :getTableData="getData"
      :beforeRender="beforeRender"
      :editConfig="tableEditConfig"
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
import { isEmpty, copy, merge, isUndefined, dump } from "@qingbing/helper";
import ReqHeader from "@/api/header";
import Router from "@/utils/router-helper";
import Helper from "@/utils/helper";
import Labels from "@/conf/labels";
import items from "../json/header";
// 导出
export default {
  data() {
    this.init(this.$route.params.key);
    const defaultEntity = {
      id: "",
      header_key: this.$route.params.key,
      field: "",
      label: "",
      width: "",
      fixed: "",
      default: "",
      align: "",
      is_tooltip: 0,
      is_resizable: 0,
      component: "",
      options: "",
      params: "",
      description: "",
      sort_order: "0",
      is_required: 0,
      is_default: 0,
      is_enable: 1,
      operate_ip: "",
      operate_uid: "",
      created_at: "",
      updated_at: "",
    };
    return {
      header: {},
      headerOptions: [],
      tableEditConfig: {
        editable: true,
        saveHandle: this.cellSave,
      },
      operType: "add",
      operDailog: {
        title: "",
        visible: false,
        entity: {},
        rules: {},
        items: items.headerOptions,
        viewFields: [
          "field",
          "label",
          "sort_order",
          "width",
          "fixed",
          "default",
          "is_enable",
          "align",
          "is_required",
          "is_default",
          "is_tooltip",
          "is_resizable",
          "description",
          "component",
          "options",
          "params",
        ],
        textFields: [],
        buttons: ["submit", "cancel"],
        defaultEntity: copy(defaultEntity),
      },
      viewDailog: {
        title: "查看表头",
        visible: false,
        entity: {},
        rules: {},
        items: items.headerOptions,
        viewFields: [],
        textFields: [],
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
      beforeRender(item, idx) {},
    };
  },
  components: {
    CTable: () => import("@qingbing/element-table"),
    CButtons: () => import("./../../components/formButton"),
    // 在自组件需要使用的组件，全部小写
    operate: () => import("./../../components/operate"),
  },
  mounted() {
    this.operDailog.entity = copy(this.operDailog.defaultEntity);
  },
  methods: {
    init(headerKey) {
      if (isEmpty(headerKey)) {
        Router.error404(this);
        return;
      }
      // 获取表头详情
      ReqHeader.headerView({ key: headerKey })
        .then((res) => {
          this.header = res.data;
        })
        .catch(() => Router.error404(this));
    },
    getHeaders(cb) {
      console.log(items.options.fixed);
      cb([
        { name: "_idx", label: "序号", fixed: "left", width: "50" },
        {
          name: "field",
          label: "选项字段",
          fixed: "left",
          align: "left",
          width: "100",
        },
        {
          name: "label",
          label: "选项名称",
          fixed: "left",
          align: "left",
          width: "150",
          is_editable: true,
          params: {
            type: "text",
          },
        },
        {
          name: "sort_order",
          label: "排序",
          width: "50",
          is_editable: true,
          params: {
            type: "text",
          },
        },
        {
          name: "width",
          label: "列宽度",
          width: "80",
          is_editable: true,
          params: {
            type: "text",
          },
        },
        {
          name: "default",
          label: "默认值",
          width: "60",
          is_editable: true,
          params: {
            type: "text",
          },
        },
        { name: "component", label: "组件名", width: "80", default: "-" },
        {
          name: "fixed",
          label: "固定方向",
          width: "80",
          is_editable: true,
          params: {
            type: "select",
            options: items.options.fixed,
          },
        },
        {
          name: "align",
          label: "对齐方式",
          width: "80",
          is_editable: true,
          params: {
            type: "select",
            options: items.options.align,
          },
        },
        {
          name: "is_tooltip",
          label: "过长隐藏",
          width: "80",
          is_editable: true,
          params: {
            type: "switch",
          },
        },
        {
          name: "is_resizable",
          label: "拖动宽度",
          width: "80",
          is_editable: true,
          params: {
            type: "switch",
          },
        },
        {
          name: "is_required",
          label: "必填",
          width: "80",
          is_editable: true,
          params: {
            type: "switch",
          },
        },
        {
          name: "is_default",
          label: "默认开启",
          width: "50",
          is_editable: true,
          params: {
            type: "switch",
          },
        },
        {
          name: "is_enable",
          label: "是否公开",
          width: "80",
          is_editable: true,
          params: {
            type: "switch",
          },
        },
        {
          name: "operate",
          label: "操作",
          component: "operate",
          width: "260",
          fixed: "right",
          params: {
            buttons: [
              { operType: "view", handle: this.buttonView },
              { operType: "edit", handle: this.buttonEdit },
              { operType: "delete", handle: this.handleDelete },
              { label: "上移", handle: this.handleUp },
              { label: "下移", handle: this.handleDown },
            ],
          },
        },
      ]);
    },
    getData(cb) {
      ReqHeader.optionList({ header_key: this.$route.params.key })
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    buttonRefresh() {
      ReqHeader.optionRefresh({ header_key: this.header.key })
        .then(() => {
          // 刷新表格
          Helper.reloadTable(this, "pageTable");
        })
        .catch((err) => err);
    },
    buttonCloseWindow() {
      Router.closeWin();
    },
    // 设置 dailog 为开启状态
    openDialog(name) {
      if (isUndefined(this[name])) {
        dump.error(`组件未设置名为 ${name} 的 dailog`);
      }
      this.openDialogRef = name;
      this[name].visible = true;
    },
    // 设置 dailog 为关闭状态
    closeDialog(name) {
      if (isUndefined(this[name])) {
        this[this.openDialogRef].visible = false;
      } else {
        this[name].visible = false;
      }
    },
    // 判断是否添加操作
    isAdd() {
      return "add" === this.operType;
    },
    buttonAdd() {
      this.operType = "add";
      // 设置 operDailog 表单数据
      this.operDailog.entity = copy(this.operDailog.defaultEntity);
      this.operDailog.title = `添加表头${this.header.name}选项`;
      // 打开 dailog
      this.openDialog("operDailog");
    },
    buttonEdit(entity) {
      this.operType = "edit";
      // 设置 operDailog 表单数据
      this.operDailog.entity = copy(entity);
      this.operDailog.title = `编辑表头${this.header.name}选项`;
      // 打开 dailog
      this.openDialog("operDailog");
    },
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
    // 表格编辑的保存
    cellSave(cb, change, properties) {
      ReqHeader.optionEdit(
        merge(change, { id: properties.id, header_key: this.header.key })
      )
        .then(() => cb(true))
        .catch((err) => err);
    },
    // 保存数据,回调函数终止提交标记
    handleSave(successCb, failureCb) {
      let promise;
      if (this.isAdd()) {
        promise = ReqHeader.optionAdd(this.operDailog.entity);
      } else {
        promise = ReqHeader.optionEdit(this.operDailog.entity);
      }
      promise
        .then((res) => {
          successCb(res.message);
          // 关闭 dailog
          this.closeDialog();
          // 刷新列表
          this.$refs["pageTable"].refreshTable();
        })
        .catch((res) => failureCb(res.message));
    },
    handleDelete(entity, successCb, failureCb) {
      ReqHeader.optionDel({ id: entity.id })
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.$refs["pageTable"].refreshTable();
        })
        .catch((res) => failureCb(res));
    },
    // 顺序上移
    handleUp(entity, successCb, failureCb) {
      ReqHeader.optionUp({ id: entity.id })
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.$refs["pageTable"].refreshTable();
        })
        .catch((res) => failureCb(res));
    },
    // 顺序下移
    handleDown(entity, successCb, failureCb) {
      ReqHeader.optionDown({ id: entity.id })
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.$refs["pageTable"].refreshTable();
        })
        .catch((res) => failureCb(res));
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.params.key != from.params.key) {
        this.init(to.params.key); // 重新初始化数据
        this.$refs["pageTable"].refreshTable();
      }
    },
  },
};
</script>
