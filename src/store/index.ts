import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from './types'
import todo from '@/store/todo'

Vue.use(Vuex);

const store: StoreOptions<IRootState> =  {
    // state: {

    // },
    // mutations: {

    // },
    // actions: {

    // },
    modules: {
        todo,
    },
};

export default new Vuex.Store(store)
