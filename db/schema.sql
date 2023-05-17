CREATE TABLE IF NOT EXISTS app_user (
  eth_address VARCHAR(42),
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(eth_address)
);

CREATE TABLE IF NOT EXISTS task_group (
  name VARCHAR(42), -- Unique NFT Address OR name (for the sitewide tasks)
  PRIMARY KEY(name)
);

CREATE TABLE IF NOT EXISTS task (
  id INTEGER,
  task_group_name VARCHAR(42) NOT NULL,
  reward_amount INTEGER DEFAULT 0,
  PRIMARY KEY(id, task_group_name),
  FOREIGN KEY(task_group_name) REFERENCES task_group(name)
);

CREATE TABLE IF NOT EXISTS completed_task (
  task_group_name VARCHAR(42),
  task_id INTEGER,
  completed_by VARCHAR(42),
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY(task_group_name, task_id, completed_by),
  FOREIGN KEY(task_group_name) REFERENCES task_group(name)
  FOREIGN KEY(task_id) REFERENCES task(id),
  FOREIGN KEY(completed_by) REFERENCES app_user(eth_address)
);

CREATE OR REPLACE FUNCTION trigger_function() 
   RETURNS TRIGGER 
AS $t$
DECLARE
  points INTEGER;
BEGIN
  SELECT reward_amount INTO points 
    FROM task
    WHERE id = NEW.task_id 
    AND task_group_name = NEW.task_group_name;

  UPDATE app_user
    SET reward_points = reward_points + points
    WHERE eth_address = NEW.completed_by;

  RETURN NEW;
END;
$t$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER award_points_trigger
AFTER INSERT 
ON completed_task
FOR EACH ROW
EXECUTE PROCEDURE trigger_function();

