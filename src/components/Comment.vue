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
        <div class="score">
            <span>+</span>

            <span id="score-value">{{ props.score }}</span>
            
            <span>-</span>
        </div>

        <div class="content">
            <img class="pfp" :src="props.userImage" alt="">

            <span class="username">
                {{ props.userName }}
                <span  v-if="isMine" class="you">you</span>
            </span>

            <span>{{ props.createdAt }}</span>

            <div v-if="isMine" class="actions">
                <button>
                    <img src="~/assets/icons/icon-delete.svg" alt="">
                    Delete
                </button>
                <button>
                    <img src="~/assets/icons/icon-edit.svg" alt="">
                    Edit
                </button>
            </div>
            <div v-else class="actions">
                <button>
                    <img src="~/assets/icons/icon-reply.svg" alt="">
                    Reply
                </button>
            </div>

            <p>{{ props.content }}</p>
        </div>
    </article>
</template>

<style scoped>
.comment {
    width: 500px;
    padding: 1.2em;
    margin: 2em 0;

    display: flex;
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
}

.score > span {
    display: block;
}

#score-value {
    color: var(--moderate-blue);
    margin: .4em 0;
}

.content {
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
}

.actions button + button {
    margin: 0 .3em;
}

.actions img {
    margin-right: .3em;
}

.pfp {
    width: 1.5em;
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
</style>