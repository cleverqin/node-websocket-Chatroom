<script>
  import {renderEmoji} from './emoji';
  import {EMOJI_BASE_URL} from "./config";
  export default {
    name: "emoji-text",
    props:{
      baseUrl:{
        type:String,
        default:EMOJI_BASE_URL
      },
      text:{
        type:String,
        default:""
      }
    },
    render(h){
      return renderEmoji(this.text,this.baseUrl,h);
    }
  }
</script>
