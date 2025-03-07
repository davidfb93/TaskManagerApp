# Prueba Técnica - React Native

## Autor
**David Fernando Bañol Posada**

## Empresa
**Imaginamos**

## Año
**2025**

## Selección de colores y relación con las prioridades
Para mejorar la experiencia del usuario y facilitar la visualización de las tareas según su importancia, se definieron colores específicos para cada nivel de prioridad:

- **Alta prioridad**: Rojo (#c1121f)
- **Media prioridad**: Naranja (#ffc300)
- **Baja prioridad**: Verde (#31572c)

La prioridad se asigna de dos maneras:


1. De manera aleatoria al traer tareas desde la API pública **JSONPlaceholder**.

![image-1](https://github.com/user-attachments/assets/713e52f1-ac45-474a-a1b2-f5d4a17e79fa)
![image-10](https://github.com/user-attachments/assets/b05d0a0f-0df7-457b-88ab-a3b4079a93b6)



2. Mediante la creación o edición de tareas desde la interfaz de usuario.
3. 
![image](https://github.com/user-attachments/assets/9956012c-6457-4d37-8da8-dd9c024a0a82)
![image-2](https://github.com/user-attachments/assets/5478e771-2a39-4175-a22c-795a5d0b7ead)


## Aplicación de principios SOLID
### Principio de Segregación de Interfaces
Se definió una interfaz para las tareas a ejecutar. Si el proyecto requiere una tarea con características diferentes a título y prioridad, podrá desprenderse fácilmente de la interfaz de `Task` y sus clases derivadas.

![image-3](https://github.com/user-attachments/assets/7a0f5a32-5d7f-4aa9-8615-05e7eaa9a8a1)


### Principio de Responsabilidad Única
Se separó la lógica del negocio de la UI, organizando la aplicación en:
- **Screens**
- **Servicios**
- **Hooks**

Por ejemplo, `HomeScreen` solo se encarga del proceso de UI, sin manejar la lógica de negocio.

![image-4](https://github.com/user-attachments/assets/c92bb402-5478-4cb1-b3af-61a29635c520)


## Implementación de Patrones de Diseño
### Strategy
Se implementó el patrón **Strategy** para permitir diferentes estrategias de filtrado sin modificar la lógica central. Esto permite filtrar tareas por prioridad de manera flexible.

![image-5](https://github.com/user-attachments/assets/48fff520-497c-4655-825f-a85b9bcb36d3)


Permitiendo crear filtros por prioridad

![image-6](https://github.com/user-attachments/assets/724c861b-4f8e-49bd-afd3-07503afffca3)

### Composite
Se implementó el patrón **Composite** para manejar la jerarquía de tareas y subtareas. Esto permite:
- Editar tareas y subtareas.
- Eliminar tareas y subtareas.
- Agregar tareas y subtareas dentro de tareas principales ya existentes o nuevas.
- 
![image-7](https://github.com/user-attachments/assets/448ce47c-7351-4f85-941f-62f3b309ad4b)
![image-8](https://github.com/user-attachments/assets/c5965354-26d6-46c3-85e6-3bb551b75657)
![image-9](https://github.com/user-attachments/assets/1841c1df-22a0-4aff-88c7-fb53a9b9dfae)
