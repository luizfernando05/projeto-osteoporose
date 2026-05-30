// screens/PredictionScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { predict } from '../services/api';

export default function PredictionScreen({ navigation }: any) {
  const [tScore, setTScore] = useState('');

  async function handlePredict() {
    try {
      const result = await predict(Number(tScore.replace(',', '.')));

      navigation.navigate('Result', {
        result,
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível realizar a predição.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predição da osteoporose</Text>

      <Text style={styles.subtitle}>
        Insira os dados do seu exame para realizar a predição
      </Text>

      <Text style={styles.label}>Qual o valor do seu T-Score?</Text>

      <TextInput
        placeholder="-2,5"
        value={tScore}
        onChangeText={setTScore}
        keyboardType="numeric"
        style={styles.input}
      />

      <PrimaryButton title="Ver resultado" onPress={handlePredict} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#525252',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 24,
  },
});
