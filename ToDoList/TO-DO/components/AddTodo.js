import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

function AddTodo({ addTask }) {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName) return;
        const newTask = { id: Date.now(), name: taskName };
        addTask(newTask);
        setTaskName('');
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter task name"
                value={taskName}
                onChangeText={(text) => setTaskName(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTodo;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});