## 指令结构

`v-validator` 由三部分组成：指令的值、指令修饰和`$validator`

### 指令的值
指令的值即`v-validator`的值。

该值接受两种类型: `Array | Object`
+ `Array`
```html
<input v-model="foo" v-validator="[{rule: 'required'}, {rule: 'number'}]">
```
值为`[{rule: 'required'}, {rule: 'number'}]`, 被直接用作校验规则

+ `Object`
```html
<input v-model="foo" v-validator="{rules: [{rule: 'required'}, {rule: 'number'}], group: 'a'}">
```
当值为 `Object` 类型时，属性rules被用作校验规则，其它属性则被当做指令修饰。

上例, 校验规则为 `[{rule: 'required'}, {rule: 'number'}]`

指令修饰为 `{group: a}`

### 指令修饰
指令修饰用于影响配置选项和校验规则

指令修饰有三种赋值方式：
+ 方式一：通过指令值
```html
<input v-model="foo" v-validator="{rules: [{rule: 'required'}], group: 'a'}">
```
修饰为: `{group: 'a'}`

+ 方式二：通过设置dom元素前缀为 `validator-` 的属性
```html
<input v-model="foo" v-validator="[{rule: 'required'}]" validator-group: 'b'>
```
修饰为：`{group: 'b'}`

+ 方式三：通过[Vue指令自带的modifiers](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)
:::tip
modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }
:::
Vue自带的modifiers只能传入bool值，这里做了下扩展，用`@`符分隔key与value

例如：v-my-directive.foo@a.bar中，修饰符对象为 { foo: 'a', bar: true }
```html
<input v-model="foo" v-validator.group@c="[{rule: 'required'}]">
```
修饰为：`{group: 'c'}`

-----

修饰的优先级：方式一 > 方式二 > 方式三。

例如：
```html
<input v-model="foo" v-validator.group@c="{rules: [{rule: 'required'}], group: 'a'}" validator-group="b">
```
最终的修饰为： `{group: a}`

#### 修饰中可包含的属性
| 参数      | 说明          | 用途        | 默认值  | 可选值 |
|---------- |-------------- |---------- |-------- |---- |
| key | 指令所在的元素的唯一标识 | 必填  | v-model的字面值，例如 v-model="a.b", 则key为字符串"a.b" |
| group |  指令所在的元素分组  |  分组校验 |   |
| trigger |  触发校验的动作  |  统一设置规则的trigger，会被具体规则中的trigger覆盖  |    | 所有dom事件与自定义组件中this.$emit出来的事件 |
| appendErrorTip | 是否自动添加错误提示 | 统一设置规则是否自动添加错误提示，会被具体规则中的appenderrorTip覆盖 | false |  |
| nullable | 字段是否可以为空 | 非必填字段的校验。具体参看：[内置规则 -> nullable 小节](#/dash/default-rules#nullable) | false | |

### $validator
$validator是存在于vue实例中的对象，用于主动触发校验和获取error message

$validator接口定义：
```typescript
interface $validator {
    check: {(index?: string | { group: string }): $validator}
    getError: {(index?: string | { group: string }): Object | undefined},
    firstError: {(index?: string | { group: string }): Object | undefined}
}
```

example:
```html
<template>
    <label>a组</label><input v-model="models[1]" v-validator.group@a="[{rule: 'required'}]">
    <label>a组</label><input v-model="models[2]" v-validator.group@a="[{rule: 'required'}]">
    <label>b组</label><input v-model="models[3]" v-validator.group@b="[{rule: 'required'}]">
    <label>b组</label><input v-model="models[4]" v-validator.group@b="[{rule: 'required'}]">
    
    <label>指定key</label><input v-model="models[4]" v-validator.key@m="[{rule: 'required'}]">
    
    <button @click="submit">submit</button>
</template>
<script>
export default {
    data() {
        return {
            models: []
        }
    },
    methods: {
       submit() {
           $validator.check().getError();    // 触发所有字段的校验并获取错误信息
           $validator.check({group: 'a'}).getError({group: 'a'});   // 触发组'a'字段的校验并获取错误信息

           $validator.check('m').getError('m');   // 触发组key为'm'字段的校验并获取错误信息, 这里的'm'代替了'models[4]'作为key
       }
    }
}
</script>
```
