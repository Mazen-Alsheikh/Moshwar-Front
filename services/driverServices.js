const db = require("../connect");
const bcrypt = require("bcrypt");

exports.driverLogin = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM drivers WHERE email = ?", [email], (err, result) => {

        if (err) return res.status(500).json({error: "DB Error", err: err.message});

        if (result.length === 0) return res.status(404).json({message: "السائق غير موجود"});

        const driverData = result[0];

        const isMatch = bcrypt.compare(password, driverData.password);

        if (isMatch) {

            return res.status(200).json({message: "تم تسجيل الدخول بنجاح", data: driverData});

        } else {

            return res.status(500).json({message: "البريد الإلكتروني و كلمة المرور غير صحيحة"});
        }

    })

}


exports.driverRegister = (req, res) => {

    const name = req.body.name;
    const vhicle = req.body.vhicle;
    const phone = req.body.email;
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM driver WHERE email = ?", [email], (err, result) => {

        if (err) return res.status(500).json({error: "DB Error", err: err.message});

        if (result.length > 0) return res.status(404).json({message: "السائق موجود بالفعل, إختر بريد إلكتروني آخر"});

        const hashedPassword = bcrypt.hash(password, 10);

        db.query("INSERT INTO driver SET(name, phone, email, vhicle, password) VALUES (?, ?, ?, ?, ?)", [name, phone, email, vhicle, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({error: "DB Error", err: err.message});
            return res.status(200).json({message: "تم إنشاء حساب جديد بنجاح"});
        })
    })

}