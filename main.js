const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class AppDAO{
    constructor(dbFilePath){
        this.db = new sqlite3.Database(dbFilePath,(err)=>{
            if(err){
                console.log("--Error connecting to the database--");
            }else{
                console.log("--Successfully connected to database--");
            }
        })
    }

    run(sql,params=[]){
        return new Promise((resolve,reject)=>{
            this.db.run(sql,params,(err)=>{
                if(err){
                    console.log(`Error running query: ${sql}`);
                    reject(err);
                }else{
                    resolve({id:this.lastId})
                }
            })
        })
    }

    getAll(sql,params=[]){
        return new Promise((resolve,reject)=>{
            this.db.all(sql,params,(err,results)=>{
                if(err){
                    console.log(`Error fetching data with the query: ${sql}`)
                    console.log(err);
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        })
    }
}

module.exports = AppDAO;