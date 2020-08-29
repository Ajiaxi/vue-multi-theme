<script>
import Home from '../../../components/Home'
export default {
  extends: Home,
  methods: {
    btnClick: function() {
      alert(`请注意哦，我是主题${this.themeOptions.name}的按钮事件`)
    }
  }
}
</script>