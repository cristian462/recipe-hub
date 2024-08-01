SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `recipehub` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `recipehub`;

-- Tabla de usuarios
CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    pass VARCHAR(100) NOT NULL,
    foto VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de recetas
CREATE TABLE recipe (
    id_recipe INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    foto VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

-- Tabla de ingredientes
CREATE TABLE ingredient (
    id_ingredient INT AUTO_INCREMENT PRIMARY KEY,
    id_recipe INT,
    nombre VARCHAR(100) NOT NULL,
    cantidad VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_recipe) REFERENCES recipe(id_recipe) ON DELETE CASCADE
);

-- Tabla de instrucciones
CREATE TABLE instruction (
    id_instruction INT AUTO_INCREMENT PRIMARY KEY,
    id_recipe INT,
    paso INT NOT NULL,
    descripcion TEXT NOT NULL,
    FOREIGN KEY (id_recipe) REFERENCES recipe(id_recipe) ON DELETE CASCADE
);

-- Tabla de categorías
CREATE TABLE category (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de categorías de recetas (muchos a muchos)
CREATE TABLE recipe_category (
    id_recipe INT,
    id_category INT,
    PRIMARY KEY (id_recipe, id_category),
    FOREIGN KEY (id_recipe) REFERENCES recipe(id_recipe) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES category(id_category) ON DELETE CASCADE
);

INSERT INTO category (nombre) VALUES
('Postre'),
('Entrante'),
('Plato Principal'),
('Bebida');

