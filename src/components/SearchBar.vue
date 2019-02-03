<template>
  <div class="container searchbar has-text-centered level">
    <div class="box">
      <input
        class="input is-rounded search"
        type="text"
        v-model="inputVal"
        placeholder="search posts"
      >
      <div class="select is-rounded category">
        <select v-model="categoryFilter">
          <option disabled>Choose Category</option>
          <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="select is-rounded">
        <select v-model="sortFilter">
          <option disabled>Sort by</option>
          <option v-for="option in sortOptions" :key="option" :value="option">By {{ option }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      categoryOptions: [
        "All",
        "Grammar Tips",
        "One Minute Tips",
        "Pronunciation Tips"
      ],
      sortOptions: ["title", "date"],
      inputVal: this.value,
      categoryFilter: "Choose Category",
      sortFilter: "Sort by"
    };
  },
  watch: {
    inputVal(val) {
      this.$emit("input", val);
    },
    categoryFilter(val) {
      this.$emit("category", val);
    },
    sortFilter(val) {
      this.$emit("sort", val);
    }
  }
};
</script>


<style lang="scss" scoped>
.searchbar {
  margin: auto;
  .box {
    width: 100%;
    margin-bottom: 10px;
  }
  .search {
    margin-bottom: 20px;
  }
  .category {
    margin-right: 20px;
  }
}
</style>
