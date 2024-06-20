<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation } from 'swiper'
import { useRouter } from 'vue-router'

const nowMovies = ref([])
const router = useRouter()
const apikey = import.meta.env.VITE_TMDB_API_KEY

const fetchMovies = async () => {
  try {
    const latestResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=ko-KR
`
    )

    nowMovies.value = latestResponse.data.results
  } catch (error) {
    console.log(error)
  }
}

const goToDetail = (id) => {
  router.push({ name: 'detail', params: { movieId: id } })
}

onMounted(fetchMovies)
</script>

<template>
  <h1 class="section-title">상영중인 영화</h1>
  <Swiper
    :modules="[Pagination, Navigation]"
    :slides-per-view="4"
    :space-between="0"
    :loop="true"
    pagination
    navigation
    :breakpoints="{
      0: { slidesPerView: 1, spaceBetween: 0 },
      768: { slidesPerView: 2, spaceBetween: 0 },
      1024: { slidesPerView: 3, spaceBetween: 0 },
      1280: { slidesPerView: 4, spaceBetween: 0 }
    }"
  >
    <SwiperSlide v-for="(movie, index) in nowMovies" :key="movie.id">
      <div :class="`view__card style${(index % 3) + 1}`" @click="goToDetail(movie.id)">
        <div class="card__inner">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="`poster0${index + 1}`"
          />
          <h2 class="movie-title">{{ movie.title }}</h2>
          <div class="movie-info">
            <v-icon name="io-star-outline" scale="1.2"></v-icon>
            {{ movie.vote_average.toFixed(1) }}
            <v-icon name="fa-vote-yea" scale="1.2"></v-icon> {{ movie.vote_count }}
            <v-icon name="bi-heart-fill" scale="1.2"></v-icon>
            {{ movie.popularity.toFixed(0) }}
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
  <hr class="divider" />
</template>
<!-- 
<style>
@import 'swiper/swiper-bundle.css';

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}
.swiper {
  width: 100%;
  padding: 4rem 0;
}
.swiper-slide {
  display: flex;
  justify-content: center;
}
.swiper-pagination-bullet {
  /* background-color: #fff !important; */
}
.swiper-pagination-bullet-active {
  /* background-color: #ff6347 !important;  */
}
.swiper-pagination {
  display: none;
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
    object-position: center;
    cursor: pointer;
  }
  h2 {
    font-size: 1.5rem;
    margin: 0.1rem 0;
  }
}
.movie-title {
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 10px;
}
.movie-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
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
</style> -->
