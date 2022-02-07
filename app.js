require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json({extended: true}));

app.use('/api/files', require('./routes/files.routes'));

async function serverStart() {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}...`);
        });
    } catch (e) {
        console.log(`App crashed. Error message: ${e.message}`);
        process.exit(1);
    }
}

serverStart();
