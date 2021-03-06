<template>

  <div id="app">

    <transition name="fade">
      <div class="loader-overlay" v-if="loading">
        <div class="loader"></div>
        <h2>Récupération des informations</h2>
      </div>
    </transition>

    <transition name="slide-fade" appear="appear">

      <div class="movie" id="movie-card" v-if="!loading">
        <!-- Composant movie-data -->
        <MovieData :movie="movie" :error="error" v-if="!loading && !displayList"></MovieData>

         <!-- Composant movie-search -->
        <MovieSearch v-on:event_child="findMovieByList($event)"></MovieSearch>

        <!-- Composant movie-list -->
        <MovieList :query="query" :movies="movieList" v-if="!loading && displayList"></MovieList>
      </div>

    </transition>


    <!-- Lancement d'un événement global géré par EventBus -->
    <button @click="emitGlobalEvent">
      Cliquez moi pour lancer un événement global
    </button>
  </div>
  
</template>

<script>

// Import de MovieData
import MovieData from './components/MovieData.vue';
// Import de MovieSearch
import MovieSearch from './components/MovieSearch.vue';
// Import de MovieList
import MovieList from './components/MovieList.vue';

// Import du Eventbus
import { EventBus } from './event-bus.js';


const key = '2fb7569a';
const defaultTitle = 'the running man';
// Url de recherche qui renvoie un seul film
const url = `https://www.omdbapi.com/?apikey=${key}&t=`;
// Url de recherche qui renvoie une liste
const urlList = `https://www.omdbapi.com/?apikey=${key}&s=`;


export default {
  name: 'App',

  // Data doit être une fonction comme n'importe quel composant
  data () {
    return {
      movie: Array,
      loading: true,
      error: false,


      // Liste de films qui sera  utilisée par le composant Liste
      query: String,
      movieList: Array,
      displayList: false
    }
  },

  methods: {
    // Gestion du click sur un bouton pour un event global
    emitGlobalEvent: function() {
      EventBus.$emit('clickButton', "Bonjour");
    },

    findMovie: function(title) {
      this.error = false;
      this.loading = true;

      fetch(url + title)
        .then(
          res => res.json()
        )
        .then(
          data => {
            this.movie = data;
            if (this.movie.Actors) this.movie.Actors = data.Actors.split(', ');
            if (this.movie.Error) this.error = true;
            this.loading = false;
          }
        ).catch(
          err => {
            
            /* eslint-disable no-console */
            console.log ( err );
            /* eslint-enable no-console */

            this.error = true;
            this.loading = false;
          }
        );
    },

    findMovieByList: function(title) {

      this.error = false;
      this.loading = true;
      this.query = title;

      fetch(urlList + title)
        .then(
          res => res.json()
        )
        .then(
          data => {
            this.movieList = data.Search;

            // Changement de this.error en fonction du retour
            if (data.totalResults) this.error = true;

            this.loading = false;
            this.displayList = true;
          }
        ).catch(
          err => {

            /* eslint-disable no-console */
            console.log ( err );
            /* eslint-enable no-console */

            this.error = true;
            this.loading = false;
          }
        );
    },


    searchHandler: function(e) {
      if (e.target.value) {
        this.findMovie(e.target.value);
        e.target.blur();
      }
    },

    searchByList: function(e) {
      if (e.target.value) {
        this.findMovieByList(e.target.value);
        e.target.blur();
      }
    }
  },

  mounted() {
    this.findMovie(defaultTitle);
  },

  // On liste ci-dessous les composants utilisables dans l'instance de vue
  components: {
    MovieData,
    MovieSearch,
    MovieList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400,900');

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  background-color: whitesmoke;
}

h1,
h2,
p,
ul {
  line-height: 1.2;
}

h1:not(:last-child),
h2:not(:last-child),
p:not(:last-child),
ul:not(:last-child) {
  margin-bottom: 12px;
}

p,
li {
  font-size: 0.9em;
  line-height: 1.5;
}

p+ul {
  margin-top: -10px;
}

h1,
h2,
strong {
  font-weight: 900;
}

input {
  padding: 6px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  border: 1px solid gainsboro;
  border-radius: 2px;
  -webkit-appearance: none;
}

.list--inline li {
  display: inline-block;
}

.list--inline li:not(:last-child) {
  margin-right: 12px;
}

.movie {
  position: relative;
  overflow: hidden;
  margin: 12px auto;
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 0.8em;
  box-shadow: rgba(0, 0, 0, 0.2) 0 30px 18px -24px;
}

.movie__data,
.movie__list {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 400px;
}

@media (min-width: 600px) {
  .movie__data {
    flex-direction: row;
  }
}

.movie__search {
  position: absolute;
  top: 24px;
  right: 24px;
  margin: auto;
  width: calc(100% - (12px * 4));
}

@media (min-width: 400px) {
  .movie__search {
    max-width: 200px;
  }
}

.movie__tags {
  font-size: 0.75em;
  color: darkgray;
}

.movie__poster {
  position: relative;
  display: flex;
  width: 100%;
  transform: translateZ(0);
}

@media (min-width: 600px) {
  .movie__poster {
    margin-right: 12px;
    width: 200px;
  }
}

.movie__poster--fill {
  position: absolute;
  overflow: hidden;
  top: -80%;
  bottom: -20%;
  left: -20%;
  width: 150%;
  height: 150%;
  background-color: gainsboro;
  transform: rotate(5deg);
}

@media (min-width: 600px) {
  .movie__poster--fill {
    top: -20%;
    width: 100%;
  }
}

.movie__poster--fill img {
  filter: blur(6px);
  object-fit: cover;
  width: 100%;
  height: 100%;
  transform: scale(1.4);
}

.movie__poster--featured {
  position: relative;
  display: block;
  align-self: center;
  margin-top: 84px;
  margin-left: 24px;
  width: 140px;
  background-color: lightgray;
  border-radius: 2px;
  z-index: 1;
}

@media (min-width: 600px) {
  .movie__poster--featured {
    left: 56px;
    margin: auto;
  }
}

.movie__poster--featured img {
  display: block;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.6) 0 6px 12px -6px;
}

.movie__poster--featured img[src="N/A"] {
  min-height: 206px;
  opacity: 0;
}

.movie__details {
  flex: 1;
  padding: 24px;
}

@media (min-width: 600px) {
  .movie__details {
    padding: 72px;
  }
}

.movie__title {
  font-family: 'Lato', sans-serif;
  font-size: 2em;
}

.movie__error {
  align-self: center;
  justify-self: center;
  width: 100%;
  text-align: center;
}

.loader-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  z-index: 100;
}

.loader-overlay *+* {
  margin-top: 6px;
}

.loader {
  position: relative;
  border-radius: 100%;
  width: 32px;
  height: 32px;
}

.loader:before,
.loader:after {
  content: "";
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-width: 4px;
  border-radius: 100%;
  border-style: solid;
}

.loader:before {
  border-color: inherit;
  opacity: 0.2;
}

.loader:after {
  border-bottom-color: transparent;
  border-left-color: inherit;
  border-right-color: transparent;
  border-top-color: transparent;
  transform: translateZ(0);
  animation: spin 2s infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(1080deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}




.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>