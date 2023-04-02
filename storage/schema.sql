CREATE TABLE sports (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE countries (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tournaments (
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    sport_id VARCHAR(255) NOT NULL,
    country_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE events (
    event_id INT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_start_time DATETIME NOT NULL,
    tournament_id INT NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE
);

CREATE TABLE scopes (
    id INT NOT NULL AUTO_INCREMENT,
    event_id INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

CREATE TABLE markets (
    market_id BIGINT NOT NULL,
    scope_id INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    type_parameter VARCHAR(255) NOT NULL,
    PRIMARY KEY (market_id),
    FOREIGN KEY (scope_id) REFERENCES scopes(id) ON DELETE CASCADE
);

CREATE TABLE outcomes (
    id BIGINT NOT NULL,
    market_id BIGINT NOT NULL,
    odds VARCHAR(255) NOT NULL,
    outcomes_id FLOAT(10, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id) ON DELETE CASCADE
);