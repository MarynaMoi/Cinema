--DDL - data d... language

--DROP TABLE genres; 
--      (якщо таблиця жанри вже існує - то вона буде видалена DROP, а потім створена нова за допомогою CREATE)
--      таблиця буде повністю видалена (разом із даними)
-- CREATE TABLE genres (
--     id SERIAL,
--          автоінкремент (число збільшується автоматично)
--     title VARCHAR (100) NOT NULL UNIQUE,
--          title — назва жанру
--          VARCHAR(100) — рядок до 100 символів
--          NOT NULL — не може бути порожнім
--     UNIQUE — значення не повинні повторюватися
--     description TEXT,
--          TEXT довгий текст без обмеження
--     PRIMARY KEY(id)
--          PRIMARY KEY — головний ключ таблиці
--          гарантує унікальність id
-- );

-- CREATE TABLE countries (
--     id SERIAL,
--     title VARCHAR (10) NOT NULL UNIQUE,
--     description TEXT,
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE locations (
--     id SERIAL,
--     countryId INT,
--     PRIMARY KEY(id),
--     FOREIGN KEY(countryId) REFERENCES countries ON DELETE CASCADE
--              повинно бути FOREIGN KEY (countryId) REFERENCES countries(id) ON DELETE CASCADE
--              FOREIGN KEY(countryId) — оголошує countryId як зовнішній ключ
--              REFERENCES countries — вказує, що значення беруться з таблиці countries
--              ON DELETE CASCADE — дуже важлива опція:
-- );


-- в іншому файлі прописали алтер табле (файли зберігати не треба)
-- ALTER TABLE locations ADD COLUMN citi VARCHAR(100)
--змінюємо таблицю локатіон,  додаємо стовпчик з сіті
--написали/запустили - таблиця змінилась

-- ALTER TABLE locations ALTER COLUMN citi  SET NOT NULL;
-- додавати констреінт і видаляти ми можемо тілтки ті, що прописані для всієї таблиці
-- видаляти їх можнп тільки по імені
-- додавати через чек

--ТИП СТОВПЦЯ змінюється також через алтер колумн
--перейменувати - ренейм колумн ту

-- CREATE TABLE "studios" (
--          "" - ім’я стає чутливим до регістру
--     id SERIAL,
--     title VARCHAR (100) NOT NULL UNIQUE,
--     locationId INT,
--     logo TEXT,
--     PRIMARY KEY(id),
--      CONSTRAINT f_key_loc FOREIGN KEY(locationId) REFERENCES locations(id)
--      CONSTRAINT f_key_loc — ім’я обмеження, якщо його не дати, то воно створюється автоматично
--              це ім'я можна знайти потім тільки через консоль (або не тільки)
    
-- );

-- 133 Yan
-- CREATE TABLE actors (
--     id SERIAL,
--     full_name VARCHAR (100) NOT NULL UNIQUE,
--     birth_year DATE,
--     photo TEXT,
--     countryId INT,
--     PRIMARY KEY(id),
--     CONSTRAINT f_key_country FOREIGN KEY(countryId) REFERENCES countries
--              --REFERENCES countries(id) ід не треба, бо ми посилаємось на прімарі кей
    
-- );

-- CREATE TABLE directors (
--     id SERIAL,
--     full_name VARCHAR (100) NOT NULL UNIQUE,
--     birth_year DATE,
--     photo TEXT,
--     countryId INT,
--     PRIMARY KEY(id),
--      CONSTRAINT f_key_country FOREIGN KEY(countryId) REFERENCES countries    
-- );

-- CREATE TABLE movies (
--     id SERIAL,
--     title VARCHAR (100) NOT NULL UNIQUE,
--     release_year DATE,
--     poster TEXT,
--     genreId INT,
--     studioId INT,
--     PRIMARY KEY(id),
--      CONSTRAINT f_key_genre FOREIGN KEY(genreId) REFERENCES genres,    
--      CONSTRAINT f_key_studio FOREIGN KEY(studioId) REFERENCES studios   
-- );


-- CREATE TABLE movies_actors (
--     actorId INT,
--     movieId INT,
--      CONSTRAINT f_key_actor FOREIGN KEY(actorId) REFERENCES actors,    
--      CONSTRAINT f_key_movie FOREIGN KEY(movieId) REFERENCES movies    
-- );

-- CREATE TABLE movies_directors (
--     directorId INT,
--     movieId INT,
--      CONSTRAINT f_key_director FOREIGN KEY(directorId) REFERENCES directors,    
--      CONSTRAINT f_key_movie FOREIGN KEY(movieId) REFERENCES movies    
-- );

-- ALTER TABLE movies_directors 
-- RENAME COLUMN directorId TO director_Id;
-- ALTER TABLE movies_directors 
-- RENAME COLUMN movieId TO movie_Id;
-- ALTER TABLE movies_actors 
-- RENAME COLUMN actorId TO actor_Id;
-- ALTER TABLE movies_actors 
-- RENAME COLUMN movieId TO movie_Id;
-- ALTER TABLE actors 
-- RENAME COLUMN countryId TO country_Id;
-- ALTER TABLE directors 
-- RENAME COLUMN countryId TO country_Id;
-- ALTER TABLE movies 
-- RENAME COLUMN genreId TO genre_Id;
-- ALTER TABLE movies 
-- RENAME COLUMN studioId TO studio_Id;
-- ALTER TABLE studios 
-- RENAME COLUMN locationId TO location_Id;
-- ALTER TABLE locations 
-- RENAME COLUMN countryId TO country_Id;


-- INSERT INTO countries (title, description)
-- VALUES ('USA', 'Unitrd State of America')
--починати змінювати треба тіблицю/сутністі від котрих щось залежить, а не котрі залежать від чогось
--спочатку країна, потім актор, що посилається на країну

-- INSERT INTO actors (full_name, country_id)
-- VALUES ('Sean Connory', 1)

-- INSERT INTO actors (full_name, country_id)
-- VALUES 
-- ('Brad Pitt', 1),
-- ('Johnny Depp', 1);

-- INSERT INTO directors (full_name, birth_year, country_Id) VALUES
-- ('Christopher Nolan', '1970-07-30', 1),
-- ('Quentin Tarantino', '1963-03-27', 1),
-- ('Steven Spielberg', '1946-12-18', 1);

-- INSERT INTO locations (country_Id, citi) VALUES
-- (1, 'California');

-- INSERT INTO studios (title, location_Id) VALUES
-- ('Warner Bros.', 1),
-- ('Universal Pictures', 1),
-- ('Paramount Pictures', 1);

-- INSERT INTO movies (title, release_year, studio_Id) VALUES
-- ('Inception', '2010-01-01',  4),
-- ('Titanic', '1997-01-01',  6),
-- ('Pulp Fiction', '1994-01-01', 4),
-- ('Jurassic Park', '1993-01-01', 5),
-- ('Fight Club', '1999-01-01',  6);
-- якщо виникла помилка - ід пропускається. наступні дані вже будуть мати наступні ід 

-- INSERT INTO countries (title, description)
-- VALUES ('UK', 'United Kingdom')
-- RETURNING id; повертає ід створеного елементу. повернути все - * 
-- схоже на метод ГЕТ
-- апдате схоже на метод ПУТ/ПАТЧ
-- інсерт схоже на метод ПОСТ

-- SELECT ID
-- FROM actors
-- WHERE full_name='Brad Pitt'

-- SELECT ac.full_name, dir.full_name
-- FROM actors AS ac, directors AS dir
-- WHERE ac.full_name LIKE 'Se%';

-- SELECT DISTINCT ON (country_id) full_name, country_id
-- FROM actors
-- дістінкт - шукає унікальні значення

-- SELECT full_name,country_id,birth_year
-- FROM directors
-- ORDER BY birth_year DESC
-- LIMIT 2 OFFSET 1
--ордер бай - сортування
--деск - в порядку зменшення (по замовчуванню в порядку збільшення)
--ліміт - скіки запитів показати, 
--офсет - з якого почати рахувати


--почитати про агрегатні функції
--GROUP BY(HAVING, count )

--138Yan
--CREATE ROLE mar WITH LOGIN PASSWORD 'пароль' CREATEDB CREATEROLE SUPERUSER;

--pg_dump cinema > dump_cinema
--це копія бази даних у вигляді файлу

--psql -h 127.0.0.1 -p 5432 -U postgres
--CREATE DATABASE mew_cinema
--\q
--наповнюємо бд з дамп файла
--psql mew_cinema < dump_cinema

--перевіряємо чи загрузилось
-- \c mew_cinema  підключення до бд
--  \d   показати таблиці


--треба додати до таблиці
--ALTER TABLE table_name
--ADD CONSTRAINT constraint_name UNIQUE (column1, column2);


-- ALTER TABLE countries
-- ALTER COLUMN title TYPE VARCHAR(20);
-- INSERT INTO countries (title, description) VALUES
-- ('France', 'European country'),
-- ('Germany', 'Central Europe'),
-- ('Italy', 'Southern Europe'),
-- ('Spain', 'Iberian Peninsula'),
-- ('Canada', 'North America'),
-- ('Australia', 'Oceania'),
-- ('Japan', 'East Asia'),
-- ('China', 'East Asia'),
-- ('India', 'South Asia'),
-- ('Brazil', 'South America'),
-- ('Mexico', 'North America'),
-- ('South Korea', 'East Asia'),
-- ('Sweden', 'Northern Europe'),
-- ('Norway', 'Scandinavia'),
-- ('Denmark', 'Scandinavia'),
-- ('Netherlands', 'Western Europe'),
-- ('Belgium', 'Western Europe'),
-- ('Poland', 'Eastern Europe');

-- INSERT INTO locations (country_Id, citi) VALUES
-- ((SELECT id FROM countries WHERE title = 'USA'), 'New York'),
-- ((SELECT id FROM countries WHERE title = 'UK'), 'London'),
-- ((SELECT id FROM countries WHERE title = 'France'), 'Paris'),
-- ((SELECT id FROM countries WHERE title = 'Germany'), 'Berlin'),
-- ((SELECT id FROM countries WHERE title = 'Italy'), 'Rome'),
-- ((SELECT id FROM countries WHERE title = 'Spain'), 'Madrid'),
-- ((SELECT id FROM countries WHERE title = 'Canada'), 'Toronto'),
-- ((SELECT id FROM countries WHERE title = 'Australia'), 'Sydney'),
-- ((SELECT id FROM countries WHERE title = 'Japan'), 'Tokyo'),
-- ((SELECT id FROM countries WHERE title = 'China'), 'Beijing'),
-- ((SELECT id FROM countries WHERE title = 'India'), 'Mumbai'),
-- ((SELECT id FROM countries WHERE title = 'Brazil'), 'Rio de Janeiro'),
-- ((SELECT id FROM countries WHERE title = 'Mexico'), 'Mexico City'),
-- ((SELECT id FROM countries WHERE title = 'South Korea'), 'Seoul'),
-- ((SELECT id FROM countries WHERE title = 'Sweden'), 'Stockholm'),
-- ((SELECT id FROM countries WHERE title = 'Norway'), 'Oslo'),
-- ((SELECT id FROM countries WHERE title = 'Denmark'), 'Copenhagen'),
-- ((SELECT id FROM countries WHERE title = 'Netherlands'), 'Amsterdam'),
-- ((SELECT id FROM countries WHERE title = 'Belgium'), 'Brussels'),
-- ((SELECT id FROM countries WHERE title = 'Poland'), 'Warsaw');

-- INSERT INTO actors (full_name, birth_year, country_Id) VALUES
-- ('Leonardo DiCaprio', '1974-11-11', (SELECT id FROM countries WHERE title = 'USA')),
-- ('Tom Hanks', '1956-07-09', (SELECT id FROM countries WHERE title = 'USA')),
-- ('Robert Downey Jr', '1965-04-04', (SELECT id FROM countries WHERE title = 'USA')),
-- ('Christian Bale', '1974-01-30', (SELECT id FROM countries WHERE title = 'UK')),
-- ('Gary Oldman', '1958-03-21', (SELECT id FROM countries WHERE title = 'UK')),
-- ('Jean Reno', '1948-07-30', (SELECT id FROM countries WHERE title = 'France')),
-- ('Marion Cotillard', '1975-09-30', (SELECT id FROM countries WHERE title = 'France')),
-- ('Daniel Bruhl', '1978-06-16', (SELECT id FROM countries WHERE title = 'Germany')),
-- ('Penelope Cruz', '1974-04-28', (SELECT id FROM countries WHERE title = 'Spain')),
-- ('Ryan Reynolds', '1976-10-23', (SELECT id FROM countries WHERE title = 'Canada')),
-- ('Hugh Jackman', '1968-10-12', (SELECT id FROM countries WHERE title = 'Australia')),
-- ('Ken Watanabe', '1959-10-21', (SELECT id FROM countries WHERE title = 'Japan')),
-- ('Donnie Yen', '1963-07-27', (SELECT id FROM countries WHERE title = 'China')),
-- ('Shah Rukh Khan', '1965-11-02', (SELECT id FROM countries WHERE title = 'India')),
-- ('Wagner Moura', '1976-06-27', (SELECT id FROM countries WHERE title = 'Brazil')),
-- ('Gael Garcia Bernal', '1978-11-30', (SELECT id FROM countries WHERE title = 'Mexico')),
-- ('Lee Byung-hun', '1970-07-12', (SELECT id FROM countries WHERE title = 'South Korea')),
-- ('Mads Mikkelsen', '1965-11-22', (SELECT id FROM countries WHERE title = 'Denmark'));

-- INSERT INTO directors (full_name, birth_year, country_Id) VALUES
-- ('Martin Scorsese', '1942-11-17', (SELECT id FROM countries WHERE title = 'USA')),
-- ('James Cameron', '1954-08-16', (SELECT id FROM countries WHERE title = 'Canada')),
-- ('Ridley Scott', '1937-11-30', (SELECT id FROM countries WHERE title = 'UK')),
-- ('Guy Ritchie', '1968-09-10', (SELECT id FROM countries WHERE title = 'UK')),
-- ('Luc Besson', '1959-03-18', (SELECT id FROM countries WHERE title = 'France')),
-- ('Pedro Almodovar', '1949-09-25', (SELECT id FROM countries WHERE title = 'Spain')),
-- ('Denis Villeneuve', '1967-10-03', (SELECT id FROM countries WHERE title = 'Canada')),
-- ('Taika Waititi', '1975-08-16', (SELECT id FROM countries WHERE title = 'Australia')),
-- ('Hayao Miyazaki', '1941-01-05', (SELECT id FROM countries WHERE title = 'Japan')),
-- ('Bong Joon-ho', '1969-09-14', (SELECT id FROM countries WHERE title = 'South Korea')),
-- ('Zhang Yimou', '1950-11-14', (SELECT id FROM countries WHERE title = 'China')),
-- ('Rajkumar Hirani', '1962-11-20', (SELECT id FROM countries WHERE title = 'India')),
-- ('Fernando Meirelles', '1955-11-09', (SELECT id FROM countries WHERE title = 'Brazil')),
-- ('Guillermo del Toro', '1964-10-09', (SELECT id FROM countries WHERE title = 'Mexico')),
-- ('Thomas Vinterberg', '1969-05-19', (SELECT id FROM countries WHERE title = 'Denmark')),
-- ('Paul Verhoeven', '1938-07-18', (SELECT id FROM countries WHERE title = 'Netherlands')),
-- ('Roman Polanski', '1933-08-18', (SELECT id FROM countries WHERE title = 'Poland'));

-- INSERT INTO movies (title, release_year, studio_Id) VALUES
-- ('The Dark Knight', '2008-01-01', (SELECT id FROM studios WHERE title = 'Warner Bros')),
-- ('Interstellar', '2014-01-01', (SELECT id FROM studios WHERE title = 'Warner Bros')),
-- ('Avatar', '2009-01-01', (SELECT id FROM studios WHERE title = '20th Century Studios')),
-- ('Gladiator', '2000-01-01', (SELECT id FROM studios WHERE title = 'Universal Pictures')),
-- ('The Matrix', '1999-01-01', (SELECT id FROM studios WHERE title = 'Warner Bros')),
-- ('The Godfather', '1972-01-01', (SELECT id FROM studios WHERE title = 'Paramount Pictures')),
-- ('Forrest Gump', '1994-01-01', (SELECT id FROM studios WHERE title = 'Universal Pictures')),
-- ('The Revenant', '2015-01-01', (SELECT id FROM studios WHERE title = '20th Century Studios')),
-- ('Dune', '2021-01-01', (SELECT id FROM studios WHERE title = 'Warner Bros')),
-- ('Parasite', '2019-01-01', (SELECT id FROM studios WHERE title = 'CJ Entertainment')),
-- ('Spirited Away', '2001-01-01', (SELECT id FROM studios WHERE title = 'Toho Co Ltd')),
-- ('Oldboy', '2003-01-01', (SELECT id FROM studios WHERE title = 'CJ Entertainment')),
-- ('Amelie', '2001-01-01', (SELECT id FROM studios WHERE title = 'StudioCanal')),
-- ('City of God', '2002-01-01', (SELECT id FROM studios WHERE title = 'Eros International')),
-- ('Pan Labyrinth', '2006-01-01', (SELECT id FROM studios WHERE title = 'Eros International'));

-- INSERT INTO studios (title, location_Id) VALUES
-- ('20th Century Studios', 2),
-- ('Columbia Pictures', 1),
-- ('Pixar Animation Studios', 1),
-- ('Marvel Studios', 2),
-- ('Lucasfilm', 1),
-- ('DreamWorks Pictures', 2),
-- ('MGM Studios', 1),
-- ('StudioCanal', 4),
-- ('Toho Co Ltd', 10),
-- ('CJ Entertainment', 15),
-- ('Eros International', 12),
-- ('Village Roadshow Pictures', 9),
-- ('Constantin Film', 5),
-- ('Pathé', 4),
-- ('Gaumont Film Company', 4),
-- ('Nordisk Film', 17),
-- ('Canal+ Studios', 4);

-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = '20th Century Studios') WHERE title = 'Avatar';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Universal Pictures') WHERE title = 'Gladiator';

-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Paramount Pictures') WHERE title = 'The Godfather';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Universal Pictures') WHERE title = 'Forrest Gump';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = '20th Century Studios') WHERE title = 'The Revenant';

-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'CJ Entertainment') WHERE title = 'Parasite';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Toho Co Ltd') WHERE title = 'Spirited Away';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'CJ Entertainment') WHERE title = 'Oldboy';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'StudioCanal') WHERE title = 'Amelie';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Eros International') WHERE title = 'City of God';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Eros International') WHERE title = 'Pan Labyrinth';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Warner Bros.') WHERE title = 'Dune';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Warner Bros.') WHERE title = 'The Dark Knight';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Warner Bros.') WHERE title = 'Interstellar';
-- UPDATE movies SET studio_Id = (SELECT id FROM studios WHERE title = 'Warner Bros.') WHERE title = 'The Matrix';

