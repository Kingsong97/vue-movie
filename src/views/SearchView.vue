<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import HeaderSection from '@/components/HeaderSection.vue'

const route = useRoute()
const router = useRouter()
const movies = ref([])
const loading = ref(false)

const fetchMovies = async (query) => {
  if (!query) return
  loading.value = true
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=9278d13f704ad0fe53c2263b692efd89&query=${query}&language=ko-KR`
    )
    movies.value = response.data.results
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.query.q,
  (newQuery) => {
    fetchMovies(newQuery)
  }
)

onMounted(() => {
  fetchMovies(route.query.q)
})

const goToDetail = (id) => {
  router.push({ name: 'detail', params: { movieId: id } })
}
</script>

<template>
  <HeaderSection />
  <div class="search-results container">
    <h1>검색 결과</h1>
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-if="!loading && movies.length === 0" class="no-results">검색 결과가 없습니다.</div>
    <div v-if="!loading && movies.length > 0" class="movies">
      <div v-for="movie in movies" :key="movie.id" class="movie" @click="goToDetail(movie.id)">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" />
        <h2>{{ movie.title }}</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search-results {
  color: #fff;
  text-align: center;
  .loading,
  .no-results {
    margin-top: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .movie {
      margin: 10px;
      cursor: pointer; /* 추가: 마우스 커서가 포인터로 변경되도록 */
      img {
        width: 200px;
        height: 300px;
        object-fit: cover;
      }
      h2 {
        font-size: 1rem;
        margin-top: 10px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
