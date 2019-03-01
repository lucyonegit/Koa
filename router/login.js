module.exports = [
    router => (
        router.get('/loginView', async (ctx, next) => {
            ctx.render('login.html', { name: "mimimi" }, ctx);
        })
    ),
    router => (
        router.post('/login', async (ctx, next) => {
            let resData = ctx.request.body;
            console.log(ctx.request.body);
            let res = await ctx.sqlquery(`SELECT * FROM user WHERE username='${resData.name}'`);
            if (res[0].username == resData.name && res[0].password == resData.pass) {
                ctx.response.body = res[0].id
            }
            else {
                ctx.response.body = "<script>alert('用户名或者密码错误咯')</script>"
            }

        })
    )
]