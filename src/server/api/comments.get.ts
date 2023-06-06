export default defineEventHandler(async () => {
    return await useStorage('db').getItem('comments')
})
