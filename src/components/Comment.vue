<script setup>
import { useCommentsStore } from '~/stores/comments'

const { updateComment, voteComment, deleteComment } = useCommentsStore()

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
        type: Date,
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

const isEditing = ref(false)

const newContent = ref(props.content)

const deleteModal = ref(null)

const formattedDate = computed(() => {
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - props.createdAt.getTime();

    // Convert the time difference to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30)

    // Choose what unit to use and format
    if (months) {
        return `${months} ${months == 1 ? 'month' : 'months'} ago`
    } else if (days) {
        if (days == 1) {
            return "yesterday"
        } else if (days % 7 == 0) {
            return `${days / 7} ${days / 7 == 1 ? 'week' : 'weeks'} ago`
        } else { return `${days} days ago` }
    } else if (hours) {
        return `${hours} ${hours == 1 ? 'hour' : 'hours'} ago`
    } else if (minutes) {
        return `${minutes} ${minutes == 1 ? 'minute' : 'minutes'} ago`
    } else { return "now" }

})

function editComment() {
    updateComment(props.commentId, newContent);
    isEditing.value = false
}

function showDeleteModal() {
    deleteModal.value.returnValue = 'cancel'
    deleteModal.value.showModal()
}

// This is a hell of a stupid hack, but it`s what I came up with, I'm so tired right now
function deleteCommentConfirmed() {
    setTimeout(() => {
        deleteComment(props.commentId, deleteModal.value.returnValue)
    }, 50);
}

</script>

<template>
    <div class="wrapper">
        <article class="comment">
            <!-- SCORE -->
            <div class="score">
                <img @click="voteComment(props.commentId, true)" src="~/assets/icons/icon-plus.svg" alt="">

                <span id="score-value">{{ props.score }}</span>

                <img @click="voteComment(props.commentId, false)" src="~/assets/icons/icon-minus.svg" alt="">
            </div>

            <!-- CONTENT -->
            <img class="pfp" :src="props.user.image.png" alt="">

            <span class="username">
                {{ props.user.username }}
                <span v-if="isMine" class="you">you</span>
            </span>

            <span>{{ formattedDate }}</span>

            <div v-if="isMine" class="actions">
                <button @click="showDeleteModal()" class="delete-btn">
                    <img src="~/assets/icons/icon-delete.svg" alt="">
                    Delete
                </button>
                <button @click="isEditing = !isEditing">
                    <img src="~/assets/icons/icon-edit.svg" alt="">
                    Edit
                </button>

                <dialog id="delete-modal" ref="deleteModal">
                    <p>Delete comment</p>

                    <form @submit="deleteCommentConfirmed" method="dialog">
                        <p>
                            Are you sure you want to delete this comment?
                            This will remove the comment and can't be undone.
                        </p>

                        <fieldset>
                            <button value="cancel">NO, CANCEL</button>
                            <button id="confirm-btn" value="confirm">YES, DELETE</button>
                        </fieldset>
                    </form>
                </dialog>
            </div>
            <div v-else class="actions">
                <button @click="isReplying = !isReplying">
                    <img src="~/assets/icons/icon-reply.svg" alt="">
                    Reply
                </button>
            </div>

            <!-- TEXT -->
            <p v-if="!isEditing"><span v-if="props.replyingTo" class="replying-to">{{ `@${props.replyingTo} ` }} </span>{{
                props.content }}</p>

            <form v-else @submit.prevent="editComment" class="edit">
                <textarea v-model="newContent" name="content" rows="3"></textarea>
                <button type="submit">UPDATE</button>
            </form>

        </article>

        <!-- REPLY FORM -->
        <CommentInput class="reply" @submit.prevent="isReplying = false" v-if="isReplying" :replyingToId="props.commentId"
            :replyingTo="props.user.username" />

        <!-- REPLIES -->
        <div v-if="replies" class="replies">
            <Comment v-for="reply in props.replies" v-bind="reply" :image="reply.user.image.png" :comment-id="reply.id"
                :currrent-user="props.currrentUser" />
        </div>

    </div>
</template>

<style scoped>
.comment {
    padding: 1.2em;
    margin: 2em 0;

    display: grid;
    grid-template-columns: auto auto auto auto 1fr;
    grid-template-rows: auto 1fr;
    align-items: center;
    column-gap: 1em;

    background-color: var(--white);
    color: var(--grayish-blue);
    border-radius: 10px;
}

.comment > * {
    grid-row: 1;
}

.score {
    width: fit-content;
    height: fit-content;

    background-color: var(--very-light-gray);
    padding: .6em;
    border-radius: 8px;

    color: var(--moderate-blue);
    font-weight: 700;

    grid-column: 1;
    grid-row: 1/-1;
    align-self: start;
}

.reply {
    padding: 1.2em;
    margin-top: -1em;

    background-color: var(--white);
    color: var(--grayish-blue);
    border-radius: 10px;
}

.score img {
    display: block;
    margin: 0 auto;
    padding: .3em 0;
    transition: filter .4s;
}

.score img:hover {
    cursor: pointer;
    filter: brightness(60%);
}

.comment p, .edit {
    grid-row: 2;
    grid-column: -1/2;
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


/*Delete Modal */
#delete-modal {
    border: none;
    border-radius: 10px;
    max-width: 33%;
    padding: 1.2em;

    color: inherit;
}

#delete-modal > p {
    margin: 0;
    font-size: 1.2em;
    font-weight: 500;
    color: var(--dark-blue);
}

#delete-modal fieldset {
    border: none;
    display: flex;
    gap: .5em;
    padding: 0;
}

#delete-modal button {
    border: none;
    border-radius: 7px;
    background-color: var(--grayish-blue);
    padding: 1em;
    color: var(--white);
    width: 100%;
}

#delete-modal::backdrop {
    background-color: #000;
    opacity: .5;
}

#confirm-btn {
    background-color: var(--soft-red) !important;
}

/*Edit form */
.edit {
    padding-right: 5%;
}

.edit textarea {
    padding: 1em;
    font-family: inherit;
    border: 1px solid var(--light-gray);
    border-radius: 5px;
    resize: none;

    width: 100%;
}

.edit textarea:hover {
    border-color: var(--moderate-blue);
    cursor: pointer;
}

.edit button {
    background-color: var(--moderate-blue);
    border: none;
    border-radius: 8px;

    color: var(--white);
    font-weight: 700;
    padding: 1em 2em;

    text-align: right;
}

.edit button:hover {
    filter: brightness(150%);
    cursor: pointer;
}

.edit button,
.edit textarea {
    display: block;
    transition: all .5s ease;
}

/* Mobile design */
@media (width < 500px) {
    .comment {
        padding: 0;

        grid-template-columns: auto auto 1fr;
        grid-template-rows: auto 1fr auto;
        column-gap: 0.2em;
    }

    .comment > span {
        justify-self: end;
    }

    .score {
        grid-row: 3;
        grid-column: 1;

        padding: .2em;
    }

    .score img {
        display: inline !important;
        vertical-align: middle;
        margin: 0 .4em;
    }

    #score-value {
        vertical-align: middle;
    }

    .actions {
        grid-row: 3;
        grid-column: 2/-1;
        align-self: center;
        justify-self: right;
    }

    .comment p,
    .edit {
        grid-row: 2;
        grid-column: 1/-1;
    }

    #delete-modal {
        max-width: 80%;
    }
}
</style>