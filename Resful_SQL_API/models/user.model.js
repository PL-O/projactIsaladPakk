const sql = require("./db");
//constructor
const User = function (user) {  //ใช้ arrow function ไม่สามารถกำหนด คอนสเต็คเตอร์ได้
    //Attributes
    this.id = user.id;
    this.name = user.name;
    this.password = user.password;
    this.Tel = user.Tel;
    this.imageurl = user.imageurl;
};



//Method insert Data
User.create = (newUser, result) => {
    //INSERT INTO restaurants SET id, name , Tel ,imageurl Values ("1","KFC","FastFood","url")
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created user:", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    })
};

//Getdata byId
User.getById = (userId, result) => {
    //SELECT * FROM restaurants where id = restaurantId
    sql.query(`SELECT * FROM user WHERE id = ${userId}`,
        (err, res) => {
            if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
                console.log("error ", err);
                result(err, null);
                return;
            }
            if (res.length) { //ถ้าหากเจอข้อมูล
                result(null, res[0]); //ส่งข้อมูล array ตำแหน่งที่ 1 กลับมา
                return;
            }
            //restaurant not found  with this Id
            result({ kind: "not_found" }, null);
        }
    );
};

User.getAll = (result) => {
    // SELECT * FROM restaurants  
    sql.query(" SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    //Update restaurants SET "name = ? , Tel =?. imageurl=? where id=?"

    sql.query("Update user SET name = ? ,password =?, Tel =?, imageurl =? WHERE id=?",
        [user.name, user.password, user.Tel, user.imageurl, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            //เช็คแล้วพ้น ก็ อัพเดท
            result(null, { id: id, ...user });
        }
    );

};

User.removeById = (id, result) => {
    //DELETE FROM restaurants WHERE id=?
    sql.query("DELETE FROM user WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = () => {

};

module.exports = User;