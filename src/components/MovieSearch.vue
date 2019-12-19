<template>
    <input class="movie__search" id="movie-search" type="text" placeholder="Entrez un titre de film" @keyup.enter="launchEventFromChild" />
</template>


<script>
export default {
    methods: {

    launchEventFromChild: function(event) {
      // Lancement de l'événement personnalisé avec un paramètre
      this.$emit('event_child', event.target.value);
    }
  },
}
</script>