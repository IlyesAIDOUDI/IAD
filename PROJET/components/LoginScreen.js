import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen(props) {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        if (username.trim()) {
            props.onLogin(username.trim());
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur Chaty !</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre pseudonyme"
                value={username}
                onChangeText={(text) => setUsername(text)}
                returnKeyType="done"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        width: '100%',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#0e76a8',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});