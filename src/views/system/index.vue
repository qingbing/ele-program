<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { getHeaderOptions, getFormOptions } from "@/api/pub";
import Labels from "@/conf/labels";
import { merge, copy, asyncAll } from "@qingbing/helper";
import ReqSystem from "@/api/system";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  created() {},
  data() {
    const defaultEntity = {
      alias: "",
      name: "",
      uri_prefix: "",
      rule: "",
      ext: {},
      description: "",
      sort_order: "",
      is_enable: 1,
      is_continue: 1,
      is_record_field: 1,
      is_open_log: 1,
    };
    return {
      tableEditConfig: {
        editable: false,
        saveHandle: this.cellSave,
      },
      query: {
        search: {
          alias: "",
          is_enable: "",
          is_continue: "",
          is_record_field: "",
          name: "",
        },
        searchItems: {
          alias: {
            input_type: "input-text",
            label: "系统别名",
          },
          is_enable: {
            input_type: "input-select",
            label: "启用状态",
            exts: {
              options: Labels.enable,
            },
          },
          is_continue: {
            input_type: "input-select",
            label: "未申明是否调用",
            exts: {
              options: Labels.yesNo,
            },
          },
          is_record_field: {
            input_type: "input-select",
            label: "是否记录字段",
            exts: {
              options: Labels.yesNo,
            },
          },
          name: {
            input_type: "input-text",
            label: "系统名称",
          },
        },
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset",
          {
            label: "开启编辑",
            type: "primary",
            callback: this.switchEdit,
          },
          {
            label: this.getAddButtonText(),
            type: "warning",
            callback: this.buttonAdd,
          },
        ],
      },
      addDailog: {
        title: "添加系统",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "rule",
          "alias",
          "name",
          "uri_prefix",
          "sort_order",
          "is_enable",
          "is_continue",
          "is_record_field",
          "is_open_log",
          "description",
          "ext",
        ],
      },
      editDailog: {
        title: "编辑系统",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "rule",
          "alias",
          "name",
          "uri_prefix",
          "sort_order",
          "is_enable",
          "is_continue",
          "is_record_field",
          "is_open_log",
          "description",
          "ext",
        ],
        textFields: ["rule", "alias"],
      },
      viewDailog: {
        title: "系统详情",
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    getAddButtonText() {
      return "添加系统";
    },
    switchEdit() {
      if (this.tableEditConfig.editable) {
        this.query.buttons[2].label = "开启编辑";
        this.query.buttons[2].type = "primary";
        this.tableEditConfig.editable = false;
      } else {
        this.query.buttons[2].label = "关闭编辑";
        this.query.buttons[2].type = "danger";
        this.tableEditConfig.editable = true;
      }
    },
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        options: getFormOptions("program-system-manage"),
        headers: getHeaderOptions("program-system-manage"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 列表操作
        headers.operate.params = {
          buttons: [
            { operType: "view", handle: this.buttonView },
            { operType: "edit", handle: this.buttonEdit },
            //{ operType: "delete", handle: this.handleDelete },
          ],
        };
        cb(headers);
        // 表单选项
        const items = res.options;
        this.addDailog.items = copy(items);
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqSystem.systemList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    handleDelete(entity, successCb, failureCb) {
      ReqSystem.systemDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqSystem.systemAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqSystem.systemEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存单元格
    cellSave(cb, change, properties, params) {
      ReqSystem.systemEdit(merge(change, { id: properties.id }))
        .then(() => {
          cb(true);
          this.reloadTable();
        })
        .catch(() => cb(false));
    },
  },
};
</script>
