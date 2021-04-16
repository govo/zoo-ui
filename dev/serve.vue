<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { MycompSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  data () {
    return {
      gameList: [
        {
          _id: 1,
          name: 'mygame'
        },
        {
          _id: 2,
          name: 'mygame2'
        }
      ]
    }
  },
  methods: {
    change (game) {
      console.log('you select:', game)
    }
  },
  // components: {
  //  MycompSample,
  // }
});
</script>

<template>
  <div id="app">
    <GameSelector @change="change" :gameList="gameList" />
  </div>
</template>
