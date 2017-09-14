<template lang="html">
  <div class="" style="margin-top:100px">
    <div class="container ">
      <div class="col-md-6 col-md-offset-3">
        <form class="form" @submit.prevent="addNewTask()">
          <div class="form-group form-inline">
            <input style="width :75%" type="text" v-model ="addTask" placeholder="New Task" class="form-control">
            <!-- <input type="text" v-model= "date" placeholder="YYYY-MM-DD" class="form-control"> -->
            <button type="submit" class="btn btn-primary" name="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="">
      <div class="col-md-6">
        <h1>todo</h1>
        <Todo></Todo>
      </div>
      <div class="col-md-6">
        <h1>done</h1>
        <Done></Done>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Todo from '@/components/Todo'
import Done from '@/components/Done'
export default {
  components: {
    Todo,
    Done
  },
  data () {
    return {
      addTask: ''
    }
  },
  methods: {
    addNewTask () {
      var self = this
      axios.post(`http://localhost:3000/task`, {
        task: self.addTask
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log(data)
        self.addTask = ''
        this.$store.dispatch('getTodo')
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.$store.dispatch('getTodo')
  }
}
</script>

<style lang="css">
</style>
