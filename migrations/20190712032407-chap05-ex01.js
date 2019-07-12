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
  await db.createTable("ArrayTbl2", {
    key: type.STRING,
    i: type.INTEGER,
    val: type.INTEGER
  });

  return Promise.all(
    [
      ...new Array(10).fill(0).map((val, idx) => ["A", idx, null]),
      ["B", 1, 3],
      ...new Array(9).fill(0).map((val, idx) => ["B", idx + 1, null]),
      ...new Array(10).fill(0).map((val, idx) => ["C", idx, 1])
    ].map(item => db.insert("ArrayTbl2", ["key", "i", "val"], item))
  );
};

exports.down = function(db) {
  return db.dropTable("ArrayTbl2");
};

exports._meta = {
  version: 1
};
