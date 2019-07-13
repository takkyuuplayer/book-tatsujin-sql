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
  await db.createTable("SeqTbl", {
    seq: type.INTEGER,
    name: type.STRING
  });

  return Promise.all(
    [
      [1, "ディック"],
      [2, "アン"],
      [3, "ライル"],
      [5, "カー"],
      [6, "マリー"],
      [8, "ベン"]
    ].map(item => db.insert("SeqTbl", ["seq", "name"], item))
  );
};

exports.down = function(db) {
  return db.dropTable("SeqTbl");
};

exports._meta = {
  version: 1
};
