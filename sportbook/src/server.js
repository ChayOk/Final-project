const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8081;

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sportbook',
});

// Retrieve list of sports
app.get('/api/sports', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query('SELECT id, name FROM sports', (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

// Retrieve list of countries
app.get('/api/countries', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query('SELECT id, name FROM countries', (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

// Retrieve list of tournaments
app.get('/api/tournaments', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query('SELECT tournaments.name AS tournament_name, tournaments.id AS tournament_id, countries.name AS country_name, sports.name AS sport_name FROM tournaments JOIN countries ON tournaments.country_id = countries.id JOIN sports ON tournaments.sport_id = sports.id', (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

// Retrieve list of events
app.get('/api/events', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query('SELECT tournaments.name AS tournament_name, tournaments.id AS tournament_id, countries.name AS country_name, sports.name AS sport_name, events.event_name AS event_name, events.event_start_time AS start_time FROM tournaments JOIN countries ON tournaments.country_id = countries.id JOIN sports ON tournaments.sport_id = sports.id JOIN events ON tournaments.id = events.tournament_id', (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

// Retrieve list of outcomes
app.get('/api/outcomes_1x2_home', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query("SELECT o.id AS outcome_id, o.market_id AS out_market_id, o.odds AS odds, o.outcomes_id AS outcomes_coef, m.market_id AS market_id, m.scope_id AS market_scope_id, m.type AS market_type, s.id AS scope_id, s.type AS scope_type, e.event_id AS event_id, e.event_name AS event_name, e.tournament_id AS tournament_id FROM outcomes o JOIN markets m ON o.market_id = m.market_id JOIN scopes s ON m.scope_id = s.id JOIN events e ON s.event_id = e.event_id JOIN tournaments t ON e.tournament_id = t.id WHERE m.scope_id = s.id AND s.event_id = e.event_id AND e.tournament_id = t.id AND m.type = '12' AND s.type = 'full_event' AND o.odds = 'home'", (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

// Retrieve list of outcomes
app.get('/api/outcomes_1x2_draw', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query("SELECT o.id AS outcome_id, o.market_id AS out_market_id, o.odds AS odds, o.outcomes_id AS outcomes_coef, m.market_id AS market_id, m.scope_id AS market_scope_id, m.type AS market_type, s.id AS scope_id, s.type AS scope_type, e.event_id AS event_id, e.event_name AS event_name, e.tournament_id AS tournament_id FROM outcomes o JOIN markets m ON o.market_id = m.market_id JOIN scopes s ON m.scope_id = s.id JOIN events e ON s.event_id = e.event_id JOIN tournaments t ON e.tournament_id = t.id WHERE m.scope_id = s.id AND s.event_id = e.event_id AND e.tournament_id = t.id AND m.type = '12' AND s.type = 'full_event' AND o.odds = 'draw'", (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

// Retrieve list of outcomes
app.get('/api/outcomes_1x2_away', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query("SELECT o.id AS outcome_id, o.market_id AS out_market_id, o.odds AS odds, o.outcomes_id AS outcomes_coef, m.market_id AS market_id, m.scope_id AS market_scope_id, m.type AS market_type, s.id AS scope_id, s.type AS scope_type, e.event_id AS event_id, e.event_name AS event_name, e.tournament_id AS tournament_id FROM outcomes o JOIN markets m ON o.market_id = m.market_id JOIN scopes s ON m.scope_id = s.id JOIN events e ON s.event_id = e.event_id JOIN tournaments t ON e.tournament_id = t.id WHERE m.scope_id = s.id AND s.event_id = e.event_id AND e.tournament_id = t.id AND m.type = '12' AND s.type = 'full_event' AND o.odds = 'away'", (err, rows) => {
        connection.release();
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });