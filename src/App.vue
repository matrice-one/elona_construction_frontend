<template>

  <!-- <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="@/assets/images/Logo2_ecco.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Documentation
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav> -->
<div id="wrapper">
  <nav class="navbar is-primary is-fixed-top">
    <div class="navbar-brand">

      <a class="navbar-item" href="/">
        <img class="ml-5 mt-2" src="@/assets/images/Logo2_ecco.png" width="112" height="28">
      </a>

      <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active':showMobileMenu}">
      <div class="navbar-start">  

      </div>
      <div class="navbar-end">
        <router-link to="/prospecting" class="navbar-item">Prospecting</router-link>
        <router-link to="/data-fetching" class="navbar-item">Data-Fetching</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/tableau-de-bord" class="button is-light"> Tableau de bord </router-link>
            </template> 
            <template v-else>
            <router-link to="/log-in" class="button is-light" >Log in</router-link> 
            </template>  

          </div>
        </div>

      </div>
    </div>
  </nav>
  <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading }">
  <div class="lds-dual-ring"></div>
</div>

    <router-view/>


</div>

  <footer class="footer">
    <p class="has-text-centered">Copyright (c) 2021</p>
  </footer>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      showMobileMenu:false,
      cart: {
        items: []
      }
    }
  },

  beforeCreate(){
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token){
      axios.defaults.headers.common['Authorization'] = "Token " + token
    }else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },

}
</script>


<style lang="scss">
$primary: #004706;
$link: #f89209;


@import '../node_modules/bulma';

body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto;
}

nav {
  position: fixed;
}

.lds-dual-ring {
  margin: 35px;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {

  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>
