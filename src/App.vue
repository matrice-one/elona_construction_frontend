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
        <img class=" mt-2 " src="@/assets/images/logo_elona_yellow.png" style="min-height:3.75rem">
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
        <router-link to="/cities" class="navbar-item">Villes</router-link>
        <router-link to="/data-fetching" class="navbar-item">Entreprises</router-link>
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

  <footer class="footer">
    <div class="columns is-centered">
      <div class="column is-11">

        <div class="tile is-ancestor">
          <div class="columns is-centered is-multiline">

            <div class="tile is-parent is-vertical is-5">
              <div class="tile is-child">
                <div class="image is-128x128">
                  <img  src="@/assets/images/logo_yello_no_text.png" style="max-width:5em">
                </div>
                <div class="container">
                  <p class="text has-text-white">
                    E-cco est une startup genevoise créée en 2022. Elle participe à la transition énergétique en faisant bénéficier ses acteurs des avancées numériques.
                  </p>
                </div>
              </div>
            </div>

            <div class="tile is-parent is-3">
              <div class="tile is-child">
                <div class="content has-text-white">
                  <p class="title has-text-white is-5">  <br><br>
                  </p>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-1">
              <div class="tile is-child">
                <div class="content has-text-white">
                  <p class="title has-text-white is-5">  <br><br>
                  </p>
                </div>
              </div>
            </div>


            <div class="tile is-parent is-3">
              <div class="tile is-child">
                <div class="content has-text-white">
                  <p class="title has-text-white is-5"> Nous contacter: </p> <p><br><br>
                    Téléphone: <br> 00 41 76 368 18 38 <br><br>
                    Email: <br>marketing.team@energie-expert.ch <br><br>
                  </p>
                </div>
              </div>
            </div>

          </div>

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
$primary: #1d492b;
$link: #f89209;
$footer-background-color : #1d492b;
$navbar-padding-horizontal:size-2;
$navbar-item-color:#f89209;



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
</style>
