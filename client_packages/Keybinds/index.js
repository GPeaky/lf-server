const keys = [
    0x01,	//Botón izquierdo del mouse
    0x02,	//Botón derecho del mouse
    0x03,	//Procesamiento de interrupción de control
    0x04,	//Botón central del mouse (mouse de tres botones)
    0x05,	//Botón del mouse X1
    0x06,	//Botón del mouse X2
    0x08,	//Tecla BACKSPACE
    0x09,	//tecla TAB
    0x0C,	//Tecla CLEAR
    0x0D,	//Tecla ENTRAR
    0x10,	//Tecla MAYÚS
    0x11,	//Tecla CTRL
    0x12,	//tecla ALT
    0x13,	//Pausar clave
    0x14,	//Tecla CAPS LOCK
    0x15,	//Modo Kana de IME
    0x15,	//Modo hanguel de IME (se mantiene por compatibilidad; use VK_HANGUL )
    0x15,	//Modo Hangul de IME
    0x16,	//IME On
    0x17,	//Modo Junja de IME
    0x18,	//Modo final de IME
    0x19,	//Modo Hanja de IME
    0x19,	//Modo Kanji de IME
    0x1A,	//IME desactivado
    0x1B,	//Tecla ESC
    0x1C,	//Conversión de IME
    0x1D,	//No conversión IME
    0x1E,	//Aceptación de IME
    0x1F,	//Solicitud de cambio del modo IME
    0x20,	//BARRA ESPACIADORA
    0x21,	//Tecla PAGE UP
    0x22,	//Tecla PAGE DOWN
    0x23,	//Tecla END
    0x24,	//Tecla HOME
    0x25,	//TECLA DE FLECHA IZQUIERDA
    0x26,	//Tecla DE FLECHA ARRIBA
    0x27,	//TECLA DE FLECHA DERECHA
    0x28,	//TECLA DE FLECHA ABAJO
    0x29,	//Clave SELECT
    0x2A,	//Tecla PRINT
    0x2B,	//Clave EXECUTE
    0x2C,	//Tecla PRINT SCREEN
    0x2D,	//Clave INS
    0x2E,	//Tecla Supr
    0x2F,	//Tecla HELP
    0x30,	//0 clave
    0x31,	//1 clave
    0x32,	//2 clave
    0x33,	//3 clave
    0x34,	//4 clave
    0x35,	//5 clave
    0x36,	//6 clave
    0x37,	//7 clave
    0x38,	//8 claves
    0x39,	//9 clave
    0x41,	//Una clave
    0x42,	//Tecla B
    0x43,	//Clave C
    0x44,	//Clave D
    0x45,	//Tecla E
    0x46,	//Tecla F
    0x47,	//Tecla G
    0x48,	//Tecla H
    0x49,	//Clave I
    0x4A,	//Clave J
    0x4B,	//Clave K
    0x4C,	//Tecla L
    0x4D,	//Clave M
    0x4E,	//N clave
    0x4F,	//Tecla O
    0x50,	//Tecla P
    0x51,	//Q key
    0x52,	//Clave de R
    0x53,	//Tecla S
    0x54,	//Clave T
    0x55,	//Tecla U
    0x56,	//Clave V
    0x57,	//W key
    0x58,	//Tecla X
    0x59,	//Tecla Y
    0x5A,	//Clave Z
    0x5B,	//Tecla Windows izquierda (teclado natural)
    0x5C,	//Tecla Windows derecha (teclado natural)
    0x5D,	//Tecla Aplicaciones (teclado natural)
    0x5F,	//Tecla Equipo suspendido
    0x60,	//Tecla 0 del teclado numérico
    0x61,	//Tecla 1 del teclado numérico
    0x62,	//Tecla 2 del teclado numérico
    0x63,	//Tecla 3 del teclado numérico
    0x64,	//Tecla 4 del teclado numérico
    0x65,	//Tecla 5 del teclado numérico
    0x66,	//Tecla 6 del teclado numérico
    0x67,	//Tecla 7 del teclado numérico
    0x68,	//Tecla 8 del teclado numérico
    0x69,	//Tecla 9 del teclado numérico
    0x6A,	//Multiplicar clave
    0x6B,	//Agregar clave
    0x6c,	//Tecla separadora
    0x6D,	//Clave de resta
    0x6E,	//Clave decimal
    0x6F,	//Clave de división
    0x70,	//Tecla F1
    0x71,	//Tecla F2
    0x72,	//Tecla F3
    0x73,	//Tecla F4
    0x74,	//Tecla F5
    0x75,	//Tecla F6
    0x76,	//Tecla F7
    0x77,	//Tecla F8
    0x78,	//Tecla F9
    0x79,	//Tecla F10
    0x7A,	//Tecla F11
    0x7B,	//Tecla F12
    0x7C,	//Tecla F13
    0x7D,	//Tecla F14
    0x7E,	//Tecla F15
    0x7F,	//Tecla F16
    0x80,	//Tecla F17
    0x81,	//Tecla F18
    0x82,	//Tecla F19
    0x83,	//Tecla F20
    0x84,	//Tecla F21
    0x85,	//Tecla F22
    0x86,	//Tecla F23
    0x87,	//Tecla F24
    0x90,	//Tecla NUM LOCK
    0x91,	//Tecla SCROLL LOCK
    0xA0,	//Tecla MAYÚS izquierda
    0xA1,	//Tecla MAYÚS derecha
    0xA2,	//Tecla CONTROL izquierda
    0xA3,	//Tecla CONTROL derecha
    0xA4,	//Tecla MENÚ izquierda
    0xA5,	//Tecla MENÚ derecha
    0xA6,	//Tecla Atrás del explorador
    0xA7,	//Tecla Reenvío del explorador
    0xA8,	//Clave de actualización del explorador
    0xA9,	//Tecla Detener del explorador
    0xAA,	//Clave de búsqueda del explorador
    0xAB,	//Tecla Favoritos del explorador
    0xAC,	//Tecla Inicio y Inicio del explorador
    0xAD,	//Tecla de exclusión mutua de volumen
    0xAE,	//Tecla Bajar volumen
    0xAF,	//Tecla Subir volumen
    0xB0,	//Clave de seguimiento siguiente
    0xB1,	//Tecla Pista anterior
    0xB2,	//Stop Media key (Detener clave multimedia)
    0xB3,	//Tecla Reproducir/pausar medio
    0xB4,	//Iniciar clave de correo
    0xB5,	//Seleccione Media key (Tecla multimedia).
    0xB6,	//Clave iniciar aplicación 1
    0xB7,	//Clave Iniciar aplicación 2
    0xBA,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., la tecla ";:"
    0xBB,	//Para cualquier país o región, la clave "+"
    0xBC,	//Para cualquier país o región, la clave ","
    0xBD,	//Para cualquier país o región, la clave "-"
    0xBE,	//Para cualquier país o región, la clave "."
    0xBF,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., el '/?' key
    0xC0,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., la ` tecla "~"
    0xDB,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., la tecla [ '{'
    0xDC,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., la tecla \ | '
    0xDD,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., la tecla ] '}'
    0xDE,	//Se usa para caracteres varios; puede variar según el teclado. Para el teclado estándar de EE. UU., la tecla "comilla simple/comilla doble"
    0xDF,	//Se usa para caracteres varios; puede variar según el teclado.
    0xE1,	//Específico de OEM
    0xE2,	//Tecla de corchete angular o tecla de barra diagonal inversa en el teclado RT de 102 teclas
    0xE3,	//Específico de OEM
    0xE4,	//Específico de OEM
    0xE5,	//Clave PROCESS de IME
    0xE6,	//Específico de OEM
    0xE7,	//Se utiliza para pasar caracteres Unicode como si fueran pulsaciones de tecla. La clave es la palabra baja de un valor de clave virtual de 32 bits que se usa para los métodos de entrada que no son VK_PACKET de teclado. Para obtener más información, vea Comentarios KEYBDINPUT en SendInput , , WM_KEYDOWN y . WM_KEYUP
    0xE8,	//Sin asignar
    0xE9,	//Específico de OEM
    0xEA,	//Específico de OEM
    0xEB,	//Específico de OEM
    0xED,	//Específico de OEM
    0xEE,	//Específico de OEM
    0xF1,	//Específico de OEM
    0xF2,	//Específico de OEM
    0xF3,	//Específico de OEM
    0xF4,	//Específico de OEM
    0xF5,	//Específico de OEM
    0xF6,	//Tecla Attn
    0xF7,	//Clave CrSel
    0xF8,	//Tecla ExSel
    0xF9,	//Borrar clave EOF
    0xFA,	//Clave de reproducción
    0xFB,	//Clave de zoom
    0xFD,	//Clave PA1
    0xFE,	//Clave sin cifrado
]

keys.forEach(key => {
    //Set key to hex
    mp.keys.bind(key, true, () => {
        mp.events.callRemote(`Keydown::${key.toString(16)}`)
    });
    mp.keys.bind(key, false, () => {
        mp.events.callRemote(`Keyup::${key.toString(16)}`)
    });
});