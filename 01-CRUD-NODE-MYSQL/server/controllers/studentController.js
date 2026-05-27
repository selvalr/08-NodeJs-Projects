const mysql = require("mysql");

//mysql connection
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//router

exports.view = (req, res) => {
  //check database connection
  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log("Error" + err);
      }
    });
  });
};

//adduser
exports.adduser = (req, res) => {
  res.render("adduser");
};

//save
exports.save = (req, res) => {
  //check database connection
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { name, age, city } = req.body;
    connection.query(
      "insert into users(NAME,AGE,CITY)values(?,?,?)",
      [name, age, city],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("adduser", { msg: "User details Added Sucessfull" });
        } else {
          console.log("Error" + err);
        }
      },
    );
  });
};

//editUser
exports.editUser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;

    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],

      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("edituser", { rows });
        } else {
          console.log(err);
        }
      },
    );
  });
};

//update
exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { name, age, city } = req.body;

    let id = req.params.id;

    connection.query(
      "UPDATE users SET NAME=?, AGE=?, CITY=? WHERE ID=?",
      [name, age, city, id],

      (err, rows) => {
        connection.release();

        if (!err) {
          con.getConnection((err, connection) => {
            if (err) throw err;

            let id = req.params.id;

            connection.query(
              "SELECT * FROM users WHERE id = ?",
              [id],

              (err, rows) => {
                connection.release();

                if (!err) {
                  res.render("edituser", {
                    rows,
                    msg: "Update Details Updated ",
                  });
                } else {
                  console.log(err);
                }
              },
            );
          });
        } else {
          console.log(err);
        }
      },
    );
  });
};

//delete function
exports.delete = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    //get id
    let id = req.params.id;
    connection.query("delete from users where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });
};
