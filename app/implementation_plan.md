# Rediseño de la Sección Hero (Estilo Orbital)

El usuario ha solicitado que la sección principal (Hero) se modifique para coincidir con la referencia visual proporcionada. Esto implica un rediseño completo de la estructura y estética del componente `Hero`, añadiendo efectos avanzados.

## User Review Required

> [!IMPORTANT]
> **Modificaciones Radicales de Diseño**: Cambiaré la estructura actual del `Hero` para adaptarla al estilo de la imagen. Esto afectará el cómo te presentas (el texto principal) y agregará animaciones. Por favor revisa y aprueba este plan antes de que empiece a programar.

## Proposed Changes

### Componente Hero (`page.tsx`)

#### [MODIFY] `app/app/page.tsx`
1.  **Lado Izquierdo (Textos y Botones)**:
    *   **Saludo menor**: Cambiaré "Hola, soy..." por una franja estilizada pequeña (ej. "Hola Mundo, Soy Julián").
    *   **Titular Principal**: Modificaré el `<h1>` para que el primer rol ("Ingeniero de Sistemas y") esté en blanco, y el segundo rol ("Analista de Datos") esté resaltado en un color azul brillante (`text-accent`) con un cursor parpadeante (`|`) simulando una máquina de escribir.
    *   **Subtítulo**: Ajustaremos el bloque de texto con el resumen corto.
    *   **Botones**: Añadiré un botón de "Descargar CV" (con relleno y bordes redondeados) junto al botón de "Contáctame" (estilo contorno/outline).
    *   **Redes Sociales**: Colocaré los iconos de GitHub, LinkedIn y el email debajo de los botones, tal como en el diseño de referencia.

2.  **Lado Derecho (Foto Orbital)**:
    *   **Imagen Central**: La imagen seleccionada (`Retrato_corporativo_pulido...`) mantendrá su forma circular, pero se le añadirá un resplandor en el borde.
    *   **Órbitas**: Construiré círculos concéntricos con bordes finos alrededor de la foto principal.
    *   **Iconos Flotantes**: Colocaré pequeños "nodos" (íconos de bases de datos, código, estrella, etc.) posicionados a lo largo de los anillos orbitales. Utilizaremos CSS para darles ese efecto tecnológico.

### Estilos Globales y Animaciones (`globals.css`)

#### [MODIFY] `app/app/globals.css`
*   Añadiré una animación específica de **`orbit`** (rotación infinita 360 grados) para girar los nodos o anillos alrededor de la foto principal lenta y suavemente.
*   Añadiré una animación de **`blink`** para el cursor parpadeante en el título de la presentación.
*   Ajustaré sutilmente el color de `var(--background)` en el `.dark` a un tono de azul muy profundo (navy) similar a la referencia en lugar de un negro plano puro, para darle ese tono tecnológico.

## Open Questions

> [!WARNING]
> ¿Tienes un enlace o archivo de CV en formato PDF listo para que el botón "Descargar CV" funcione, o prefieres que lo deje con un enlace "#" por el momento para que tú lo añadas luego?

## Verification Plan

### Test visual manual
*   El usuario probará en su entorno local con Dark y Light mode para verificar el contraste.
*   Comprobaré cómo se adaptan las órbitas y el anillo cuando la pantalla se hace pequeña (móvil) ya que estos diseños circulares ocupan bastante espacio. En móviles, las órbitas deberán escalar o simplificarse.
