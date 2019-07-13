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
  await db.createTable("Students", {
    student_id: type.INTEGER,
    dpt: type.STRING,
    sbmt_date: type.DATE
  });

  return Promise.all(
    [
      [100, "理学部", "2018-10-10"],
      [101, "理学部", "2018-09-12"],
      [102, "文学部", null],
      [103, "文学部", "2018-09-10"],
      [200, "文学部", "2018-09-22"],
      [201, "工学部", null],
      [202, "経済学部", "2018-09-25"]
    ].map(item =>
      db.insert("Students", ["student_id", "dpt", "sbmt_date"], item)
    )
  );
};

exports.down = function(db) {
  return db.dropTable("Students");
};

exports._meta = {
  version: 1
};
