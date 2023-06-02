<script setup>
const props = defineProps({
    commentId: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    replies: {
        type: Array,
    },

    currrentUser: {
        type: String
    }
})

const isMine = props.userName ==  props.currrentUser.userName

</script>

<template>
    <article class="comment">
        <div class="score">{{ props.score }}</div>

        <div class="content">
            <img :src="props.userImage" alt="">

            <span>{{ props.userName }}</span>

            <span  v-if="isMine" class="you">you</span>

            <span>{{ props.createdAt }}</span>

            <div v-if="isMine" class="actions">
                <button>Delete</button>
                <button>Edit</button>
            </div>
            <div v-else class="actions">
                <button>Reply</button>
            </div>
        </div>
    </article>
</template>