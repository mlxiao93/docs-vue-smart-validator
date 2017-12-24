## 配置选项

最终应用到指令上的配置由四部分构成：

默认配置(defaults) + 全局配置(global) + 组件局部配置(local) + 指令局部配置(dirLocal)。

即：`options = merge(default, global, local, dirLocal)`  后者覆盖前者。

### 默认配置
```javascript
const defaults = {
    trigger: 'change',      // 触发校验的动作
    appendErrorTip: false,    // 是否在被校验元素后自动添加错误提示
    rules: {},       // 内置规则。 具体值参照 https://github.com/mlxiao93/vue-smart-validator/blob/master/src/rules/index.ts
    messages: {}      // 内置规则对应的错误提示。 具体值参照 https://github.com/mlxiao93/vue-smart-validator/blob/master/src/rules/messages.ts
};
```
[`defaults.rules`](https://github.com/mlxiao93/vue-smart-validator/blob/master/src/rules/index.ts)

[`defaults.messages`](https://github.com/mlxiao93/vue-smart-validator/blob/master/src/rules/messages.ts)

### 全局配置
全局配置在初始化 `Validator` 时传入构造函数

```javascript
import Vue from 'vue'
import Validator from 'vue-smart-validator'

Vue.use(new Validator({
    trigger: 'blur',
    appendErrorTip: true,
    rules: {
        foo: val => /foo/.test(val)     //详细说明参看"自定义规则"一节
    },
    messages: {
        foo: 'foo error'
    }
}));
```

### 组件局部配置
组件局部配置通过组件内获取 `$validator` 实例调用 `options` 方法传入
```html
<script>
export default {
    created() {
        this.$validator.options({
            trigger: 'blur',
            appendErrorTip: true,
            rules: {
                foo: val => /foo/.test(val)     //详细说明参看"自定义规则"一节
            },
            messages: {
                foo: 'foo error'
            }
        })
    }
}
</script>

```

### 指令局部配置
指令局部配置即使用指令时传入配置。有两种传值方式

*注：不能设置`rules`与`messages`*

#### 方式一: 元素上传入
在元素上设置 `validator-` 前缀加属性名组成的attribute即可


```html
<template>
    <div>
        <input v-model="a"
               validator-trigger="blur"
               validator-appendErrorTip="true"
               v-validator="[{rule: 'required'}]">
    </div>
</template>    
```

#### 方式二：指令值中传入
指令的值接受 `Array` 与 `Object` 两种类型。 (*详情参看[指令结构](#/dash/v-validator)一节*)

当值为 `Object` 时，从值中提取。
```html
<template>
    <div>
        <input v-model="a"
               v-validator="{
                   rules: [{rule: 'required'}],
                   trigger: 'blur',
                   appendErrorTip: 'true'
               }">
    </div>
</template>    
```
如上所示，原 `Array` 类型的值标注为rules属性，提取其它属性作为配置
