<script setup>
import Game from '@/components/GameRaven/Game.vue'
import ListeScore from '@/components/GameRaven/ListeScore.vue';
import ToucheBottom from '@/components/Icon/ToucheBottom.vue';
import ToucheLeft from '@/components/Icon/ToucheLeft.vue';
import ToucheRight from '@/components/Icon/ToucheRight.vue';
import ToucheTop from '@/components/Icon/ToucheTop.vue';
</script>


<template >
    <div class="game">

        <Game />

        <div class="game__right">
            <div class="game__right--rules">
                <h2 class="game__right--rules--title">Règles</h2>
                <p class="game__right--rules--paragraph">Ouvrir la Cage</p>

                <div class="game__commande">
                    <div class="game__commande--content">
                        <ToucheTop />
                        <p>Saut</p>
                    </div>
                    <div class="game__commande--touche">
                        <div class="game__commande--content">
                            <ToucheLeft />
                            <p>Gauche</p>
                        </div>

                        <div class="game__commande--content">
                            <ToucheRight />
                            <p>Droit</p>
                        </div>
                    </div>
                </div>


            </div>
            <ListeScore />
        </div>
    </div>
</template>

<style lang="scss"scoped>
.game {

    &__left {}

    &__commande {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            color: white;
        }


        &--content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &--touche {
            display: flex;
            gap: 20px;

        }
    }

    &__right {
        position: absolute;
        right: 10%;
        top: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;

        &--rules {
            margin-bottom: 5rem;

            &--title {
                font-size: 24px;
                color: #FFB800;
            }

            &--paragraph {
                font-size: 16px;
                color: white;
                margin-bottom: 5rem;

            }
        }
    }
}
</style>
