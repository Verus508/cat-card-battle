<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CardPack } from '@/types/game'
import wizardPackImage from '@/assets/images/packs/wizard_pack.png'
import warriorPackImage from '@/assets/images/packs/warrior_pack.png'
import ninjaPackImage from '@/assets/images/packs/ninja_pack.png'

const props = defineProps<{
  pack: CardPack
  isSelected: boolean
  isAnimating: boolean
}>()

const emit = defineEmits<{
  select: [pack: CardPack]
}>()

const isShaking = ref(false)
const showStars = ref(false)

// Map pack IDs to images
const packImages: Record<number, string> = {
  1: wizardPackImage,
  2: warriorPackImage,
  3: ninjaPackImage,
}

const handleClick = () => {
  if (props.isAnimating) return

  isShaking.value = true
  showStars.value = true
  emit('select', props.pack)
}

const shouldHide = computed(() => {
  return props.isAnimating && !props.isSelected
})

const shouldCenter = computed(() => {
  return props.isAnimating && props.isSelected
})
</script>

<template>
  <div :class="[
    //removed the positioning class and transition from here
    'duration-0 cursor-pointer',
    shouldHide ? 'opacity-0 scale-0' : 'opacity-100 scale-100',
    shouldCenter ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50' : '',
  ]" @click="handleClick">
    <!-- Stars Animation -->
    <Transition name="stars">
      <div v-if="showStars && isSelected" class="absolute inset-0 pointer-events-none">
        <div v-for="i in 12" :key="i" :class="['absolute text-4xl', `star-${i}`]" :style="{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,// Added opacity 0 to avoid flash
        }">
          ⭐
        </div>
      </div>
    </Transition>

    <!-- Card Pack -->
    <img 
      :src="packImages[pack.id]" 
      :alt="pack.name" 
      :class="[
        'w-72 h-96 transform transition-all',
        'drop-shadow-2xl hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]',
        'hover:scale-105',
        isShaking && isSelected ? 'animate-shake' : '',
      ]"
    />
  </div>
</template>

<style scoped>
/* Removed tanslate from shake */
@keyframes shake {

  0%,
  100% {
    transform: rotate(0deg);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: rotate(-5deg);
  }

  20%,
  40%,
  60%,
  80% {
    transform: rotate(5deg);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes star-burst {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }

  100% {
    transform: translate(var(--x), var(--y)) scale(1);
    opacity: 0;
  }
}

.star-1 {
  animation: star-burst 1s ease-out forwards;
  --x: 0px;
  --y: -150px;
}

.star-2 {
  animation: star-burst 1s ease-out 0.05s forwards;
  --x: 100px;
  --y: -100px;
}

.star-3 {
  animation: star-burst 1s ease-out 0.1s forwards;
  --x: 150px;
  --y: 0px;
}

.star-4 {
  animation: star-burst 1s ease-out 0.15s forwards;
  --x: 100px;
  --y: 100px;
}

.star-5 {
  animation: star-burst 1s ease-out 0.2s forwards;
  --x: 0px;
  --y: 150px;
}

.star-6 {
  animation: star-burst 1s ease-out 0.25s forwards;
  --x: -100px;
  --y: 100px;
}

.star-7 {
  animation: star-burst 1s ease-out 0.3s forwards;
  --x: -150px;
  --y: 0px;
}

.star-8 {
  animation: star-burst 1s ease-out 0.35s forwards;
  --x: -100px;
  --y: -100px;
}

.star-9 {
  animation: star-burst 1s ease-out 0.4s forwards;
  --x: 70px;
  --y: -130px;
}

.star-10 {
  animation: star-burst 1s ease-out 0.45s forwards;
  --x: 130px;
  --y: 70px;
}

.star-11 {
  animation: star-burst 1s ease-out 0.5s forwards;
  --x: -70px;
  --y: 130px;
}

.star-12 {
  animation: star-burst 1s ease-out 0.55s forwards;
  --x: -130px;
  --y: -70px;
}

.stars-enter-active {
  transition: opacity 0.3s ease;
}

.stars-enter-from {
  opacity: 0;
}
</style>
