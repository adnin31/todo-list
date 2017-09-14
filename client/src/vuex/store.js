import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtdecoded from 'jwt-decode'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    todo: []
  },
  mutations: {
    setTodo (state, payload) {
      state.todo = payload
    }
  },
  actions: {
    getTodo ({commit}) {
      var token = jwtdecoded(localStorage.getItem('token'))
      axios.get(`http://localhost:3000/user/${token._id}`)
      .then(res => {
        console.log(res.data.task)
        commit('setTodo', res.data.task)
      })
      .catch(err => console.log(err))
    }
  },
  getters: {
    doneTodos: state => {
      return state.todo.filter(todo => {
        return todo.status === 'done'
      })
    },
    todos: state => {
      return state.todo.filter(todo => {
        return todo.status === 'todo'
      })
    }

  }
})
