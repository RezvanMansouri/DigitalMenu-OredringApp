import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Order} from "../models/order";

declare function openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess): any;
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;

  constructor() {
  }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "CateringAppDB";
    let version = "1.0";
    let displayName = "DB for Angular Catering App";
    let dbSize = 10 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables(): void {
    function txFunction(tx: any): void {

      let sql: string = "DROP TABLE IF EXISTS orders;";

      tx.executeSql(sql);


      sql = "CREATE TABLE IF NOT EXISTS orders(" +
        "orderId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "entry VARCHAR(40) NOT NULL, " +
        "qty INTEGER NOT NULL, " +
        "price DOUBLE NOT NULL, " +
        "userId INTEGER NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES users(id));";
      let options = [];

      tx.executeSql(sql, options, () => {
        console.info("Success: create table order successful");
      }, DatabaseService.errorHandler);

      //User Table
      //   var sql: string = "CREATE TABLE IF NOT EXISTS users(" +
      sql = "CREATE TABLE IF NOT EXISTS users(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "firstName VARCHAR(20) NOT NULL, " +
        "lastName VARCHAR(20) NOT NULL, " +
        "email VARCHAR(50) NOT NULL UNIQUE, " +
        "password VARCHAR(20) NOT NULL, " +
        "phone INTEGER(10) NOT NULL, " +
        "zipCode VARCHAR(6) NULL);";
      //  var options = [];
      options = [];

      tx.executeSql(sql, options, () => {
        console.info("Success: create table users successful");
      }, DatabaseService.errorHandler);
    }


    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        //create database
        this.createDatabase();
        //create tables
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

  getDatabase(): any {
    this.initDB();
    return this.db;
  }

  public clearDB(): void {
    let result = confirm("Really want to clear database?");
    if (result) {
      this.dropTables();
      this.db = null;
      alert("Database cleared");
    }
  }

  private dropTables(): void {
    function txFunction(tx: any): void {
      var sql: string = "DROP TABLE IF EXISTS orders;";
      var options = [];
      tx.executeSql(sql, options, () => {
        console.info("Success: drop table orders successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS users;";
      options = [];
      tx.executeSql(sql, options, () => {
        console.info("Success: drop table users successful");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table drop transaction successful");
    });
  }





  // login
  public insert(user: User, callback) {
    function txFunction(tx: any) {
      var sql: string = 'INSERT INTO users(firstName, lastName, email, password, phone, zipCode) VALUES(?,?,?,?,?,?);';
      var options = [user.firstName, user.lastName, user.email, user.password, user.phone, user.zipcode];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);

    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: insert transaction successful');
    });

  }

  public select(id: number): Promise<any> {
    let options = [id];
    let user: User = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM users WHERE id=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            // for(let i=0; i< results.rows.length; i++){
            let row = results.rows[0];

            user = new User(row['firstName'], row['lastName'],
              row['email'], row['password'], row['phone'], row['zipcode']);

            user.id = row['id'];
            resolve(user);
          } else {
            reject("No user found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });
  }

  public selectByEmailandPassword(email: string, password: string): Promise<any> {
    let options = [email, password];
    let user: User = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM users WHERE email=? AND password=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {

            let row = results.rows[0];
            user = new User(row['firstName'], row['lastName'],
              row['email'], row['password'], row['phone'], row['zipcode']);

            user.id = row['id'];

            resolve(user);
          } else {
            reject("No user found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });


  }


  public insertOrder(order: Order, callback) {
    function txFunction(tx: any) {
      var sql: string = 'INSERT INTO orders(entry, qty, price, userId) VALUES(?,?,?,?);';
      // var sql: string = 'INSERT INTO orders(entry, qty, price) VALUES(?,?,?);';
      var options = [order.entry, order.qty, order.price, order.userId];
      // var options = [order.entry, order.qty, order.price];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: insert Order transaction successful');
    });
  }

  public selectAllOrders(userId: number): Promise<any> {
    let options = [userId];
    let orders: Order[] = [];

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM orders WHERE userId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let o = new Order(row['entry'], row['qty'],
                row['price'], row['userId']);
              o.orderId = row['orderId'];
              orders.push(o);
            }
            resolve(orders);
          } else {
            reject("No orders found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }

  public selectOrderByName(entry: string, userId: number): Promise<any> {
    let options = [entry, userId];
    let order: Order = null;

    return new Promise((resolve, reject) => {

      function txFunction(tx) {
        let sql = "SELECT * FROM orders WHERE entry=? AND userId=?;";
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            order = new Order(row['entry'], row['qty'],
              row['price'], row['userId']);
            order.orderId = row['orderId'];
            resolve(order);
          } else {
            reject("No order found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });
  }

  public delete(orderId: number, callback) {
    function txFunction(tx: any) {
      let sql: string = 'DELETE FROM Orders WHERE orderId=?;';
      let options = [orderId];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: delete transaction successful');
    });
  }



  public deleteOrder(orderId: number, callback) {
    function txFunction(tx: any) {
     let sql: string = 'DELETE FROM Orders WHERE userId=?;';
      let options = [orderId];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: delete transaction successful');
    });
  }

  public update(order: Order, callback) {
    function txFunction(tx: any) {
      let sql: string = 'UPDATE orders SET qty=? WHERE orderId=?;';
      let options = [order.qty, order.orderId];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: update transaction successful');
    });
  }

}

