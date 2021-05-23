<script>
// 导入包
import ECuri from "@/extends/curi.vue";
import { copy, merge } from "@qingbing/helper";
import items from "./../json/header";

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
    getHeaders(cb) {
      cb([
        { name: "_idx", label: "序号", fixed: "left" },
        { name: "date", label: "日期", width: "100", default: "0000-00-00" },
        { name: "name", label: "姓名", width: "150" },
        { name: "age", label: "年龄", width: "50" },
        { name: "sex", label: "性别", width: "50", align: "left" },
        {
          name: "operate",
          label: "操作",
          component: "operate",
          params: {
            buttonEdit: this.buttonEdit,
            buttonView: this.buttonView,
            handleDelete: this.handleDelete,
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
    handleDelete(entity) {
      console.log(entity);
      console.log(this);
    },
    // 保存数据,cb() 终止提交提示
    handleSave(cb) {
      console.log(this.operDailog.entity);
      cb();
    },
  },
};
</script>
