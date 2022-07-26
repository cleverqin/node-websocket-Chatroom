import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.less';
Vue.directive('drag', {
  bind(el) {
    let setPos={
      x:0,
      y:0
    }
    let lastPos={
      x:0,
      y:0
    };
    function move(curPos){
      const d={
        dX:curPos.x-lastPos.x,
        dY:curPos.y-lastPos.y
      };
      setPos.x+=d.dX;
      setPos.y+=d.dY;
      el.style.transform=`translate(${setPos.x}px,${setPos.y}px)`;
      lastPos.x=curPos.x;
      lastPos.y=curPos.y;
    }
    el.addEventListener("mousedown",(e)=>{
      e.stopPropagation();
      lastPos.x=e.clientX;
      lastPos.y=e.clientY;
      document.addEventListener('mousemove',mouseMove);
      document.addEventListener('mouseup',mouseUp)
    });
    function mouseMove(e) {
      const curPos={
        x:e.clientX,
        y:e.clientY
      }
      move(curPos)
    }
    function mouseUp(e) {
      e.stopPropagation();
      const curPos={
        x:e.clientX,
        y:e.clientY
      };
      move(curPos);
      document.removeEventListener("mousemove",mouseMove);
      document.removeEventListener('mouseup',mouseUp)
    }
  }
});
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
