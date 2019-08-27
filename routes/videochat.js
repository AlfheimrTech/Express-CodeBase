var express = require('express');
var router = express.Router();
var OpenTok = require('opentok'),
    opentok = new OpenTok('46410892', '36a4d44132cb1e8c721f38c63b1d88378e2c55c2'); // creating new OpenTok object

router.get('/createopentoksession', (req, res) => {
// creating a session
    opentok.createSession( async(err, session)=>{
        if (err){
            console.log(err);
            res.send("Error while starting session:"+ err);
        } 
        else{
            console.log("Session id:"+ session.sessionId);
            //generating token for this session
            try{
                let opentoksessiontoken = await session.generateToken();
                console.log("Token generated:"+ opentoksessiontoken);
                
                res.json({
                    'sessionid': session.sessionId,
                    'token': opentoksessiontoken
                })
            }catch(err){
                console.log("Error while creating token:"+ err)
            }     
        }
    })
})

//exporting the router
module.exports = router;