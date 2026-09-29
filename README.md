# 🔐 Gerador de Senhas

App mobile feito com **React Native + Expo (TypeScript)** que gera senhas aleatórias de acordo com as preferências do usuário.

## Funcionalidades

### 1. Tamanho da senha definido pelo usuário
Um campo numérico permite digitar quantos caracteres a senha deve ter, e os botões **−** e **+** ajustam o valor de um em um. O tamanho fica entre **4 e 50** caracteres: valores fora desse intervalo são corrigidos automaticamente.

### 2. Botões que mudam de cor ao serem pressionados
Todos os botões usam o componente `ColorButton` (`src/components/ColorButton.tsx`). Ele guarda um estado `isPressed`:
- `onPressIn` → o botão assume a cor de "pressionado" (laranja; vermelho no botão Limpar)
- `onPressOut` → o botão volta à cor original

### 3. Feature escolhida: escolha dos tipos de caractere
O usuário escolhe, por meio de chaves (switches), quais tipos de caractere entram na senha:
- Letras maiúsculas (A–Z)
- Letras minúsculas (a–z)
- Números (0–9)
- Símbolos (`! @ # $ % & * ? - _ = +`)

A senha gerada tem **pelo menos um caractere de cada tipo selecionado**, e os caracteres são embaralhados (algoritmo Fisher-Yates). Se nenhum tipo estiver marcado, o botão "Gerar senha" fica desabilitado e aparece um aviso.

## Estrutura do projeto

```
App.tsx                          # Tela principal
src/
  components/
    ColorButton.tsx              # Botão que muda de cor ao pressionar
    OptionSwitch.tsx             # Linha com rótulo + Switch
  utils/
    generatePassword.ts          # Lógica de geração da senha
```

## Como rodar

Pré-requisitos: [Node.js](https://nodejs.org/) instalado e o app **Expo Go** no celular (ou um emulador).

```bash
npm install
npx expo start
```

Depois, é só ler o QR Code com o Expo Go ou pressionar `w` para abrir no navegador.

## Tecnologias
- React Native 0.81
- Expo SDK 54
- TypeScript
