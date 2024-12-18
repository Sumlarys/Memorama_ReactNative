import * as React from 'react';
import { Pressable,Text, StyleSheet } from 'react-native';

export default function Card({onPress, isTurnedOver, text}){
    return (
        <Pressable //Imagen pulsable
        onPress={onPress} //Condicional de operador ternario para mostrar un tipo de estilo y el texto(emoji).
        style={isTurnedOver ? styles.cardUp : styles.cardDown}> 
            {isTurnedOver ? (
                <Text style={styles.text}>{text}</Text>
            ):(
                <Text style={styles.text}></Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "25%",
        backgroundColor: "#0D98BA",
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,
        borderColor: "#334155",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "25%",
        backgroundColor: "#1e293b",
    },
    text: {
        fontSize: 46,
        color: "#334155"
    }
})