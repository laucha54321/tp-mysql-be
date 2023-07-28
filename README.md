# TP Desarollo BackEnd
Esta es una api que interactua con una base de datos SQL en laureanoliva.com:3306.

# Estructura
La idea es tener dos programas distintos en distintos puertos uno que se encargue de la validacion y otro que se encargue de los requests. Manejar las validaciones con JSON web tokens puede ser una buena idea.

El archivo de app.js seria el encargado de las requests y el de authentication.js el encargado de hacer las validaciones de los usuarios.

Los usuarios se almacenan en la base de datos en laureanoliva.com:3306. Se almacenan usando bcrypt, se hashean en total 11 veces.


````mermaid
flowchart LR;
    subgraph Back End
    subgraph Base de Datos
        id1[(laureanoliva:3306)]
    end
    subgraph API
        app.js
        authentication.js;
    end
        id1[(laureanoliva:3306)] --- app.js;
        id1[(laureanoliva:3306)] --- authentication.js;
    end
    subgraph Front End
        app.js --- AngularApp
        authentication.js --- AngularApp;
    end

     


