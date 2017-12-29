## 自定义组件

自定义组件要求支持v-model，参考[vue文档：在组件上使用 v-model](https://cn.vuejs.org/v2/guide/forms.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)

```html
<template>
    <div>
        <input @input="input" :value="value" @blur="blur">
    </div>
</template>
<script>
    export default {
        name: 'my-input',
        props: ['value'],
        methods: {
            input() {
                this.$emit('input', this.value)
            },
            blur() {
                this.$emit('myBlur');    // 所有emit出去的事件都可作为触发校验的trigger
            }
        }
    }
</script>
```
`v-validator`依赖于`v-model`
```html
<my-input v-model="foo" v-validator="[{rule: 'required', trigger: 'myBlur'}]"></my-input>
<!-- 当自定义组件内部只有一个表单元素时，在trigger中配置的事件就是该元素的事件 -->
```


案例：el-input

<style lang=scss>
    .validator-has-error {
        //border: 1px solid red;
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
        },
        created() {
            this.$validator.options({
                appendErrorTip: true
            })
        }
    }
</script>

:::demo

```html
<template>
   <el-input v-model="models[0]" v-validator="[{rule: 'required', trigger: 'blur'}]"></el-input>
</template>
```

:::
