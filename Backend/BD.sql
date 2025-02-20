CREATE TABLE profesionales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(50),
    foto_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


2. Tabla de Habilidades
Aquí se definen las habilidades o especialidades de los profesionales:

CREATE TABLE habilidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);


3. Tabla Relacional: Profesional_Habilidades
Esta tabla de relación vincula cada profesional con una o varias habilidades (relación muchos a muchos):

CREATE TABLE profesional_habilidades (
    profesional_id INTEGER NOT NULL,
    habilidad_id INTEGER NOT NULL,
    PRIMARY KEY (profesional_id, habilidad_id),
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id) ON DELETE CASCADE,
    FOREIGN KEY (habilidad_id) REFERENCES habilidades(id) ON DELETE CASCADE
);


4. Tabla de Videos
Tabla para almacenar información de videos (podrían ser tutoriales, demostraciones, etc.):

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    url TEXT NOT NULL,
    profesional_id INTEGER,  -- Opcional: relacionar el video con un profesional
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id) ON DELETE SET NULL
);


5. Tabla de Eventos
Tabla para gestionar eventos (charlas, talleres, etc.):

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_evento TIMESTAMP NOT NULL,
    ubicacion VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);




1. Inserts para la tabla profesionales
INSERT INTO profesionales (nombre, descripcion, email, telefono, foto_url)
VALUES
('Juan Pérez', 'Especialista en fontanería y electricidad', 'juan@example.com', '123456789', 'https://example.com/fotos/juan.jpg'),
('María Gómez', 'Experta en carpintería y pintura', 'maria@example.com', '987654321', 'https://example.com/fotos/maria.jpg'),
('Carlos López', 'Técnico en aire acondicionado', 'carlos@example.com', '567890123', 'https://example.com/fotos/carlos.jpg');
Asumimos que estos inserts generarán los IDs:
Juan Pérez → id = 1
María Gómez → id = 2
Carlos López → id = 3


2. Inserts para la tabla habilidades
INSERT INTO habilidades (nombre)
VALUES
('Fontanería'),
('Electricidad'),
('Carpintería'),
('Pintura'),
('Aire Acondicionado');
Asumimos que estos inserts generarán los IDs:
Fontanería
Electricidad
Carpintería
Pintura
Aire Acondicionado


3. Inserts para la tabla profesional_habilidades
Vinculamos a cada profesional con una o varias habilidades. Ajusta los IDs si fuera necesario:
-- Juan Pérez (id=1) → Fontanería (id=1), Electricidad (id=2)
INSERT INTO profesional_habilidades (profesional_id, habilidad_id)
VALUES
(1, 1),
(1, 2),

-- María Gómez (id=2) → Carpintería (id=3), Pintura (id=4)
(2, 3),
(2, 4),

-- Carlos López (id=3) → Electricidad (id=2), Aire Acondicionado (id=5)
(3, 2),
(3, 5);


4. Inserts para la tabla videos
Relacionamos cada video con el profesional_id que corresponda (opcional). Por ejemplo:
INSERT INTO videos (titulo, descripcion, url, profesional_id)
VALUES
('Cómo reparar una fuga de agua', 'Tutorial de fontanería', 'https://example.com/videos/fuga-agua.mp4', 1),
('Instalación de lámparas', 'Guía rápida de electricidad', 'https://example.com/videos/instalacion-lamparas.mp4', 1),
('Construyendo una mesa de madera', 'Tutorial de carpintería básico', 'https://example.com/videos/mesa-madera.mp4', 2),
('Pintando paredes interiores', 'Consejos de pintura', 'https://example.com/videos/pintando-paredes.mp4', 2),
('Mantenimiento de aire acondicionado', 'Cómo limpiar y revisar el aire acondicionado', 'https://example.com/videos/aire-acondicionado.mp4', 3);


5. Inserts para la tabla eventos
Ejemplo de varios eventos, con fechas futuras para pruebas:
INSERT INTO eventos (titulo, descripcion, fecha_evento, ubicacion)
VALUES
('Curso de Fontanería Básica', 'Aprende los conceptos básicos de fontanería', '2025-03-15 09:00:00', 'Madrid'),
('Workshop de Electricidad', 'Taller intensivo de instalaciones eléctricas', '2025-03-20 10:00:00', 'Barcelona'),
('Jornada de Carpintería', 'Día dedicado a aprender técnicas de carpintería', '2025-04-05 08:30:00', 'Valencia'),
('Demostración de Pintura Decorativa', 'Evento práctico de pintura', '2025-04-10 14:00:00', 'Sevilla'),
('Revisión de Aires Acondicionados', 'Aprende a diagnosticar problemas comunes', '2025-04-25 16:00:00', 'Bilbao');
