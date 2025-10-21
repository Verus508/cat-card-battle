import { ref } from 'vue'
import { drawRarity, drawStats } from '@/game/stats'
import type { CatCard, TheCatApiImage } from '@/types/game'
import { isFirstPackClaimed, claimFirstPack } from '@/utils/firstPack'
import wizardPackImage from '@/assets/images/packs/wizard_pack.png'
import warriorPackImage from '@/assets/images/packs/warrior_pack.png'
import ninjaPackImage from '@/assets/images/packs/ninja_pack.png'

const amount = 5 as const
const cards = ref<CatCard[]>([])
const images = ref<string[]>([])
const visible = ref(false)
const imageLoadingStates = ref<boolean[]>([])
const selectedPackId = ref<number>(1)
let isFetching = false
let hasFetched = false

const packImages: Record<number, string> = {
  1: wizardPackImage, // Mystic Pack
  2: warriorPackImage, // Warrior Pack
  3: ninjaPackImage, // Shadow Pack
}

export function useCards() {
  // Mocking API call for the Cat's name
  const fetchCatName = (): string => {
    const result = [
      'Whiskers',
      'Shadow',
      'Luna',
      'Tiger',
      'Mittens',
      'Felix',
      'Nala',
      'Simba',
      'Garfield',
      'Tom',
    ] satisfies string[]

    return result[Math.floor(Math.random() * result.length)]!
  }

  const fetchCatImages = async (): Promise<void> => {
    // Prevent duplicate fetches
    if (isFetching || hasFetched) {
      return
    }

    isFetching = true

    const headers: Record<string, string> = {}
    if (import.meta.env.VITE_CAT_API_KEY) {
      headers['x-api-key'] = import.meta.env.VITE_CAT_API_KEY
    }

    try {
      // Request exactly what we need
      const params = new URLSearchParams({
        limit: String(amount),
        size: 'small',
        order: 'RAND',
        mime_types: 'jpg,png',
      })

      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?${params.toString()}`,
        { headers },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch cat images')
      }

      const data = (await response.json()) as TheCatApiImage[]
      images.value = data.map((d) => d.url)

      cards.value = generate(amount)
      hasFetched = true

      setTimeout(() => {
        visible.value = true
        // Start loading images incrementally after cards are visible
        loadImagesIncrementally()
      }, 500)
    } finally {
      isFetching = false
    }
  }

  const create = (id: number, forceLegendary = false): CatCard => {
    const rarity = forceLegendary ? 'legendary' : drawRarity()

    return {
      id,
      name: fetchCatName(),
      image: packImages[selectedPackId.value] || wizardPackImage, // Start with pack placeholder
      rarity,
      stats: drawStats(rarity),
    }
  }

  const setPackId = (packId: number) => {
    selectedPackId.value = packId
  }

  const loadImageForCard = async (cardIndex: number): Promise<void> => {
    if (imageLoadingStates.value[cardIndex] || !images.value[cardIndex]) {
      return
    }

    imageLoadingStates.value[cardIndex] = true

    try {
      // Preload the image to ensure it's ready
      const img = new Image()
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = images.value[cardIndex]!
      })

      // Update the card with the real image
      if (cards.value[cardIndex]) {
        cards.value[cardIndex]!.image = images.value[cardIndex]!
      }
    } catch (error) {
      console.warn(`Failed to load image for card ${cardIndex}:`, error)
    }
  }

  const loadImagesIncrementally = async (): Promise<void> => {
    // Load images one by one with a small delay between each
    for (let i = 0; i < amount; i++) {
      await loadImageForCard(i)
      // Small delay between image loads for visual effect
      if (i < amount - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
    }
  }

  // Generate the pack (guarantee legendary if first pack)
  const generate = (amount: number): CatCard[] => {
    const firstPack = !isFirstPackClaimed()
    const result = Array.from({ length: amount }, (_, id) => create(id))

    // Guarantee one Legendary if it's the first pack
    if (firstPack && !result.some((c) => c.rarity === 'legendary')) {
      const randomIndex = Math.floor(Math.random() * result.length)
      result[randomIndex] = create(randomIndex, true)
    }

    if (firstPack) {
      claimFirstPack()
    }

    return result
  }

  return {
    cards,
    visible,
    fetchCatImages,
    loadImagesIncrementally,
    imageLoadingStates,
    setPackId,
  }
}
