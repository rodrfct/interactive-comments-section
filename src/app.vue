<script setup>
import commentsJSON from '~/assets/data.json'

useHead({
  title: "Frontend Mentor | Interactive comments section"
})

await useFetch('/api/comments', {
  method: 'POST',
  body: commentsJSON
})

const { data } = await useFetch('/api/comments', {
  method: 'GET',
  pick: ['comments']
})

const comments = data.value.comments

const sortedComments = computed(() => {
  return comments.sort((a,b) => b.score - a.score)
})

</script>

<template>
  <div class="comment-section">

    <Comment v-for="comment in sortedComments" :key="comment.id"
    v-bind="comment" :commentId="comment.id" />

    <CommentInput />
  </div>
</template>

<style scoped>
.comment-section {
  width: 500px;
}
</style>