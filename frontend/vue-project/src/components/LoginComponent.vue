<template>
  <NavBarComponent />
  <div class="container">
    <div class="square-container">
      <form @submit.prevent="handleSubmit">
        <label for="username">username:
          <input type="username" id="username" v-model="username" required>
        </label>

        <label for="password">Password:
          <input type="password" id="password" v-model="password" required>
        </label>

        <h3 v-if="usernameNotFound">Username is not found</h3>
        <h3 v-if="loginFailed">Invalid username or password</h3>

        <div class="buttons">
          <button @click="handleSubmit">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        username: '',
        password: '',
        usernameNotFound: false,
        loginFailed: false
      }
    },
  methods: {
    async handleSubmit() {
      const userData = {
        username: this.username,
        password: this.password
      };

        console.log(userData);




          //TODO - implement login logic
      // for now, this :
      const stineUsername = "Stine"
      const stinePassword = "7Ddv%O5wn$1^"
          
      const meganUsername = "Megan"
      const meganPassword = "dP5Ua:L*0.+3"

      if (userData.username === stineUsername && userData.password === stinePassword) {
        console.log("Stine is logged in")
        sessionStorage.setItem('username', userData.username)
        this.$router.push({ name: "ArticlesComponent" });
      } else if (userData.username === meganUsername && userData.password === meganPassword) {
        console.log("Megan is logged in")
        sessionStorage.setItem('username', userData.username)
        this.$router.push({ name: "ArticlesComponent" });
      } else {
        console.log("Invalid username or password")
        this.loginFailed = true;
      }
            
    //   const response = await this.fetchInterceptor.session.asyncSignIn(userData.username, userData.password)

    //   if (response.error){
    //     this.loginFailed = true;
    //     return
    //   }

    //   const player = await this.playerService.findPlayerWithName(userData.username)
    //   if (player.error) {
    //     this.usernameNotFound = true;
    //     return
    //   }

    //   localStorage.setItem('playerId', player.id)
    //   sessionStorage.setItem('guestAccess', 'true')
      
    //   await this.redirectToDashboard()

    },
    redirectToCreateArticle() {
      this.$router.push({ name: "CreateArticle" });
    }
  },
}
</script>

<style scoped>


.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.square-container {
    background-color: var(--primary-pink);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 48rem;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    border-radius: 10px;
}

form {
  min-width: 300px;
  max-width: 350px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

label[for="username"], input#username,
label[for="password"], input#password {
  grid-column: span 1;
}

label {
  min-width: 20px;
  margin: 20px 0px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  color: white;
}
input, select {
  display: block;
  padding: 6px 2px;
  margin-right:5px;
  width: 90%;
  box-sizing: border-box;
  border: solid 1px;
  border-radius: 10px;
  color: black;
}

h3 {
  grid-column: span 2;
  justify-self: center;
  margin-top: -10px;
  margin-bottom: -5px;
}

.buttons {
  grid-column: span 2;
  justify-self: center;
}

.buttons button {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 10px 0;
  width: 280px;
  height: 80px;
  font-size: 40px;
  font-family: 'Magic-School-One',serif;
}

a:-webkit-any-link {
  color: black;
  text-decoration: none;
}

</style>
