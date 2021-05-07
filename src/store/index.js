import { createStore } from 'vuex'

export default createStore({
    state:{
        user: localStorage.getItem('userName'),
        praticien: null
    },
    getters: {
        getUserName(state){
            return state.user
        },
        getPraticien(state){
            return state.praticien
        }
    },
    actions: {
        user(context, user){
            context.commit('updateUser', user)
        },
        praticien(context, praticien){
            context.commit('updatePraticien', praticien)
        }
    },
    mutations: {
        updateUser(state, newUser){
            localStorage.setItem('userName', newUser)
            state.user = newUser
        },
        updatePraticien(state, newPraticienSearch){
            state.praticien = newPraticienSearch
        }
    }
})