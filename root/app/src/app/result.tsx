import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function Result() {
  const params = useLocalSearchParams();

  const prediction = Number(params.prediction);

  const confidence = Math.round(Number(params.confidence) * 100);

  const resultMap = {
    0: {
      label: 'Normal',
      color: '#22C55E',
      text: 'normal',
    },

    1: {
      label: 'Osteopenia',
      color: '#F59E0B',
      text: 'portador de osteopenia',
    },

    2: {
      label: 'Osteoporose',
      color: '#2563EB',
      text: 'portador de osteoporose',
    },
  };

  const result = resultMap[prediction as keyof typeof resultMap];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predição da osteoporose</Text>

      <Text style={styles.title}>
        Com base nos seus dados, é provável que você seja{' '}
        <Text
          style={{
            color: result.color,
          }}
        >
          {result.text}
        </Text>
        .
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resultado</Text>

        <Text style={styles.cardText}>Classificação: {result.label}</Text>

        <Text style={styles.cardText}>
          Confiança da predição: {confidence}%
        </Text>
      </View>

      <Text style={styles.warning}>
        ⓘ Ressaltamos que esta predição é realizada por um modelo computacional,
        sujeito a falhas. A confirmação médica é essencial.
      </Text>

      <Text style={styles.footer}>
        Entre em contato com um médico para confirmar o diagnóstico.
      </Text>

      <Pressable style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Nova predição</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  header: {
    fontSize: 18,
    marginBottom: 24,
  },

  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '700',
    marginBottom: 32,
  },

  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },

  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#525252',
  },

  warning: {
    marginTop: 12,
    fontSize: 12,
    color: '#737373',
    lineHeight: 18,
  },

  footer: {
    marginTop: 40,
    fontSize: 20,
    color: '#171717',
  },

  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
