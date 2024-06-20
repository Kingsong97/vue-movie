<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movieId = route.params.movieId
const movie = ref(null)
const apikey = import.meta.env.VITE_TMDB_API_KEY
const defaultImage = 'https://via.placeholder.com/200x300?text=No+Image'

const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}&language=ko-KR&append_to_response=credits,images,videos`
    )
    movie.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchMovieDetails)
</script>

<template>
  <div
    v-if="movie"
    class="detail-container"
    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }"
  >
    <div class="detail-content">
      <header class="detail-header">
        <img
          :src="
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImage
          "
          alt="movie poster"
        />
        <div class="movie-basic-info">
          <h1>{{ movie.title }}</h1>
          <div class="movie-details">
            <span>
              <v-icon name="io-star-outline" scale="1.2" class="star-icon"></v-icon>
              {{ movie.vote_average.toFixed(1) }}
            </span>
            <span>{{ movie.release_date }}</span>
            <span>{{ movie.genres.map((genre) => genre.name).join(', ') }}</span>
            <span>상태: {{ movie.status }}</span>
            <span>제작비: ${{ movie.budget.toLocaleString() }}</span>
            <span>수익: ${{ movie.revenue.toLocaleString() }}</span>
          </div>
        </div>
      </header>
      <section class="movie-overview">
        <h2>줄거리</h2>
        <p>{{ movie.overview }}</p>
      </section>
      <section class="movie-cast">
        <h2>출연진</h2>
        <div class="cast-list">
          <div
            v-for="(actor, index) in movie.credits.cast.slice(0, 10)"
            :key="index"
            class="cast-member"
          >
            <img
              :src="
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : defaultImage
              "
              :alt="actor.name"
            />
            <span>{{ actor.name }}</span>
            <span class="character">{{ actor.character }}</span>
          </div>
        </div>
      </section>
      <section class="movie-director">
        <h2>감독</h2>
        <div class="director">
          <div
            v-for="(director, index) in movie.credits.crew.filter(
              (member) => member.job === 'Director'
            )"
            :key="index"
            class="director-info"
          >
            <img
              :src="
                director.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${director.profile_path}`
                  : defaultImage
              "
              :alt="director.name"
            />
            <span>{{ director.name }}</span>
          </div>
        </div>
      </section>
      <section class="movie-media" v-if="movie.videos && movie.videos.results.length">
        <h2>티저 영상</h2>
        <div class="media-list">
          <iframe
            v-for="(video, index) in movie.videos.results.slice(0, 1)"
            :key="index"
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${video.key}`"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.detail-container {
  background-size: cover;
  background-position: center;
  padding: 2rem;
  position: relative;
  min-height: 100vh;
  color: #fff;
}
.detail-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1;
}
.detail-content {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.detail-header img {
  width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.movie-basic-info {
  display: flex;
  flex-direction: column;
}
.movie-details span {
  margin-bottom: 0.5rem;
  display: block;
  font-size: 1rem;
}
.movie-overview,
.movie-cast,
.movie-director,
.movie-media {
  margin-top: 2rem;
}
.movie-overview h2,
.movie-cast h2,
.movie-director h2,
.movie-media h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #fff;
  padding-bottom: 0.5rem;
}
.cast-list,
.media-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.cast-member,
.director-info {
  text-align: center;
  flex: 1 0 21%;
  max-width: 21%;
}
.cast-member img,
.director-info img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}
.cast-member span,
.director-info span {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
.character {
  color: #aaa;
  font-size: 0.8rem;
}
.media-list {
  justify-content: center;
  align-items: center;
}
.media-list iframe {
  width: 100%;
  max-width: 560px;
  height: 315px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.star-icon {
  color: yellow;
  font-size: 1.2em;
}
</style>
