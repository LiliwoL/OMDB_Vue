import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

;

// Une mixin globale disponible dans TOUS les composants de l'application
Vue.mixin({
  created() {
    /* eslint-disable no-console */
    console.log("Global creating method from a mixin")
    /* eslint-ensable no-console */
  },
  methods:{
    log: function (message){
      /* eslint-disable no-console */
      console.log("🐸🐸🐸🐸🐸 LOG: " + message);
      /* eslint-ensable no-console */
    },
    flushLog: function (){
      /* eslint-disable no-console */
      console.clear();
      /* eslint-ensable no-console */
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')