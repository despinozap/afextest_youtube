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

### 🎉 Producción
#### Pantalla inicial
![01](https://user-images.githubusercontent.com/69441741/188041847-ab5d0285-ab54-4623-b56d-320cbd379dcf.png)
#### Agregar nuevo video
- Ingreso de URL
![02](https://user-images.githubusercontent.com/69441741/188042713-65ab3505-7e68-4113-86f7-efb63c72b75b.png)
- Nuevo video agregado
![03](https://user-images.githubusercontent.com/69441741/188042735-0e9a60cd-7abc-4968-a73d-a4c85b28e528.png)
- Validación para evitar agregar videos duplicados
![04](https://user-images.githubusercontent.com/69441741/188042768-ae3e8bd1-26a3-4bc7-ac46-1973484a77e6.png)
- Último video se agrega siempre al comienzo de la cuadrilla (ordenados por fecha descendiente)
![05](https://user-images.githubusercontent.com/69441741/188042864-cbd66bdb-0c57-4636-96a2-75c69a50a325.png)
- La cuadrilla agrega hasta 3 videos por fila (según diseño en Figma)
![06](https://user-images.githubusercontent.com/69441741/188043012-63338920-30a8-4a9a-95d2-411d53ffdeb7.png)
#### Detalles de video
- Modal con imágen, título y descripción del video al hacer click sobre él en la cuadrilla (según diseño en Figma)
![07](https://user-images.githubusercontent.com/69441741/188043163-8c86cd54-9f36-4ec6-a69f-75dca8e671f7.png)
#### Eliminar video
- Confirmación para eliminar video al hacer click sobre la X en la cuadrilla (según diseño en Figma)
![08](https://user-images.githubusercontent.com/69441741/188043344-bf7edd7a-d9d9-44e6-9a50-749ffb346fa5.png)
- Video eliminado
![09](https://user-images.githubusercontent.com/69441741/188043381-1bf297e6-d917-42b6-a671-147abd0d1f5e.png)
