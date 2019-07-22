var dbPromised = idb.open('dicoding-news', 1, upgradeDb => {
    var articleObjectStore = upgradeDb.createObjectStore('articles', {
      keyPath: 'ID'
    });
    articleObjectStore.createIndex('post_title', 'post_title', { unique: false});
  });
  //menyimpan article yang sudah dibuka
  function saveArticle(article){
    dbPromised
    .then(function(db) {
      var tx = db.transaction('articles', 'readwrite');
      var store = tx.objectStore('articles');
      console.log(article);
      store.add(article.result)
      return tx.complete;
    })
    .then(function() {
      console.log('Berita berhasil disimpan');
    });
  }
  //mengambil article yang tersimpan
  var getArticle = () => {
    return new Promise((resolve, reject) => {
      dbPromised.then(db => {
        var tx = db.transaction('articles', 'readonly');
        var store = tx.objectStore('articles');
        return store.getArticle();
      }).then(articles => {
        resolve(articles)
      })
    })
  }
//mengambil article dari id
  function getArticleById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("news", "readonly");
            var store = tx.objectStore("news");
            return store.get(id);
        })
        .then(function(article) {
            resolve(article);
        });
    });
}