<template>
  <div class="card">
    <header class="card-header is-fullwidth">
      <div class="dropdown is-fullwidth" :class="{ 'is-active': isActive }">
        <div class="dropdown-trigger">
          <div class="level">
            <div class="level-left">
              <span>{{ title }}</span>
            </div>
            <div class="level-right">
              <p class="level-item">
                <a class="button is-info" @click="showDropdow">Add</a>
              </p>
            </div>
          </div>
        </div>
        <div class="dropdown-menu" role="menu">
          <div ref="unassigned-items" class="dropdown-content">
            <a
              v-for="item in completeList"
              :id="item.id"
              :key="item.id"
              class="dropdown-item"
              href="#"
              :index="item.index"
              @mouseover="mouseOver"
              @click="removeAndAssign($event, item.id)"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="list">
        <a v-for="item in items" :key="item.id" class="list-item is-size-7">{{
          item.name
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => {
        return []
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
      isActive: false
    }
  },
  mounted() {
    this.items
      .map((e) => e.id)
      .forEach((id) => {
        document.getElementById(id).style.display = 'none'
      })
  },
  methods: {
    ...mapActions('locations', ['getNextLocations']),
    showDropdow() {
      this.isActive = !this.isActive
    },
    mouseOver(e) {
      if (this.title === 'LOCATIONS') {
        const i = e.target.getAttribute('index')
        if (Number(i) + 1 === this.completeList.length) {
          this.getNextLocations()
        }
      }
    },
    removeAndAssign(e, id) {
      e.target.style.display = 'none'
      const i = e.target.getAttribute('index')
      this.items.push(this.completeList[i])
      this.$emit('onChange', i)
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
