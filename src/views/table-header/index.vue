<script>
// 导入包
import ECuri from "@/extends/curi.vue";
import { merge, col_value } from "@qingbing/helper";
import items from "./../json/header";
import Labels from "@/conf/labels";
import { headerList, headerAdd, headerEdit, headerDel } from "@/api/header";
import Router from "@/utils/router-helper";

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
              { label: "子选项", handle: this.buttonOptions },
            ],
          },
        },
      ]);
    },
    getData(cb) {
      headerList(merge(this.query, this.pagination))
        .then((res) => cb(res.data))
        .catch(() => {});
    },
    handleDelete(entity, successCb, failureCb) {
      headerDel(entity)
        .then((res) => {
          successCb(res.message);
          // 添加成功，刷新列表
          this.$refs["pageTable"].refreshTable();
        })
        .catch((res) => failureCb(res));
    },
    // 保存数据,cb() 终止提交提示
    handleSave(successCb, failureCb) {
      let promise;
      if (this.isAdd()) {
        promise = headerAdd(this.operDailog.entity);
      } else {
        promise = headerEdit(this.operDailog.entity);
      }
      promise
        .then((res) => {
          successCb(res.message);
          // 关闭 dailog
          this.closeDialog();
          // 添加成功，刷新列表
          this.$refs["pageTable"].refreshTable();
        })
        .catch((res) => failureCb(res.message));
    },
    // 打开新窗口，管理表头选项
    buttonOptions(entity) {
      Router.open(this, `/table-header/options/${entity.key}`, true);
    },
  },
};
</script>
