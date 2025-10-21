// agent.js
const http = require('http');
const { Server } = require("socket.io");
const robot = require('robotjs');
const sharp = require('sharp');

// --- CAMBIO IMPORTANTE: Usamos la IP correcta directamente ---
const IP_CORRECTA = '172.18.0.19'; // ¡Asegúrate de que esta sea tu IP de Wi-Fi!
const PUERTO = 3000;
const CONTRASEÑA_SECRETA = '1234';

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('✅ Un cliente se ha conectado!');

  socket.on('autenticacion', (data) => {
    if (data.contraseña === CONTRASEÑA_SECRETA) {
      console.log('🔑 Autenticación exitosa!');
      socket.emit('autenticacion_exitosa'); // Avisamos al cliente que todo está OK

  const interval = setInterval(() => {
    try {
      const screenSize = robot.getScreenSize();
      const img = robot.screen.capture(0, 0, screenSize.width, screenSize.height);

      sharp(img.image, { raw: { width: img.width, height: img.height, channels: 4 }})
        .jpeg({ quality: 80 }) // <--- CAMBIAMOS .png() por .jpeg() y le damos una calidad        .toBuffer()
        .toBuffer()
        .then(buffer => {
          // --- CAMBIO DE DEPURACIÓN: Añadimos un log aquí ---
          socket.emit('image', buffer.toString('base64'));
        });

        
    } catch (err) {clearInterval(interval);}
  }, 1000);
  socket.on('disconnect', () => {
    console.log('❌ Un cliente se ha desconectado');
    clearInterval(interval);
  });

  // Dejamos los listeners de mouse y teclado como estaban
  const screenSize = robot.getScreenSize();
  socket.on('mouse_move', (data) => {
      const targetX = data.x * screenSize.width;
      const targetY = data.y * screenSize.height;
      robot.moveMouse(targetX, targetY);
  });
  socket.on('mouse_click', (data) => {
      const targetX = data.x * screenSize.width;
      const targetY = data.y * screenSize.height;
      robot.moveMouse(targetX, targetY);
if (data.button === 'right') {
    // Si el botón es derecho, hacemos clic derecho
    robot.mouseClick('right');
  } else if (data.button === 'double') {
    // Si es doble, hacemos doble clic izquierdo
    robot.mouseClick('left', true); // El 'true' significa doble clic
  } else {
    // Si no, es el clic izquierdo normal
    robot.mouseClick('left');
  }  });
  socket.on('mouse_scroll', (data) => {
  // robot.scrollMouse(x, y) mueve la rueda. 
  // Usamos 0 para el eje X y el valor del cliente para el eje Y.
  robot.scrollMouse(0, data.deltaY);
});
  socket.on('key_press', (data) => {
      try {
          robot.keyTap(data.key.toLowerCase());
      } catch (e) {}
  });

  } else {
      console.log('⛔ Autenticación fallida!');
      socket.emit('autenticacion_fallida');
      socket.disconnect(); // Desconectamos al intruso
    }
});

socket.on('disconnect', () => {
    // Esto se ejecuta si el cliente se desconecta ANTES de autenticarse
    console.log('❌ Un cliente se ha desconectado sin autenticarse.');
  });
});

// --- CAMBIO IMPORTANTE: Forzamos la escucha en la IP correcta ---
server.listen(PUERTO, IP_CORRECTA, () => {
  console.log(`🚀 Agente escuchando en http://${IP_CORRECTA}:${PUERTO}`);
  console.log('Esperando conexiones de un cliente...');
});