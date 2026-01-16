import React, { FC, ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/components/ui/Dialog.styles';

interface DialogProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

const Dialog: FC<DialogProps> = ({ visible, onDismiss, title, children, actions }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onDismiss}
      >
        <View style={styles.dialog} onStartShouldSetResponder={() => true}>
          {title && <Text style={styles.title}>{title}</Text>}
          <View style={styles.content}>{children}</View>
          {actions && <View style={styles.actions}>{actions}</View>}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Dialog;
