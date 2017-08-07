'use-strict'



window.onload = function () {
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
              console.log(data.data);
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
