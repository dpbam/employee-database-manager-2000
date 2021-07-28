const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);
app.use("/api", apiRoutes);

// turn on connection to db and server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  