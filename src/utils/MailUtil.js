const mailer = require('nodemailer')

const sendingMail = async(to, subject,text) => {

    const transporter = mailer.createTransport({

        service: 'gmail',
        auth:{
            user: "hemalparking7777@gmail.com",
            pass: "gzvi ejrl hgft kknl"
        }
    })

    const mailOptions = {
        from: 'hemalparking7777@gmail.com',
        to: to,
        subject: subject,
        // text: text
        html:"<h1>"+text+"</h1>"
    }
  const mailresponse = await transporter.sendMail(mailOptions);
  console.log(mailresponse);
  return mailresponse;
    
}

module.exports = {
    sendingMail
}