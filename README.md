# Tendencys-API

> Node.js, Express API

## Requirements
- node >= 16.17.0
- npm >= 8.15.0

## Running the API Development

Para iniciar la api:
```bash 
    npm install -g nodemon ## No es necesario si no lo requieren
    npm install
```

Para iniciar la aplicación en el LOCAL:
```
    nodemon Or node server.js
```

Servidor en  http://localhost:3000/

## Estructura
config
    constants
    database
controllers
    main.controller
    seeder.controller
middleware
    token
models
    Aplication
    Authorization
    Log
routes
    main.routes
validators
    log.validator

## Colección de postman
https://documenter.getpostman.com/view/12536131/VUr1FCYG

## Comentarios de la prueba
Puntos
    1. Se realizo un fork del repositorio original
    2. La rama se llama moises-escobar-martinez
    3. Se uso un ambiente en local. La conexión se especifico en config/database.js
    4. Se crearon los 3 Schemas
    5. Se crearon las rutas para el CRUD de logs tomando en cuenta que se iban a enviar la petición, ya que no se especifico que se debería guardar cada registro o acción de las rutas de la aplicación.
        * En esta parte se uso e instalo body-parser
            * npm install body-parser
    6. Se agrego un middleware para controlar el acceso y se siguió el siguiente proceso.
        1. Al inicio de la aplicación se crea un registro de la colección "aplications" que   contiene mi nombre e inmediatamente después se crea el token en la colección de "Authorization". Lo anterior funciona como un seeder. 
        2. El token creado sera aleatorio, para esto se uso random-token (npm install random-token).
        3. El token debe ser enviado en los headers con el identificador "token" y debe extraerse de la BD ya que sera diferente. Solo se podrá crear uno, ya que se crea uno por cada registro diferente en la colección de "aplications". 
        4. El token enviado se compara con el guardado en la BD.
    7. Se realizo la validación en los campos opcionales de la colección de "logs".
        * Se uso e instalo joi (npm install joi);
    8. Finalizado


## Authors and acknowledgment
moises escobar martinez

