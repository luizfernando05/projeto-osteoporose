import { View, Text, StyleSheet } from 'react-native';

import ResultCard from '../components/ResultCard';
import { getClassification } from '../utils/osteoporosis';

export default function ResultScreen({ route }: any) {
  const { result } = route.params;

  const classification = getClassification(result.prediction);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predição da osteoporose</Text>

      <Text style={styles.message}>
        Com base nos seus dados, é provável que você seja portador de{' '}
        <Text
          style={{
            color: classification.color,
            fontWeight: '700',
          }}
        >
          {classification.label.toLowerCase()}
        </Text>
        .
      </Text>

      <ResultCard
        color={classification.color}
        classification={classification.label}
        confidence={Math.round(result.risk_probability * 100)}
      />

      <Text style={styles.disclaimer}>
        Esta predição é realizada por um modelo de inteligência artificial e não
        substitui avaliação médica especializada.
      </Text>

      <Text style={styles.footer}>
        Consulte um médico para confirmação do diagnóstico.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF',
  },

  title: {
    marginTop: 60,
    fontSize: 18,
    marginBottom: 30,
  },

  message: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 30,
  },

  disclaimer: {
    marginTop: 16,
    fontSize: 12,
    color: '#737373',
    lineHeight: 18,
  },

  footer: {
    marginTop: 40,
    fontSize: 18,
  },
});
