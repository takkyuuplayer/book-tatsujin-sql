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
  await db.createTable("Numbers", {
    num: type.INTEGER
  });

  return Promise.all(
    new Array(100)
      .fill(0)
      .map((val, idx) => [idx + 1])
      .map(item => db.insert("Numbers", ["num"], item))
  );
};

exports.down = function(db) {
  return db.dropTable("Numbers");
};

exports._meta = {
  version: 1
};
