<template>
  <div class="show">
    <p v-for="(item,index) in list"
       :key="index">{{item.text}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, Action, Getter } from 'vuex-class'
import { IItem } from '@/components/todo-item'
const vuexOptions = { namespace: 'todo' }

@Component({
  name: 'Show',
})
export default class Show extends Vue {
  //   @State('list', vuexOptions) public list!: IItem[]
  @Getter('todoList', vuexOptions) public list!: IItem[]
}
</script>
