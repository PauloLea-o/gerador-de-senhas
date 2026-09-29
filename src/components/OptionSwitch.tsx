import { StyleSheet, Switch, Text, View } from 'react-native';

type Props = {
  label: string;
  example: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export function OptionSwitch({ label, example, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.example}>{example}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#CBD5E1', true: '#5EEAD4' }}
        thumbColor={value ? '#0F766E' : '#F1F5F9'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '600',
  },
  example: {
    fontSize: 12,
    color: '#64748B',
  },
});
