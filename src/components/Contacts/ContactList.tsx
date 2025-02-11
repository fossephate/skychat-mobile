

import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { router } from 'expo-router';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ContactList = ({ contacts }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
    router.push(`/contacts/${contact.id}`);
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleContactPress(item)}
      style={styles.contactItem}
    >
      <View style={styles.contactAvatar}>
        <FontAwesomeIcon
          icon={faUser}
          size={24}
          color="#fff"
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderContactItem}
      style={styles.list}
    />
  );
};

export default ContactList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "80%",
  },
  contactItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "#9cf",
  },
  avatarImage: {
    left: 13,
    top: 11,
    // width: 50,
    // height: 50,
    // borderRadius: 25,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    color: "#000",
  },
  contactTitle: {
    fontSize: 14,
    color: "#666",
  },

});