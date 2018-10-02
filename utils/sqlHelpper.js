var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit:10,
    host: '127.0.0.1',
    user: 'root',
    password: 'BruceChain@2018',
    database: 'exchange'
})


module.exports = {
    query: async (sql, params) => {
        //通过创建promise去实现同步，调用resolve是触发成功的回调方法，调用reject是触发失败的方法
        let promise = new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, params, function (error, results, fields) {
                        
                        console.log(`\n${sql}\n${params}`)

                        if (error) {
                            reject(error)
                        } else {
                            resolve(results)
                        }
                        connection.release();
                    });
                }
    
            });
        })
    
        let result;
        //第一个参数是成功的回调
        //第二个参数是失败的回调
        await promise.then(function (data) {
            result = {error:null, data:data}
        }, function(error) {
            result = {error:error, data:null}
        })
        return result
    }
}