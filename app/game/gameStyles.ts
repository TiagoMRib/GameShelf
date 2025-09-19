import { StyleSheet } from 'react-native';

export const gameDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    headerImage: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#666',
        width: 100,
        marginRight: 8,
    },
    value: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    descriptionContainer: {
        marginTop: 16,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
        marginTop: 8,
    },
    buttonsContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    collectionButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
        marginBottom: 8,
    },
    activeButton: {
        backgroundColor: '#28A745',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});