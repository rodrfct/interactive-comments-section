<script setup>
const props = defineProps({
    commentId: {
        type: String,
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
    user: {
        type: Object,
        required: true,

        username: {
            type: String,
            required: true
        },
        Image: {
            type: String,
            required: true
        },
    },
    replyingTo: {
        type: String
    },

    replies: {
        type: Array,
    },

    currrentUser: {
        type: Object
    }
})

const isMine = props.user.username == props.currrentUser.username

const isReplying = ref(false)

</script>

<template>
    <div class="wrapper">
        <article class="comment">
            <div class="score">
                <img src="~/assets/icons/icon-plus.svg" alt="">

                <span id="score-value">{{ props.score }}</span>
                
                <img src="~/assets/icons/icon-minus.svg" alt="">
            </div>

            <div class="content">
                <img class="pfp" :src="props.user.image.png" alt="">

                <span class="username">
                    {{ props.user.username }}
                    <span  v-if="isMine" class="you">you</span>
                </span>

                <span>{{ props.createdAt }}</span>

                <div v-if="isMine" class="actions">
                    <button class="delete-btn">
                        <img src="~/assets/icons/icon-delete.svg" alt="">
                        Delete
                    </button>
                    <button>
                        <img src="~/assets/icons/icon-edit.svg" alt="">
                        Edit
                    </button>
                </div>
                <div v-else class="actions">
                    <button @click="isReplying = !isReplying">
                        <img src="~/assets/icons/icon-reply.svg" alt="">
                        Reply
                    </button>
                </div>

                <p><span v-if="props.replyingTo" class="replying-to">{{ `@${props.replyingTo} ` }} </span>{{ props.content }}</p>
            </div>

            <CommentInput class="response" @submit.prevent="isReplying = false" v-if="isReplying"
            :replyingToId="props.commentId"
            :replyingTo="props.user.username" />
        </article>

        <div v-if="replies" class="replies">
            <Comment v-for="reply in props.replies"
            v-bind="reply" :image="reply.user.image.png"
            :comment-id="reply.id" :currrent-user="props.currrentUser" />
        </div>
    </div>
</template>

<style scoped>
.comment {
    padding: 1.2em;
    margin: 2em 0;

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1em;

    background-color: var(--white);
    color: var(--grayish-blue);
    border-radius: 10px;
}

.score {
    width: fit-content;
    height: fit-content;

    background-color: var(--very-light-gray);
    padding: .6em;
    border-radius: 8px;

    color: var(--light-grayish-blue);
    font-weight: 700;

    grid-row: 1;
}

.response {
    grid-row: 2;
    grid-column: 1/-1;
}

.score img {
    display: block;
    padding: .3em 0;
    transition: filter .4s;
}

.score img:hover {
    cursor: pointer;
    filter: brightness(60%);
}

#score-value {
    color: var(--moderate-blue);
    margin: .4em 0;
}

.content {
    grid-row: 1;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: auto auto auto 1fr;
    column-gap: .8em
}

.content > * {
    grid-row: 1;
}

.content p {
    grid-row: 2;
    grid-column: 1/-1;
}

.actions {
    place-self: end;
}

.actions button {
    color: var(--moderate-blue);
    font-weight: 700;

    border: none;
    background-color: inherit;

    transition: filter .5s ease;
}

.actions button:hover {
    filter: brightness(150%);
    cursor: pointer;
}

.actions button + button {
    margin: 0 .3em;
}

.actions img {
    margin-right: .3em;
}

.replies {
    border-left: 2px solid var(--light-gray);
    margin-left: 6%;
    padding-left: 6%;
}

.pfp {
    width: 1.5em;
}

.delete-btn {
    color: var(--soft-red) !important;
}

.username {
    color: var(--dark-blue);
    font-weight: 500;
}

.you {
    background-color: var(--moderate-blue);
    color: var(--white);
    font-size: .8em;
    padding: .15em .3em;
    border-radius: 3px;
}

.replying-to {
    color: var(--moderate-blue);
    font-weight: 500;
}
</style>