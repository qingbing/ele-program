<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import {
  getHeaderOptions,
  getFormOptions,
  getOptionSystems,
  getOptionRouteTypes,
} from "@/api/pub";
import { merge, copy, isEmpty, asyncAll, isUndefined } from "@qingbing/helper";
import ReqRoute from "@/api/route";
import Labels from "@/conf/labels";

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
      system_alias: "",
      route_type: "",
      type_name: "",
      description: "",
      sort_order: "127",
    };
    return {
      // 缓存系统的路由类型
      systemsRouteTypes: {},
      tableEditConfig: {
        editable: false,
        saveHandle: this.cellSave,
      },
      query: {
        search: {
          system_alias: "",
          route_type: "",
          route: "",
          is_operate: "",
          is_logging: "",
          is_mocking: "",
        },
        searchItems: {
          system_alias: {
            input_type: "input-select",
            label: "所属系统",
            exts: {
              changeCallback: this.querySystemChange,
              clearable: true,
              options: {},
            },
          },
          route_type: {
            input_type: "input-select",
            label: "路由类型",
            exts: {
              clearable: true,
              options: {},
            },
          },
          route: {
            input_type: "input-text",
            label: "路由",
          },
          is_operate: {
            input_type: "input-select",
            label: "操作类",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_logging: {
            input_type: "input-select",
            label: "开启日志",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_mocking: {
            input_type: "input-select",
            label: "开启mock",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
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
        ],
      },
      // add-dailog 用于编辑路由配置
      addDailog: {
        title: "路由配置",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "route",
          "system_alias",
          "description",
          "route_type",
          "is_operate",
          "is_logging",
          "logging_key_fields",
          "logging_message",
          "is_mocking",
          "mocking_response",
        ],
        textFields: [
          "route",
          "system_alias",
          "description",
          "route_type",
          "is_operate",
        ],
      },
      editDailog: {
        title: "编辑路由",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "route",
          "system_alias",
          "route_type",
          "is_operate",
          "sort_order",
          "description",
        ],
        textFields: ["route", "system_alias"],
      },
      viewDailog: {
        title: "查看路由",
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    // 列数据渲染前可修改列数据
    beforeRender(item, idx) {
      item.is_operate = parseInt(item.is_operate);
      item.is_logging = parseInt(item.is_logging);
      item.is_mocking = parseInt(item.is_mocking);
      try {
        item.mocking_response = JSON.parse(item.mocking_response);
      } catch (error) {
        item.mocking_response = null;
      }
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
    // 改变筛选系统时，级联改变路由类型
    querySystemChange() {
      this.query.search.route_type = "";
      if (isEmpty(this.query.search.system_alias)) {
        this.query.searchItems.route_type.exts.options = {};
      } else {
        getOptionRouteTypes(this.query.search.system_alias)
          .then((res) => {
            this.query.searchItems.route_type.exts.options = res.data;
          })
          .catch((err) => err);
      }
    },
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        systems: getOptionSystems(),
        options: getFormOptions("program-route-record"),
        headers: getHeaderOptions("program-route-record"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 系统
        headers.system_alias.options = res.systems;
        // 列表操作
        headers.operate.params = {
          buttons: [
            { operType: "view", handle: this.buttonView },
            { operType: "edit", handle: this.buttonEdit },
            { label: "路由配置", handle: this.buttonEditConfig },
            { operType: "delete", handle: this.handleDelete },
          ],
        };
        cb(headers);
        // 查询条件
        this.query.searchItems.system_alias.exts.options = res.systems;
        // 表单选项
        const items = res.options;
        items.system_alias.exts = {
          options: res.systems,
        };
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
        this.addDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqRoute.routeRecordList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    _openDailogForm(entity, callback) {
      if (this.systemsRouteTypes[entity.system_alias]) {
        callback(this.systemsRouteTypes[entity.system_alias]);
      } else {
        getOptionRouteTypes(entity.system_alias)
          .then((res) => {
            this.systemsRouteTypes[entity.system_alias] = res.data;
            callback(this.systemsRouteTypes[entity.system_alias]);
          })
          .catch((err) => err);
      }
    },
    // 编辑按钮
    buttonEdit(entity) {
      this._openDailogForm(entity, (routeTypeOptions) => {
        this.editDailog.items.route_type.exts = {
          options: routeTypeOptions,
        };
        // 设置 editDailog 表单数据
        this.editDailog.entity = copy(entity);
        // 打开 dailog
        this.openDialog("editDailog");
      });
    },
    // 查看按钮
    buttonView(entity) {
      this._openDailogForm(entity, (routeTypeOptions) => {
        this.viewDailog.items.route_type.exts = {
          options: routeTypeOptions,
        };
        // 设置 viewDailog 表单数据
        this.viewDailog.entity = copy(entity);
        // 打开 dailog
        this.openDialog("viewDailog");
      });
    },
    // 保存单元格
    cellSave(cb, change, properties, params) {
      let promise;
      if (isUndefined(change.is_logging) && isUndefined(change.is_mocking)) {
        // 路由编辑
        promise = ReqRoute.routeRecordEdit(
          merge(change, { id: properties.id })
        );
      } else {
        // 路由配置
        promise = ReqRoute.routeRecordEditRecordConfig(
          merge(change, { id: properties.id })
        );
      }
      promise
        .then(() => {
          cb(true);
          this.reloadTable();
        })
        .catch(() => cb(false));
    },
    handleDelete(entity, successCb, failureCb) {
      ReqRoute.routeRecordDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqRoute.routeRecordEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 路由配置使用 addDialog
    buttonEditConfig(entity) {
      this._openDailogForm(entity, (routeTypeOptions) => {
        this.addDailog.items.route_type.exts = {
          options: routeTypeOptions,
        };
        // 设置 addDailog 表单数据
        this.addDailog.entity = copy(entity);
        // 打开 dailog
        this.openDialog("addDailog");
      });
    },
    // 路由配置使用 addDialog
    handleAdd(successCb, failureCb) {
      const promise = ReqRoute.routeRecordEditRecordConfig(
        this.addDailog.entity
      );
      this.addOrEditSave(promise, successCb, failureCb);
    },
  },
};
</script>
