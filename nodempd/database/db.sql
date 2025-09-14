DROP TABLE IF EXISTS mpd.users;

CREATE TABLE mpd.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO mpd.users (name, email)
    VALUES ('joe', 'joe@ibm.com'),
    ('ryan', 'ryan@faztweb.com');

select * from mpd.users;

CREATE TABLE mpd.ttdu (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    descripcion TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL
);

DROP TABLE MPD.Delito;
-- Tabla Delito
CREATE TABLE MPD.Delito (
    id SERIAL PRIMARY KEY,                     -- Llave primaria de Delito
    idley INT NOT NULL,                        -- Llave foránea a Ley.id
    nombre VARCHAR(255) NOT NULL,             -- Campo de texto para nombre
    descripcion TEXT,                         -- Campo de texto para descripción
    sancion INT NOT NULL,                              -- Llave foránea a CDU.id (sanción)
    nivelgravedad INT NOT NULL,                        -- Llave foránea a CDU.id (nivelGravedad)
    
    -- Llave foránea que referencia a Ley
    CONSTRAINT fk_idLey FOREIGN KEY (idley)
    REFERENCES MPD.Ley (id)
    ON DELETE CASCADE ON UPDATE CASCADE,

    -- Llave foránea que referencia a CDU (sanción)
    CONSTRAINT fk_sancion FOREIGN KEY (sancion)
    REFERENCES MPD.CDU (id)
    ON DELETE SET NULL ON UPDATE CASCADE,

    -- Llave foránea que referencia a CDU (nivelGravedad)
    CONSTRAINT fk_nivelGravedad FOREIGN KEY (nivelgravedad)
    REFERENCES MPD.CDU (id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

