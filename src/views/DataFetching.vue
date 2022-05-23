<template>
  <div class="data-fetching">
    <div class="columns is-multiline">
      <div class="container p-5">
        <div class="column is-12">
        <p class="title is-size-2 is-primary pt-6">           <img class="p-1" src="@/assets/images/data_fetcher_logo.png" width="60">
DataFetcher</p>
        <a class="subtitle is-size-4">Voir la vidéo explicative </a>

        <div class="field">
          <label>Adresse*</label>
            <div class="control" v-on:keyup.enter="submitForm">
              <input type="text" class="input" v-model="adresse">
            </div>
        </div>

        <div class="notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>
        <div>
          <p> Exemple du format attendu: <i>"Rue des Délices 12a 1203 Genève"</i> </p>

        </div>

        <div class="container">
        <button class="button is-dark my-2" @click="submitForm">Afficher mes données</button>
        </div>

         

      <div class="container" v-if="montre">
        <div class="column is-12 box my-3" >
          <div class="table-container" id="resultat" >
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th
                            v-for="ma in matable"
                            :key="ma.id">
                            {{ ma.name}}
                            </th>

                        </tr>
                    </thead>


                    <tbody ref="resultat">
                        <tr>
                            <td v-for="ma in matable"
                            :key="ma.id"
                            v-html="ma.champ"
                            >
                            
                            </td>

                        </tr>
                    </tbody>
                </table>
                </div>


                </div>


           <input type="button" value="Copier" class="button is-dark my-1" ref="copy" v-on:click="selectElementContents">


        </div>
         <hr class="navbar-divider mt-6">


      <div class="container">
      <button class="button is-warning p-4" @click="showConfig"> Configurer mes sélections</button>
      </div>
      <transition name="fade">
      
        <div class="notification hauteurmin is-warning is-light my-5 is-flex-wrap-wrap" v-if="isOpen" >
          
          <div class="columns  is-multiline">

            <div class="column is-one-third" >
                <div class="content">
                  <h1 class="title is-4 has-text-black">Toutes mes selections:</h1>
                </div>
                <ul>
                  <li
                  v-for="(profile, profileIndex) of choix.profiles"
                  :key="profileIndex" 
                  >
                    <div class="control">
                      <button class="button  is-warning my-1 " :class=" { 'is-primary is-selected': profile.selected }" @click.self="selectProfile(choix, profileIndex)"> {{  profile.name }} <button class="delete is-small ml-2" @click.self="onDeleteProfile(profileIndex)" > </button> </button>
                    </div>
                  </li>
                </ul>

                  
                  <div class="columns">
                      <div class="column is-narrow is-half my-1">
                        <input
                        type="text"
                        class="input is-warning"
                        
                        placeholder="Nouveau Profil"
                        v-model="newProfileName"
                        @keyup.enter="createProfile"
                        >
                    </div>
                  </div>
                  
            </div> 

            
            <div class="column is-two-third">
                <div class="content">
                  <h1 class="title is-4 has-text-black">Modifier la sélection :</h1>
                </div>
            
              <div class="columns ">
                <div class="column mb-6" >
                  <faireChoix
                  :reference="reference"
                  :chooseFromSelection="chooseFromSelection"
                  
                  @choix-submitted="addChoix"
                  />
                </div>

                <div class="column" >
                  <div class="content">
                    <h1 class="title is-4 has-text-black">Configuration selectionnée:</h1>
                  </div>
                  <display-choix 
                  :profileIndexSelected="profileIndexSelected"
                  :choix="choix"
                  
                  />
                </div>
                
            </div>
            </div>

          </div>
          <hr>
              <div class="control">
                <button class="button is-primary is-rounded my-1" ref="sauvegarde" @click="sauvegardeChoix">Sauvegarder les profils</button>
              </div>


        </div>
       </transition>

      

        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'
