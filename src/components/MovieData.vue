<template>
    <div class="movie__data">
      <div class="movie__poster" v-if="!error">

        <span class="movie__poster--fill">
          <transition name="fade">
            <img :src="movie.Poster" @load="imgLoaded" v-show="showImg" />
          </transition>
        </span>

        <span class="movie__poster--featured">
          <transition name="fade">
            <img :src="movie.Poster" @load="imgLoaded" v-show="showImg" />
          </transition>
        </span>
      </div>


      <div class="movie__details" v-if="!error">

        <h2 class="movie__title">{{movie.Title}}</h2>

        <ul class="movie__tags list--inline">
          <li class="movie__rated">{{movie.Rated}}</li>
          <li class="movie__year">{{movie.Year}}</li>
          <li class="movie__genre">{{movie.Genre}}</li>
        </ul>

        <p class="movie__plot">{{movie.Plot}}</p>

        <div class="movie__credits">
          <p><strong>Written by:</strong> {{movie.Writer}}</p>
          <p><strong>Directed by:</strong> {{movie.Director}}</p>
          <p><strong>Starring:</strong></p>
          <ul class="movie__actors list--inline">
            <li v-for="(actor, index) in movie.Actors" v-bind:key="index">
                {{actor}}
            </li>
          </ul>
        </div>
      </div>

      <div class="movie__error" v-show="error">
        <h2>{{movie.Error}}</h2>
      </div>

    </div>
</template>


<script>
export default {
    props: [
        'movie',
        'error'
    ],
    template: '#tpl-movie-data',

    data: function() {
        return {
            showImg: false
        }
    },

    methods: {
        imgLoaded: function() {
            this.showImg = true;
        }
    }
}
</script>

<style scoped>

</style>