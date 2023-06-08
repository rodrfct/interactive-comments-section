<script setup>
import { useCommentsStore } from '~/stores/comments'

useHead({
  title: "Frontend Mentor | Interactive comments section"
})

const { comments } = useCommentsStore()

const sortedComments = computed(() => {
  let commentsToSort = ref(comments.comments)
  return commentsToSort.value.sort((a,b) => b.score - a.score)
})

</script>

<template>
  <div class="comment-section">

    <Comment v-for="comment in sortedComments" :key="comment.id"
    v-bind="comment" :commentId="comment.id" :currrentUser="comments.currentUser" />

    <CommentInput />
  </div>
</template>

<style scoped>
.comment-section {
  padding: 0 4em;
}
</style>