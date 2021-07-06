import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import md5 from 'js-md5';
import vComponent from 'components'
import {
  prefix
} from '@/common/js/utils'
import {
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Form,
  Field,
  CheckboxGroup,
  Checkbox,
  SwipeCell,
  Stepper,
  SubmitBar,
  Cell,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Search,
  Tabs,
  Tab,
  PullRefresh,
  List,
  AddressList,
  AddressEdit,
  Popup,
  Card
} from 'vant'

Vue.use(Card).use(Popup).use(AddressList).use(AddressEdit).use(List).use(PullRefresh).use(Tabs).use(Tab).use(Search).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Cell).use(SubmitBar).use(Button).use(Icon).use(Swipe).use(SwipeItem).use(Form).use(Field).use(CheckboxGroup).use(Checkbox).use(SwipeCell).use(Stepper)
// 注册全局公共组件
Vue.use(vComponent)
Vue.config.productionTip = false;
Vue.prototype.prefix = prefix;
Vue.prototype.$md5 = md5;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')