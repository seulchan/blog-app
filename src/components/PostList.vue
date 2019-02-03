<template>
  <div class="container">
    <div class="columns is-multiline">
      <Post v-for="post in sliced" :key="post.title" :post="post"></Post>
    </div>
    <transition name="fade-slow">
      <div class="notification is-info has-text-centered" v-if="end">
        <p>No more posts!</p>
      </div>
    </transition>
  </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  name: "PostList",
  props: ["filtered"],
  data() {
    return {
      show: false, // display content after API request
      offset: 4, // items to display after scroll
      display: 8, // initial items
      trigger: 300, // how far from the bottom to trigger infinite scroll
      end: false // no more resources;,
    };
  },
  components: {
    Post
  },
  computed: {
    // slice the array of data to display
    sliced() {
      return this.filtered.slice(0, this.display);
    }
  },
  methods: {
    // check to see if we're at the bottom of the page
    scroll() {
      window.onscroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - this.trigger
        ) {
          if (this.display < this.filtered.length) {
            this.display = this.display + this.offset;
          } else {
            this.end = true;
          }
        }
      };
    }
  },
  mounted() {
    // track scroll event
    this.scroll();
  }
};
</script>

<style lang="scss" scoped>
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 3s;
}
.fade-slow-enter,
.fade-slow-leave-to {
  opacity: 0;
}
</style>
