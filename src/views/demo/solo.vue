<template>
  <Pane class="demos">
    <group
      v-for="demo in demos"
      :title="demo.title"
      :columns="demo.columns"
      :items="demo.items"></group>
  </Pane>
</template>

<script>
import Pane from 'solo/c-pane'
import Group from 'solo/c-group'
import { ROLE_LEVEL_OPTIONS } from 'vx/constants'
export default {
  data () {
    return {
      demos: [{
        title: 'Text',
        columns: {
          regular: {
            label: '默认',
            type: 'text'
          }
        },
        items: {
          regular: '我很正常'
        }
      }, {
        title: 'Dropdown',
        columns: {
          regular: {
            label: '默认',
            type: 'dropdown',
            attrs: {
              options: ROLE_LEVEL_OPTIONS
            }
          }
        },
        items: {
          regular: 2
        }
      }, {
        title: 'Checkbox',
        columns: {
          regular: {
            label: '默认',
            type: 'checkbox'
          },
          customLabel: {
            label: '自定义 Label',
            type: 'checkbox',
            attrs: {
              'true-label': '正常',
              'false-label': '禁用'
            }
          },
          customValue: {
            label: '自定义 Value',
            type: 'checkbox',
            attrs: {
              'true-value': '是',
              'false-value': '否'
            }
          }
        },
        items: {
          regular: false,
          customLabel: true,
          customValue: '否'
        }
      }, {
        title: 'Datetime',
        columns: {
          regular: {
            label: '默认',
            type: 'datetime'
          },
          custom: {
            label: '自定义',
            type: 'datetime',
            attrs: {
              format: 'yyyy-MM-dd'
            }
          },
          custom2: {
            label: '自定义',
            type: 'datetime',
            attrs: {
              format: 'yyyy年MM月dd日'
            }
          }
        },
        items: {
          regular: Date.now(),
          custom: Date.now(),
          custom2: Date.now()
        }
      }]
    }
  },

  components: {
    Pane,
    Group
  }
}
</script>

<style src="styles/views/demos"></style>
