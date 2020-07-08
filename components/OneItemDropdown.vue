<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="showDropdow"
      >
        <span>{{ currentItem.name }}</span>
        <span class="icon is-small">
          <fa :icon="['fas', 'angle-down']" />
        </span>
      </button>
    </div>
    <div id="dropdown-menu" class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a
          v-for="item in completeList"
          :id="item.id"
          :key="item.id"
          class="dropdown-item"
          href="#"
          :index="item.index"
          @click="select($event, item.id)"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Select...'
    },
    selected: {
      type: Object,
      default: () => {
        return {}
      }
    },
    completeList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isActive: false,
      currentItem: this.selected
    }
  },
  methods: {
    showDropdow() {
      this.isActive = !this.isActive
    },
    select(e, id) {
      const i = e.target.getAttribute('index')
      this.currentItem = this.completeList[i]
      this.$emit('selectedItem', this.currentItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown.is-fullwidth {
  width: 100%;

  .has-addons,
  .dropdown-trigger,
  .dropdown-menu {
    width: 100%;
  }
}
.additem {
  align-self: flex-end;
}
.level-left > span {
  padding-left: 6px;
}
.dropdown-content {
  max-height: 13rem;
  overflow: auto;
}
</style>
