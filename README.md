# TP Desarollo BackEnd
Esta es una api que interactua con una base de datos SQL en laureanoliva.com:3306.

# Estructura
La idea es tener dos programas distintos en distintos puertos uno que se encargue de la validacion y otro que se encargue de los requests. Manejar las validaciones con JSON web tokens puede ser una buena idea.

El archivo de app.js seria el encargado de las requests y el de authentication.js el encargado de hacer las validaciones de los usuarios.

Los usuarios se almacenan en la base de datos en laureanoliva.com:3306. Se almacenan usando bcrypt, con un nivel




