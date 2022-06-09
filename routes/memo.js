var express = require('express');
var router = express.Router();

// pool.jsの読み込み
const pool = require('../db/pool');


//  メモを全件取得するAPI
//  @returns {Object[]} data
//  @returns {number} data.id - ID
//  @returns {string} data.title - タイトル
//  @returns {string} data.text - 内容



// memoテーブルの全データを返却するAPI
router.get('/', (req, res, next) => {
  // データベースから全件取得する
  pool.query('SELECT * FROM memo', (error, results) => {
    // エラー
    if (error) {
      res.status(500).json({
        status: '500 internet Server Error',
        error: error,
      });
    }

    // 正常なら取得したデータを返却
    res.status(200).json({
      data: results.rows,
    });
  });
});


// 指定されたIDのメモを取得するAPI
// @param {number} id - メモID
// @returns {Object[]} data
// @returns {number} data.id - ID
// @returns {string} data.title - タイトル
// @returns {string} data.text - 内容

router.get('/:id', (req, res, next) => {
  // パラメータを取得
  const { id } = req.params;
  // データベースから取得する
  pool.query('SELECT * FROM memo WHERE id = $1', [id], (error, results) => {
    // エラー
    if(error) {
      res.status(500).json({
        status: '500 internet Server Error',
        error: error,
      });
    }
    // 正常なら取得したデータを返却
    res.status(200).json({
      data: results.rows,
    });
  });
});



// メモを新規登録するAPI
// @returns {string} status - success

router.post('/', (req, res, next) => {
  // bodyからtitleとtextを取得
  const {title, text} = req.body.memo;

  // データベースに登録する
  pool.query('INSERT INTO memo(title, text) VALUES($1, $2)', [title, text], (error, results) => {
      if (error) {
        res.status(500).json({
          status: '500 internal Server Error',
          error: error,
        });
      }
      // 登録出来たらsuccessを返却
      res.status(201).json({
        status: 'success',
      });
    });
});


// 指定されたIDのメモを更新するAPI
// @param {number} id - メモID
// @returns {string} status - success

router.put('/:id', (req, res, next) => {
  // parameterからidを取得
  const { id } = req.params;
  // bodyからtitleとtextを取得
  const { title, text } = req.body.memo;
  // データベースを更新する
  pool.query('UPDATE memo SET title = $1, text = $2 WHERE id = $3', [title, text, id], (error, results) => {
    if (error) {
      res.status(500).json({
        status: '500 internal Server Error',
        error: error,
      });
    }
    console.log(results);
    if (results.rowCount === 0) {
      // 更新するデータが無かった場合
      res.status(400).json({
        status: '400 Bad Request',
        message: 'データが存在しません。',
      });
    } else {
      // 更新出来たらsuccessを返却
      res.status(200).json({
        status: 'success',
      });
    }
  });
});


// 指定されたIDのメモを削除するAPI
// @param {number} id - メモID
// @returns {string} status - success

router.delete('/:id', (req, res, next) => {
  // maramaterからidを取得
  const { id } = req.params;
  // データベースから削除する
  pool.query('DELETE FROM memo WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(500).json({
        status: '500 internal Server Error',
        message: error,
      });
    }
    if (results.rowCount === 0) {
      // 削除するデータが無かった場合
      res.status(400).json({
        status: '400 Bad request',
        message: 'データが存在しません。',
      });
    } else {
      // 削除出来たらsuccessを返却
      res.status(200).json({
        status: 'success',
      });
    }
  });
});

module.exports = router;