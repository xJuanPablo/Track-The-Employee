INSERT INTO department (department_name)
VALUES ("finance"),
("marketing"),
("operations management"),
("human resources"),
("information technology");

INSERT INTO roles ("title", "salary", "department_id")
VALUES ("Financial Analyst", 68000, 1),
("Accountant", 77000, 1),
("Marketing management", 150000, 2),
("Market research", 82000, 2),
("materials manager", 120000, 3),
("operations analyst", 76000, 3),
("hiring", 55000, 4),
("training", 64000, 4),
("IT support specialist",43000 , 5),
("software designer", 160000 , 5);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Bob", "Dylan", 1, NULL),
("Ray", "Charles", 2, 1),
("Carlos", "Santana", 3, NULL),
("Louis", "Armstrong", 4, NULL),
("James", "Taylor", 5, NULL),
("Johann", "Bach", 6, 5),
("Dave", "Grohl", 7, NULL),
("Marvin", "Gaye", 8, 7),
("Brad", "Terrence", 9, NULL),
("Joe", "Strummer", 10, 9);
