export function getClassification(value: number) {
  switch (value) {
    case 0:
      return {
        label: 'Normal',
        color: '#16A34A',
        description:
          'Não foram encontrados indícios de osteopenia ou osteoporose.',
      };

    case 1:
      return {
        label: 'Osteopenia',
        color: '#F59E0B',
        description: 'Há indícios de redução da densidade óssea.',
      };

    case 2:
      return {
        label: 'Osteoporose',
        color: '#DC2626',
        description: 'Há forte indicação de osteoporose.',
      };

    default:
      return {
        label: 'Indefinido',
        color: '#6B7280',
        description: '',
      };
  }
}
