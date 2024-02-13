<script setup>
</script>

<template>
  <h1>Viens tester ta vivacité d'esprit !</h1>

  <div class="home__content">

    <RouterLink class="home__content--link" to="/raven"> <img src="../assets/Raven.jpg" alt="Jeu de Corbeau">
      <p>Jeu du Corbeau</p>
    </RouterLink>
    <RouterLink class="home__content--link" to="/mouse"> <img src="../assets/Mouse.jpg" alt="Labyrinthe de la souris">
      <p>Labyrinthe de la souris</p>
    </RouterLink>
    <RouterLink class="home__content--link" to="/memory"> <img src="../assets/Memoire.jpg" alt="Test de memoire">
      <p>Test de Mémoire</p>
    </RouterLink>

  </div>
</template>

<style lang="scss" scoped>
.home {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;

    &--link {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: white;

      border-bottom: 2px solid #FFB800;
      border-top: 2px solid #FFB800;
      border-radius: 30px;

      img {
        border-radius: 30px;
      }

    }
  }
}
</style>