<template>
  <div class="todo-page">
    <ul>
      <todo-item v-for="(item,index) in list"
                 :key="index"
                 :item="item"
                 :index="index"
                 :editingIndex="editingIndex"
                 @on-save="handleSave"
                 @on-edit="handleEdit"
                 @on-cancel="handleCancel"
                 @on-complete="handleComplete" />

    </ul>

    <a-button @click='turn'>show</a-button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import TodoItem, { IItem } from '@/components/todo-item'
import { State, Mutation, Action } from 'vuex-class'

const vuexOptions = { namespace: 'todo' }

@Component({
  name: 'TodoPage',
  components: { TodoItem },
})
export default class TodoPage extends Vue {
  public editingIndex = -1
  @State('list', vuexOptions) public list!: IItem[]
  //   public list: IItem[] = [
  //     {
  //       text: '学习《TypeScript全面解读》',
  //       complete: false,
  //     },
  //     {
  //       text: '学习《Vue技术栈开发实战》',
  //       complete: false,
  //     },
  //   ]

  @Action('itemChange', vuexOptions) public itemChange!: ({
    index,
    content,
  }: {
    index: number
    content: string,
  }) => void
  @Action('changeItemState', vuexOptions) public changeItemState!: (
    index: number,
  ) => void

  public handleSave({ index, content }: { index: number; content: string }) {
    // console.log(`${index} + ${content}`)
    // this.list[index].text = content
    this.itemChange({ index, content })
    this.handleCancel()
  }
  public handleEdit(index: number) {
    this.editingIndex = index
  }

  public handleCancel() {
    this.editingIndex = -1
  }

  public handleComplete(index: number) {
    // this.list[index].complete = !this.list[index].complete
    this.changeItemState(index)
  }

  public turn() {
    this.$router.push({ name: 'show' })
  }
}
</script>

<style lang="scss" scoped>
</style>
