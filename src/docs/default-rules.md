## 内置规则
+ [`required`](#/dash/default-rules#required)
+ [`url`](#/dash/default-rules#url)
+ [`email`](#/dash/default-rules#email)
+ [`length`](#/dash/default-rules#length)
+ [`number`](#/dash/default-rules#number)
+ [`equal`](#/dash/default-rules#equal)
+ [`notEqual`](#/dash/default-rules#notEqual)
+ ☆[`nullable`](#/dash/default-rules#nullable)

:::tip
源码请查看：[github](https://github.com/mlxiao93/vue-smart-validator/blob/master/src/rules/index.ts)
:::

<style lang=scss>
    .validator-has-error {
        border: 1px solid red;
         & + span {
             color: red;
             margin-left: .5em;
         }
    }
    input {
        outline: none;
    }
</style>

<script>
    export default {
        data() {
            return {
                models: []
            }
        }
    }
</script>

### required

:::demo
```html
<template>
    <div>
        <label>必填：</label>
        <input v-model="models[0]" v-validator="[{rule: 'required', message: '必填', trigger: 'blur'}]">  <!-- trigger默认为'change' -->
        <span>{{$validator.firstError('models[0]')}}</span>
    </div>
</template>
```
:::

### url

:::demo
```html
<template>
    <div>
        <label>链接：</label>
        <input v-model="models[1]" v-validator="[{rule: 'url', message: '请填写合法链接'}]">
        <span>{{$validator.firstError('models[1]')}}</span>
    </div>
</template>
```
:::

### email

:::demo
```html
<template>
    <div>
        <label>邮箱：</label>
        <input v-model="models[2]" v-validator="[{rule: 'email', message: '邮箱格式有误'}]">
        <span>{{$validator.firstError('models[2]')}}</span>
    </div>
</template>
```
:::

### length
字符串长度，包含三个选项
+ `val`: `number` 指定长度
+ `max`: `number` 最大长度
+ `min`: `number` 最小长度
:::demo 
```html
<template>
    <div>
        <label>特定长度：</label>
        <input v-model="models[3]" v-validator="[{rule: 'length', val:3, message: '必须且只能输入3个字符'}]">
        <span>{{$validator.firstError('models[3]')}}</span>
        
        <br><br><br>
        
        <label>范围长度：</label>
        <input v-model="models[4]" v-validator="[{rule: 'length', min: 3, max: 5, message: '3到5个字符'}]">
        <span>{{$validator.firstError('models[4]')}}</span>
        
        <br><br><br>        
        
        <label>范围长度(组合)：</label>
        <input v-model="models[5]" v-validator="[{rule: 'length', min: 3, message: '不能小于3个字符'}, 
                                                 {rule: 'length', max: 5, message: '不能大于5个字符'}]">
        <span>{{$validator.firstError('models[5]')}}</span>
    </div>
</template>
```
:::

### number
数字类型
+ `min`: `number` 最小值
+ `max`: `number` 最大值
+ `integer`: `boolean` 整数
+ `float`: `boolean` 小数
+ `positive`：`boolean` 正数
+ `negative`：`boolean` 负数
:::demo 
```html
<template>
    <div>
        <label>数字：</label>
        <input v-model="models[6]" v-validator="[{rule: 'number', message: '必须是数字'}]">
        <span>{{$validator.firstError('models[6]')}}</span>
        
        <br><br><br>
        
        <label>数字范围：</label>
        <input v-model="models[7]" v-validator="[{rule: 'number', min: 3, max: 5, message: '3到5之间'}]">
        <span>{{$validator.firstError('models[7]')}}</span>
                
        <br><br><br>
        
        <label>数字范围(组合)：</label>
        <input v-model="models[8]" v-validator="[{rule: 'number', min: 3, message: '不能小于3'},
                                                 {rule: 'number', max: 3, message: '不能大于5'}]">
        <span>{{$validator.firstError('models[8]')}}</span>
                
        <br><br><br>
        
        <label>整数：</label>
        <input v-model="models[9]" v-validator="[{rule: 'number', integer: true, message: '必须输入整数'}]">
        <span>{{$validator.firstError('models[9]')}}</span>
                
        <br><br><br>
        
        <label>小数：</label>
        <input v-model="models[10]" v-validator="[{rule: 'number', float: true, message: '必须输入小数'}]">
        <span>{{$validator.firstError('models[10]')}}</span>
                
        <br><br><br>
        
         <label>正数：</label>
         <input v-model="models[11]" v-validator="[{rule: 'number', positive: true, message: '必须输入正数'}]">
         <span>{{$validator.firstError('models[11]')}}</span>
                 
         <br><br><br>   
         
         <label>负数：</label>
         <input v-model="models[12]" v-validator="[{rule: 'number', negative: true, message: '必须输入负数'}]">
         <span>{{$validator.firstError('models[12]')}}</span>
                 
         <br><br><br>       
        
    </div>
</template>
```
:::


### equal
两值是否相等
+ `val`: 参考值
:::demo
```html
<template>
    <div>
        <label>用户名：</label>
        <input v-model="models[13]">        
        <br>
        <br>
        <label>确认用户名：</label>
                <input v-model="models[14]" v-validator="[{rule: 'equal', val: models[13], message: '必须与用户名一致', trigger: 'change'}]">
                <span>{{$validator.firstError('models[14]')}}</span>
        
    </div>
</template>
```
:::

### notEqual
两值是否不相等等
+ `val`: 参考值
:::demo
```html
<template>
    <div>
        <label>用户名：</label>
        <input v-model="models[15]">
        <br>
        <br>
        <label>新用户名：</label>
        <input v-model="models[16]" v-validator="[{rule: 'notEqual', val: models[15], message: '不能与用户名一致', trigger: 'change'}]">
        <span>{{$validator.firstError('models[16]')}}</span>
        
    </div>
</template>
```
:::

### nullable
是否允许为空

`nullable`并不是一条规则，而是规则的修饰。

开发中会遇到这样的场景：输入框要求输入数字，但该字段不是必填。

若使用内置规则中的`number`， 那么当值为空的时候通不过校验。

配合 `nullable` 修饰，则可实现这一场景。(或者自定义一个允许为空的number规则)

:::demo
```html
<template>
    <div>
        <label>数字(非必填)：</label>
        <input v-model="models[17]" v-validator="[{rule: 'number'}]" validator-nullable="true">
        <span>{{$validator.firstError('models[17]')}}</span>
    </div>
</template>

```
`nullable` 还可以放在 `v-validator` 的值中：

`<input v-model="models[17]" v-validator="{rules: [{rule: 'number'}], nullable="true"}">`

详情参看[指令结构](#/dash/v-validator)一节

:::