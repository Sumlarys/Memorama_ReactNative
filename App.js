import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Card from './Card';

const emojis = [
  '🍓', '🍎', '🍐', '🍇', '🍑', '🍉', '🍈', '🥝', // Usa emojis para las frutas
];

export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...emojis, ...emojis]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [tries, setTry] = React.useState(0);

  React.useEffect(() => {
    // Si hay menos de dos cartas seleccionadas, no hacer nada
    if (selectedCards.length < 2) return;

    // Comprobar si las dos cartas seleccionadas son iguales
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]); // Agregar los índices de las cartas emparejadas a matchedCards
      setSelectedCards([]); // Limpiar las cartas seleccionadas
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000); // Voltear las cartas después de 1 segundo si no coinciden
      return () => clearTimeout(timeoutId); // Limpiar el temporizador
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    // No hacer nada si hay más de dos cartas seleccionadas o si la carta ya está en matchedCards
    if (selectedCards.length >= 2 || selectedCards.includes(index) || matchedCards.includes(index)) return;

    setSelectedCards([...selectedCards, index]); // Añadir la carta a las seleccionadas
    setTry(tries + 1); // Incrementar el número de intentos
  };

  // Verificar si el jugador ha ganado
  const didPlayerWin = () => matchedCards.length === board.length;

  // Reiniciar el juego
  const resetGame = () => {
    setBoard(shuffle([...emojis, ...emojis])); // Crear un nuevo tablero mezclado
    setMatchedCards([]);
    setTry(0);
    setSelectedCards([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin() ? "¡Felicidades!" : "Memorama"}</Text>
      <Text style={styles.title}>Número de intentos: {tries}</Text>
      <View style={styles.board}>
        {board.map((emoji, index) => {
          const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index); // Revisar si la carta debe mostrarse
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              text={emoji}  // Pasamos el texto `emoji` aquí
              onPress={() => handleTapCard(index)}
            />
          );
        })}
      </View>
      {didPlayerWin() && <Button onPress={resetGame} title="Reiniciar" />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'blue',
    fontWeight: '900',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

/**
 * Devuelve un array en un orden aleatorio.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
