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
  await db.createTable("Projects", {
    project_id: type.STRING,
    step_nbr: type.INTEGER,
    status: type.STRING
  });

  return Promise.all(
    [
      ["AA100", 0, "完了"],
      ["AA100", 1, "待機"],
      ["AA100", 2, "待機"],
      ["B200", 0, "待機"],
      ["B200", 1, "待機"],
      ["CS300", 0, "完了"],
      ["CS300", 1, "完了"],
      ["CS300", 2, "待機"],
      ["CS300", 3, "待機"],
      ["DY400", 0, "完了"],
      ["DY400", 1, "完了"],
      ["DY400", 2, "完了"]
    ].map(item =>
      db.insert("Projects", ["project_id", "step_nbr", "status"], item)
    )
  );
};

exports.down = function(db) {
  return db.dropTable("Projects");
};

exports._meta = {
  version: 1
};
