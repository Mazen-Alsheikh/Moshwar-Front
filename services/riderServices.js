const db = require("../connect");
const bcrypt = require("bcrypt");

exports.riderLogin = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM rider WHERE email = ?", [email], async (err, result) => {

        if (err) return res.status(500).json({error: "DB Error", err: err.message});

        if (result.length === 0) return res.status(404).json({message: "الراكب غير موجود"});

        const riderData = result[0];

        const isMatch = await bcrypt.compare(password, riderData.password);

        if (isMatch) {

            return res.status(200).json({message: "تم تسجيل الدخول بنجاح", data: riderData});

        } else {

            return res.status(500).json({message: "البريد الإلكتروني و كلمة المرور غير صحيحة"});
        }

    })

}

exports.riderRegister = (req, res) => {

    const name = req.body.name;
    const phone = req.body.email;
    const email = req.body.email;
    const password = req.body.password;
    
    db.query("SELECT * FROM rider WHERE email = ?", [email], async (err, result) => {
        
        if (err) return res.status(500).json({error: "DB Error", err: err.message});
        
        if (result.length > 0) return res.status(400).json({message: "الراكب موجود بالفعل, إختر بريد إلكتروني آخر"});
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.query("INSERT INTO rider(name, phone, email, password) VALUES (?, ?, ?, ?)", [name, phone, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({error: "DB Error", err: err.message});
            return res.status(200).json({message: "تم إنشاء حساب جديد بنجاح"});
        })
    })

}