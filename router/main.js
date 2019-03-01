module.exports = [(router) => (
    router.get('/main', async (ctx, next) => {
        ctx.response.body = "<h2>main</h2>"
    }),
    router.get('/', async (ctx, next) => {
        ctx.body = { a: 1, b: 2 }
    })
)]
