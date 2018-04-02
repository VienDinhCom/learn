const vidjotDev = { mongoURI: 'mongodb://localhost/vidjot' };
const vidjotProd = { mongoURI: 'Your production database' };

export default (process.env.NODE_ENV === 'production') ? vidjotProd : vidjotDev;
