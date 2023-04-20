import React, { useState, useRef } from 'react';
import { Linking, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';
import { composeAsync } from 'expo-mail-composer';

const Stack = createStackNavigator();




export default function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const handleMail = () => {
    props.navigation.navigate('Chat', { username });
    setUsername('');
  };



  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Bienvenue sur Chaty !</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Entrez votre pseudonyme"
        value={username}
        onChangeText={(text) => setUsername(text)}
        returnKeyType="done"
      />
      <TouchableOpacity style={loginStyles.button} onPress={() => props.navigation.navigate('Chat', { username })}>
        <Text style={loginStyles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <Button
        title="Go to Details... again"
        onPress={() => props.navigation.push('Details')}
      />
      <TouchableOpacity style={loginStyles.button} onPress={() => {
        const email = 'example@example.com';
        const subject = 'Subject';
        const body = '';

        Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
      }}>
        <Text style={loginStyles.buttonText}>Envoi de mail</Text>
      </TouchableOpacity>
    </View>
  );
}

function ChatScreen({ username }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const saveMessagesToFile = async (messages) => {
    const fileUri = './messages.txt';
    try {
      // Convertir les messages en format JSON et les écrire dans le fichier
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(messages), {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log('Messages enregistrés dans le fichier', fileUri);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des messages dans le fichier', error);
    }
  };

  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (inputValue) {
      setMessages([...messages, { id: messages.length + 1, message: inputValue, username }]);
      setInputValue('');
      saveMessagesToFile(messages); // Enregistrer les messages dans le fichier
    }
  };

  const renderMessage = (item) => (
    <View key={item.id} style={styles.message}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  const renderMessages = () => messages.map(renderMessage);

  const renderInput = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre message..."
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        onSubmitEditing={() => sendMessage()}
        returnKeyType="send"
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>

  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.clearaButton} onPress={() => {
        setMessages([]);
      }}>
        <Text style={[styles.clearaButtonText, styles.headerText]}>CHATY</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader2 = () => (
    <View>
      <Text style={styles.clearButtonText}>clear</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Connecté en tant que : {username} </Text>
      </View>
      <Button title="Se déconnecter" onPress={handleDisconnect} />
    </View>
  );

  const clearall = () => (
    <View style={styles.buttonclear}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={() => {
          setMessages([]);
        }}>
          <Text style={styles.clearButtonText}>Vider le chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDisconnect = () => {
    setUsername('');
    setConnected(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {connected ? (
          <Stack.Screen
            name="Chat"
            options={{ header: () => renderHeader2() }}
          >
            {(props) => (
              <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView style={styles.messagesContainer} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}>
                  {renderMessages()}
                </ScrollView>
                {renderInput()}
                {clearall()}
              </KeyboardAvoidingView>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            options={{ header: () => renderHeader() }}
          >
            {(props) => (
              <LoginScreen
                onLogin={(username) => {
                  setUsername(username);
                  setConnected(true);
                  props.navigation.replace('Chat', { username });
                }}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#3498db', // Couleur bleue
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  clearaButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  clearaButtonText: {
    margin: 'auto',
    color: '#fff',
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  clearButtonText: {
    margin: 'auto',
    color: '#fff',
    fontSize: 16,
  },
  message: {
    backgroundColor: '#dfe6e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3498db', // Couleur bleue
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  usernameInput: {
    flex: 1,
    height: 40,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonclear: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});