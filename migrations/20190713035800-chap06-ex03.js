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
  await db.createTable("Items", {
    item: type.STRING
  });

  await Promise.all(
    [["ビール"], ["紙おむつ"], ["自転車"]].map(item =>
      db.insert("Items", ["item"], item)
    )
  );

  await db.createTable("ShopItems", {
    shop: type.STRING,
    item: type.STRING
  });

  return Promise.all(
    [
      ["仙台", "ビール"],
      ["仙台", "紙おむつ"],
      ["仙台", "自転車"],
      ["仙台", "カーテン"],
      ["東京", "ビール"],
      ["東京", "紙おむつ"],
      ["東京", "自転車"],
      ["大阪", "テレビ"],
      ["大阪", "紙おむつ"],
      ["大阪", "自転車"]
    ].map(item => db.insert("ShopItems", ["shop", "item"], item))
  );
};

exports.down = async function(db) {
  await db.dropTable("Items");
  return db.dropTable("ShopItems");
};

exports._meta = {
  version: 1
};
