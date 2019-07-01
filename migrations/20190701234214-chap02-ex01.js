'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.createTable("ServerLoadSample", {
    server: "string",
    sample_date: "int",
    load_val: "int"
  });

  return Promise.all(
    [
      ['A', (new Date('2018-02-01')).getTime() / 1000, 1024,],
      ['A', (new Date('2018-02-02')).getTime() / 1000, 2366,],
      ['A', (new Date('2018-02-05')).getTime() / 1000, 2366,],
      ['A', (new Date('2018-02-07')).getTime() / 1000, 985,],
      ['A', (new Date('2018-02-08')).getTime() / 1000, 780,],
      ['A', (new Date('2018-02-12')).getTime() / 1000, 1000,],
      ['B', (new Date('2018-02-01')).getTime() / 1000, 54,],
      ['B', (new Date('2018-02-02')).getTime() / 1000, 39008,],
      ['B', (new Date('2018-02-03')).getTime() / 1000, 2900,],
      ['B', (new Date('2018-02-04')).getTime() / 1000, 556,],
      ['B', (new Date('2018-02-05')).getTime() / 1000, 12600,],
      ['B', (new Date('2018-02-06')).getTime() / 1000, 7309,],
      ['C', (new Date('2018-02-01')).getTime() / 1000, 1000,],
      ['C', (new Date('2018-02-07')).getTime() / 1000, 2000,],
      ['C', (new Date('2018-02-16')).getTime() / 1000, 5000,],
    ].map(item =>
      db.insert("ServerLoadSample", ["server", "sample_date", "load_val"], item)
    )
  );
};

exports.down = function (db) {
  return db.dropTable("ServerLoadSample");
};


exports._meta = {
  "version": 1
};
