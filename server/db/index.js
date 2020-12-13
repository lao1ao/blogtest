const mysql = require('mysql')
const dbconfig = require('./dbconfig')
const pool = mysql.createPool(dbconfig);


//数据库连接池
function query(sql,params) {
    return new Promise((resolve, reject) => {
    	  pool.getConnection((err, conn) => {
            if (err) {
            	reject(err)
            	return
            }
            // let sql = 'select *from user where id=? and name=?'
            //执行sql语句
            conn.query(sql, params, (err, result) => {
                conn.release()
                if (err) {
                    throw err
                }
               resolve(result)
        })
    });
    });
}

module.exports=query
