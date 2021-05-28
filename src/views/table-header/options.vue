<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { isEmpty, merge, copy } from "@qingbing/helper";
import items from "./../json/header";
import Helper from "@/utils/helper";
import ReqHeader from "@/api/header";
import Router from "@/utils/router-helper";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
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
      pagination: undefined, // 取消分页
      tableEditConfig: {
        editable: true,
        saveHandle: this.cellSave,
      },
      query: {
        buttons: [
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      addDailog: {
        title: "添加表头选项",
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
          "is_required",
          "is_default",
          "is_enable",
          "align",
          "is_tooltip",
          "is_resizable",
          "is_editable",
          "description",
          "component",
          "options",
          "params",
        ],
        textFields: [],
        buttons: ["submit", "cancel"],
        defaultEntity: copy(defaultEntity),
      },
      editDailog: {
        title: "编辑表头选项",
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
          "is_required",
          "is_default",
          "is_enable",
          "align",
          "is_tooltip",
          "is_resizable",
          "is_editable",
          "description",
          "component",
          "options",
          "params",
        ],
        textFields: ["field"],
        buttons: ["submit", "cancel"],
        defaultEntity: copy(defaultEntity),
      },
      viewDailog: {
        title: "查看表头选项",
        visible: false,
        entity: {},
        rules: {},
        items: items.headerOptions,
        viewFields: [],
        textFields: [],
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    // 添加按钮文字
    getAddButtonText() {
      return "添加表头选项";
    },
    init(headerKey) {
      if (isEmpty(headerKey)) {
        Router.error404(this);
        return;
      }
      // 获取表头详情
      ReqHeader.headerView({ key: headerKey })
        .then((res) => {
          this.header = res.data;
          this.pageTable = `表头选项[${this.header.name}]`;
        })
        .catch(() => Router.error404(this));
    },
    getHeaders(cb) {
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
          width: "80",
          is_editable: true,
          params: {
            type: "switch",
          },
        },
        {
          name: "is_enable",
          label: "是否开启",
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
    buttonAdd() {
      // 设置 addDailog 表单数据
      this.addDailog.entity = copy(this.addDailog.defaultEntity);
      this.addDailog.title = `添加表头${this.header.name}选项`;
      // 打开 dailog
      this.openDialog("addDailog");
    },
    buttonEdit(entity) {
      // 设置 editDailog 表单数据
      this.editDailog.entity = copy(entity);
      this.editDailog.title = `编辑表头${this.header.name}选项`;
      // 打开 dailog
      this.openDialog("editDailog");
    },
    buttonView(entity) {
      // 设置 viewDailog 表单数据
      this.viewDailog.entity = copy(entity);
      // 打开 dailog
      this.openDialog("viewDailog");
    },
    // 表格编辑的保存
    cellSave(cb, change, properties) {
      ReqHeader.optionEdit(
        merge(change, { id: properties.id, header_key: this.header.key })
      )
        .then(() => cb(true))
        .catch(() => cb(false));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqHeader.optionAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqHeader.optionEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
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
