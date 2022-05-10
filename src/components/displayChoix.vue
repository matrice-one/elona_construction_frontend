<template>
<div>
    <div class="control">
        <div class="tag is-large is-primary is-rounded mb-2"> {{ choix.profiles[profileIndexSelected].name }} </div>
    </div>
<ul>
    <li
    v-for="(selection, selectionIndex) of choix.profiles[profileIndexSelected].selections"
    :key="selectionIndex" 
    draggable="true"
    @dragstart="pickupSelection($event, selectionIndex, profileIndexSelected)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveSelection($event, choix.profiles[profileIndexSelected].selections, selectionIndex)"
    >

                <div class="tag is-medium is-primary is-light is-rounded my-1" > {{  selection.name }} <button class="delete" @click="onDeleteSelection(selectionIndex)"></button></div>
              

    </li>

</ul>



</div>
</template>

<script>



export default {


    name: 'displayChoix',
 
    data(){
        return {

        }
    },

    props: {
            choix: {
            type:Object,
            required:true,
        },
        profileIndexSelected:{
        type:Number
        },
        selectionIndex: {
        type: Number,
        
        },

    },
 

methods:{
    onDeleteSelection(selectionIndex){
        this.$store.commit('REMOVE_SELECTION',selectionIndex)

    },
    pickupSelection (e, selectionIndex, fromProfileIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-selection-index', selectionIndex)
      e.dataTransfer.setData('from-profile-index', fromProfileIndex)
      e.dataTransfer.setData('type', 'task')
    },
    moveSelection (e, toSelections, toSelectionIndex) {
      const fromProfileIndex = this.profileIndexSelected
      const fromSelections = this.choix.profiles[fromProfileIndex].selections
      const fromSelectionIndex = e.dataTransfer.getData('from-selection-index')

      console.log("this is the from profile Index aka computed",fromProfileIndex)

      this.$store.commit('MOVE_SELECTION', {
        fromSelections,
        toSelections,
        fromSelectionIndex,
        toSelectionIndex
      })
    },    
    }   ,
}


</script>