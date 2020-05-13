<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <!-- 左边menu -->
      <tab-menu 
      :categories="categories"
      @selectitem="selectItem"
      ></tab-menu>
      <!-- 右边内容 -->
      <scroll id="tab-content-scroll">
        <div class="right-main-box">
          <tab-content-category
            :subcategories="subcategoryData"
          ></tab-content-category>
          <tabs :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tabs>
          <tab-content-detail
            :category-detail="categoryDetailData"
            class="tab-content-detail"
          ></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Tabs from "components/content/tabs/Tabs";
import Scroll from "components/common/scroll/Scroll";

import TabMenu from "./CateComps/TabMenu";
import TabContentCategory from "./CateComps/TabContentCategory";
import TabContentDetail from "./CateComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Tabs,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },

  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop"
    };
  },
  created() {
    this._getCategory();
  },
  computed: {
    subcategoryData() {
      if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
    },

    categoryDetailData() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    /*-----------------------数据请求-------------------------*/

    _getCategory() {
      getCategory().then(res => {
        // console.log(res);
        // 1.获取分类数据
        this.categories = res.data.category.list;

        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类的数据,默认左边目录第一项
        this._getSubcategory(0);
      });
    },
    _getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
        // console.log(res);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },

    _getCategoryDetail(type) {
      // 获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 发送请求
      getCategoryDetail(miniWallkey, type).then(res => {
        // console.log(res);

        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        // 对象扩展符赋值
        // console.log(this.categoryData);
        
        this.categoryData = { ...this.categoryData };
      });
    },

    /*-----------------------事件方法-------------------------*/
    // 右边tab内容标题选择
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    // 左边目录选择事件
    selectItem(index) {
      this._getSubcategory(index)
    }
  }
};
</script>

<style scoped>

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  z-index: 10;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 50px;

  overflow: hidden;
  display: flex;
}

#tab-content-scroll {
  height: 100%;
  flex: 1;
}

.tab-content-detail{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.right-main-box {
  padding: 0 5px 10px;
}
</style>
