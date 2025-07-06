const db = require("../connect");

exports.getRequests = (req, res) => {

    db.query("SELECT * FROM requests WHERE status = ?",["pending"], (err, result) =>{
        if (err) return res.status(500).json({error: "DB Error", err: err.message});
        res.status(200).json({data: result});
    });
};

exports.sendRequest = (req, res) => {

    const vhicle = req.body.vhicle;
    const from = req.body.from;
    const to = req.body.to;
    const fromLat = from.lat;
    const fromLng = from.lng;
    const toName = to.name;
    const toLat = to.lat;
    const toLng = to.lng;

    db.query(`INSERT INTO 
                    requests(vhicle, 
                            from_lat, 
                            from_lng, 
                            to_lat, 
                            to_lng, 
                            to_name, 
                            passenger_id)
                    VALUES(?, ?, ?, ?, ?, ?, ?)`,
                    [vhicle, fromLat, fromLng, toLat, toLng, toName, 1],
            (err, result) => {
        if (err) return res.status(500).json({error: "DB Error"});

        return res.status(200).json({message: "تم إرسال طلبك بنجاح"});
    });
};

exports.acceptRequest = (req, res) => {

    const requestId = req.params.id;
    const driverId = 2;

    db.query(`UPDATE
                 requests
             SET 
                status = ?,
                driver_id = ?,
            WHERE
                id = ?`,
            ["accepted", driverId, requestId],
        (err, result) => {
            if (err) return res.status(500).json({ error: "DB error", message: err.message });
            res.status(200).json({message: "تم قبول الطلب بنجاح"});
        });
};

