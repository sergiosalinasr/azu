# Aplicacion: permite ser el frontend para aplicaciones backend, de tal manera de ofrecer demostraciones en un ambiente seguro:
- Características:
  - Servidor docker Keycloak para resguardo de credenciales
  - Backend en node con servidor en docker con las APIs necesarias para crendenciales de un nuevo usuario
  - Frontend en Angular con bienvenida de solicitud de credenciales y un menú inicial (Menu lateral)
- Contar con los docker compose para levantar distintos ambientes de desarrollo:
  - Docker base que levanta: Postgresql, Pgadmin y Keycloak:
    - docker compose --env-file .env -f docker/dc_basempdazu.yaml -p dc_basempdazu up -d
  - Levantar backend en desarrollo:
    - carpeta nodempd
    - nodemon src/index.js
  - Levantar frontend en desarrollo:
    - carpeta angularmpd
    - ng serve
    - localhost:4200



