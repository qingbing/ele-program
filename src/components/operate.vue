<template>
  <span>
    <el-link type="info" @click="handView">详情</el-link> |
    <el-link type="warning" @click="handEdit">编辑</el-link> |
    <el-link type="danger" @click="handDelete">删除</el-link>
  </span>
</template>

<script>
// 导入包
import { isFunction } from "@qingbing/helper";
// 导出
export default {
  props: {
    scope: {
      type: Object,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
    property: {
      type: String,
      require: true,
    },
    row: {
      type: Object,
      require: false,
    },
    params: {
      type: Object,
      require: true,
      default: () => {
        return {};
      },
    },
    confirmText: {
      type: String,
      default: "数据一旦删除将无法恢复，确认要执行删除操作么？",
    },
    confirmTip: {
      type: String,
      default: "提示",
    },
    confirmButtonText: {
      type: String,
      default: "确定",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {};
  },
  methods: {
    handView() {
      if (isFunction(this.params.buttonView)) {
        this.params.buttonView(this.row);
      }
    },
    handEdit() {
      if (isFunction(this.params.buttonEdit)) {
        this.params.buttonEdit(this.row);
      }
    },
    handDelete() {
      if (isFunction(this.params.handleDelete)) {
        this.$confirm(this.confirmText, this.confirmTip, {
          confirmButtonText: this.confirmButtonText,
          cancelButtonText: this.cancelButtonText,
          type: "warning",
        })
          .then(() => {
            this.params.handleDelete(this.row, () => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
            });
          })
          .catch(() => {});
      }
    },
  },
};
</script>
