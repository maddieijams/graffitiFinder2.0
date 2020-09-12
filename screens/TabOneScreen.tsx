import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export interface CreateUpdateForm {
  title: string;
  imageUrl: string;
  knowBefore: string;
  // * might be numbers
  lat: string;
  long: string;
}

export default function TabOneScreen() {
  const [createForm, setCreateForm] = useState<CreateUpdateForm>({
    title: "",
    imageUrl: "",
    knowBefore: "",
    lat: "",
    long: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <EditScreenInfo path='/screens/TabOneScreen.tsx' />

      <Text>Title</Text>
      <TextInput
        value={createForm.title}
        placeholder='Type here...'
        onChangeText={(text) => {
          setCreateForm({ ...createForm, title: text });
        }}
      />
      <Text>Image</Text>
      <TextInput
        value={createForm.imageUrl}
        placeholder='Type here...'
        onChangeText={(text) => {
          setCreateForm({ ...createForm, imageUrl: text });
        }}
      />
      <Text>Know Before You Go</Text>
      <TextInput
        value={createForm.knowBefore}
        placeholder='Type here...'
        onChangeText={(text) => {
          setCreateForm({ ...createForm, knowBefore: text });
        }}
      />
      <Text>Latitude</Text>
      <TextInput
        value={createForm.lat}
        placeholder='Type here...'
        onChangeText={(text) => {
          setCreateForm({ ...createForm, lat: text });
        }}
      />
      <Text>Longitude</Text>
      <TextInput
        value={createForm.long}
        placeholder='Type here...'
        onChangeText={(text) => {
          setCreateForm({ ...createForm, long: text });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
