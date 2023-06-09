import { defineStore } from 'pinia';
import { uid } from 'uid';
import { ref } from 'vue'

import juliusomo from '~/assets/avatars/image-juliusomo.png'
import amyrobson from '~/assets/avatars/image-amyrobson.png'
import maxblagun from '~/assets/avatars/image-maxblagun.png'
import ramsesmiron from '~/assets/avatars/image-ramsesmiron.png'

// Uncomment lines to cap votes to 1

export const useCommentsStore = defineStore('comments', () => {

    const comments = ref({
        "currentUser": {
            "image": {
                "png": juliusomo,
                "webp": "/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo",
            // "votedComments": []
        },
        "comments": [
            {
                "id": uid(),
                "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                "createdAt": "1 month ago",
                "score": 12,
                "user": {
                    "image": {
                        "png": amyrobson,
                        "webp": "/avatars/image-amyrobson.webp"
                    },
                    "username": "amyrobson"
                },
                "replies": []
            },
            {
                "id": uid(),
                "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                "createdAt": "2 weeks ago",
                "score": 5,
                "user": {
                    "image": {
                        "png": maxblagun,
                        "webp": "/avatars/image-maxblagun.webp"
                    },
                    "username": "maxblagun"
                },
                "replies": [
                    {
                        "id": uid(),
                        "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                        "createdAt": "1 week ago",
                        "score": 4,
                        "replyingTo": "maxblagun",
                        "user": {
                            "image": {
                                "png": ramsesmiron,
                                "webp": "/avatars/image-ramsesmiron.webp"
                            },
                            "username": "ramsesmiron"
                        }
                    },
                    {
                        "id": uid(),
                        "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                        "createdAt": "2 days ago",
                        "score": 2,
                        "replyingTo": "ramsesmiron",
                        "user": {
                            "image": {
                                "png": juliusomo,
                                "webp": "/avatars/image-juliusomo.webp"
                            },
                            "username": "juliusomo"
                        }
                    }
                ]
            }
        ]
    })

    function addComment(newComment, replyToId = 0, replyTo) {
        if (replyToId) {
            if (replyTo) {
                newComment.replyingTo = replyTo
            }

            comments.value.comments.forEach(comment => {
                if (comment.id == replyToId) {
                    comment.replies.push(newComment)
                    return
                } else {
                    comment.replies.forEach(reply => {
                        if (reply.id == replyToId) {
                            comment.replies.push(newComment)
                            return
                        }
                    })
                }
            }) 
        } else {comments.value.comments.push(newComment)}
    }

    function updateComment(id, newContent) {
        comments.value.comments.forEach(comment => {
            if (comment.id == id) {
                comment.content = newContent
                return
            } else {
                comment.replies.forEach(reply => {
                    if (reply.id == id) {
                        reply.content = newContent
                        return
                    }
                })
            }
        })
    }

    function voteComment(id, upOrDown) {
        comments.value.comments.forEach(comment => {
            if (comment.id == id) {
                // if (comments.value.currentUser.votedComments.includes(comment.id)) {
                //     return
                // }

                if (upOrDown) {
                    comment.score++
                    // comments.value.currentUser.votedComments.push(comment.id)
                } else if (upOrDown == false) {
                    comment.score--
                    // comments.value.currentUser.votedComments.push(comment.id)
                }
                return
            } else {
                comment.replies.forEach(reply => {
                    if (reply.id == id) {
                        // if (comments.value.currentUser.votedComments.includes(reply.id)) {
                        //     return
                        // }

                        if (upOrDown) {
                            reply.score++
                            // comments.value.currentUser.votedComments.push(reply.id)
                        } else if (upOrDown == false) {
                            reply.score--
                            // comments.value.currentUser.votedComments.push(reply.id)
                        }
                        return
                    }
                })
            }
        })
    }

    return { comments, addComment, updateComment, voteComment }
})