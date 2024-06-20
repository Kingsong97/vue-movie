<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import LatestMovies from '@/components/LatestMovies.vue'
import PopularMoives from '@/components/PopularMovies.vue'
import NowMovies from '@/components/NowMovies.vue'
import TopMovies from '@/components/TopMovies.vue'
import ComingMovies from '@/components/ComingMovies.vue'
import { ref } from 'vue'
import axios from 'axios'
import 'swiper/swiper-bundle.css'
import { useRouter } from 'vue-router'

const filteredMovies = ref([])
const showFilteredMovies = ref(false)
const router = useRouter()
const apikey = import.meta.env.VITE_TMDB_API_KEY

const fetchFilteredMovies = async (filterType, filterValue) => {
  let url = ''
  if (filterType === 'year') {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&primary_release_date.gte=${filterValue.start}&primary_release_date.lte=${filterValue.end}&language=ko-KR`
  } else if (filterType === 'rating') {
    url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=ko-KR`
  } else if (filterType === 'popular') {
    url = `https://api.themoviedb.org/3/trending/movie/${filterValue}?api_key=${apikey}&language=ko-KR`
  } else if (filterType === 'genre') {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=${filterValue}&language=ko-KR`
  }

  try {
    const response = await axios.get(url)
    filteredMovies.value = response.data.results
    showFilteredMovies.value = true
  } catch (error) {
    console.log(error)
  }
}

const showOriginalMovies = () => {
  showFilteredMovies.value = false
}

const goToDetail = (id) => {
  router.push({ name: 'detail', params: { movieId: id } })
}
</script>

<template>
  <HeaderSection />
  <main id="main" role="main">
    <div class="container">
      <div class="browse-by">
        <span>Browse by</span>
        <div class="dropdown">
          <button class="dropbtn">Year</button>
          <div class="dropdown-content">
            <a
              @click.prevent="
                fetchFilteredMovies('year', { start: '2020-01-01', end: '2020-12-31' })
              "
              href="#"
              >2020s</a
            >
            <a
              @click.prevent="
                fetchFilteredMovies('year', { start: '2010-01-01', end: '2019-12-31' })
              "
              href="#"
              >2010s</a
            >
            <a
              @click.prevent="
                fetchFilteredMovies('year', { start: '2000-01-01', end: '2009-12-31' })
              "
              href="#"
              >2000s</a
            >
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Rating</button>
          <div class="dropdown-content">
            <a @click.prevent="fetchFilteredMovies('rating', 'top_rated')" href="#">Top Rated</a>
            <a @click.prevent="fetchFilteredMovies('rating', 'most_popular')" href="#"
              >Most Popular</a
            >
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Popular</button>
          <div class="dropdown-content">
            <a @click.prevent="fetchFilteredMovies('popular', 'day')" href="#">Trending</a>
            <a @click.prevent="fetchFilteredMovies('popular', 'week')" href="#">This Week</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Genre</button>
          <div class="dropdown-content">
            <a @click.prevent="fetchFilteredMovies('genre', '28')" href="#">Action</a>
            <a @click.prevent="fetchFilteredMovies('genre', '35')" href="#">Comedy</a>
            <a @click.prevent="fetchFilteredMovies('genre', '18')" href="#">Drama</a>
          </div>
        </div>
      </div>

      <LatestMovies />
      <PopularMoives />
      <NowMovies />
      <TopMovies />
      <ComingMovies />

      <template v-if="showFilteredMovies">
        <h1 class="section-title">필터된 영화</h1>
        <div class="filtered-movies">
          <div
            v-for="(movie, index) in filteredMovies"
            :key="movie.id"
            class="view__card"
            @click="goToDetail(movie.id)"
          >
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
                <v-icon name="bi-heart-fill" scale="1.2"></v-icon> {{ movie.popularity.toFixed(0) }}
              </div>
            </div>
          </div>
        </div>
        <button class="back-btn" @click="showOriginalMovies">최신 및 인기 영화 보기</button>
      </template>
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
  .browse-by {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    span {
      margin-right: 1rem;
      font-size: 1rem;
      color: #fff;
    }
    .dropdown {
      position: relative;
      display: inline-block;
      margin-right: 1rem;
    }
    .dropbtn {
      background-color: #333;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .dropdown-content a:hover {
      background-color: #f1f1f1;
    }
    .dropdown:hover .dropdown-content {
      display: block;
    }
    .dropdown:hover .dropbtn {
      background-color: #555;
    }
  }
  .divider {
    width: 100%;
    height: 2px;
    background-color: #ccc;
    margin: 4rem 0;
  }
  .filtered-movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .view__card {
      margin: 10px;
      width: 200px;
      .card__inner {
        img {
          height: 300px;
        }
      }
    }
  }
  .back-btn {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    margin-top: 2rem;
    border-radius: 5px;
  }
  .back-btn:hover {
    background-color: #555;
  }
}
</style>
