<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dqavzr8iu/image/upload/v1711563565/kiura_sl6fst.jpg" width="200" alt="Nest Logo" /></a>
</p>

## Tecnologias utilizadas

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
    <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dqavzr8iu/image/upload/v1695796952/pngegg_1_b1hkpc.png" width="120" alt="Mongo" /></a>
    <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dqavzr8iu/image/upload/v1695797082/pngegg_2_wtfbkd.png" width="60" alt="Gcloud" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dqavzr8iu/image/upload/v1695796821/pngegg_jm0gwt.png" width="100" alt="Gcloud" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dqavzr8iu/image/upload/v1711633037/swagger_da13pi.svg" width="60" alt="Gcloud" /></a>
</p>

# Kuria Test
Intrucciones para levantar el proyecto localmente
1. Clonar proyecto
2. ```npm install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos (debemos tener docker desktop instalado).
```
docker-compose up -d
```

6. Levantar: ```nest start --watch```

7. Ejecutar SEED (Documentado en Swagger)
```
1
ejecutamos el endpoint para tener un usuario ADMIN 
http://localhost:3000/api/seed/admin

ejecutamos el endpoint para tener un usuario SUPPORT
http://localhost:3000/api/seed/support

con dichas credenciales debemos loguearnos (con admin o support segun el rol que queremos cumplir)
(http://localhost:3000/api/auth/login)

2 
utilizando el token obtenido al logearnos, nos autorizamos y ejecutamos el siguiente seed, que hace una precarga de categorias.
http://localhost:3000/api/categories/
```
8. Testear el resto de los endpoints que fueron solicitados en Swagger.

# Api deployada

```
URL de la api deployada con Swagger:

https://kuria-test-backend-vlijgvlhxa-rj.a.run.app/api

El deploy de la misma, se realizo en Google Cloud, con la herramienta Cloud Run para la cual se defino un Dockerfile. Finalmente la base de datos se encuentra en MongoAtlas.

## Instrucciones para el deploy (Manually deploying to Cloud Run)

1
Tener cuenta en Google Cloud.
2
Habilitar los permisos de usuarios en el IAM (en GCLOUD)
3
Generar un Dockerfile en la raiz del archivo (les dejo un template de ejemplo)
4
Se puede hacer un deploy de test local en docker (opcional).
-- Generar un docketignore:
  Dockerfile
  .dockerignore
  node_modules
  npm-debug.log
  dist
-- Test container local:
  docker build -t {nombre proyecto} .

  docker run -p80:3000 {nombre proyecto}
5
Comprobar que el proyecto CLI de gcloud esté configurado:
-- comandos:
  gcloud init
  ...
  seguir pasos de configuracion SIMPLES en consola
  ...
6
Utiliza Cloud Build para crear la imagen del contenedor (usando Dockerfile como instrucciones)
-- comando:
  gcloud run deplot
  ...
  seguir pasos de configuracion SIMPLES en consola.
  ...
  setear la region (sugiero southamerica-east1)
7
Si todo fue bien el proyecto es deployado con exito y recibimos por consola una URL.
En est caso la siguiente: https://kuria-test-backend-vlijgvlhxa-rj.a.run.app

```

# Funciones extra a las solicitadas

```

# Seed para la precarga de la base de datos.
# Paginado para el endpoint GET de los usuarios profesionales.
# Servicio para enviar Mails de bienvenida cuando se registra un nuevo usuario.
# Herramientas para que el profesional pueda aceptar la solicitud (cambio de estado)
```

# Funciones que faltan por cuestiones de tiempo y contexto (test)

```

# Indicadores como cuanto usuarios se registraron en un rango de tiempo pasado (meses, semanas, dias, etc)
# Tests unitarios

```

## Contacto

- Author - [enzo sanchez](https://enzos-portfolio-react.vercel.app/)
- LinkdIn - [@Enzo Sanchez](https://www.linkedin.com/in/enzo-sanchez-733b85165/)

## License

Nest is [MIT licensed](LICENSE).
