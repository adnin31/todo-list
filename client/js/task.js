'use-strict'



window.onload = function () {

  Vue.component('list-todo',{
    props :["list-task","edit","edit-modal","delete-list"],
    template:
    `  <table class="table table-hover">
        <tr v-for ="list in listTask" class='fade-in'>
            <td><a href="#"><input type="checkbox"></a></td>
            <td>
              {{list.task}}
            </td>
            <td>
              {{list.dueDate}}
            </td>
            <td>
              <button type="button" name="button" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#myModal2" @click="editModal(list._id)"> <i class="glyphicon glyphicon-pencil" ></i></button>
              <button type="button" name="button" class="btn btn-danger btn-circle"  @click="deleteList(list._id)"><i class="glyphicon glyphicon-trash"></i></button>
            </td>
        </tr>
      </table>`
  })

    var main = new Vue({
        el: '#app',
        data:{
            message : "hai",
            _id :'',
            addTask : '',
            date :'',
            showListToDo:[]
        },
        methods:{
          addNewTask(){
            let self = this
            axios.post('http://localhost:3000/task/',{
              task : self.addTask,
              date : self.date
            })
            .then(log=>{
              console.log(log.data);
              self.showListToDo.push(log.data)
              self.addTask = ''
              self.date = ''
            })
            .catch(err=>{
              console.log(err, 'ini error');
            })
          },
          showList(){
            let self = this
            axios.get('http://localhost:3000/task/',{

            })
            .then(data=>{
              self.showListToDo = data.data

            })
            .catch(err=>{
              console.log(err, 'ini error');
            })
          },
          deleteList(id){
            let self = this
            axios.delete(`http://localhost:3000/task/${id}`,)
            .then(data=>{
              const newData = self.showListToDo.filter(function(barang){
                return barang._id != id
              })
              self.showListToDo = newData
              console.log(data);
            })
            .catch(err=>{
              console.log(err, 'ini error');
            })
          },
          select(id){
            let self = this
            axios.get(`http://localhost:3000/task/${id}`)
            .then(row=>{
              console.log(row.data);
              self._id = row.data._id
              self.addTask = row.data.task
              self.date = row.data.dueDate
            })
            .catch(err=>{
              console.log(err);
            })
          },
          editList(id){
            const self = this
            axios.put(`http://localhost:3000/task/${id}`,{
              task : self.addTask,
              date : self.date
            })
            .then(log=>{
              const newData = self.showListToDo.map(function(list){
                if(list._id === self._id){
                  list.task = self.addTask
                  list.dueDate = self.dueDate
                  return list
                }else {
                  return list
                }
              })
              self.showListToDo = newData
              self.addTask = ''
              self.date = ''


            })
            .catch(err=>{
              console.log(err);
            })
          }

        },
        created(){
          this.showList()
        }

    });
}
