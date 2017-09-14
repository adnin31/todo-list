<template lang="html">
  <div class="container" style="margin-top:40px">
    <div class="row">
      <div class="col-sm-6 col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <strong> Sign in to continue</strong>
          </div>
          <div class="panel-body">
            <form role="form" action="#" method="POST">
              <fieldset>
                <div class="row">
                  <div class="center-block">
                    <img class="profile-img"
                      src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-10  col-md-offset-1 ">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-user"></i>
                        </span>
                        <input class="form-control" placeholder="Username" name="loginname" type="text" autofocus v-model="username">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-lock"></i>
                        </span>
                        <input class="form-control" placeholder="Password" name="password" type="password" v-model="password">
                      </div>
                    </div>
                    <div class="form-group">
                      <input @click="signin" type="button" class="btn btn-lg btn-primary btn-block" value="Sign in">
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div class="panel-footer ">
            Don't have an account! router-link <a data-toggle="modal" data-target="#modalRegister"> Sign Up Here </a>
          </div>
          <div class="modal fade" id="modalRegister" role="dialog">
              <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header" style="padding:35px 50px;">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4><span class="glyphicon glyphicon-pencil"></span> Register</h4>
                  </div>
                  <div class="modal-body" style="padding:40px 50px;">
                    <form role="form">
                      <div class="form-group">
                        <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                        <input type="text" class="form-control" v-model="username" placeholder="Enter Username">
                      </div>
                      <div class="form-group">
                        <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                        <input type="password" class="form-control" v-model="password" placeholder="Enter password">
                      </div>
                      <div class="form-group">
                        <label for="email"><span class="glyphicon glyphicon-envelope"></span> Email</label>
                        <input type="text" class="form-control" v-model="email" placeholder="Enter email">
                      </div>
                      <button @click="register" type="button" class="btn btn-success btn-block" data-dismiss="modal"><span class="glyphicon glyphicon-off"></span> Register</button>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button @click="close" type="button" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    register () {
      var self = this
      axios.post(`http://localhost:3000/user`, {
        username: self.username,
        password: self.password,
        email: self.email
      })
      .then(res => {
        console.log(res.data)
        self.username = ''
        self.password = ''
        self.email = ''
      })
      .catch(err => console.log(err))
    },
    close () {
      this.username = ''
      this.password = ''
      this.email = ''
    },
    signin () {
      console.log('masuk sign in')
      var self = this
      axios.post(`http://localhost:3000/user/signin`, {
        username: self.username,
        password: self.password
      })
      .then(res => {
        self.username = ''
        self.password = ''
        console.log(res.data)
        localStorage.setItem('token', res.data)
        this.$router.push('/task')
      })
      .catch(err => {
        console.log(err)
        alert('salah')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css" scoped>
.panel-heading {
    padding: 5px 15px;
}

.panel-footer {
	padding: 1px 15px;
	color: #A0A0A0;
}

.profile-img {
	width: 96px;
	height: 96px;
	margin: 0 auto 10px;
	display: block;
	-moz-border-radius: 50%;
	-webkit-border-radius: 50%;
	border-radius: 50%;
}
</style>
