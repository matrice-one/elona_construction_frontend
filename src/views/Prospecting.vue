<template>
  <div class="prospecting">
      <div class="section is-medium has-text-centered has-text-justified">
        <div class="container is-max-desktop">
        <p class="title is-size-2 is-primary mb-6">Prospecting app</p>
        <p class="subtitle is-size-4">Obtenez une liste de clients selectionnés par notre algorithme pour maximiser vos chances de décrocher un mandat et de maximiser vos marges.</p>
        
        <div class="field">
          <label>Adresse d'intérêt*</label>
            <div class="control" v-on:keyup.enter="submitForm">
              <input type="text" class="input" v-model="form.adress_of_interest">
            </div>
        </div>

        <div class="field">
          <label>Rayon désiré</label>
            <div class="control" v-on:keyup.enter="submitForm">
              <input type="text" class="input" v-model="form.rayon_of_interest">
            </div>
        </div>


        <div class="field">
          <label>Type de service à promouvoir</label>
            <div class="control" v-on:keyup.enter="submitForm">
              <select v-model="form.service_of_interest" multiple>
                  <option>Conseil en efficience énergétique</option>
                  <option>Architecture</option>
                  <option>Vente de panneaux solaires</option>
                  <option>Ventre de pompes à chaleur</option>
                  <option>Rénovation de facades</option>
                </select>
            </div>
        </div>

        <button class="button is-dark my-2" @click="submit">Obtenir de nouveaux leads</button>

       
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Prospecting',
  components: {
  },
  data(){
    return {
      form: {
        adress_of_interest : '',
        rayon_of_interest : '',
        service_of_interest : '',
      }
    }
  },
  mounted(){
    document.title='Prospection | Elona Construction'
   
  },
  computed: {
  },
  methods:{
    onSubmit(evt) {
  evt.preventDefault()
  axios({
          method: 'post',
          url: '/api/v1/prospecting/', // make sure your endpoint is correct
          data: this.form
      })
      .then(response => {
          //handle success
          console.log(response.data);
          // do some stuff here: redirect or something you want
      })
      .catch(error => {
          //handle error
          console.log(error.data);
      });
},
  }

}
</script>




