<script setup>
import anImage from '~/assets/avatars/image-juliusomo.png'

useHead({
  title: "Frontend Mentor | Interactive comments section"
})

// For drafting, should be replaced by a fetch call later
const currrentUser = {
  userName: "Florentino",
  image: {
    png: "/_nuxt/assets/avatars/image-maxblagun.png"
  }
}

const replies = [
  {
    id: 3,
    content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: "1 week ago",
    score: 4,
    replyingTo: "maxblagun",
    user: {
      image: {
        // I don't know whether "_nuxt" should ever be referenced or not, but it's the only fix I found
        png: "/_nuxt/assets/avatars/image-ramsesmiron.png",
        webp: "~/assets/avatars/image-ramsesmiron.webp"
      },
      username: "ramsesmiron"
    }
  }
]

</script>

<template>
  <div class="comment-section">
    <Comment :commentId="1"
      content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque ipsam voluptatem exercitationem, quis delectus nemo a laboriosam? Laboriosam totam sint, ducimus vel dolorem, consequuntur distinctio quas provident eligendi, libero alias."
      createdAt="2 days ago" :score="3" :user="{
        username: 'Federico',
        image: {
          png: anImage,
        }
      }"
      :currrentUser="currrentUser.userName"
      :replies="replies" />

    <CommentInput v-bind:currentUser="currrentUser" />
  </div>
</template>

<style scoped>
.comment-section {
  width: 500px;
}
</style>