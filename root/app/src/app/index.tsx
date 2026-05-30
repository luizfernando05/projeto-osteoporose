import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [tScore, setTScore] = useState('');
  const [zScore, setZScore] = useState('');
  const [age, setAge] = useState('');

  const [isStudent, setIsStudent] = useState<boolean | null>(null);

  const [hasMedicalHistory, setHasMedicalHistory] = useState<boolean | null>(
    null,
  );

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

      const useStacking =
        age.trim() &&
        zScore.trim() &&
        isStudent !== null &&
        hasMedicalHistory !== null;

      if (useStacking) {
        payload.age = Number(age);

        payload.z_score_value = Number(zScore.replace(',', '.'));

        payload.occupation_student = isStudent ? 1 : 0;

        payload.medical_history_uterus_rem_appendex_disk = hasMedicalHistory
          ? 1
          : 0;
      }

      const response = await fetch('http://192.168.15.171:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const result = await response.json();

      router.push({
        pathname: '/result',
        params: {
          prediction: result.prediction,
          confidence: result.risk_probability,
        },
      });
    } catch (error) {
      console.error(error);

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

      <Text style={styles.helper}>
        Ao preencher todos os campos abaixo, será utilizado o modelo mais
        completo.
      </Text>

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

      <Text style={styles.label}>Você é estudante?</Text>

      <View style={styles.optionGroup}>
        <Pressable
          style={[
            styles.optionButton,
            isStudent === true && styles.optionButtonSelected,
          ]}
          onPress={() => setIsStudent(true)}
        >
          <Text
            style={[
              styles.optionText,
              isStudent === true && styles.optionTextSelected,
            ]}
          >
            Sim
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.optionButton,
            isStudent === false && styles.optionButtonSelected,
          ]}
          onPress={() => setIsStudent(false)}
        >
          <Text
            style={[
              styles.optionText,
              isStudent === false && styles.optionTextSelected,
            ]}
          >
            Não
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>
        Possui histórico de cirurgia uterina, apêndice ou problema de disco?
      </Text>

      <View style={styles.optionGroup}>
        <Pressable
          style={[
            styles.optionButton,
            hasMedicalHistory === true && styles.optionButtonSelected,
          ]}
          onPress={() => setHasMedicalHistory(true)}
        >
          <Text
            style={[
              styles.optionText,
              hasMedicalHistory === true && styles.optionTextSelected,
            ]}
          >
            Sim
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.optionButton,
            hasMedicalHistory === false && styles.optionButtonSelected,
          ]}
          onPress={() => setHasMedicalHistory(false)}
        >
          <Text
            style={[
              styles.optionText,
              hasMedicalHistory === false && styles.optionTextSelected,
            ]}
          >
            Não
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePredict}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Realizando predição...' : 'Ver resultado'}
        </Text>
      </Pressable>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 16 }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
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
    color: '#171717',
    marginBottom: 32,
  },

  section: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginTop: 16,
    marginBottom: 12,
  },

  helper: {
    color: '#737373',
    lineHeight: 20,
    marginBottom: 20,
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
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: '#FFF',
  },

  optionGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },

  optionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  optionButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  optionText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },

  optionTextSelected: {
    color: '#FFFFFF',
  },

  button: {
    marginTop: 16,
    backgroundColor: '#2563EB',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
