import { uuid } from './utils'

export default{
    name:'referencelect',
    profiles:[
        {
            name:'Profil 1',
            selected:true,
            selections:[
                {
                    name: 'Canton',
                    champ:'',
                    id:1,
                },
                {
                    name: 'Commune',
                    commune:'',
                    id:2,
                },
                {
                    name: 'Numéro de rue',
                    numero:'',
                    id:3,
                },
                {
                    name: 'Nom de rue',
                    nom:'',
                    id:4,
                },
                {
                    name: 'Année de construction',
                    annee:'',
                    id:5,
                },
                {
                    name: 'Surface du bâtiment',
                    surface:'',
                    id:6,
                },
                {
                    name: 'Nombre de niveaux',
                    niveaux:'',
                    id:7,
                },
                {
                    name: 'NPA',
                    npa:'',
                    id:8,
                },
                {
                    name: 'EGID',
                    egid:'',
                    id:9,
                },
                {
                    name: 'Numéro de bâtiment',
                    batiment:'',
                    id:10,
                },
                {
                    name: "Type d'immeuble",
                    immeuble:'',
                    id:11,
                },

            ]
        },        
    ]
}