# AFEX test - Youtube videos (prueba técnica)
Proyecto full-stack que permite almacenar videos en una base de datos para luego desplegarlos en una cuadrícula que permite eliminarlos como también ver la información de cada video mediante el uso de la API de Youtube v3 y reproducirlos.
El backend es desplegado en servicios AWS y desarrollado en Node.js mediante el uso de funciones Lambdas con una base de datos DynamoDB.
Para el frontend el proyecto es desarrolado en Vue.js.

## Estructura del proyecto

### 💾 Backend
La carpeta **backend** contiene todos los archivos relacionados al proyecto de backend (AWS). Dentro de la carpeta **lambdas** se describen las 3 principales funciones desplegadas en los servicios AWS requeridas para el proyecto:

  - **storeYoutubeVideo.js**: Crear y guardar un nuevo proyecto en la base de datos.
  - **listYoutubeVideos.js**: Listar todos los videos guardados en la base de datos.
  - **deleteYoutubeVideo.js**: Eliminar un video existente en la base de datos.

#### Base de datos
La tabla utilizada para almacenar los datos en DynamoDB es **videos**.

#### Consumo de API
La API es desplegada mediante el uso del servicio API Gateway en el endpoint [https://7lavw682q2.execute-api.us-east-1.amazonaws.com/Test/videos](https://7lavw682q2.execute-api.us-east-1.amazonaws.com/Test/videos) .


### 💻 Frontend
La carpeta **frontend** contiene el proyecto de frontend desarrollado en Vue.js v3.

#### Instalación
```
yarn install
```

#### Compilar para desarrollo
```
yarn serve
```

#### Compilar y optimizar para producción
```
yarn build
```

#### Lints y corregir archivos
```
yarn lint
```