<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import {
  getHeaderOptions,
  getFormOptions,
  getOptionSystems,
  getOptionRouteTypes,
} from "@/api/pub";
import { isEmpty, merge, copy, asyncAll } from "@qingbing/helper";
import Labels from "@/conf/labels";
import ReqLogs from "@/api/logs";

// 导入包
export default {
  extends: EListTable,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  data() {
    const defaultEntity = {
      key: "",
      name: "",
      is_open: 0,
      sort_order: "127",
      description: "",
    };
    return {
      query: {
        search: {
          system_alias: "",
          route_type: "",
          is_operate: "",
          is_success: "",
          route: "",
          trace_id: "",
          keyword: "",
          ip: "",
          uid: "",
          message: "",
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
          is_operate: {
            input_type: "input-select",
            label: "操作类",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          is_success: {
            input_type: "input-select",
            label: "是否成功",
            exts: {
              clearable: true,
              options: Labels.yesNo,
            },
          },
          route: {
            input_type: "input-text",
            label: "路由",
          },
          trace_id: {
            input_type: "input-text",
            label: "Trace-ID",
          },
          keyword: {
            input_type: "input-text",
            label: "关键字",
          },
          ip: {
            input_type: "input-text",
            label: "访问IP",
          },
          uid: {
            input_type: "input-text",
            label: "UID",
          },
          message: {
            input_type: "input-text",
            label: "日志消息",
          },
        },
        buttons: [
          {
            label: "查询",
            type: "primary",
            callback: this.buttonQuery,
          },
          "reset",
        ],
      },
      viewDailog: {
        title: "查看路由访问日志",
        buttons: ["cancel"],
        defaultEntity: copy(defaultEntity),
      },
    };
  },
  methods: {
    beforeRender(item, idx) {
      item.input = JSON.parse(item.input);
      item.output = JSON.parse(item.output);
      item.exts = JSON.parse(item.exts);
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
        options: getFormOptions("program-logs-route"),
        routeTypes: getOptionRouteTypes(),
        headers: getHeaderOptions("program-logs-route"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 系统
        headers.system_alias.options = res.systems;
        headers.route_type.options = res.routeTypes;
        // 列表操作
        headers.operate.params = {
          buttons: [{ operType: "view", handle: this.buttonView }],
        };
        cb(headers);
        // 查询条件
        this.query.searchItems.system_alias.exts.options = res.systems;
        // 表单选项
        const items = res.options;
        items.system_alias.exts = {
          options: res.systems,
        };
        items.route_type.exts = {
          options: res.routeTypes,
        };
        this.editDailog.items = copy(items);
        this.viewDailog.items = copy(items);
        this.addDailog.items = copy(items);
      });
    },
    getData(cb) {
      ReqLogs.routeLogList(merge(this.query.search, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
  },
};
</script>
