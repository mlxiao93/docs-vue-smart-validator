基于vue的表单校验指令

:::tip
[https://github.com/mlxiao93/vue-smart-validator](https://github.com/mlxiao93/vue-smart-validator)
:::

### 安装

```shell
npm i vue-smart-validator -S
```

### 引入
```javascript
import Vue from 'vue'
import Validator from 'vue-smart-validator'

Vue.use(new Validator());
```

### 基础用法

<script>
  export default {
      data () {
          return {
              username: '',
              email: '',
              gender: '',
              city: '',
              introduce: '',
              
              validator: {
                  username: [{rule: 'required', message: '必填', trigger: 'blur'}],    // 默认trigger为change
                  email: [
                      {rule: 'required', message: '必填'}, 
                      {rule: 'email', message: '邮箱格式错误'}
                  ],
                  gender: [{rule: 'required', message: '必选'}],
                  city: {
                      rules: [{rule: 'required', message: '必选'}],      // 当validator指令传入对象时，取rules属性作为校验规则
                      appendErrorTip: true         // 其它属性作为指令的局部options（此处与标签上写 validatro-appendErrorTip="true" 相同效果）
                  },
                  introduce: {
                      rules: [
                          {rule: 'required', message: '必填'},
                          {
                              rule: 'length',
                              min: '3',
                              max: '10',
                              message: function(modelValue) {     // message可传入函数
                                  return `3到10个字符`
                              }
                          }
                      ],
                      appendErrorTip: true,
                      trigger: 'change'
                  }
              }
          }
      },
      methods: {
          handleSubmit() {
              let error= this.$validator.check()    // 触发所有检验（返回的任是$validator）
                                        .getError();    // 得到所有错误信息
              if (error) {alert('invalid'); return;}
              alert('success');
          }
      }
  }
</script>
<style lang=scss>
    .validator-has-error {
        border: 1px solid red;
         & + span {
             color: red;
             margin-left: .5em;
         }
    }
    .container {
        > div {
            margin: 1em 0;
        }
        label {
            display: inline-block;
            width: 5em;
        }
    }
</style>

:::demo
```html
<template>
    <div class="container">
        <div>
            <label>姓名：</label>
            <input v-model="username" v-validator="validator.username">
            <span>{{$validator.firstError('username')}}</span>   <!-- 手动添加错误提示 -->
        </div>
        <div>
            <label>邮箱：</label>
            <input v-model="email" v-validator="validator.email" validator-appendErrorTip="ture">  <!-- 自动添加错误提示 -->
        </div>
        <div>
            <label>性别：</label>
            <input type="radio" value="0" v-model="gender" v-validator="validator.gender">男
            <input type="radio" value="1" v-model="gender" v-validator="validator.gender">女
            <span>{{$validator.firstError('gender')}}</span>
        </div>
        <div>
            <label>城市：</label>
            <select v-model="city" v-validator="validator.city">
              <option></option>
              <option>北京</option>
              <option>上海</option>
              <option>广州</option>
              <option>深圳</option>
            </select>
        </div>
        <div>
            <label>简介：</label>
            <textarea v-model="introduce" v-validator="validator.introduce"></textarea>
        </div>
        <div>
            <button @click="handleSubmit">提交</button>
        </div>
    </div>
</template>
<script>
  export default {
      data () {
          return {
              username: '',
              email: '',
              gender: '',
              city: '',
              introduce: '',
              
              validator: {
                  username: [{rule: 'required', message: '必填', trigger: 'blur'}],    // 默认trigger为change
                  email: [
                      {rule: 'required', message: '必填'}, 
                      {rule: 'email', message: '邮箱格式错误'}
                  ],
                  gender: [{rule: 'required', message: '必选'}],
                  city: {
                      rules: [{rule: 'required', message: '必选'}],      // 当validator指令传入对象时，取rules属性作为校验规则
                      appendErrorTip: true         // 其它属性作为指令的局部options（此处与标签上写 validatro-appendErrorTip="true" 相同效果）
                  },
                  introduce: {
                      rules: [
                          {rule: 'required', message: '必填'},
                          {
                              rule: 'length',
                              min: '3',
                              max: '10',
                              message: function(modelValue) {     // message可传入函数
                                  return `3到10个字符`
                              }
                          }
                      ],
                      appendErrorTip: true,
                      trigger: 'change'
                  }
              }
          }
      },
      methods: {
          handleSubmit() {
              let error= this.$validator.check()    // 触发所有检验（返回的任是$validator）
                                        .getError();    // 得到所有错误信息
              if (error) {alert('invalid'); return;}
              alert('success');
          }
      }
  }
</script>
<style lang=scss>
    .validator-has-error {
        border: 1px solid red;
         & + span {
             color: red;
             margin-left: .5em;
         }
    }
    .container {
        > div {
            margin: 1em 0;
        }
        label {
            display: inline-block;
            width: 5em;
        }
    }
</style>

```
:::