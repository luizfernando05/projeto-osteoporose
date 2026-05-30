import { View, Text, StyleSheet } from 'react-native';

export default function ResultCard({ color, classification, confidence }: any) {
  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: color,
        },
      ]}
    >
      <Text style={styles.title}>Resultado</Text>

      <Text style={styles.classification}>Classificação: {classification}</Text>

      <Text style={styles.confidence}>Confiança: {confidence}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  classification: {
    fontSize: 16,
    marginBottom: 4,
  },

  confidence: {
    fontSize: 16,
  },
});
