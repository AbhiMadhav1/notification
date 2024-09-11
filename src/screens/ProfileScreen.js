import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    dispatch(logout());
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
   
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Image
          source={require('../assets/Icons/switch.png')} 
          style={styles.logoutIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>
      {user.profileImage ? (
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      ) : (
        <Image
          source={require('../assets/Icons/user.png')} 
          style={styles.profileImage}
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          Name: <Text style={styles.info}>{user.name}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.info}>{user.email}</Text>
        </Text>
        <Text style={styles.label}>
          Mobile: <Text style={styles.info}>{user.mobile}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#333',
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  info: {
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    position: 'absolute',
    top: 10, 
    right: 10, 
    padding: 10, 
  },
  logoutIcon: {
    width: 30, 
    height: 30,
  },
});

export default ProfileScreen;
