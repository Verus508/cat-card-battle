<script setup lang="ts">
import { ref } from 'vue'
import InstructionsModal from '@/components/modals/InstructionsModal.vue'
import PackSelection from '@/components/game/PackSelection.vue'
import TutorialSection from '@/components/game/TutorialSection.vue'

const showModal = ref(true)
const showPackSelection = ref(false)
const showTutorial = ref(false)

const closeModal = () => {
  showModal.value = false
  showPackSelection.value = true
}

const handleCardsRevealed = () => {
  showPackSelection.value = false
  showTutorial.value = true
}

const handleTutorialComplete = () => {
  showTutorial.value = false
  // Next: Navigate to battle screen
  console.log('Tutorial complete! Ready for battle!')
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Arena Battle Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-purple-900 via-red-900 to-orange-800">
      <!-- Arena floor effect -->
      <div class="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-yellow-900/40 to-transparent"></div>

      <!-- Spotlight effects -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-red-300/20 rounded-full blur-3xl"></div>

      <!-- Arena elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div class="absolute top-1/4 right-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div class="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-2 bg-white"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">

      <!-- Pack Selection -->
      <PackSelection v-if="showPackSelection" @cards-revealed="handleCardsRevealed" />

      <!-- Tutorial Section -->
      <TutorialSection v-if="showTutorial" @complete="handleTutorialComplete" />

      <!-- Instructions Modal -->
      <InstructionsModal :show="showModal" @close="closeModal" />
    </div>
  </div>
</template>

<style scoped></style>
