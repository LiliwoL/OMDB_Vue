// Script de UserList

// Dépendance avec Axios
import axios from 'axios';

import Grid from '../Grid.vue';


export default {

    /**
     * Propriétés du composant
     * définies avec une fonction
     */
    data () {
        return {
            users: [],
            errors: [],
            columns: []
        }
    },

    components: {
        Grid
    },

    /**
     * Lifecycle method on created
     */
    created () {
        // Appel à une API avec axios
        // https://fr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
        // Axios est préférable à FETCH car il ajoute des polyfill
        axios.get( 'https://randomuser.me/api/?results=50' )
        .then(
            response => {
                // Axios interprère directement en JSON les réponses JSON

                // On ajoute la prise en charge de console.log par ESLINT

                /* eslint-disable no-console */
                console.log ( response );
                /* eslint-enable no-console */

                // Récupération des valeurs
                this.users = response.data.results;

                this.columns = [
                    "name.first",
                    "email",
                    "picture.medium"
                ];
            }
        )
        .catch(
            e => {
                // On ajoute l'erreur à this.errors
                this.errors.push(e);
            }
        )
    }
}