import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {setUser} from '../reducers/userReducer';
import {useDispatch} from 'react-redux';
import { auth } from '../../firebase';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (name && email && password) {
      try {
        // Create user in Firebase
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;

        dispatch(setUser({name, email, mobile, profileImage}));

        // Clear form fields
        setName('');
        setEmail('');
        setPassword('');
        setMobile('');
        setProfileImage(null);

        navigation.replace('MainTabs');
        Alert.alert('Success', 'User registered successfully!');
      } catch (error) {
        Alert.alert('Registration Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Please fill out all required fields.');
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        setProfileImage(selectedImage.uri);
      }
    });
  };

  const captureImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

      launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setProfileImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {profileImage ? (
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      ) : (
        <TouchableOpacity onPress={openModal} style={styles.imagePlaceholder}>
          <Image
            source={require('../assets/Icons/user.png')}
            style={styles.userIcon}
          />
        </TouchableOpacity>
      )}

      <Text onPress={openModal} style={styles.profilePicLabel}>
        Edit Picture
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
      {/* Modal for image options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose an option</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Image
                source={require('../assets/Icons/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                selectImage();
                closeModal();
              }}>
              <Image
                source={require('../assets/Icons/gallery.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.modalButtonText}>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                captureImage();
                closeModal();
              }}>
              <Image
                source={require('../assets/Icons/camera.png')}
                style={styles.optionIcon}
              />
              <Text style={styles.modalButtonText}>Capture from Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  profilePicLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userIcon: {
    width: 100,
    height: 100,
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 16,
  },
});

export default RegisterScreen;
