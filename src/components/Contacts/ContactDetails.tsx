import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { faUser, faPlus, faStar, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactDetails = ({ contact }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.topBarButton}>
          <FontAwesomeIcon
            icon={faStar}
            size={20}
            color="#ffdf60"
            style={{ left: 6, top: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBarButton}>
          <FontAwesomeIcon
            icon={faPhone}
            size={20}
            color="#60a86d"
            style={{ left: 6, top: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBarButton}>
          <FontAwesomeIcon
            icon={faEnvelope}
            size={20}
            color="#9cf"
            style={{ left: 6, top: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBarButton}>
          <FontAwesomeIcon
            icon={faUser}
            size={20}
            color="#000"
            style={{ left: 6, top: 5 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.contactAvatar}>
          <FontAwesomeIcon
            icon={faUser}
            size={24}
            color="#000"
            style={styles.avatarImage}
          />
        </TouchableOpacity>
        <View style={styles.nameAndTitle}>
          <TextInput
            style={styles.name}
            value={contact.name}
          />
          <TextInput
            style={styles.title}
            value={contact.title}
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity style={styles.addOrbitButton}>
              <FontAwesomeIcon
                icon={faPlus}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.orbitButton}>
              <FontAwesomeIcon
                icon={faUser}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.orbitButton}>
              <FontAwesomeIcon
                icon={faUser}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.orbitButton}>
              <FontAwesomeIcon
                icon={faUser}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.orbitButton}>
              <FontAwesomeIcon
                icon={faUser}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.orbitButton}>
              <FontAwesomeIcon
                icon={faUser}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.orbitButton}>
              <FontAwesomeIcon
                icon={faUser}
                size={14}
                color="#000"
                style={{ left: 5, top: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.addressesContainer}>
        <View style={styles.infoItem}>
          <TouchableOpacity><Text style={styles.infoTitle}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.infoContent}>379 Estates view Greensboro, Connecticut 89061</Text></TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <TouchableOpacity><Text style={styles.infoTitle}>Work</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.infoContent}>9996782584</Text></TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <TouchableOpacity><Text style={styles.infoTitle}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.infoContent}>433 Ranch chester Phoenix, New Mexico 50690</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({

  topButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: 20,
  },
  topBarButton: {
    backgroundColor: '#ddd',
    width: 32,
    height: 32,
    borderRadius: 24,
    marginLeft: 14,
  },
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  header: {
    width: "100%",
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#9cf",
    marginTop: 16,
  },
  avatarImage: {
    left: 13,
    top: 11,
  },
  nameAndTitle: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  addOrbitButton: {
    backgroundColor: '#8af49d',
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  orbitButton: {
    backgroundColor: '#aaa',
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  name: {
    width: "100%",
    backgroundColor: '#bbb',
    borderRadius: 8,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  title: {
    width: "100%",
    backgroundColor: '#bbb',
    borderRadius: 8,
    fontSize: 16,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  addressesContainer: {
    marginTop: 20,
  },
  infoItem: {
    backgroundColor: '#333', // Dark item background
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    color: '#bbb', // Light grey color for titles
    fontSize: 16,
    marginBottom: 4,
  },
  infoContent: {
    color: 'white', // White color for content
    fontSize: 16,
    marginTop: 6,
  },
});