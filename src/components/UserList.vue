<template>
    <div>
        <div class="usersList" v-if="users && users.length">

            <h1>Liste des users</h1>
            <Grid
                :data="users"
                :columns="columns"
            ></Grid>
        </div>

        <!-- Affichage des erreurs -->
        <div v-if="errors && errors.length">
            <h2>Erreurs ?</h2>
            <ul>
                <li v-for="( error, index) of errors" v-bind:key="index">
                    {{ error.message }}
                </li>
            </ul>
        </div>

    </div>

</template>


<!-- Script est séparé dans un fichier externe -->
<script src="./UserList/UserList.js"></script>