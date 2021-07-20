import 'package:sqflite/sqflite.dart';
import 'package:sqflite/sqlite_api.dart';
import 'package:path/path.dart';
import 'package:mas/my_models/user_s_model.dart';
import 'package:mas/my_models/token_model.dart';

class DBProvider {
  DBProvider._();
  static final DBProvider db = DBProvider._();
  static Database _database;

  Future<Database> get database async {
    if (_database != null) return _database;
    _database = await initDB();
    return _database;
  }

  initDB() async {
    return await openDatabase(join(await getDatabasesPath(), 'mas.db'),
        onCreate: (db, version) async {
      await db.execute('''
        CREATE TABLE user(
          email TEXT PRIMARY KEY,password TEXT
        )
        ''');
      await db.execute('''
        CREATE TABLE keys(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          privatekey TEXT,
          publickey TEXT,
          walletaddress TEXT
        )
        ''');
      await db.execute('''
        CREATE TABLE tokens(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100),
          symbol VARCHAR(100),
          contract TEXT,
          image TEXT
        )
        ''');

      var btc = Token(
          name: "Bitcoin",
          symbol: "BTC",
          contract: "BTC",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png");

      await db.insert(
        'tokens',
        btc.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace,
      );

      var eth = Token(
          name: "Ethereum",
          symbol: "ETH",
          contract: "ETH",
          image:
              "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png");

      await db.insert(
        'tokens',
        eth.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace,
      );

      var xrp = Token(
          name: "Ripple",
          symbol: "XRP",
          contract: "XRP",
          image: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png");

      await db.insert(
        'tokens',
        xrp.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }, version: 1);
  }

  newUser(User_s newUser) async {
    final db = await database;
    var res = await db.rawInsert('''
    INSERT user (username,password) VALUE (?,?)
    ''', [newUser.email, newUser.password]);
    return res;
  }

  newKey(newKey) async {
    final db = await database;
    var res = await db.rawInsert('''
    INSERT keys (privatekey,publickey,walletaddress) VALUE (?,?,?)
    ''', [newKey.privatekey, newKey.publickey, newKey.walletaddress]);
    return res;
  }

  newToken(newToken) async {
    final db = await database;
    var res = await db.rawInsert('''
    INSERT tokens (name,symbol,contract,image) VALUE (?,?,?,?)
    ''', [
      newToken.privatekey,
      newToken.publickey,
      newToken.walletaddress,
      newToken.image
    ]);
    return res;
  }

  Future<dynamic> getuser() async {
    final db = await database;
    var res = await db.query("user");
    if (res.length == 0) {
      return null;
    } else {
      var resMap = res[0];
      return resMap.isNotEmpty ? resMap : null;
    }
  }

  Future<dynamic> getNewKey() async {
    final db = await database;
    var res = await db.query("keys");
    if (res.length == 0) {
      return null;
    } else {
      var resMap = res[0];
      return resMap.isNotEmpty ? resMap : null;
    }
  }

  Future<dynamic> getNewToken() async {
    final db = await database;
    var res = await db.query("tokens");
    if (res.length == 0) {
      return null;
    } else {
      var resMap = res[0];
      return resMap.isNotEmpty ? resMap : null;
    }
  }
}
