<!-- src/components/HeaderSection.vue -->
<template>
  <header id="header" role="banner">
    <div class="header_inner container">
      <h1 @click="home"><v-icon name="bi-film" scale="1.4"></v-icon>Hello <span>Movie</span></h1>
      <div class="search">
        <div class="search-box">
          <input v-model="searchQuery" type="search" placeholder="영화 검색" />
          <button @click="performSearch">검색</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HeaderSection',
  setup() {
    const searchQuery = ref('')
    const router = useRouter()

    const performSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'search', query: { q: searchQuery.value } })
      }
    }

    const home = () => {
      this.$router.push({ name: 'home' })
    }

    return { searchQuery, performSearch, home }
  }
}
</script>

<style lang="scss">
#header {
  background-color: #333;
}
.header_inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #fff;
  .search {
    margin-left: auto;
    .search-box {
      display: flex;
      align-items: center;
      input {
        padding: 0.5rem;
        border: 1px solid #fff;
        border-radius: 5px 0 0 5px;
        border-right: none;
      }
      button {
        padding: 0.5rem 1rem;
        border: 1px solid #fff;
        border-radius: 0 5px 5px 0;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  h1 {
    font-size: 2.5rem;
    cursor: pointer;
    span {
      font-size: 1.5rem;
    }
  }
}
</style>
