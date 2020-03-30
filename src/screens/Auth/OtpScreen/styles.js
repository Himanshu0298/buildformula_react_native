import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../../styles/theme';

export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = theme.colors.primary;
export const NOT_EMPTY_CELL_BG_COLOR = theme.colors.primary;
export const ACTIVE_CELL_BG_COLOR = theme.colors.primary;

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  cell: {
    margin: 0,
    height: CELL_SIZE + 5,
    width: CELL_SIZE - 5,
    lineHeight: CELL_SIZE,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#fff',
    backgroundColor: theme.colors.primary,

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================
  container: {
    backgroundColor: theme.colors.primary,
    height: '100%',
  },
  root: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    marginVertical: 40,
    paddingTop: 100,
    marginHorizontal: 30,
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    paddingTop: 30,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 40,
    borderRadius: 10,
    height: 50,
    width: '60%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

export default styles;
