<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCards } from '@/composables/cards'
import CatCardItem from '@/components/game/CatCardItem.vue'
import deckImage from '@/assets/images/game/deck.png'
import ogreMinion from '@/assets/images/enemies/ogre_minion.png'

const { cards } = useCards()
const showHand = ref(false)

// Randomly select 5 cards from the deck as the player's hand
const playerHand = ref(cards.value.slice(0, 5))

onMounted(() => {
  // Animate cards into hand after a brief delay
  setTimeout(() => {
    showHand.value = true
  }, 500)
})
</script>

<template>
  <div class="w-full h-screen flex flex-col relative overflow-hidden">
    <!-- Battle Arena Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-purple-900 via-slate-800 to-green-900 opacity-40"></div>

    <!-- Opponent Area (Top) -->
    <div class="flex-1 flex items-center justify-center relative z-10">
      <div class="text-center">
        <!-- Enemy Image -->
        <img :src="ogreMinion" alt="Enemy" class="w-64 h-64 object-contain drop-shadow-2xl animate-float" />

        <!-- Enemy Health Bar -->
        <div class="mt-4 w-64 mx-auto">
          <div class="bg-gray-800 rounded-full h-6 overflow-hidden border-2 border-gray-600">
            <div class="bg-gradient-to-r from-red-500 to-red-600 h-full w-full transition-all"></div>
          </div>
          <p class="text-white text-xl font-bold mt-2">Ogre Minion</p>
          <p class="text-red-400 font-semibold">HP: 100/100</p>
        </div>
      </div>
    </div>

    <!-- Card Placeholders (Middle) -->
    <div class="relative z-10 flex justify-center gap-4 py-8">
      <!-- Opponent Card Placeholders -->
      <div class="flex gap-2">
        <div v-for="i in 3" :key="`opponent-${i}`"
          class="w-20 h-28 border-2 border-dashed border-white/30 rounded-lg bg-white/5"></div>
      </div>
    </div>

    <!-- Player Area (Bottom) -->
    <div class="relative z-10 pb-8">
      <!-- Player's Hand -->
      <div class="flex justify-center gap-4 px-4 mb-4">
        <TransitionGroup name="hand-card">
          <div v-for="(card, index) in playerHand" v-show="showHand" :key="card.id"
            class="hover:-translate-y-8 transition-transform duration-300 cursor-pointer"
            :style="{ transitionDelay: `${index * 100}ms` }">
            <div class="w-40">
              <CatCardItem :card="card" />
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Deck in Bottom Right -->
      <div class="absolute bottom-4 right-8">
        <img :src="deckImage" alt="Deck"
          class="w-32 h-44 object-contain drop-shadow-xl cursor-pointer hover:scale-105 transition-transform" />
        <div
          class="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-white">
          0
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.hand-card-enter-active {
  transition: all 0.6s ease;
}

.hand-card-enter-from {
  opacity: 0;
  transform: translateY(100px) rotate(10deg);
}

.hand-card-enter-to {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}
</style>
