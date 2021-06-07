<script>
import EForm from "@/extends/form.vue";
import Router from "@/utils/router-helper";
import { isEmpty, uniqid, merge } from "@qingbing/helper";
import ReqForm from "@/api/form";
import { getFormOptions } from "@/api/pub";

export default {
  extends: EForm,
  data() {
    this.init(this.$route.params.key);
    return {
      category: {},
      buttons: [
        "submit",
        "reset",
        {
          label: "关闭页面",
          type: "danger",
          callback: this.buttonCloseWindow,
        },
      ], // 默认展示按钮
    };
  },
  methods: {
    init(key) {
      if (isEmpty(key)) {
        Router.error404(this);
        return;
      }
      // 获取表单详情
      ReqForm.formView({ key: key })
        .then((res) => {
          this.category = res.data;
          if (!this.category.is_setting) {
            Router.error404(this);
          }
          this.pageTitle = `配置表单【${this.category.key}(${this.category.name})】`;

          // 获取配置表单界面选项信息
          getFormOptions(this.category.key)
            .then((res) => {
              this.items = res.data;
              // 获取配置表单值
              ReqForm.formSettingGet({
                key: this.category.key,
              })
                .then((res) => {
                  this.entity = res.data;
                  // 重新设置 key 而强制重新渲染页面
                  this.uniqueKey = uniqid();
                })
                .catch((err) => err);
            })
            .catch((err) => err);
        })
        .catch((err) => err);
    },
    // 保存结果
    handleSave(successCb, failureCb) {
      ReqForm.formSettingSave(
        merge(this.entity, {
          key: this.category.key,
        })
      )
        .then((res) => successCb(res.msg))
        .catch((err) => failureCb(err.msg));
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.params.key != from.params.key) {
        this.init(to.params.key); // 重新初始化数据
        this.reloadTable();
      }
    },
  },
};
</script>
