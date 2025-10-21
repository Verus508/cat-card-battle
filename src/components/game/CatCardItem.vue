<script setup lang="ts">
import type { CatCard, Rarity } from '@/types/game'
import { ref, computed } from 'vue'
import placeholderImage from '@/assets/images/placeholder-card.svg'

const props = defineProps<{
  card: CatCard
}>()

const isImageLoaded = ref(false)
const isPlaceholder = computed(() => props.card.image === placeholderImage)

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  uncommon: 'from-green-400 to-green-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600',
} satisfies Record<Rarity, string>

const rarityGlow = {
  common: 'shadow-gray-500/50',
  uncommon: 'shadow-green-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/50',
} satisfies Record<Rarity, string>
</script>

<template>
  <div :class="[
    'bg-gradient-to-br rounded-xl shadow-2xl p-2 w-full aspect-[3/4] transform transition-all hover:scale-105',
    rarityColors[card.rarity],
    `hover:${rarityGlow[card.rarity]}`,
  ]">
    <!-- Card Header -->
    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
      <h3 class="text-2xl font-bold text-white text-center truncate">{{ card.name }}</h3>
      <p class="text-xs text-white/80 text-center uppercase tracking-wider">{{ card.rarity }}</p>
    </div>

    <!-- Card Image -->
    <div
      class="relative bg-white/30 backdrop-blur-sm rounded-lg p-2 mb-4 flex items-center justify-center h-44 overflow-hidden">
      <img :src="card.image" alt="Cat" class="w-full h-full object-cover rounded-md"
        :class="{ 'opacity-0': !isImageLoaded && !isPlaceholder }" @load="isImageLoaded = true"
        @error="isImageLoaded = true" />
      <div v-show="!isImageLoaded && !isPlaceholder" class="absolute inset-2 animate-pulse bg-white/50 rounded-md">
      </div>
    </div>

    <!-- Card Stats -->
    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-3 space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-white font-semibold">⚔️ Attack:</span>
        <span class="text-white font-bold">{{ card.stats.attack }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-white font-semibold">🛡️ Defense:</span>
        <span class="text-white font-bold">{{ card.stats.defense }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-white font-semibold">❤️ Health:</span>
        <span class="text-white font-bold">{{ card.stats.health }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Placeholder fade out animation */
.placeholder-fade-leave-active {
  transition: all 0.5s ease;
}

.placeholder-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Image flip in animation */
.image-flip-enter-active {
  transition: all 0.6s ease;
}

.image-flip-enter-from {
  opacity: 0;
  transform: rotateY(90deg) scale(0.8);
}

.image-flip-enter-to {
  opacity: 1;
  transform: rotateY(0deg) scale(1);
}
</style>
