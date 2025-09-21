import React from 'react';
import { Image, Text, View } from 'react-native';
import { createGlobalStyles } from '../../assets/constants/globalStyles';
import { useThemeColors } from '../context/useThemeColors';
import { createComponentStyles } from './styles/componentStyles';

interface PageHeaderProps {
  icon: any;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title }) => {
  const colors = useThemeColors();
  const globalStyles = createGlobalStyles(colors);
  const styles = createComponentStyles(colors).pageHeader;

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={globalStyles.sectionTitle}>{title}</Text>
    </View>
  );
};

export default PageHeader;