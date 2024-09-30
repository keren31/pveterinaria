# Proyecto: PWA para Estética Canina Platón

Este proyecto tiene como objetivo transformar la página web de Estética Canina Platón en una Progressive Web App (PWA), mejorando la accesibilidad, la experiencia del usuario y permitiendo el acceso offline.

## Objetivos del Proyecto
- *Implementar PWA:* Añadir capacidades offline mediante Service Workers y mejorar el rendimiento.
- *Mejorar la experiencia del usuario:* Implementar un App Shell para una carga rápida y optimizada.
- *Sistema de Feedback:* Permitir que los usuarios califiquen la experiencia del sitio.

## Metodología de Trabajo
Se utiliza la metodología *Extreme Programming (XP)* para llevar a cabo un desarrollo ágil, con ciclos cortos de desarrollo, pruebas frecuentes y retroalimentación continua.

---

## Herramienta de Control de Versiones

Este proyecto utiliza *Git* como sistema de control de versiones. Todo el trabajo se realiza en una rama central main.

### Flujo de Trabajo
- *Modelo Centralizado:* Se utiliza una única rama main. Los cambios se revisan antes de ser integrados.
- *Colaboración:* Los colaboradores deben realizar commits directamente en la rama principal y asegurarse de que los cambios son revisados antes de ser fusionados.

---

## Estrategia de Versionamiento

Se implementa una estrategia centralizada de versionamiento:
- *Ramas:* Solo se utiliza la rama main para todo el desarrollo.
- *Revisión de Código:* Antes de fusionar, los cambios pasan por una revisión manual.
- *Integración Continua (CI):* Se implementan pruebas automáticas y revisiones periódicas para garantizar la estabilidad del código.

---

## Estrategia de Despliegue

El proyecto sigue una estrategia de *Rolling Deployment* para despliegues progresivos. Los entornos definidos son:
1. *Desarrollo*
2. *Staging*
3. *Producción*

### CI/CD
Se utiliza un pipeline de CI/CD que automatiza las pruebas y el despliegue a los diferentes entornos, asegurando calidad y estabilidad en cada fase.

---

## Instrucciones para Clonar y Ejecutar el Proyecto

1. *Clonar el repositorio:*
   ```bash
   git clone https://github.com/tu-usuario/estetica-canina.git
