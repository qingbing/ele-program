<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { getHeaderOptions, getFormOptions, getOptionSystems } from "@/api/pub";
import { merge, copy, asyncAll } from "@qingbing/helper";
import ReqRoute from "@/api/route";

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
      query: {
        search: {
          system_alias: "",
          route_type: "",
          type_name: "",
        },
        searchItems: {
          system_alias: {
            input_type: "input-select",
            label: "所属系统",
            exts: {
              clearable: true,
              options: {},
            },
          },
          route_type: {
            input_type: "input-text",
            label: "路由类型标识",
          },
          type_name: {
            input_type: "input-text",
            label: "路由类型名称",
          },
        },
      },
      addDailog: {
        title: "添加路由类型",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "system_alias",
          "route_type",
          "type_name",
          "sort_order",
          "description",
        ],
      },
      editDailog: {
        title: "编辑路由类型",
        defaultEntity: copy(defaultEntity),
        viewFields: [
          "system_alias",
          "route_type",
          "type_name",
          "sort_order",
          "description",
        ],
        textFields: ["system_alias", "route_type"],
      },
      viewDailog: {
        title: "查看路由类型",
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    getAddButtonText() {
      return "添加路由类型";
    },
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        systems: getOptionSystems(),
        options: getFormOptions("program-route-type"),
        headers: getHeaderOptions("program-route-type"),
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
        this.addDailog.items = copy(items);
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqRoute.routeTypeList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    handleDelete(entity, successCb, failureCb) {
      ReqRoute.routeTypeDel(entity)
        .then((res) => {
          successCb(res.message);
          // 刷新列表
          this.reloadTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,回调函数终止提交标记
    handleAdd(successCb, failureCb) {
      const promise = ReqRoute.routeTypeAdd(this.addDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
    // 保存数据,回调函数终止提交标记
    handleEdit(successCb, failureCb) {
      const promise = ReqRoute.routeTypeEdit(this.editDailog.entity);
      this.addOrEditSave(promise, successCb, failureCb);
    },
  },
};
</script>
