const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const https = require('https');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Home',
    });
})

router.post('/',(req, res) => {
    let currency=req.body.currency;
    let apikey="340778BF-C9A1-4289-AB24-E684707B4DC3"
    let url="https://rest.coinapi.io/v1/exchangerate/"+currency+"/USD?apikey="+apikey;
    https.get(url,(response)=>{
        response.on('data', (d) => {
            let json=JSON.parse(d);
            let exchangeRate=json.src_side_base[0].rate;
            console.log(exchangeRate);
            res.send("Current exchange rate of "+currency+" in USD is: "+exchangeRate);
        });
    });
});

// exports
module.exports = router;