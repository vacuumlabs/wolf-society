CREATE TABLE IF NOT EXISTS app_user (
  eth_address VARCHAR(42),
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(eth_address)
);

CREATE TABLE IF NOT EXISTS collection (
  id SERIAL,
  reward_amount INTEGER DEFAULT 0,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS task (
  id SERIAL,
  collection_id INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(collection_id) REFERENCES collection(id)
);

CREATE TABLE IF NOT EXISTS completed_task (
  collection_id INTEGER,
  task_id INTEGER,
  completed_by VARCHAR(42),
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY(collection_id, task_id, completed_by),
  FOREIGN KEY(collection_id) REFERENCES collection(id),
  FOREIGN KEY(task_id) REFERENCES task(id),
  FOREIGN KEY(completed_by) REFERENCES app_user(eth_address)
);

CREATE TABLE IF NOT EXISTS completed_collection (
  collection_id INTEGER,
  completed_by VARCHAR(42),
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY(collection_id, completed_by),
  FOREIGN KEY(collection_id) REFERENCES collection(id),
  FOREIGN KEY(completed_by) REFERENCES app_user(eth_address)
);

CREATE OR REPLACE FUNCTION trigger_function() 
   RETURNS TRIGGER 
AS $t$
DECLARE
  points INTEGER;
BEGIN
  SELECT reward_amount INTO points 
    FROM collection
    WHERE id = NEW.collection_id;

  UPDATE app_user
    SET reward_points = reward_points + points
    WHERE eth_address = NEW.completed_by;

  RETURN NEW;
END;
$t$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER award_points_trigger
AFTER INSERT 
ON completed_collection
FOR EACH ROW
EXECUTE PROCEDURE trigger_function();

