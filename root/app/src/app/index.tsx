import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [tScore, setTScore] = useState('');
  const [zScore, setZScore] = useState('');
  const [age, setAge] = useState('');

  const [occupationStudent, setOccupationStudent] = useState('');

  const [medicalHistory, setMedicalHistory] = useState('');

  async function handlePredict() {
    if (!tScore.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o valor do T-Score.');
      return;
    }

    try {
      setLoading(true);

      const payload: any = {
        t_score_value: Number(tScore.replace(',', '.')),
      };

      const allAdvancedFieldsFilled =
        age && zScore && occupationStudent && medicalHistory;

      if (allAdvancedFieldsFilled) {
        payload.age = Number(age);

        payload.z_score_value = Number(zScore.replace(',', '.'));

        payload.occupation_student = Number(occupationStudent);

        payload.medical_history_uterus_rem_appendex_disk =
          Number(medicalHistory);
      }

      const response = await fetch('http://192.168.15.171:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      router.push({
        pathname: '/result',
        params: {
          prediction: result.prediction,
          confidence: result.risk_probability,
        },
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a predição.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Predição da osteoporose</Text>

      <Text style={styles.title}>
        Insira os dados do seu exame para realizar a predição
      </Text>

      <Text style={styles.section}>Dados obrigatórios</Text>

      <Text style={styles.label}>T-Score</Text>

      <TextInput
        value={tScore}
        onChangeText={setTScore}
        placeholder="-2.5"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Text style={styles.section}>Dados complementares</Text>

      <Text style={styles.label}>Idade</Text>

      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="65"
        keyboardType="number-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Z-Score</Text>

      <TextInput
        value={zScore}
        onChangeText={setZScore}
        placeholder="-1.8"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Occupation Student</Text>

      <TextInput
        value={occupationStudent}
        onChangeText={setOccupationStudent}
        placeholder="0 ou 1"
        keyboardType="number-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Histórico Médico</Text>

      <TextInput
        value={medicalHistory}
        onChangeText={setMedicalHistory}
        placeholder="0 ou 1"
        keyboardType="number-pad"
        style={styles.input}
      />

      <Text style={styles.button} onPress={handlePredict}>
        {loading ? 'Realizando predição...' : 'Ver resultado'}
      </Text>

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#FFF',
  },

  header: {
    fontSize: 18,
    color: '#171717',
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    marginBottom: 32,
  },

  section: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },

  helper: {
    color: '#737373',
    marginBottom: 20,
    lineHeight: 20,
  },

  label: {
    fontSize: 15,
    color: '#525252',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },

  button: {
    marginTop: 16,
    backgroundColor: '#2563EB',
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
  },
});
