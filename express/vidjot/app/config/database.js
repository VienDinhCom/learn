const vidjotDev = { mongoURI: 'mongodb://localhost/vidjot' };
const vidjotProd = { mongoURI: 'mongodb://root:toor@ds233218.mlab.com:33218/vidjot' };

export default (process.env.NODE_ENV === 'production') ? vidjotProd : vidjotDev;
