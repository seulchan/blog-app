<template>
  <div class="card column blog" v-on:click="addTodo">
    <div class="card-image has-text-centered">
      <figure class="image is-288x288 is-inline-block">
        <img :src="post.image" alt="Avatar">
      </figure>
    </div>
    <div class="card-content has-text-centered">
      <div class="content">
        <h4>
          <b>{{post.title}}</b>
        </h4>
        <p>{{post.descr}}</p>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal=false">
      <video slot="video" controls autoplay loop :src="post.video"></video>
      <p slot="body"></p>
      <span slot="footer" @click="showModal=false">
        <markdown-it-vue class="md-body" :content="post.data[0]"/>
      </span>
    </modal>
  </div>
</template>

<script>
import Modal from "./common/Modal.vue";
import MarkdownItVue from "markdown-it-vue";
export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    addTodo() {
      this.showModal = !this.showModal;
    }
  },
  components: {
    Modal: Modal,
    MarkdownItVue: MarkdownItVue
  }
};
</script>

<style lang="scss" scoped>
.is-288x288 {
  height: 288px;
  width: 288px;
}
.blog {
  margin: 10px;
  border: none;
}
.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
</style>
