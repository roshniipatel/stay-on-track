USE shadow_db;

INSERT INTO department (name)
VALUES  
  ('Accounting'),
  ('Management'),
  ('Development'),
  ('Human Resources');

INSERT INTO role (title, salary, department_id) 
VALUES  
  ('Engineer', 58000, 1),
  ('Project Manager', 45000, 1),
  ('Accountant', 70000, 5),
  ('Product Manager', 17000, 4),
  ('Recruiter', 42000, 3),
  ('Team Leader', 54000, 2),
  ('Manager', 62000, 3),
  ('Marketing', 32000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Magnus', 'Bane', 9, NULL),
  ('Alexander', 'Lightwood', 4, NULL),
  ('Isabella', 'Lightwood', 6, NULL),
  ('Raphael', 'Santiago', 5, 2),
  ('Simon', 'Lewis', 1, 2),
  ('Clarissa', 'Fairchild', 3, 1),
  ('Jace', 'Herondale', 3, 1),
  ('Will', 'Herondale', 2, 3),
  ('Lucian', 'Graymark', 2, 3),
  ('Jocelyn', 'Fray', 8, NULL);