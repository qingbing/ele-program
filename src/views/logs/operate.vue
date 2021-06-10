<script>
// 导入包
import EListTable from "@/extends/list-table.vue";
import { getHeaderOptions, getFormOptions, getOptionSystems } from "@/api/pub";
import { merge, copy, asyncAll } from "@qingbing/helper";
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
    return {
      query: {
        search: {
          system_alias: "",
          id: "",
          trace_id: "",
          type: "",
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
              clearable: true,
              options: {},
            },
          },
          id: {
            input_type: "input-text",
            label: "日志ID",
          },
          trace_id: {
            input_type: "input-text",
            label: "Trace-ID",
          },
          type: {
            input_type: "input-text",
            label: "操作类型",
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
        title: "查看操作日志",
        buttons: ["cancel"],
        defaultEntity: {},
      },
    };
  },
  methods: {
    getHeaders(cb) {
      // 获取item，系统
      const promise = {
        systems: getOptionSystems(),
        options: getFormOptions("program-logs-operate"),
        headers: getHeaderOptions("program-logs-operate"),
      };
      asyncAll(promise, (res) => {
        const headers = res.headers;
        // 系统
        headers.system_alias.options = res.systems;
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
        this.viewDailog.items = copy(items);
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
