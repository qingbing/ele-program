<script>
// 导入包
import ECuri from "@/extends/curi.vue";
import { merge, col_value } from "@qingbing/helper";
import items from "./../json/header";
import Labels from "@/conf/labels";

// 导入包
export default {
  extends: ECuri,
  components: {
    // 在自组件需要使用的组件，全部小写
    operate: () => import("@/components/operate"),
  },
  data() {
    return {
      addButtonText: "添加表头",
      query: {
        key: "",
        name: "",
        is_open: "",
      },
      queryItems: {
        key: {
          input_type: "input-text",
          label: "表头标识",
        },
        name: {
          input_type: "input-text",
          label: "表头名称",
        },
        is_open: { dataType: "yesNo", label: "是否公开" },
      },
      operDailog: {
        items: items.header,
        defaultEntity: {
          key: "",
          name: "",
          is_open: 0,
          sort_order: "023",
          description: "",
        },
      },
      viewDailog: {
        title: "查看表头",
        items: items.header,
        buttons: ["cancel"],
        defaultEntity: {
          key: "",
          name: "",
          is_open: 0,
          sort_order: "023",
          description: "",
        },
      },
    };
  },
  methods: {
    // 列数据渲染前可修改列数据
    beforeRender(item) {
      item.is_open_label = col_value(item.is_open, Labels.yesNo);
    },
    getHeaders(cb) {
      cb([
        { name: "_idx", label: "序号", fixed: "left", width: "50" },
        { name: "key", label: "表头标识", align: "left", width: "100" },
        { name: "name", label: "表头名称", align: "left", width: "150" },
        { name: "is_open_label", label: "是否公开", width: "80" },
        {
          name: "operate",
          label: "操作",
          component: "operate",
          align: "left",
          params: {
            buttons: [
              { operType: "view", handle: this.buttonView },
              { operType: "edit", handle: this.buttonEdit },
              { operType: "delete", handle: this.handleDelete },
            ],
          },
        },
      ]);
    },
    getData(cb) {
      this.ajaxMethod(
        "/header/list",
        merge(this.query, this.pagination),
        "post",
        (res) => {
          cb(res);
        }
      );
    },
    handleDelete(entity, successCb, failureCb) {
      console.log(entity);
      console.log(this);
      // successCb();
      failureCb();
    },
    // 保存数据,cb() 终止提交提示
    handleSave(cb) {
      console.log(this.operDailog.entity);
      cb();
    },
  },
};
</script>
