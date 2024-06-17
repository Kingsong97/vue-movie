<template>
  <header id="header" role="banner">
    <div class="header_inner container">
      <h1>Hello<span>Movie</span></h1>
      <div class="search">
        <input type="search" />
        <button>검색</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header_inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #333;
  color: #fff;
  .search {
    margin-left: auto;
    input {
      padding: 0.5rem;
      border: 1px solid #fff;
      border-radius: 5px;
    }
    button {
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      border: 1px solid #fff;
      border-radius: 5px;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
    }
  }
  h1 {
    font-size: 2.5rem;
    span {
      font-size: 1.5rem;
    }
  }
}
</style>
