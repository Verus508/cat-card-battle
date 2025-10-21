<script setup lang="ts">
import type { CardPack } from '@/types/game'
import CatCardItem from '@/components/game/CatCardItem.vue'
import { useCards } from '@/composables/cards'

defineProps<{
  pack: CardPack
}>()

const emit = defineEmits<{
  continue: []
}>()

const { cards, visible } = useCards()

const handleContinue = () => {
  emit('continue')
}
</script>

<template>
  <div class="w-full">
    <!-- Title -->
    <div class="text-center mb-12">
      <h2 class="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">Your Cards! 🎉</h2>
      <p class="text-xl text-yellow-300 drop-shadow-lg">You opened the {{ pack.name }}</p>
    </div>

    <!-- Cards Display -->
    <div class="flex justify-center px-4">
      <TransitionGroup name="card" tag="div" class="flex flex-wrap justify-center gap-6 max-w-5xl">
        <CatCardItem v-for="(card, index) in cards" v-show="visible" :key="card.id" :card="card"
          class="w-full max-w-[308px] sm:w-[calc(50%-0.75rem)] sm:max-w-[308px] lg:w-[calc(33.333%-1rem)] lg:max-w-[264px]"
          :style="{ transitionDelay: `${index * 100}ms` }" />
      </TransitionGroup>
    </div>

    <!-- Continue Button -->
    <div class="text-center mt-12">
      <button @click="handleContinue"
        class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95">
        Continue to Battle! ⚔️
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-enter-active {
  transition: all 0.6s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(100px) scale(0.5) rotate(10deg);
}

.card-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0deg);
}
</style>
