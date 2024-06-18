<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movieId = ref(route.params.movieId)
const movie = ref(null)
const apikey = '9278d13f704ad0fe53c2263b692efd89'

const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId.value}?api_key=${apikey}&language=ko-KR&append_to_response=credits`
    )
    movie.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchMovieDetails)
</script>

<template>
  <div v-if="movie" class="detail-container">
    <div
      class="backdrop"
      :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})` }"
    ></div>
    <div class="content">
      <header class="detail-header">
        <img
          class="poster"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt="movie poster"
        />
        <div class="movie-basic-info">
          <h1>{{ movie.title }}</h1>
          <div class="movie-details">
            <span class="rating">
              <v-icon name="io-star-outline" scale="1.2"></v-icon>
              {{ movie.vote_average.toFixed(1) }}
            </span>
            <span class="release-date">{{ movie.release_date }}</span>
            <span class="genres">{{ movie.genres.map((genre) => genre.name).join(', ') }}</span>
          </div>
        </div>
      </header>
      <main class="detail-content">
        <section class="movie-overview">
          <h2>줄거리</h2>
          <p>{{ movie.overview }}</p>
        </section>
        <section class="movie-cast" v-if="movie.credits">
          <h2>감독 및 출연진</h2>
          <ul class="crew">
            <li v-for="(member, index) in movie.credits.crew.slice(0, 5)" :key="index">
              {{ member.name }} - {{ member.job }}
            </li>
          </ul>
          <ul class="cast">
            <li v-for="(actor, index) in movie.credits.cast.slice(0, 10)" :key="index">
              {{ actor.name }} - {{ actor.character }}
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
  <div v-else>
    <p>영화 정보를 불러오는 중입니다...</p>
  </div>
</template>

<style>
.detail-container {
  position: relative;
  color: #fff;
  overflow: hidden;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 1rem;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-header img.poster {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-basic-info {
  display: flex;
  flex-direction: column;
}

.movie-basic-info h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.movie-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.movie-details span {
  background-color: rgba(255, 99, 71, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.movie-details .rating {
  display: flex;
  align-items: center;
}

.movie-details .release-date,
.movie-details .genres {
  margin-right: 1rem;
}

.detail-content {
  margin-top: 2rem;
}

.movie-overview,
.movie-cast {
  margin-bottom: 2rem;
}

.movie-overview h2,
.movie-cast h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ff6347;
  display: inline-block;
  padding-bottom: 0.3rem;
}

.movie-overview p {
  line-height: 1.6;
}

.movie-cast ul {
  list-style: none;
  padding: 0;
}

.movie-cast li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.movie-cast li::before {
  content: '🎬';
  margin-right: 0.5rem;
}

.crew,
.cast {
  padding-left: 0;
}

.crew li,
.cast li {
  background-color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
