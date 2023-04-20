import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header(props) {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.clearaButton} onPress={() => props.onClear()}>
                <Text style={[styles.clearaButtonText, styles.headerText]}>CHATY</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#0e76a8',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    clearaButton: {
        backgroundColor: '#0e76a8',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    clearaButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
    },
});