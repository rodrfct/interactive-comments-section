export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        await useStorage('db').setItem('comments', body)
        return 'Success'
    } catch (error) {
        return 'There was an error: ' + error
    }
})
