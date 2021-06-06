const path = require('path');

module.exports = {
	future: {
		webpack5: false,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
	},
};
