<template>
  <div :class="['c-group', class]">
    <h5 class="c-group-title"
      v-if="title">{{title}}</h5>
    <div class="c-group-cells"
      v-if="items">
      <cell class="c-group-cell"
        v-for="column in columns"
        :column="column"
        :value="items[$key]"></cell>
    </div>
  </div>
</template>

<script>
import Cell from './c-cell'
export default {
  props: {
    class: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    Cell
  }
}
</script>

<style src="styles/components/group"></style>
