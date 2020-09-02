
import { Store, ActionContext, Module } from 'vuex'
import { IRootState } from './types'
import { IItem } from '@/components/todo-item'
export interface ITodoState {
    list: IItem[]
}


const todo: Module<ITodoState, IRootState> = {
    namespaced: true,
    state: {
        list: [
            {
                text: '学习《TypeScript全面解读》',
                complete: false,
            },
            {
                text: '学习《Vue技术栈开发实战》',
                complete: false,
            },
        ],
    },
    getters: {
        todoList: (state: ITodoState, getters: any, rootState: IRootState, rootGetters: any) => {
            return state.list.map((item, index) => {
                return {
                    text: index + ' ' + item.text,
                    complete: item.complete,
                }
            })
        },
    },
    mutations: {
        ITEM_CHANGE(state: ITodoState, { index, content }: { index: number, content: string }) {
            state.list[index].text = content
        },
        CHANGE_ITEM_STATE(state: ITodoState, index: number) {
            state.list[index].complete = !state.list[index].complete
        },

    },
    actions: {
        itemChange({ commit }: ActionContext<ITodoState, IRootState>, data: { index: number, content: string }) {
            commit('ITEM_CHANGE', data)
        },
        changeItemState({ commit }: ActionContext<ITodoState, IRootState>, index: number) {
            commit('CHANGE_ITEM_STATE', index)
        },

    },
}

export default todo
