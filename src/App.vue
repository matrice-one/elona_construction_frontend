<template>

<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" type="image/png" href="@/assets/images/logo_elona_yellow.png"/>
    <title>Elona Construction</title>
</head>

<div id="wrapper">

<div class="has-navbar-fixed-top ">
  <nav class="navbar is-primary is-fixed-top">
    <div class="navbar-brand navbarpadding ">

      <a class="navbar-item " href="/">
        <img class=" mt-2 " src="@/assets/renovation.png" style="min-height:3.75rem">
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
      <div class="navbar-end navbarpadding ">
        <router-link to="/data-fetching" class="navbar-item">Outil Entreprises</router-link>
        <router-link to="/cities" class="navbar-item">Services Villes</router-link>
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

  <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading my-6': $store.state.isLoading }">
  <div class="lds-dual-ring is-vcentered is-fullheight"></div>


</div>
</div>

<div class="contenu">
    <router-view/>
</div>

</div>

     <footer class="footer has-background-dark has-text-primary-light">
      <div class="content">
        <div class="columns">
          <div class="column p-3">
                <div class="image is-128x128 p-3">
                  <img  src="@/assets/renovation_green.png" style="max-width:5em">
                </div>
          </div>
          <div class="column">
            <h2 class="subtitle is-4 has-text-primary">A propos de nous</h2>

            <!-- <p> Notre mission </p> -->
            <p class="mr-6"> E-cco est une startup Genevoise fondée en 2022 par trois amis souscieux d'avoir un impact positif en contribuant à la transition énergétique par la voie du digital.</p>
          </div>
          <div class="column">
            <h2 class="subtitle is-4 has-text-primary">Legal</h2>

            <p> GDPR </p>
            <p> Mentions légales </p>
            <p>  </p>
          </div>
          <div class="column">
            <h2 class="subtitle is-4 has-text-primary">Nous contacter</h2>

            <p> 00 41 76 368 18 38 </p>
            <p> Mentions légales </p>
          </div>
        </div>
      </div>
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

@import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@700&display=swap" rel="stylesheet');
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300&display=swap" rel="stylesheet');


$family-serif: "Libre Franklin", sans-serif;
$family-primary: $family-serif;


$primary: #53fab9;
$link: #232128;
$footer-background-color : #232128;
$navbar-padding-horizontal:size-2;
$navbar-item-color:#232128;
$light:#BDFFE5;
$dark: #232128;



@import '../node_modules/bulma';

.contenu {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}


#app {
  flex: 1;
  display: flex;
  flex-direction: column;
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

@media only screen and (min-width: 768px) {
  .navbarpadding{
  padding-right: 3rem;
  padding-left: 3rem;
}

}

.contenu {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.navbar-default { margin : 0 !important; }

html,body{
    overflow-x: hidden;
}
</style>