import faireChoix from '@/components/faireChoix.vue'
import displayChoix from '@/components/displayChoix.vue'
import NewComponent from '@/components/NewComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'DataFetching',
  components: {
    NewComponent,
    faireChoix,
    displayChoix,

  },
  data(){

    return{
      isOpen:false,
      adresse:'',
      montre:null,
      errors:[],
      
      choixselected:[],
      
      newProfileName: '',

    }
  },
  mounted(){
    document.title='Data Fetching | Elona Construction'
    this.getChoixData()
  },
  computed: {
    ...mapState(['choix']),
    ...mapState(['reference']),

    
    matable() {
      let maselection= this.$store.getters.getSelection
      let results = this.$store.getters.getResults

      let toshow = maselection.map(t1 => ({...t1, ...results.find(t2 => t2.id === t1.id)}))

      console.log(toshow)
      return toshow
    },
    profileIndexSelected(){
      let profilesList = this.$store.getters.getProfiles

      let indexTruthy = profilesList.findIndex(item => item.selected === true)
      

        return indexTruthy
    },
    profileSelected(){
      let profilesList = this.$store.getters.getProfiles

      let profileSelected = profilesList.find(item => item.selected === true)
      //console.log("this is the selected profile object",profileSelected)

        return profileSelected

    },
    chooseFromSelection(){
      let profilesList = this.$store.getters.getProfiles

      let profileSelected = profilesList.find(item => item.selected === true)
      let selectionSelected = profileSelected.selections

      let referenceSelection = this.$store.getters.getReferenceSelection

      // Use map to get a simple array of "id" values. Ex: [1,4] (like a mask in python)
      let yFilter = selectionSelected.map(itemY => { return itemY.id; });

      // Use filter and "not" includes to filter the full dataset by the filter dataset's val.
      let filteredX = referenceSelection.filter(itemX => !yFilter.includes(itemX.id));

        return filteredX
    },  

  },
  methods:{
    submitForm() {
    this.errors = []
    if (this.adresse === '') {
    this.errors.push('Adresse manquante')
    }
    if (!this.errors.length) {
      this.$store.commit('setIsLoading', true)
        
      this.sendData()
                    }
   },
    async sendData() {
    this.$store.commit('setIsLoading', true)
            
    let data = {
    'adresse': this.adresse,
    }

    console.log(data)

      await axios
                .post('/api/v1/datafetching/', data)
                .then(response => {

                  //console.log(response.data)
                  
                  this.montre = true
                  this.$store.commit('setResults', response.data)

                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })
      this.$store.commit('setIsLoading', false)
      },

 // copy button function
    selectElementContents() {


  const elTable = this.$refs.resultat;


  let range, sel;

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {

  range = document.createRange();
  sel = window.getSelection();
  // unselect any element in the page
  sel.removeAllRanges();

  try {
    range.selectNodeContents(elTable);
    sel.addRange(range);
  } catch (e) {
    range.selectNode(elTable);
    sel.addRange(range);
  }

  document.execCommand('copy');


  // tick on click copier
  let ephemere = this.$refs.copy;
  ephemere.value = "✔";
  setTimeout(() => (ephemere.value  = "copier"), 2000);
}


    },



// collapse config
showConfig(){
  this.isOpen = !this.isOpen
},

//add choix to profile

addChoix(choixselected){
  this.$store.commit('ADD_SELECTION',choixselected)
  //console.log("this is the thing to add:",choixselected)
},

// create new profile
    createProfile () {
      this.$store.commit('CREATE_PROFILE', {
        name: this.newProfileName
      })

      this.newProfileName = ''
    },
// delete profile
    onDeleteProfile(profileIndex){
      if (profileIndex === this.profileIndexSelected){
        return
      }
        this.$store.commit('REMOVE_PROFILE',profileIndex)

    },

//select profile
selectProfile(choix, profileIndex){
  let iterator = choix.profiles.keys()
  for (let key of iterator){
    this.$store.commit('SELECT_PROFILE_TO_F',key)
  }
  this.$store.commit('SELECT_PROFILE',profileIndex)
},

//testing get choix

  async getChoixData() {
  this.$store.commit('setIsLoading', true)

    await axios
              .get('/api/v1/choix/')
              .then(response => {
                let djangoChoix = response.data
                
                
                //this.testData = []
                //this.testData.push(djangoChoix)

                this.$store.commit('INITIALIZE_CHOIX',djangoChoix)

              })
              .catch(error => {
                  this.testErrors.push('Something went wrong. Please try again')
                  console.log(error)
              })
    this.$store.commit('setIsLoading', false)
    },

    async sauvegardeChoix() {
    this.$store.commit('setIsLoading', true)
            
    let saveData = {'choix':this.choix}

    //console.log(saveData)

      await axios
                .post('/api/v1/send_json/', saveData)
                .then(response => {

                      let SauvegardeEphemere = this.$refs.sauvegarde;
                      SauvegardeEphemere.innerText = "✔";
                      setTimeout(() => (SauvegardeEphemere.innerText  = "Sauvegarder les profils"), 2000);
                  

                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })
      this.$store.commit('setIsLoading', false)
      },
},

}
</script>

<style scoped>

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.hauteurmin{
    min-height: 60vh;
}


</style>