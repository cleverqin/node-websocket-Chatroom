import Vue from "vue";
function Notice(msg,type) {
  let Instance=Vue.extend({
    render(h){
      return h('transition',{
        props:{
          name:'dialog-slide'
        },
        on:{
          afterLeave:this.delELe
        }
      },[h('div',{
        class:`alter-message alter-message-${type}`,
        directives:[
          {
            name:'show',
            value:this.show
          }
        ]
      },msg)])
    },
    data(){
      return {
        show:false
      }
    },
    mounted(){
      let _this=this;
      this.show=true;
      this.inter=setTimeout(function () {
        _this.show=false;
      },3000)
    },
    methods:{
      delELe:function () {
        if(this.inter){
          clearTimeout(this.inter)
        }
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  });
  document.body.appendChild(new Instance().$mount().$el)
  return Instance;
}
export default {
  info(text){
    Notice(text,'info');
  },
  error(text){
    Notice(text,'error');
  },
  success(text) {
    Notice(text,'success');
  },
  warning(text){
    Notice(text,'warning');
  }
}
