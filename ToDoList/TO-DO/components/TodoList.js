import React, { useState } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Linking, SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native';

function TodoList({ tasks, deleteTask }) {

    const addTask = (task) => {
        setTasks([...tasks, task]);
        updateTasks([...tasks, task]);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            </View>
            <AddTodo addTask={addTask} />
            <View style={styles.taskList}>
                {tasks.map((task) => (
                    <TouchableOpacity key={task.id} onPress={() => deleteTask(task.id)}>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{task.text}</Text>
                        </View>
                        <Button
                            title="Dit à tes potes que tu fumes plus !"
                            onPress={() => {
                                const email = 'example@example.com';
                                const subject = 'Subject';
                                const body = 'Body';

                                Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </View>

        </SafeAreaView>
    );
}

export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    taskList: {
        padding: 10,
    },
    taskItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    taskText: {
        fontSize: 16,
    },
});