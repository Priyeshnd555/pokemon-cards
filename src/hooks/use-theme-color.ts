// WHY: This hook facilitates the retrieval of themed colors based on the current active theme.
// It allows for optional property overrides, providing flexibility in UI styling.
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from './use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
