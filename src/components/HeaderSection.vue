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
      router.push({ name: 'home' })
    }

    return { searchQuery, performSearch, home }
  }
}
</script>

<template>
  <header id="header" role="banner">
    <div class="header_inner container">
      <h1 @click="home" class="logo">
        <v-icon name="bi-film" scale="2" animation="wrench"></v-icon>
        <span>Hello <strong>Movie</strong></span>
      </h1>
      <div class="search">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="제목을 입력보세요!"
            @keyup.enter="performSearch"
          />
          <button @click="performSearch">검색</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
#header {
  background-color: #333;
  .header_inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    color: #fff;
    .logo {
      display: flex;
      align-items: center;
      cursor: pointer;
      v-icon {
        margin-right: 10px;
      }
      span {
        display: flex;
        align-items: center;
        font-size: 2.5rem;
        strong {
          margin-left: 5px;
          font-size: 1.5rem;
        }
      }
    }
    .search {
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
  }
}
</style>
