import { Dimensions, StyleSheet } from 'react-native';
import { ThemeColors } from '../../context/themeColors';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const gameCardWidth = SCREEN_WIDTH * 0.3;

export const createComponentStyles = (colors: ThemeColors) => {
  return {
    gameCard: StyleSheet.create({
      card: {
        margin: 4,
        backgroundColor: colors.card,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        elevation: 2,
        width: gameCardWidth,
        height: 160,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      image: {
        width: gameCardWidth,
        height: 70,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: colors.surface,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 6,
        textAlign: 'center',
        paddingHorizontal: 4,
        maxWidth: gameCardWidth - 8,
        maxHeight: 36,
        color: colors.text,
      },
      release: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 6,
        marginTop: 2,
      },
    }),

    tabIcon: StyleSheet.create({
      iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 2,
      },
      iconContainerFocused: {
        backgroundColor: colors.primaryLight,
        transform: [{ scale: 1.1 }],
      },
      homeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
      },
      homeIconContainerFocused: {
        backgroundColor: colors.primaryLight,
        transform: [{ scale: 1.35 }],
      },
      iconTitle: {
        fontSize: 9,
        color: colors.text,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 2,
        lineHeight: 10,
      },
      tabIcon: {
        width: 22,
        height: 22,
        tintColor: colors.textSecondary,
      },
      homeTabIcon: {
        width: 28,
        height: 28,
        tintColor: colors.textSecondary,
      },
      tabIconFocused: {
        tintColor: colors.text,
      },
      homeTabIconFocused: {
        tintColor: undefined,
      },
    }),

    searchBar: StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginVertical: 7,
        borderWidth: 1,
        borderColor: colors.border,
      },
      textInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: colors.text,
      },
      icon: {
        width: 18,
        height: 18,
        tintColor: colors.textSecondary,
      },
    }),

    pageHeader: StyleSheet.create({
      container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.background,
      },
      icon: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
        tintColor: colors.text, 
      },
    }),

    hoursPlayedPopUp: StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: colors.modalOverlay,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      modalContainer: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: colors.border,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: colors.text,
      },
      subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.textSecondary,
        fontStyle: 'italic',
      },
      label: {
        fontSize: 16,
        marginBottom: 12,
        color: colors.text,
        fontWeight: '500',
      },
      input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 24,
        backgroundColor: colors.surface,
        color: colors.text,
      },
      buttonContainer: {
        flexDirection: 'row',
        gap: 12,
      },
      cancelButton: {
        flex: 1,
        backgroundColor: colors.surface,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
      },
      cancelButtonText: {
        color: colors.textSecondary,
        fontSize: 16,
        fontWeight: '500',
      },
      confirmButton: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
      },
      confirmButtonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: '600',
      },
    }),
  };
};