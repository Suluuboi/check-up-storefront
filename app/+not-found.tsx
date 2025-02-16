import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../components/common/Typography';
import { Button } from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}>
        <Typography variant="h2" style={{ marginBottom: theme.spacing.md }}>
          This screen doesn't exist.
        </Typography>
        <Link href="/" asChild>
          <Button
            title="Go to home screen"
            variant="primary"
          />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
