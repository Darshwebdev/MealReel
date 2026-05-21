const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);

const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});