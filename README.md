<img width="1243" height="336" alt="LocaliCity Logo" src="https://github.com/user-attachments/assets/81cd0e36-c6fc-466e-8f5d-62cfddcd9d50" />

---

La idea de mi proyecto surgió mientras trabajaba en otro desarrollo personal por hobbie. En uno de sus formularios era necesario ingresar país, provincia y ciudad. El desafío aparecía al intentar resolver la lógica de dependencias: elegir un país, luego mostrar sus provincias y, finalmente, seleccionar una ciudad de la provincia elegida.
Para resolverlo pensé en dos opciones. La primera era guardar toda esa información en mi propia base de datos, lo cual resultaba demasiado costoso en tiempo y recursos. La segunda fue buscar APIs externas que ofrecieran estos datos. Sin embargo, aunque encontré algunas alternativas, la mayoría no disponía de planes gratuitos o, en su versión gratuita, no eran realmente útiles para mi caso.

A partir de esta problemática nació la idea de desarrollar un sistema propio que proporcione información de países, provincias y ciudades. Además, quise sumar una funcionalidad clave: permitir que los usuarios puedan solicitar la incorporación de nuevas locaciones. Dichas solicitudes quedarían pendientes de revisión por un administrador, quien decidiría si aprobarlas (creando la entidad en el sistema) o rechazarlas. De esta forma, la base de datos se enriquecería de –manera colaborativa y escalable, evitando la necesidad de investigar continuamente nuevas ubicaciones.

Así fue como nació **LocaliCity**: un proyecto pensado para simplificar y democratizar el acceso a datos geográficos estructurados.
