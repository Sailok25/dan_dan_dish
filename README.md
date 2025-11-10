# DanDanDish

**Dandandish** es un juego estilo *“piedra, papel o tijera”*, pero con temática de combate.  
Los jugadores deben decidir entre **recargar**, **disparar** o **protegerse**, administrando sus balas y anticipando las acciones del oponente.

---

## 🧠 Concepto
Cada turno, el jugador elige una acción:
- **Recargar:** añade una bala al cargador (no hay limite de balas que puedes tener)
- **Disparar:** dispara una bala (si tiene). Si el oponente está recargando, lo elimina.
- **Escudo:** bloquea disparos, pero al hacerlo pierde una bala (si tiene).

El objetivo es sobrevivir más que el oponente usando estrategia y timing.

---

## ⚖️ Reglas del juego
| Jugador | Oponente | Resultado |
|----------|-----------|-----------|
| Recargar | Disparar | Muere el jugador |
| Disparar | Recargar | Gana el jugador |
| Disparar | Disparar | Ambos mueren (empate) |
| Escudo | Disparar | El jugador bloquea el disparo, y el oponente pierde 1 bala |
| Disparar | Escudo | El oponente bloquea el disparo y el jugador pierde 1 bala |
| Recargar | Recargar | Ambos recargan |
| Escudo | Escudo | No pasa nada|

---

## 🕹️ Cómo jugar
1. Al inicio, ambos jugadores tienen **0 balas**, por lo que lo logico es recargar.  
2. En cada turno eliges una acción:
   - Recargar para obtener una bala.
   - Disparar si ya tienes balas.
   - Usar el escudo para protegerte.
3. El juego compara ambas elecciones y aplica las reglas.  
4. Gana quien logre eliminar al otro.

---

## 💻 Tecnologías utilizadas
- **HTML5** — interfaz y estructura  
- **CSS3** — estilos visuales  
- **JavaScript** — lógica del juego  
- **Node.js + Socket.IO** — para modo multijugador online

