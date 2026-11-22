// ------------------------------------------------------------
// MainScreen.js
// Reads 3 inputs, validates them, calculates, and shows results.
// ------------------------------------------------------------
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { calculatePay, toNumber } from '../utils/PayCalculator'

export default function MainScreen() {
  // 1) STATE: what the user typed (always strings, TextInput gives text)
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [taxRate, setTaxRate] = useState('');

  // 2) STATE: outputs. null = "nothing calculated yet"
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 3) EVENT HANDLER: runs when "Calculate" is pressed
  const handleCalculate = () => {
    const h = toNumber(hours);
    const r = toNumber(rate);
    const t = toNumber(taxRate);

    // Validation: stop here (no crash) if anything is missing or invalid
    if (h === null || r === null || t === null) {
      setError('Please enter valid numbers in all three fields.');
      setResult(null);
      return;
    }
    if (h < 0 || r < 0 || t < 0) {
      setError('Values cannot be negative.');
      setResult(null);
      return;
    }
    if (t > 100) {
      setError('Tax rate must be between 0 and 100.');
      setResult(null);
      return;
    }

    setError('');
    setResult(calculatePay(h, r, t)); // setting state -> screen re-renders
  };

  const handleClear = () => {
    setHours('');
    setRate('');
    setTaxRate('');
    setResult(null);
    setError('');
  };

  // Formats a number as money with 2 decimals
  const money = (n) => `$${n.toFixed(2)}`;

  // 4) UI: what is drawn on screen
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Pay Calculator</Text>

      <Text style={styles.label}>Number of hours worked</Text>
      <TextInput
        style={styles.input}
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        placeholder="e.g. 45"
      />

      <Text style={styles.label}>Hourly rate ($)</Text>
      <TextInput
        style={styles.input}
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
        placeholder="e.g. 20"
      />

      <Text style={styles.label}>Tax rate (%)</Text>
      <TextInput
        style={styles.input}
        value={taxRate}
        onChangeText={setTaxRate}
        keyboardType="numeric"
        placeholder="e.g. 13"
      />

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.clearButton]}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>

      {/* Conditional rendering: only show when the value exists */}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {result && (
        <View style={styles.resultCard}>
          <ResultRow label="Pay" value={money(result.pay)} />
          <ResultRow label="Overtime pay" value={money(result.overtimePay)} />
          <ResultRow label="Total pay" value={money(result.totalPay)} />
          <ResultRow label="Tax" value={money(result.tax)} />
        </View>
      )}
    </ScrollView>
  );
}

// Small reusable component: receives data through PROPS
function ResultRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

// 5) STYLES: like CSS, written as JS objects (flexbox layout)
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6fb',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2a44',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#c5cbd8',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#2f6fed',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#8a93a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#c62828',
    marginTop: 16,
    fontSize: 15,
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3, // Android shadow
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 17,
    color: '#444',
  },
  rowValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2a44',
  },
});
