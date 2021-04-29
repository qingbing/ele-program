<template>
  <el-form-item>
    <el-button
      v-for="(item, idx) in buttons"
      :type="item.type"
      @click="item.handle($event, idx)"
      :key="uniqid + '_' + idx"
      >{{ item.label }}</el-button
    >
  </el-form-item>
</template>

<script>
// 导入
import {
  each,
  isUndefined,
  isObject,
  isFunction,
  dump,
  uniqid,
} from "@qingbing/helper";
// 导出
export default {
  props: {
    uniqid: {
      type: String,
      default: uniqid(),
    },
    refForm: {
      type: String,
      default: "form",
    },
    /**
     * button 按钮组
     */
    buttons: {
      type: Array,
      default: () => {
        return ["submit", "reset"];
      },
    },
    /**
     * 提交按钮配置
     */
    submitType: {
      type: String,
      default: "warning",
    },
    submitLabel: {
      type: String,
      default: "提交",
    },
    submitCallback: {
      type: Function,
    },
    /**
     * 重置按钮配置
     */
    resetType: {
      type: String,
      default: "default",
    },
    resetLabel: {
      type: String,
      default: "重置",
    },
    resetCallback: {
      type: Function,
    },
  },
  data() {
    each(this.buttons, (item, idx) => {
      if ("submit" == item) {
        this.buttons[idx] = {
          type: this.submitType,
          label: this.submitLabel,
          handle: this.submitHandle,
        };
      } else if ("reset" == item) {
        this.buttons[idx] = {
          type: this.resetType,
          label: this.resetLabel,
          handle: this.resetHandle,
        };
      } else if (!isObject(item)) {
        dump.error("组件 formButton 参数必须是JsonObject");
      } else if (isUndefined(item.label)) {
        dump.error("组件 formButton 对象参数必须指定 lable");
      } else {
        isUndefined(item.type) && (this.buttons[idx].type = "primary");
        isUndefined(item.label) && (this.buttons[idx].label = "Button");
        item.handle = this.commonHandle;
      }
    });
    return {
      submitLoading: false,
      vmForm: undefined,
    };
  },
  methods: {
    // 获取操作表单
    getVmForm() {
      if (isUndefined(this.vmForm)) {
        let vmForm;
        let $vm = this;
        do {
          if ($vm.$refs[this.refForm]) {
            vmForm = $vm;
            break;
          }
          $vm = $vm.$parent;
        } while ($vm);
        if (!vmForm) {
          dump.error(`buttons 组件中 ${this.refForm} 未找到`);
        }
        this.vmForm = vmForm;
      }
      return this.vmForm;
    },
    /**
     * 提交按钮句柄
     */
    submitHandle() {
      if (this.submitLoading) {
        return this.$message({
          message: "表单提交中，请勿重复提交",
          type: "warning",
        });
      }
      this.submitLoading = true;
      if (isFunction(this.submitCallback)) {
        this.submitCallback.call(this.getVmForm(), () => {
          this.submitLoading = false;
        });
      } else {
        // 后台数据处理
        this.submitLoading = false;
      }
    },
    /**
     * 重置按钮句柄
     */
    resetHandle() {
      this.submitLoading = false;
      if (isFunction(this.resetCallback)) {
        return this.resetCallback.call(this.vmForm, this);
      }
      this.vmForm.$refs[this.refForm].resetFields();
    },
    /**
     * 普通按钮句柄
     */
    commonHandle(_, idx) {
      const buttonItem = this.buttons[idx];
      if (isFunction(buttonItem.callback)) {
        return buttonItem.callback.call(this.vmForm);
      }
    },
  },
};
</script>
