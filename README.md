# remote-desktop-poc


Un programa simple para controlar una computadora desde otra en tu red local usando un navegador web.

---

## ## ¿Qué Hace?

* Visualiza y controla el escritorio en tiempo real.
* Soporte completo para mouse (clics, scroll) y teclado.
* Acceso protegido por contraseña.

---

## ## ¿Cómo se Usa?

### ### En la PC a controlar (Agente):

1.  **Instalar:** Abre una terminal en esta carpeta y ejecuta:
    ```bash
    npm install
    ```
2.  **Configurar:** Abre el archivo `agent.js` y pon tu IP local en la variable `IP_CORRECTA`.
3.  **Ejecutar:** En la terminal, corre el comando:
    ```bash
    npm run dev
    ```
    El agente ya estará funcionando.

### ### En la PC que controla (Cliente):

1.  **Abrir:** Haz doble clic en el archivo `client.html` para abrirlo en tu navegador.
2.  **Conectar:** Ingresa la IP del Agente y la contraseña (por defecto: `1234`).
3.  **¡Listo!** Ya tienes el control.