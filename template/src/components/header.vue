<style scoped>
.headerWrapper {
  height: 60px;

  .t-logo > a {
    color: #409eff;
    font-weight: 500;
    font-size: 30px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
}

.header {
  height: 60px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: @height;
  z-index: 100;
  position: relative;

  .container {
    height: 100%;
    box-sizing: border-box;
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    @utils-clearfix;
    padding: 0;
    margin: 0;
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      content: "";
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    &.lang-item,
    &:last-child {
      cursor: default;
      margin-left: 34px;

      span {
        opacity: 0.8;
      }

      .nav-lang {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        color: #888;

        &:hover {
          color: #409eff;
        }
        &.active {
          font-weight: bold;
          color: #409eff;
        }
      }
    }

    a {
      text-decoration: none;
      color: #888;
      display: block;
      padding: 0 22px;

      &.active,
      &:hover {
        color: #333;
      }

      &.active::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 15px;
        left: calc(50% - 7px);
        width: 14px;
        height: 4px;
        background: #409eff;
      }
    }
  }
}

.nav-dropdown {
  margin-bottom: 6px;
  padding-left: 18px;
  width: 100%;

  span {
    display: block;
    width: 100%;
    font-size: 16px;
    color: #888;
    line-height: 40px;
    transition: 0.2s;
    padding-bottom: 6px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    transition: 0.2s;
    font-size: 12px;
    color: #979797;
    transform: translateY(-2px);
  }

  @when active {
    span,
    i {
      color: #409eff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #409eff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch,
    .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item a,
    .nav-lang {
      font-size: 12px;
      vertical-align: top;
    }
    .nav-dropdown {
      padding: 0;
    }
    .nav-gap {
      padding: 0 8px;
    }
  }
}
</style>
<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      <div class="container">
        <h1 class="t-logo"><router-link :to="`/dash/intro`">
          <!-- logo -->
          vue-smart-validator

        </router-link></h1>

        <!-- nav -->
        <!--<ul class="nav">-->
          <!--&lt;!&ndash;<li class="nav-item nav-algolia-search" v-show="isComponentPage">&ndash;&gt;-->
            <!--&lt;!&ndash;<algolia-search></algolia-search>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li class="nav-item">&ndash;&gt;-->
            <!--&lt;!&ndash;<router-link&ndash;&gt;-->
              <!--&lt;!&ndash;active-class="active"&ndash;&gt;-->
              <!--&lt;!&ndash;:to="`/${ lang }/guide`">{{ langConfig.guide }}&ndash;&gt;-->
            <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--<li class="nav-item">-->
            <!--<router-link-->
              <!--active-class="active"-->
              <!--:to="`/${ lang }/component`">{{ langConfig.components }}-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li class="nav-item">-->
            <!--<router-link-->
              <!--active-class="active"-->
              <!--:to="`/${ lang }/resource`"-->
              <!--exact>{{ langConfig.resource }}-->
            <!--</router-link>-->
          <!--</li>-->

          <!--&lt;!&ndash; gap &ndash;&gt;-->
          <!--<li class="nav-item" v-show="isComponentPage">-->
            <!--<div class="nav-gap"></div>-->
          <!--</li>-->

          <!--&lt;!&ndash; 版本选择器 &ndash;&gt;-->
          <!--<li class="nav-item" v-show="isComponentPage">-->
            <!--<el-dropdown-->
                <!--trigger="click"-->
                <!--class="nav-dropdown"-->
                <!--:class="{ 'is-active': dropdownVisible }">-->
              <!--<span>-->
                <!--{{ langConfig.dropdown }}{{ version }}-->
                <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
              <!--<el-dropdown-menu-->
                  <!--slot="dropdown"-->
                  <!--class="nav-dropdown-list"-->
                  <!--@input="handleDropdownToggle">-->
                <!--<el-dropdown-item-->
                    <!--v-for="item in Object.keys(versions)"-->
                    <!--:key="item"-->
                    <!--@click.native="switchVersion(item)">-->
                  <!--{{ item }}-->
                <!--</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</li>-->

          <!--&lt;!&ndash; lang &ndash;&gt;-->
          <!--<li class="nav-item lang-item">-->
            <!--<span-->
              <!--class="nav-lang"-->
              <!--:class="{ 'active': lang === 'zh-CN' }"-->
              <!--@click="switchLang('zh-CN')">-->
              <!--中文-->
            <!--</span>-->
            <!--<span class="nav-lang-spe"> / </span>-->
            <!--<span-->
              <!--class="nav-lang"-->
              <!--:class="{ 'active': lang === 'en-US' }"-->
              <!--@click="switchLang('en-US')">-->
              <!--En-->
            <!--</span>-->
          <!--</li>-->
          <!---->
          <!--&lt;!&ndash;theme picker&ndash;&gt;-->
          <!--<li class="nav-item nav-theme-switch" v-show="isComponentPage">-->
            <!--<theme-picker></theme-picker>-->
          <!--</li>-->
        <!--</ul>-->
      </div>
    </header>
  </div>
</template>
<script>
import ThemePicker from "./theme-picker.vue";
import AlgoliaSearch from "./search.vue";
let version = "2.0.4";

export default {
  data() {
    return {
      active: "",
      versions: [],
      version,
      dropdownVisible: true
    };
  },

  components: {
    ThemePicker,
    AlgoliaSearch
  },

  computed: {
    lang() {
      return this.$route.path.split("/")[1] || "zh-CN";
    },
    langConfig() {
      return {
        guide: "指南",
        components: "组件",
        resource: "资源"
      };
    },
    isComponentPage() {
      return /^dash/.test(this.$route.name);
    }
  },

  methods: {
    switchVersion(version) {
      if (version === this.version) return;
      location.href = `${location.origin}/${this.versions[
        version
      ]}/${location.hash} `;
    },

    switchLang(targetLang) {
      if (this.lang === targetLang) return;
      localStorage.setItem("ELEMENT_LANGUAGE", targetLang);
      this.$router.push(this.$route.path.replace(this.lang, targetLang));
    },

    handleDropdownToggle(visible) {
      this.dropdownVisible = visible;
    }
  },

  created() {
    // const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = _ => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const versions = JSON.parse(xhr.responseText);
    //     this.versions = Object.keys(versions)
    //       .slice(-2)
    //       .reduce((prev, next) => {
    //         prev[next] = versions[next];
    //         return prev;
    //       }, {});
    //   }
    // };
    // xhr.open("GET", "/versions.json");
    // xhr.send();
  }
};
</script>
