import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function TodoItem({ task, deleteTask }) {
    const handleClick = () => {
        deleteTask(task.id);
    };
    const addTask = (task) => {
        setTasks([...tasks, task]);
        updateTasks([...tasks, task]);
    };
    return (
        <TouchableOpacity onPress={handleClick} style={styles.taskItem}>
            <View>
                <Text style={styles.taskText}>{task.name}</Text>
                <Text style={styles.deleteText}>Delete</Text>
            </View>
        </TouchableOpacity>
    );
}

export default TodoItem;

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    taskText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteText: {
        color: '#ff0000',
    },
});