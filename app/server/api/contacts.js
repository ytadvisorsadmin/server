import Express from "express";
import mailer from "./../lib/mailer";

function handleNewContact(req, res) {
  var request = req.body;
  var content = "";
  for(let key in req.body){
    if(req.body.hasOwnProperty(key)){
      content += `<p>${key} : ${req.body[key]}</p>`;
    }
  }

  var message = `<html><body>${content}</body></html>`;
  mailer.sendMail({
    from_email: "no-reply@ytadvisors.com",
    from_name: request.name,
    to: [{
      "email": "support@ytadvisors.com",
      "name": "YT Advisors Support",
      "type": "to"
    }],
    subject: "New Contact Message",
    html: message
  })
    .then(function () {
      res.send({success: true});
    })
    .catch(function (error) {
      res.send({
        success: false,
        error_description: error.message
      });
    });
}

function handleGetContact(req, res) {
  res.send('respond with a quote resource. ' + JSON.stringify(process.env));
}

var router = Express.Router();
router.get("/", handleGetContact);
router.post("/", handleNewContact);

export default router;