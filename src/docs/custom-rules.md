## 自定义规则

### 在配置选项中扩充
```javascript
new Validator({
    rules: {   // 支持正则与函数
        rule1: function(value, args) {
            return /abc/.test(value)     // 返回true，代表校验通过
        },
        rule2: /abc/      // 效果同rule1
    },
    messages: {    // 当规则不匹配时，默认的错误消息
        rule1: 'rule1 error',
        rule2: function(value, args) {
            return `rule2 error  value: ${value}  args: ${JSON.stringify(args)}`
        }
    }
})
```
当值为函数时

```javascript
/**
* @param value: v-model绑定的值
* @param args: Object, rule做在的对象，如下例的args为：{rule: number, max: 10}
* <input v-model="foo" v-validator="[{rule: number, max: 10}]">
*/
function rule(value, args) {}
```

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
        },
        created() {
            this.$validator.options({
                rules: {
                    rule1: function(value, args) {
                        return /abc/.test(value)
                    },
                    rule2: /abc/
                },
                messages: {
                    rule1: 'rule1 error',
                    rule2: function(value, args) {
                        return `rule2 error  value: ${value}  args: ${JSON.stringify(args)}`
                    }
                },
                appendErrorTip: true,
            })
        }
    }
</script>

DEMO
:::demo
```html
<template>
    <label>rule1：</label>
    <input v-model="models[1]" v-validator="[{rule: 'rule1', a: 1, b: 2}]">
    <br><br>
    <label>rule2：</label>
    <input v-model="models[2]" v-validator="[{rule: 'rule2', a: 1, b: 2}]">
</template>
<script>
export default {
    data() {
        return {
            models: []
        }
    },
    created() {
        this.$validator.options({
            rules: {
                rule1: function(value, args) {
                    return /abc/.test(value)
                },
                rule2: /abc/
            },
            messages: {
                rule1: 'rule1 error',
                rule2: function(value, args) {
                    return `rule2 error  value: ${value}  args: ${JSON.stringify(args)}`
                }
            },
            appendErrorTip: true,
        })
    }
}
</script>
```
:::

### 在指令中指定
```html
<input v-model="models[3]" v-validator="[{rule: val => val === 'abc'}]">   <!-- 函数 -->
<input v-model="models[4]" v-validator="[{rule: /abc/}]">  <!-- 正则 -->
```

DEMO
:::demo
```html
<template>
    <label>rule1：</label>
    <input v-model="models[3]" v-validator="[{rule: val => val === 'abc', message: 'rule1 error'}]">
    <br><br>
    <label>rule2：</label>
    <input v-model="models[4]" v-validator="[{rule: /abc/, message: 'rule2 error'}]">
</template>
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
```
:::