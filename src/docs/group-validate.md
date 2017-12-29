## 校验分组
指定group

html
```html
<input validator-group="a" type="models[1]" v-validator="[{rule: 'required'}]">
<input validator-group="a" type="models[2]" v-validator="[{rule: 'required'}]">

<input validator-group="b" type="models[3]" v-validator="[{rule: 'required'}]">
<input validator-group="b" type="models[4]" v-validator="[{rule: 'required'}]">
```

js
```javascript
$validator.check({group: 'a'}).getError({group: 'a'});    //触发组a的校验，并获取组a的错误信息
$validator.check({group: 'b'}).getError({group: 'b'});
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
    <label>组a：</label>
    字段1<input v-model="models[1]" v-validator.group@a="[{rule: 'required'}]">
    字段2<input v-model="models[2]" v-validator.group@a="[{rule: 'required'}]">
    <button @click="$validator.check({group: 'a'})">校验组a</button>
    
    <br><br>
    
    <label>组b：</label>
    字段1<input v-model="models[3]" v-validator.group@b="[{rule: 'required'}]">
    字段2<input v-model="models[4]" v-validator.group@b="[{rule: 'required'}]">
    <button @click="$validator.check({group: 'b'})">校验组b</button>
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
            appendErrorTip: true,
        })
    }
}
</script>
```
:::
