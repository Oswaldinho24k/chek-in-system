let nodemailer = require("nodemailer");


let transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS
	}
});

exports.welcomeMail = ({ email, username = "Geek!", password }) => {
	transport.sendMail({
            from: 'Runa Chekins Admin',
            to: email,
			subject: "👾¡Bienvenido a Runa Chekins!😎",			
            html: `<div>
                <h3>Hola ${username}!</h3>
                <p>Tu contraseña temporal es: ${password}</p>

            </div>`
		})
		.then(r => console.log(r))
		.catch(e => console.log(e));
};


