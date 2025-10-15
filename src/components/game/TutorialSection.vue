<script setup lang="ts">
import { ref, onMounted } from 'vue'
import tutorialCharImage from '@/assets/images/game/tutorial_char.png'

const tutorialSteps = [
  {
    id: 1,
    title: 'Welcome to Cat Card Battle!',
    text: "Hi there! I'm here to teach you how to play. Let's go through the basics together!",
  },
  {
    id: 2,
    title: 'Understanding Your Cards',
    text: 'Each cat card has three stats: Attack ⚔️, Defense 🛡️, and Health ❤️. These determine how strong your cat is in battle!',
  },
  {
    id: 3,
    title: 'Card Rarity',
    text: 'Cards come in different rarities: Common, Uncommon, Rare, Epic, and Legendary. Higher rarity means stronger stats!',
  },
  {
    id: 4,
    title: 'How to Battle',
    text: 'You will face a monster and take turns playing cards. Use your Attack to reduce their Health while your Defense protects you!',
  },
  {
    id: 5,
    title: 'Winning the Game',
    text: 'Reduce your opponent health to zero before they defeat you! Strategy is key - choose your cards wisely!',
  },
]

const currentStep = ref(0)
const imageLoaded = ref(false)
const imageError = ref(false)

const emit = defineEmits<{
  complete: []
}>()

// Preload the image when component mounts
onMounted(() => {
  const img = new Image()
  img.onload = () => {
    imageLoaded.value = true
  }
  img.onerror = () => {
    imageError.value = true
  }
  img.src = tutorialCharImage
})

const nextStep = () => {
  if (currentStep.value < tutorialSteps.length - 1) {
    currentStep.value++
  } else {
    emit('complete')
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const skipTutorial = () => {
  emit('complete')
}

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div class="w-full max-w-6xl">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <!-- Character Image -->
      <div class="flex justify-center md:justify-end">
        <div class="relative">
          <div
            class="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-2xl animate-float overflow-hidden relative">
            <img v-show="!imageError" :src="tutorialCharImage" alt="Tutorial Character"
              class="absolute inset-0 w-full h-full object-contain z-10" @load="handleImageLoad"
              @error="handleImageError" />
            <!-- Fallback emoji if image doesn't load -->
            <span v-show="imageError" class="absolute inset-0 flex items-center justify-center text-9xl z-0">
              😺
            </span>
          </div>
        </div>
      </div>

      <!-- Chat Bubble -->
      <div class="flex flex-col gap-4">
        <!-- Speech Bubble -->
        <div class="relative bg-white rounded-3xl p-8 shadow-2xl">
          <!-- Bubble Pointer (pointing to character) -->
          <div
            class="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-white hidden md:block">
          </div>

          <!-- Content -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl md:text-3xl font-bold text-purple-900">
                {{ tutorialSteps[currentStep]?.title }}
              </h2>
              <span class="text-sm text-gray-500 font-semibold">
                {{ currentStep + 1 }} / {{ tutorialSteps.length }}
              </span>
            </div>

            <p class="text-lg text-gray-700 leading-relaxed">
              {{ tutorialSteps[currentStep]?.text }}
            </p>

            <!-- Progress Dots -->
            <div class="flex justify-center gap-2 pt-4">
              <div v-for="(step, index) in tutorialSteps" :key="step.id" :class="[
                'w-3 h-3 rounded-full transition-all',
                index === currentStep ? 'bg-purple-600 w-8' : 'bg-gray-300',
              ]"></div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex gap-4">
          <button v-if="currentStep > 0" @click="previousStep"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95">
            ← Previous
          </button>

          <button @click="nextStep"
            class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95">
            {{
              currentStep === tutorialSteps.length - 1 ? 'Start Battle! ⚔️' : 'Next →'
            }}
          </button>
        </div>

        <!-- Skip Button -->
        <button @click="skipTutorial" class="text-white/70 hover:text-white text-sm font-semibold transition-colors">
          Skip Tutorial →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.fade-in-enter-active {
  transition: opacity 0.3s ease-in;
}

.fade-in-enter-from {
  opacity: 0;
}

.fade-in-enter-to {
  opacity: 1;
}
</style>
