// Fichier qui crée un bus d'événement
import Vue from 'vue';

//https://cdn.ednsquare.com/s/*/25bdae7c-bf15-4189-a143-4e1b892272f5.png

// https://fr.vuejs.org/v2/api/#Methodes-et-Evenements-d%E2%80%99Instance

// Une nouvelle instance de vue placée dans une constante EventBus
// Totalement découpée du DOM, vide.
export const EventBus = new Vue();


// Inscription à l'événement clickButton directement
EventBus.$on(
    'clickButton', 
    (name) => {
        /* eslint-disable no-console */
        console.log ('Bonjour depuis EventBus' + name);
        /* eslint-ensable no-console */
    }
  )