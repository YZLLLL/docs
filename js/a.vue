<template>
  <div>

    <div className="tab-container">
      <div v-for="card in cardListData" :key="card.tabName"></div>
    </div>

    <div className="card-container">

      <div v-for="data in dataList" :key="data.title">

        <span>{{ data.type }}</span>

        <img src="" alt="">

        <div>

          <div>{{ data.title }}</div>
          <div>{{ data.des }}</div>
          
          <div v-if="data.tags&&data.tags.length">
            <div v-for="tag in data.tags" :key="tag">
              <img v-if="tag.icon" :src="tag.icon" alt="">
              <div v-else :style="{color: tag.textColor, backgroundColor: tag.bgColor}">{{ tag.text }}</div>
            </div>
          </div>

          <div v-else-if="data.tags">
            <img :src="data.tags" alt="">
          </div>

          <div>
            <span>{{ data.price}}</span>
            <span>{{ data.originalPrice}}</span>
          </div>

        </div>

      </div>
    </div>
  </div>
  
</template>

<script>
const cardListData = [
  {
    tabName: '爆款清单',
    data: [{
      title: '丽江爱必侬酒店2晚',
      des: '入住雪山景酒店',
      img: 'https://gw.alicdn.com/imgextra/O1CN01eNQPHX1n6pPImSWNZ_!!6000000005041-0-yinhe.jpg',
      type: '丽江·酒店',
      price: '784',
      tags: 'https://img.alicdn.com/imgextra/i3/O1CN012KFvkF1Zm8Vm7pc5b_!!6000000003236-2-tps-399-90.png'
    }, {
      title: '温德姆全国39家2晚',
      des: '畅行无忧 随心住',
      img: 'https://gw.alicdn.com/imgextra/O1CN01WoAKNA1lUz46DsVma_!!6000000004823-0-yinhe.jpg',
      type: '多地通用·酒店',
      price: '584',
      originalPrice: '599',
      tags: [{
        icon: 'https://img.alicdn.com/imgextra/i3/O1CN012KFvkF1Zm8Vm7pc5b_!!6000000003236-2-tps-399-90.png'
      }, {
        text: '不约可退',
        bgColor: '#FFEEEE',
        textColor: '#FF401A'
      }]
    }, {
      title: '西双版纳万达颐华2-3晚',
      des: '沉浸式体验傣族风情度假,开心度假',
      img: 'https://gw.alicdn.com/imgextra/O1CN01OEPnEL1gVNKGnc2ZG_!!6000000004147-0-yinhe.jpg',
      price: '1484',
      originalPrice: '1499',
      tags: [{
        text: '不约可退',
        bgColor: '#FFEEEE',
        textColor: '#FF401A'
      }, {
        text: '多店通用',
        bgColor: '#FFEEEE',
        textColor: '#FF401A'
      }]
    }, {
      title: '环球影城大酒店小黄人主题房1晚房券',
      img: 'https://gw.alicdn.com/imgextra/O1CN01zdguST22GBjvVSGy8_!!6000000007092-0-yinhe.jpg',
      type: '北京·酒店',
      price: '1873',
      originalPrice: '1888',
      tags: 'https://img.alicdn.com/imgextra/i3/O1CN012KFvkF1Zm8Vm7pc5b_!!6000000003236-2-tps-399-90.png'
    }]
  },
  {
    tabName: '精选好货',
    data: [{
      title: '西双版纳万达颐华2-3晚套餐',
      des: '沉浸式体验傣族风情度假',
      img: 'https://gw.alicdn.com/imgextra/O1CN01OEPnEL1gVNKGnc2ZG_!!6000000004147-0-yinhe.jpg',
      price: '1484',
      originalPrice: '1499',
      tags: [{
        text: '不约可退',
        bgColor: '#FFEEEE',
        textColor: '#FF401A'
      }, {
        text: '多店通用',
        bgColor: '#FFEEEE',
        textColor: '#FF401A'
      }]
    }, {
      title: '丽江爱必侬酒店2晚亲子套餐',
      des: '入住雪山景酒店',
      img: 'https://gw.alicdn.com/imgextra/O1CN01eNQPHX1n6pPImSWNZ_!!6000000005041-0-yinhe.jpg',
      type: '丽江·酒店',
      price: '784',
      tags: 'https://img.alicdn.com/imgextra/i3/O1CN012KFvkF1Zm8Vm7pc5b_!!6000000003236-2-tps-399-90.png'
    }, {
      title: '温德姆全国39家2晚可拆分套餐',
      des: '畅行无忧 随心住',
      img: 'https://gw.alicdn.com/imgextra/O1CN01WoAKNA1lUz46DsVma_!!6000000004823-0-yinhe.jpg',
      type: '多地通用·酒店',
      price: '584',
      originalPrice: '599',
      tags: [{
        icon: 'https://img.alicdn.com/imgextra/i3/O1CN012KFvkF1Zm8Vm7pc5b_!!6000000003236-2-tps-399-90.png'
      }, {
        text: '不约可退',
        bgColor: '#FFEEEE',
        textColor: '#FF401A'
      }]
    }, {
      title: '环球影城大酒店',
      img: 'https://gw.alicdn.com/imgextra/O1CN01zdguST22GBjvVSGy8_!!6000000007092-0-yinhe.jpg',
      type: '北京·酒店',
      price: '1873',
      originalPrice: '1888'
    }]
  }
];

const CardList = {
  components: {  },
  data() {
    return {
      cardListData,
    };
  },
};
setTimeout(() => {
  this.cardListData[this.current].data = this.cardListData[this.current].data.sort((a,b) => Math.random() - 0.5)
}, 1000)
export default CardList
</script>

<style scoped>
.a:last-of-type {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  text-decoration: line-through;
}
</style>