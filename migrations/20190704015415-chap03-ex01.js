"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable("Products", {
    name: type.STRING,
    price: type.INTEGER
  });

  return Promise.all(
    [
      ["りんご", 50],
      ["みかん", 100],
      ["ぶどう", 50],
      ["スイカ", 80],
      ["レモン", 30],
      ["バナナ", 50]
    ].map(item => db.insert("Products", ["name", "price"], item))
  );
};

exports.down = function(db) {
  return db.dropTable("Products");
};
exports._meta = {
  version: 1
};
