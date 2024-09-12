import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addItem, removeItem} from '../actions';

export const HomeScreen = () => {
  const data = useSelector(state => state.data);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [newItemTitle, setNewItemTitle] = useState('');

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.id}.{item.title}
      </Text>
    </View>
  );

  const handleSubmit = () => {
    if (newItemTitle.trim()) {
      const newItem = {id: (data.length + 1).toString(), title: newItemTitle};
      dispatch(addItem(newItem));
      setNewItemTitle('');
    }
  };

  const handleRemovePress = () => {
    if (data.length > 0) {
      const lastItemId = data[data.length - 1].id;
      dispatch(removeItem(lastItemId));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter title"
          value={newItemTitle}
          onChangeText={setNewItemTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.ButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RemoveButton}
          onPress={handleRemovePress}>
          <Text style={styles.ButtonText}>Remove</Text>
        </TouchableOpacity>
        
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    width: 60,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RemoveButton: {
    width: 60,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#ff4500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
