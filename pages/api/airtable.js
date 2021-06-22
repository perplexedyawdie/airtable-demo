import axios from "axios";
import Airtable from 'airtable'
export default (req, res) => {
    var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('apptmlQb118yvSgMk');

    if (req.method === 'POST') {

        base('cvTracker').create({
            "Applicant Name": req.body.applicant,
            "Role": req.body.applicantRole,
            "CV": req.body.url
        }, function (err, record) {
            if (err) {
                console.error(err);
                res.status(500).send(false);
                return;

            }
            console.log(record.getId());
            res.status(200).send(true);
        });

    } else {
        // Handle any other HTTP method

    }

}

