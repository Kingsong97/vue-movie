<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation } from 'swiper'

const popularMovies = ref([])
const latestMovies = ref([])
const apikey = '9278d13f704ad0fe53c2263b692efd89'
const fetchMovies = async () => {
  try {
    const latestResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=1&language=ko-KR`
    )
    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=1&language=ko-KR`
    )
    console.log(popularResponse.data)
    popularMovies.value = popularResponse.data.results
    latestMovies.value = latestResponse.data.results
  } catch (error) {
    console.log(error)
  }
}
onMounted(fetchMovies)
</script>

<template>
  <HeaderSection />
  <main id="main" role="main">
    <div class="container">
      <h1 class="section-title">최신 영화</h1>
      <Swiper
        :modules="[Pagination, Navigation]"
        :slides-per-view="4"
        :space-between="30"
        :loop="true"
        pagination
        navigation
      >
        <SwiperSlide v-for="(movie, index) in latestMovies" :key="movie.id">
          <div :class="`view__card style${(index % 3) + 1}`">
            <div class="card__inner">
              <img
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                :alt="`poster0${index + 1}`"
              />
              <h2>{{ movie.title }}</h2>
              <v-icon name="rieyeline" scale="3"></v-icon>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <h1 class="section-title">인기 영화</h1>
      <Swiper
        :modules="[Pagination, Navigation]"
        :slides-per-view="4"
        :space-between="30"
        :loop="true"
        pagination
        navigation
      >
        <SwiperSlide v-for="(movie, index) in popularMovies" :key="movie.id">
          <div :class="`view__card style${(index % 3) + 1}`">
            <div class="card__inner">
              <img
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                :alt="`poster0${index + 1}`"
              />
              <h2>{{ movie.title }}</h2>
              <v-icon name="rieyeline" scale="3"></v-icon>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </main>
</template>

<style>
@import 'swiper/swiper-bundle.css';

#main {
  padding: 2rem 0;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .section-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #fff;
  }
  .swiper {
    width: 100%;
    padding: 2rem 0;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
  .view__card {
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    width: 90%;
    max-width: 300px;
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      object-position: center;
    }
    h2 {
      font-size: 1.5rem;
      margin: 0.1rem 0;
    }
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
  .style1 {
    background-color: #f1f1f1;
  }
  .style2 {
    background-color: #e1e1e1;
  }
  .style3 {
    background-color: #d1d1d1;
  }
}
</style>
