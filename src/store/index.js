import { createStore } from 'vuex'

export default createStore({
    state:{
        user: {
            login: null,
            cryptedPass: localStorage.getItem('credentials')
        },
        praticien: localStorage.getItem('praticien')
    },
    getters: {
        getUserName(state){
            return state.user.login
        },
        getCredentials(state){
            return state.user.cryptedPass
        },
        getPraticien(state){
            return state.praticien
        }
    },
    actions: {
        user(context, user){
            context.commit('updateUser', user)
        },
        credential(context, credentials){
            context.commit('updateCredentials', credentials)
        },
        praticien(context, praticien){
            context.commit('updatePraticien', praticien)
        }
    },
    mutations: {
        updateUser(state, newUser){
            localStorage.setItem('userName', newUser)
            state.user.login = newUser
        },
        updateCredentials(state, newCredentials){
            state.user.cryptedPass = newCredentials
            localStorage.setItem('credentials', newCredentials)
        },
        updatePraticien(state, newPraticienSearch){
            localStorage.setItem('praticien', newPraticienSearch)
            state.praticien = newPraticienSearch
        }
    }
})