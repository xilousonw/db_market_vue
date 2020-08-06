<template>
  <div class="register">
    <div class="box">
      <i class="el-icon-close" @click="close_register"></i>
      <div class="content">
        <div class="nav">
          <span class="active">新用户注册</span>
        </div>
        <el-form>
          <el-input
            placeholder="手机号"
            prefix-icon="el-icon-phone-outline"
            v-model="mobile"
            clearable
            @blur="check_mobile">
          </el-input>
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-key"
            v-model="password"
            clearable
            show-password>
          </el-input>
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-chat-line-round"
            v-model="sms"
            clearable>
            <template slot="append">
              <span class="sms" @click="send_sms">{{ sms_interval }}</span>
            </template>
          </el-input>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form>
        <div class="foot">
          <span @click="go_login">立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        mobile: '',
        password: '',
        sms: '',
        sms_interval: '获取验证码',
        is_send: false,
      }
    },
    methods: {
      close_register() {
        this.$emit('close', false)
      },
      go_login() {
        this.$emit('go')
      },
      check_mobile() {
        if (!this.mobile) return;
        //字符串.match(/正则表达式/)
        if (!this.mobile.match(/^1[3-9][0-9]{9}$/)) {
          this.$message({
            message: '手机号有误',
            type: 'warning',
            duration: 1000,
            onClose: () => {
              this.mobile = '';
            }
          });
          return false;
        }
        this.$axios.get(this.$settings.base_url + '/user/check_telephone/', {params: {telephone: this.mobile}}).then(response => {
          if (response.data.code) {
            this.$message({
              message: '您已经注册过了，快去登录把',
              type: 'warning',
              duration: 1000,
              onClose: () => {
                this.go_login()
              }
            });

          } else {
            this.is_send = true;
            this.$message({
              message: '该用户没有注册过，欢迎注册我们的平台',
              type: 'success',
              duration: 1000,
            });
          }
        }).catch(error => {
          console.log(error)
        })

      },
      send_sms() {

        if (!this.is_send) return;
        this.is_send = false;
        let sms_interval_time = 60;
        this.sms_interval = "发送中...";

        this.$axios.get(this.$settings.base_url + '/user/send/', {params: {'telephone': this.mobile}})
          .then(response => {
            if (response.data.code) {
              this.$message({
                message: '发送验证码成功',
                type: 'success',
                duration: 1000,

              });
            }
          })


        // setInterval(()=>{},100)
        //定时器：每隔一秒种，把数字减一，当减到小于1，按钮又能点了，显示获取验证码
        let timer = setInterval(() => {
          if (sms_interval_time <= 1) {
            clearInterval(timer);  //如果小于等于1，把定时器清除
            this.sms_interval = "获取验证码";
            this.is_send = true; // 重新回复点击发送功能的条件
          } else {
            sms_interval_time -= 1;
            this.sms_interval = `${sms_interval_time}秒后再发`;
          }
        }, 1000);
      },
      register() {
        if (this.mobile && this.sms && this.password) {
          this.$axios.post(this.$settings.base_url + '/user/register/', {
            telephone: this.mobile,
            code: this.sms,
            password: this.password
          }).then(response => {
            if (response.data.code) {
              //注册成功，来个提示，跳转到登录
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.go_login()
                }
              });
            } else {
              this.$message({
                message: '未知错误',
                type: 'error',
                duration: 1000,
                onClose: () => {
                  this.mobile = ''
                  this.sms = ''
                  this.password = ''
                }
              });
            }
          })
        } else {
          this.$message({
            message: '你有没填的信息',
            type: 'error',
            duration: 1000,
          });
        }
      },
    }
  }
</script>


<style scoped>

</style>
