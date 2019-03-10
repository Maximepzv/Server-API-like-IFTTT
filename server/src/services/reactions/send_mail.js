/*
Module options:

options.to      : destination email address
options.subject : Email subject
options.content : Email content
*/

import config from '../../../properties/config';

module.exports = {
    start: function(options, user) {
        console.log('Reaction: sending mail');

		var nodemailer = require('nodemailer');
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: user.google.email,
				clientId: config.google.clientID,
				clientSecret: config.google.clientSecret,
				refreshToken: user.google.refreshToken,
				accessToken: user.google.token,
			}
		});

		const mailOptions = {
			from: user.google.email, // sender address
			to: options.to, // list of receivers
			subject: options.subject, // Subject line
			html: options.content // plain text body
		};

		transporter.sendMail(mailOptions, function (err, info) {
			if(err)
				console.log(err);
			else
				console.log(info);
		});
    }
};
