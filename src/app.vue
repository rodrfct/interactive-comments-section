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
    <Comment :commentId="1"
      content="    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque ipsam voluptatem exercitationem, quis delectus nemo a laboriosam? Laboriosam totam sint, ducimus vel dolorem, consequuntur distinctio quas provident eligendi, libero alias.
"
      createdAt="2 days ago"
      :score="3"
      userName="Federico"
      :userImage="anImage"
      :currrentUser="currrentUser.userName"
    />

    <CommentInput />
  </div>
</template>
