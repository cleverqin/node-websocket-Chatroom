import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.less';
Vue.directive('drag', {
  bind(el) {
    el.x=0;
    el.y=0;
    const pos={
      x:0,
      y:0
    };
    el.addEventListener("mousedown",(e)=>{
      e.stopPropagation();
      pos.x=e.clientX;
      pos.y=e.clientY;
      document.addEventListener('mousemove',mouseMove);
      document.addEventListener('mouseup',mouseUp)
    });
    function mouseMove(e) {
      const curPos={
        x:e.clientX,
        y:e.clientY
      }
      const d={
        dX:curPos.x-pos.x,
        dY:curPos.y-pos.y
      };
      const x=el.x+d.dX;
      const y=el.y+d.dY;
      el.style.transform=`translate(${x}px,${y}px)`;
    }
    function mouseUp(e) {
      e.stopPropagation();
      const curPos={
        x:e.clientX,
        y:e.clientY
      };
      const d={
        dX:curPos.x-pos.x,
        dY:curPos.y-pos.y
      };
      const x=el.x+d.dX;
      const y=el.y+d.dY;
      el.style.transform=`translate(${x}px,${y}px)`;
      el.x=x;
      el.y=y;
      document.removeEventListener("mousemove",mouseMove);
      document.removeEventListener('mouseup',mouseUp)
    }
  }
});
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
