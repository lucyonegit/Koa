const Mysql = require("mysql");
/**创建数据库连接池 */
const poll = Mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '19941010',
    database: 'koa'
})
const query = (sql, value) => {
    return new Promise((resolve, reject) => {
        poll.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, value, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}
module.exports = query;