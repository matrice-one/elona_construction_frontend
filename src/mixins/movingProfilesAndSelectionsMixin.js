export default {
    props: {

      profileIndexSelected: {
        type: Number,
        required:true
       
      },
      selectionIndex: {
        type: Number,
      
      },

      choix: {
        type: Object,
        required: true
      },
      profileSelected:{
        type:Object,
        required:true
      }
    },
    methods: {
      moveSelectionOrProfile (transferData) {
        if (transferData.type === 'selection') {
          this.moveSelection(transferData)
        } else {
          this.moveProfile(transferData)
        }
      },
      moveSelection ({ fromSelectionIndex, profileIndexSelected}) {
        let fromSelections = this.profileSelected.selections
        console.log(profileIndexSelected)
        console.log("profileSelected:",this.profileSelected.selections)
        console.log("new selection index aka selectionIndex",this.$selectionIndex)
        this.$store.commit('MOVE_SELECTION', {
          fromSelections,
          fromSelectionIndex,
          toSelections: this.profileSelected.selections,
          toSelectionIndex: this.selectionIndex
        })
      },
      moveProfile ({ fromProfileIndex }) {
        this.$store.commit('MOVE_PROFILE', {
            fromProfileIndex,
          toProfileIndex: this.profileIndex
        })
      }
    }
  }
  