<template>
  <div id="app">
    <SearchBar v-model="search" v-on:category="categorySelect" v-on:sort="sortSelect"></SearchBar>
    <PostList v-bind:filtered="filteredPosts"></PostList>
  </div>
</template>

<script>
import PostList from "./components/PostList.vue";
import SearchBar from "./components/SearchBar.vue";
import { blog } from "./data/cardData";

export default {
  name: "app",
  data() {
    return {
      items: blog.state.cardData, // data
      search: "",
      category: "",
      sort: ""
    };
  },
  computed: {
    filteredPosts() {
      let newItems = this.items;
      // filter by category
      if (
        this.category === "One Minute Tips" ||
        this.category === "Pronunciation Tips" ||
        this.category === "Grammar Tips"
      ) {
        newItems = newItems.filter(item => {
          return item.category === this.category;
        });
      }
      // sort by selected sort option
      if (this.sort === "date") {
        this.sortByDate(newItems);
      } else if (this.sort === "title") {
        this.sortByTitle(newItems);
      }
      // filter by search
      newItems = newItems.filter(item => {
        return (
          item.title.toLowerCase().match(this.search) ||
          item.descr.toLowerCase().match(this.search)
        );
      });

      return newItems;
    }
  },
  methods: {
    categorySelect(val) {
      this.category = val;
    },
    sortSelect(val) {
      this.sort = val;
    },
    sortByDate(arr) {
      arr.sort(function(item1, item2) {
        return new Date(item1.date) - new Date(item2.date);
      });
    },
    sortByTitle(arr) {
      arr.sort(function(item1, item2) {
        const numberPattern = /\d+/g;
        const charPattern = /\D+/g;
        const charPart = [
          item1.title.match(charPattern),
          item2.title.match(charPattern)
        ];
        const numPart = [
          item1.title.match(numberPattern),
          item2.title.match(numberPattern)
        ];
        if (charPart[0] < charPart[1]) return -1;
        else if (charPart[0] > charPart[1]) return 1;
        else {
          return numPart[0] - numPart[1];
        }
      });
    }
  },
  components: {
    PostList: PostList,
    SearchBar: SearchBar
  }
};
</script>

<style lang="scss" scoped>
body {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
