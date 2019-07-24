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
  await db.createTable("Accounts", {
    prc_date: type.DATE,
    prc_amt: type.INTEGER
  });

  return Promise.all(
    [
      ["2018-10-26", 12000],
      ["2018-10-28", 2500],
      ["2018-10-31", -15000],
      ["2018-11-03", 34000],
      ["2018-11-04", -5000],
      ["2018-11-06", 7200],
      ["2018-11-11", 11000]
    ].map(item => db.insert("Accounts", ["prc_date", "prc_amt"], item))
  );
};

exports.down = async function(db) {
  await db.dropTable("Accounts");
};

exports._meta = {
  version: 1
};
