// 导入
import Labels from "./../../conf/labels";

const fixed = {
  left: "靠左",
  right: "靠右",
};

const align = {
  left: "左对齐",
  center: "居中对齐",
  right: "右对齐",
};

// 用户字段
export default {
  options: {
    fixed,
    align,
  },
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
        options: Labels.yesNo,
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
  headerOptions: {
    id: {
      input_type: "view-text",
      label: "自增ID",
    },
    header_key: {
      input_type: "view-text",
      label: "表头标志",
    },
    field: {
      input_type: "input-text",
      label: "字段名",
      rules: [{ type: "required" }],
    },
    label: {
      input_type: "input-text",
      label: "显示名",
      rules: [{ type: "required" }],
    },
    sort_order: {
      input_type: "input-number",
      label: "排序",
      rules: [{ type: "required" }, { type: "number", min: 0, max: 127 }],
    },
    width: {
      input_type: "input-text",
      label: "固定宽度",
    },
    fixed: {
      input_type: "input-select",
      label: "列固定",
      exts: {
        clearable: true,
        options: fixed,
      },
    },
    default: {
      input_type: "input-text",
      label: "默认值",
    },
    is_enable: {
      input_type: "input-select",
      label: "是否开启",
      exts: {
        clearable: true,
        options: Labels.enable,
      },
    },
    align: {
      input_type: "input-select",
      label: "对齐方式",
      exts: {
        clearable: true,
        options: align,
      },
    },
    is_required: {
      input_type: "input-select",
      label: "是否必选",
      exts: {
        clearable: true,
        options: Labels.yesNo,
      },
    },
    is_default: {
      input_type: "input-select",
      label: "默认开启",
      exts: {
        clearable: true,
        options: Labels.yesNo,
      },
    },
    is_tooltip: {
      input_type: "input-select",
      label: "使用tooltip",
      exts: {
        clearable: true,
        options: Labels.yesNo,
      },
    },
    is_resizable: {
      input_type: "input-select",
      label: "开启拖动",
      exts: {
        clearable: true,
        options: Labels.yesNo,
      },
    },
    description: {
      input_type: "input-area",
      label: "描述",
    },
    component: {
      input_type: "input-text",
      label: "组件",
    },
    options: {
      input_type: "json-editor",
      label: "字段映射",
    },
    params: {
      input_type: "json-editor",
      label: "参数内容",
    },
    operate_ip: {
      input_type: "view-text",
      label: "操作IP",
    },
    operate_uid: {
      input_type: "view-text",
      label: "操作UID",
    },
    created_at: {
      input_type: "view-text",
      label: "创建时间",
    },
    updated_at: {
      input_type: "view-text",
      label: "更新时间",
    },
  },
};
