// ------------------------------------------------------------
// AboutScreen.js
// Shows full name (as per college records) and student ID.
// `navigation` is a prop React Navigation gives every screen.
// ------------------------------------------------------------
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// TODO: replace with your real details
const FULL_NAME = 'Karthik Madarapu';
const STUDENT_ID = '101564894';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>

      <Text style={styles.label}>Full name</Text>
      <Text style={styles.value}>{FULL_NAME}</Text>

      <Text style={styles.label}>Student ID</Text>
      <Text style={styles.value}>{STUDENT_ID}</Text>

      {/* Second way back (the drawer is the first) */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Back to Main</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6fb',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2a44',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2a44',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#2f6fed',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
