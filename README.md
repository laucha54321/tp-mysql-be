## Cosas Utiles
[TRELLO](https://trello.com/b/RQfTdn2D/tpdesarollodesoftware)

[FRONT END REPO](https://github.com/laucha54321/pagina-Universitaria-Front)

[BACK END REPO](https://github.com/laucha54321/tp-mysql-be)

[PROPUESTA](Propuesta.md)

Para ejecutar el Back End se puede abrir dos terminales y ejecutar estos comandos:
``` javascript
npm run dev
```
``` javascript
npm run dev-auth
```

# TP Desarollo BackEnd

Esta es una api que interactua con una base de datos SQL en laureanoliva.com:3306.
Quizas usar Drizzle o Prisma como ORM estaria bueno.

# Estructura
La idea es tener dos programas distintos en distintos puertos uno que se encargue de la validacion y otro que se encargue de los requests. Manejamos las validaciones con [JSON web tokens](https://jwt.io).

El archivo de [app.js](app.js) seria el encargado de las requests y el de [authentication.js](authentication.js) el encargado de hacer las validaciones de los usuarios. Si utilizamos JWT entonces no tenemos que manejar sesiones en el backend solo guardar los tokens en el front y usarlos para acceder.

Los usuarios se almacenan en la base de datos en localhost:3306. Se almacenan usando [bcrypt](https://github.com/kelektiv/node.bcrypt.js), se hashean en total 11 veces.

Usamos un archivo .env para las conexiones, este archivo no existe en el repo por seguridad.

```mermaid
flowchart LR;
    subgraph Back End
    subgraph Base de Datos
        id1[(localhost:3306)]
    end
    subgraph API
        app.js
        authentication.js;
    end
        id1[(localhost:3306)] --- app.js;
        id1[(localhost:3306)] --- authentication.js;
    end
    subgraph Front End
        app.js --- AngularApp
        authentication.js --- AngularApp;
    end
```

# Tablas en Base de datos
```mermaid
erDiagram
    curso ||--o{ curso_persona : Contiene
    persona ||--o{ curso_persona: Participa
    persona ||--o{ curso_persona_nota: Tiene
    curso ||--o{ curso_persona_nota: Tiene

    persona{
        Integer ID PK
        String nombre
        String apellido
        String contrasena
        String email
        Date fecha_nacimiento
        Date fecha_creacion
    }
    curso{
        Integer ID PK
        String nombre
        String descripcion
    }
    curso_persona{
        Integer ID_Persona FK,PK
        Integer ID_Curso FK,PK
        Integer categoria
    }
    curso_persona_nota{
        Integer ID PK
        Integer ID_Persona FK
        Integer ID_Curso Fk
        String descripcion
        Real nota    
    }
```


Los ID son AUTOINCREMNTALES.

Los nombres de las tablas son en minuscula.

Todos los nombres de las columnas empiezan con minuscula salvo los IDs.

NO USAMOS MAYUSCULAS EN NOMBRES DE COLUMNAS a menos que esta sea para escribir ID o para la primer letra en las claves foraneas cuando hacemos referencia a la otra tabla.

Por ejemplo ID_Persona

## CRUD

### persona

|Descripcion|Funcion|
|-|-|
|Create|`createPersona({})`|
|Read|`getPersona({})`|
|Read|`getPasswordHash(id)`|
|Update|-|
|Delete||

### curso

|Descripcion|Funcion|
|-|-|
|Create|`createCurso({})`|
|Read|`getCurso(id)`|
|Read|`getCursos()`|
|Update|-|
|Delete||

### curso_persona

|Descripcion|Funcion|
|-|-|
|Create|`createPersona({})`|
|Read|`getPersona(id)`|
|Update|-|
|Delete||


### curso_persona_nota

|Descripcion|Funcion|
|-|-|
|Create|`createCursoPersonaNota({})`|
|Read|`getCursoPersonaNota(id)`|
|Read|`getCursoPersonaNota_Profesor(idProfesor)`|
|Update|-|
|Delete||



### Links utiles
[Best Practices for JWT authentication in Angular Apps](https://www.syncfusion.com/blogs/post/best-practices-for-jwt-authentication-in-angular-apps.aspx)





