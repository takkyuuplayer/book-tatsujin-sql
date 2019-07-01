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
  await db.createTable("pop_tbl_2", {
    pref_name: "string",
    sex: "int",
    population: "int"
  });

  return Promise.all(
    [
      ["徳島", 1, 60],
      ["徳島", 2, 40],
      ["香川", 1, 100],
      ["香川", 2, 100],
      ["愛媛", 1, 100],
      ["愛媛", 2, 50],
      ["高知", 1, 100],
      ["高知", 2, 100],
      ["福岡", 1, 100],
      ["福岡", 2, 200],
      ["佐賀", 1, 20],
      ["佐賀", 2, 80],
      ["長崎", 1, 125],
      ["長崎", 2, 125],
      ["東京", 1, 250],
      ["東京", 2, 150]
    ].map(item =>
      db.insert("pop_tbl_2", ["pref_name", "sex", "population"], item)
    )
  );
};

exports.down = function(db) {
  return db.dropTable("pop_tbl_2");
};

exports._meta = {
  version: 1
};
