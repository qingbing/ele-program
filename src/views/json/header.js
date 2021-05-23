// 导入
import labels from "./../../conf/labels";
// 用户字段
export default {
  header: {
    key: {
      input_type: "input-text",
      label: "表头标识",
      rules: [{ type: "required" }],
    },
    name: {
      input_type: "input-text",
      label: "表头名称",
      rules: [{ type: "required" }],
    },
    is_open: {
      input_type: "input-select",
      label: "是否公开",
      exts: {
        options: labels.yesNo,
      },
      rules: [{ type: "required" }, { type: "enum" }],
    },
    sort_order: {
      input_type: "input-number",
      label: "排序",
      rules: [{ type: "required" }, { type: "number", min: 0, max: 127 }],
    },
    description: {
      input_type: "input-area",
      label: "描述",
      rules: [],
    },
  },
};
