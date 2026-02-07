/**
 * Componente para subir/actualizar avatar del repartidor
 * Permite tomar foto con cámara o seleccionar de galería
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUploadAvatar } from '../../hooks/queries';
import { colors } from '../../utils/theme';
import { styles } from '../../styles/avatarUpload.styles';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  size?: number;
}

export function AvatarUpload({ currentAvatarUrl, size = 80 }: AvatarUploadProps) {
  const [tempImageUri, setTempImageUri] = useState<string | null>(null);
  const uploadAvatar = useUploadAvatar();

  // Solicitar permisos de cámara
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos acceso a la cámara para tomar fotos.'
      );
      return false;
    }
    return true;
  };

  // Solicitar permisos de galería
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos acceso a la galería para seleccionar fotos.'
      );
      return false;
    }
    return true;
  };

  // Tomar foto con cámara
  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error: any) {
      // Manejo específico para error de cámara en simulador
      if (error.message?.includes('Camera not available')) {
        Alert.alert(
          'Cámara no disponible',
          'La cámara no está disponible en el simulador. Por favor, usa "Elegir de galería" o prueba en un dispositivo físico.'
        );
      } else {
        Alert.alert('Error', 'No se pudo tomar la foto');
      }
      console.error('Error al tomar foto:', error);
    }
  };

  // Seleccionar de galería
  const handlePickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
      console.error('Error al seleccionar imagen:', error);
    }
  };

  // Subir imagen
  const uploadImage = async (uri: string) => {
    try {
      setTempImageUri(uri);
      await uploadAvatar.mutateAsync(uri);
      Alert.alert('Éxito', 'Foto de perfil actualizada correctamente');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo actualizar la foto');
      setTempImageUri(null);
    }
  };

  // Mostrar opciones al tocar el avatar
  const handleAvatarPress = () => {
    Alert.alert(
      'Cambiar foto de perfil',
      'Selecciona una opción',
      [
        {
          text: 'Tomar foto',
          onPress: handleTakePhoto,
        },
        {
          text: 'Elegir de galería',
          onPress: handlePickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  // Determinar qué imagen mostrar
  const imageToShow = tempImageUri || currentAvatarUrl;
  const isLoading = uploadAvatar.isPending;

  return (
    <TouchableOpacity 
      onPress={handleAvatarPress} 
      style={[styles.container, { width: size, height: size }]}
      disabled={isLoading}
    >
      <View style={[styles.avatarContainer, { borderRadius: size / 2 }]}>
        {imageToShow ? (
          <Image 
            source={{ uri: imageToShow }} 
            style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }]}
            resizeMode="cover"
          />
        ) : (
          <MaterialCommunityIcons 
            name="account-circle" 
            size={size} 
            color={colors.primary.main} 
          />
        )}
        
        {/* Overlay de carga */}
        {isLoading && (
          <View style={[styles.loadingOverlay, { borderRadius: size / 2, overflow: 'hidden' }]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Icono de cámara en la esquina */}
        {!isLoading && (
          <View style={styles.cameraIcon}>
            <MaterialCommunityIcons name="camera" size={20} color="#fff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
