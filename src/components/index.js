import mainTabBar from './content/mainTabBar/MainTabBar';
import navBar from './common/navBar/NavBar';

function vComponent(Vue) {
  if(vComponent.installed){
    return
  }
  Vue.component('mainTabBar',mainTabBar)
  Vue.component('navBar',navBar)
}

export default vComponent;