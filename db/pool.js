// データベース(postgresql)入力情報

const { Pool } = require("pg")

// DB情報をもったプールを生成

const pool = new Pool({
  host: 'ec2-52-86-115-245.compute-1.amazonaws.com',
  database: 'dcborm8kb13nja',
  port: 5432,
  user: 'azprlrfnaczpei',
  password: 'd91e3f372fcd5176e87d83e11d909df2d8328de86c759cc82a657204fe609074',
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false // これは証明書検証を無視する設定なので、本番では自重する
                              // Heroku Postgresの無料環境では、証明書が非対応なのでやむを得ず
  }
});

module.exports = pool;


// Host
// ec2-52-86-115-245.compute-1.amazonaws.com
// Database
// dcborm8kb13nja
// User
// azprlrfnaczpei
// Port
// 5432
// Password
// d91e3f372fcd5176e87d83e11d909df2d8328de86c759cc82a657204fe609074
