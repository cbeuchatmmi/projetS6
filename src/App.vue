<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue';
import Logo from './components/Icon/Logo.vue';
import Profil from './components/Icon/Profil.vue';


onMounted(() => {
  const router = useRouter();
  const route = useRoute();

  // Récupérer userId depuis le stockage local
  const userId = localStorage.getItem('userId');

  // Si userId n'est pas défini et l'utilisateur n'est pas déjà sur la page de connexion, redirigez-le
  if (!userId && route.path !== '/login') {
    router.push('/login');
  }
});



</script>

<template>
  <header>

    <div class="wrapper">

      <nav class="wrapper__nav">
        <RouterLink class="wrapper__nav--link" to="/">
          <Logo />
        </RouterLink>
        <RouterLink class="wrapper__nav--link" to="/raven">Corbeau</RouterLink>
        <RouterLink class="wrapper__nav--link" to="/mouse">Souris</RouterLink>
        <RouterLink class="wrapper__nav--link" to="/memory">Mémoire</RouterLink>
        <RouterLink class="wrapper__nav--link" to="/login">
          <Profil />
        </RouterLink>
      </nav>
    </div>
  </header>
  <div class="content">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  border-bottom: 2px solid #FFB800;

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--link {
      text-decoration: none;
      color: white;
      font-size: 28px;
      font-weight: bold;

      &:hover {
        color: #FFB800
      }
    }
  }
}
</style>
