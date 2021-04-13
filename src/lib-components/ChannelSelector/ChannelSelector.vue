<template>
  <el-dropdown trigger="click" @command="gameSelect">
    <el-button type="text" class="nav-drop-btn">
      {{ gameName || '请选择游戏' }}
      <span class="zoo__channel__game-id" v-if="selectedGameId">[{{ selectedGameId }}]</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu
      slot="dropdown"
      class="zoo__channel___selector"
      :style="'max-height:' + _maxHeight + 'px'"
    >
      <el-dropdown-item
        v-for="item in gameList"
        :command="item._id"
        :key="item._id"
      >
        {{ item.name }}
        <span class="game-id">- {{ item._id }}</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style lang="scss">
.zoo__channel___selector {
  overflow-y: scroll;
}
.zoo__channel__game-id {
  font-size: 0.85;
  font-weight: 400;
  color: #bbb;
}
</style>

<script>
// @ is an alias to /src
export default {
  name: 'ChannelSelector',
  props: {
    gameList: {
      type: Array,
      default () { return [] }
    },
    gameId: {
      type: Number
    },
    maxHeight: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      selectedGameId: 0
    }
  },
  created () {
  },
  computed: {
    _maxHeight () {
      return this.maxHeight || Math.max(window.innerHeight - 150, 200)
    },
    gameName () {
      return this.findGamebyId(this.selectedGameId).name
    }
  },
  mounted () { },
  methods: {
    findGamebyId (gameId) {
      gameId = +gameId
      let game = {}
      this.gameList.forEach(item => {
        if (item._id === gameId) {
          game = item
        }
      })
      return game
    },
    gameSelect (gameId) {
      let game = this.findGamebyId(gameId)
      this.selectedGameId = gameId
      this.$emit('change', game)
    }
  },
  components: {}
}
</script>
