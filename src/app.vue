<script setup>
import { useCommentsStore } from '~/stores/comments'

useHead({
  title: "Frontend Mentor | Interactive comments section"
})

const { comments } = useCommentsStore()

const sortedComments = computed(() => {
  let commentsToSort = ref(comments.comments)
  return commentsToSort.value.sort((a, b) => b.score - a.score)
})

// onBeforeMount will result in hydration mismatch
onMounted(() => {
  if (localStorage.getItem('comments')) {
    comments.comments = JSON.parse(localStorage.getItem('comments'),
    
    // Deserialize Dates
    (key, value) => {
      if (typeof value !== "string") {
        return value;
      }
      const isoDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
      if (isoDateRegex.exec(value)) {
        return new Date(value);
      }
      return value;
    })
  }

  watch(() => comments.comments, (val) => {
    localStorage.setItem('comments', JSON.stringify(val))
  }, {
    deep: true
  })
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
  max-width: 70%;
  margin: auto;
}
</style>