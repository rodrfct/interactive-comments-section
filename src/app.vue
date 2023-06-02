<script setup>
import anImage from './assets/avatars/image-ramsesmiron.png'

useHead({
  title: "Frontend Mentor | Interactive comments section"
})

// For drafting, should be replaced by a fetch call later
const currrentUser = {
    userName: "Florentino"
}

</script>

<template>
  <div>
    <Comment commentId="1"
      content="Hello World!"
      createdAt="2 days ago"
      score="3"
      userName="Federico"
      :userImage="anImage"
      :currrentUser="currrentUser"
    />

    <CommentInput />
  </div>
</template>
