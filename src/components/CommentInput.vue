<script setup>
import { useCommentsStore } from '~/stores/comments'
import { uid } from 'uid'

const props = defineProps({
    replyingToId: {
        type: String,
        required: false
    },

    replyingTo: {
        type: String,
        required: false
    }
})

const { comments, addComment } = useCommentsStore()

let content = ""

function sendComment() {
    let newComment = {
        id: uid(),
        content,
        createdAt: new Date(),
        score: 0,
        user: comments.currentUser
    }

    if (!props.replyingToId) {
        newComment.replies = []
    }
    
    addComment(newComment, props.replyingToId, props.replyingTo)
}

</script>

<template>
    <form @submit.prevent="sendComment" class="comment-input">
        <img :src="comments.currentUser.image.png" alt="">
        <textarea v-model="content" placeholder="Add a comment..." name="comment" rows="3"></textarea>
        <button type="submit">{{ replyingToId ? "REPLY" : "SEND" }}</button>
    </form>
</template>

<style scoped>
.comment-input {
    background-color: var(--white);
    border-radius: 10px;
    padding: 1em;

    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 1em;
}

.comment-input img {
    width: 2em;
}

.comment-input textarea {
    padding: 1em;
    font-family: inherit;
    border: 1px solid var(--light-gray);
    border-radius: 5px;
    resize: none;
}

.comment-input textarea:hover {
    border-color: var(--moderate-blue);
    cursor: pointer;
}

.comment-input button {
    background-color: var(--moderate-blue);
    border: none;
    border-radius: 8px;

    color: var(--white);
    font-weight: 700;
    padding: 1em 2em;

    align-self: start;
}

.comment-input button:hover {
    filter: brightness(150%);
    cursor: pointer;
}

.comment-input button,
.comment-input textarea {
    transition: all .5s ease;
}
</style>