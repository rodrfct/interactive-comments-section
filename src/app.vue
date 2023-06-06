<script setup>
useHead({
  title: "Frontend Mentor | Interactive comments section"
})

const { data } = await useFetch('/api/comments', {
  pick: ['comments']
})

</script>

<template>
  <div class="comment-section">

    <Comment v-for="comment in data.comments" :key="comment.id"
    v-bind="comment" :commentId="comment.id" />

    <CommentInput />
  </div>
</template>

<style scoped>
.comment-section {
  width: 500px;
}
</style>