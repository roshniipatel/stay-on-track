USE shadow_db;

INSERT INTO department (name)
VALUES  
  ('Accounting'),
  ('Management'),
  ('Development'),
  ('Human Resources');

INSERT INTO role (id, title, salary, department_id) 
VALUES  
  (1, 'Engineer', 58000, 1),
  (2, 'Project Manager', 45000, 1),
  (3, 'Accountant', 70000, 5),
  (4, 'Product Manager', 17000, 4),
  (5, 'Recruiter', 42000, 3),
  (6, 'Team Leader', 54000, 2),
  (7, 'Manager', 62000, 3),
  (8, 'Marketing', 32000, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
  (1, 'Magnus', 'Bane', 9, NULL),
  (2, 'Alexander', 'Lightwood', 4, NULL),
  (3, 'Isabella', 'Lightwood', 6, NULL),
  (4, 'Raphael', 'Santiago', 5, 2),
  (5, 'Simon', 'Lewis', 1, 2),
  (6, 'Clarissa', 'Fairchild', 3, NULL),
  (7, 'Jace', 'Herondale', 3, 1),
  (8, 'Will', 'Herondale', 2, 3);