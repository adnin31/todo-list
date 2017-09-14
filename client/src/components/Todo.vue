<template lang="html">
  <table class="table table-hover ">
    <tr v-for="tugas in todo">
        <td><button class="btn btn-success" type="button" name="button">Done</button></td>
        <td>
          <h4>{{tugas.task}}</h4>
        </td>
        <td>
          <button type="button" name="button" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#myModal2"> <i class="glyphicon glyphicon-pencil" ></i></button>
          <button type="button" name="button" class="btn btn-danger btn-circle"  @click="deleteList(tugas._id)"><i class="glyphicon glyphicon-trash"></i></button>
        </td>
    </tr>
    <div class="modal fade" id="myModal2" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit Task</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal" method="post" >
              <div class="form-group">
                <div class="row">
                  <label class="col-sm-3 control-label">Task</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="New Task" v-model="newData">
                  </div>
                  <div class="col-sm-3"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="editList(_id)">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </table>
</template>

<script>
import axios from 'axios'
import jwtdecoded from 'jwt-decode'
export default {
  data () {
    return {
      newData: ''
    }
  },
  methods: {
    deleteList (id) {
      var token = jwtdecoded(localStorage.getItem('token'))
      axios.delete(`http://localhost:3000/task/${token._id}/${id}`)
      .then(res => {
        console.log(res.data)
        this.$store.dispatch('getTodo')
      })
      .catch(err => console.log(err))
    }
  },
  computed: {
    todo () {
      return this.$store.state.todo
    }
  }
}
</script>

<style lang="css">
</style>
