<template>
    <div class="movie__list">
      <h1>
        Liste des films contenant le terme <b>{{ query }}</b>
      </h1>

      <!-- Composant Grid -->
      <Grid
          :data="movies"
          :columns="columns"
      ></Grid>
    </div>
</template>


<script>

import Grid from './Grid.vue';

export default {
    props: [
        'query',
        'movies'
    ],

    computed: {
      // Génération des columns
      /**
       * @TODO: génération du columns à partir de movies
       */
      columns: function() {
        return [
          'Title',
          'Year',
          'Poster'
        ];
      } 
    },

    components: {
        Grid
    }
}
</script>

<style scoped>
  .movie__list{
    margin-top: 50px;
  }
</style>