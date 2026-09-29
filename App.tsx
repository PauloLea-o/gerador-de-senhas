import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ColorButton } from './src/components/ColorButton';
import { OptionSwitch } from './src/components/OptionSwitch';
import {
  CharOptions,
  MAX_LENGTH,
  MIN_LENGTH,
  clampLength,
  generatePassword,
} from './src/utils/generatePassword';

export default function App() {
  const [lengthText, setLengthText] = useState('12');
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<CharOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const noOptionSelected = !Object.values(options).some(Boolean);

  function toggleOption(key: keyof CharOptions, value: boolean) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  function handleLengthChange(text: string) {
    // aceita apenas dígitos
    setLengthText(text.replace(/\D/g, ''));
  }

  function changeLengthBy(step: number) {
    const current = clampLength(parseInt(lengthText, 10));
    setLengthText(String(clampLength(current + step)));
  }

  function handleGenerate() {
    const size = clampLength(parseInt(lengthText, 10));
    setLengthText(String(size));
    setPassword(generatePassword(size, options));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>🔐 Gerador de Senhas</Text>
        <Text style={styles.subtitle}>Escolha o tamanho e os tipos de caractere</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tamanho da senha</Text>
          <View style={styles.lengthRow}>
            <ColorButton title="−" onPress={() => changeLengthBy(-1)} style={styles.stepButton} />
            <TextInput
              style={styles.lengthInput}
              value={lengthText}
              onChangeText={handleLengthChange}
              onBlur={() => setLengthText(String(clampLength(parseInt(lengthText, 10))))}
              keyboardType="number-pad"
              maxLength={2}
              accessibilityLabel="Tamanho da senha em caracteres"
            />
            <ColorButton title="+" onPress={() => changeLengthBy(1)} style={styles.stepButton} />
          </View>
          <Text style={styles.hint}>
            Entre {MIN_LENGTH} e {MAX_LENGTH} caracteres
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Incluir na senha</Text>
          <OptionSwitch label="Letras maiúsculas" example="A B C" value={options.uppercase} onChange={(v) => toggleOption('uppercase', v)} />
          <OptionSwitch label="Letras minúsculas" example="a b c" value={options.lowercase} onChange={(v) => toggleOption('lowercase', v)} />
          <OptionSwitch label="Números" example="1 2 3" value={options.numbers} onChange={(v) => toggleOption('numbers', v)} />
          <OptionSwitch label="Símbolos" example="! @ #" value={options.symbols} onChange={(v) => toggleOption('symbols', v)} />
          {noOptionSelected && <Text style={styles.warning}>Selecione pelo menos um tipo de caractere.</Text>}
        </View>

        <View style={styles.resultBox}>
          <Text selectable style={styles.password}>
            {password || 'Toque em "Gerar senha"'}
          </Text>
        </View>

        <ColorButton title="Gerar senha" onPress={handleGenerate} disabled={noOptionSelected} />
        <ColorButton
          title="Limpar"
          onPress={() => setPassword('')}
          color="#475569"
          pressedColor="#DC2626"
          style={styles.clearButton}
        />
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F0FDFA',
  },
  container: {
    padding: 24,
    paddingTop: 56,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#134E4A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 10,
  },
  lengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepButton: {
    width: 48,
    paddingVertical: 10,
  },
  lengthInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: 10,
    paddingVertical: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#0F172A',
  },
  hint: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },
  warning: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
  },
  resultBox: {
    backgroundColor: '#134E4A',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    minHeight: 64,
    justifyContent: 'center',
  },
  password: {
    color: '#F0FDFA',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  clearButton: {
    marginTop: 10,
  },
});
