import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Image, Platform } from "react-native";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ImagePickerResult } from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

export interface FormData {
  title: string;
  image: string;
  info: string;
  // * might be numbers
  lat: number;
  lng: number;
}

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function TabOneScreen() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  //find type
  const [photo, setPhoto] = useState<any>();

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  // const handleUploadPhoto = () => {
  //   fetch("http://localhost:3000/api/upload", {
  //     method: "POST",
  //     body: photo && createFormData(photo, { userId: "123" }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log("upload succes", response);
  //       alert("Upload success!");
  //       setPhoto(undefined);
  //     })
  //     .catch((error) => {
  //       console.log("upload error", error);
  //       alert("Upload failed!");
  //     });
  // };

  const onSubmit = (data: FormData) => {
    fetch(`http://localhost:8000/mobile/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res: Response) => res.json())
      .then((data: any) => {
        console.log(data);
        // this.props.fetchGraffiti();
        // this.setState({
        //   title: '',
        //   image:'',
        //   info: '',
        //   lat: '',
        //   lng: ''
        // })
      });
  };

  const createFormData = (result: ImageInfo) => {
    const data = new FormData();
    console.log("create form data");
    data.append("uri", result.uri);
    return data;
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPhoto(result.uri);
        console.log(result);
        fetch("http://localhost:8000/mobile/upload", {
          method: "POST",
          body: result && createFormData(result),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log("upload succes", response);
            alert("Upload success!");
            setPhoto(undefined);
          })
          .catch((error) => {
            console.log("upload error", error);
            alert("Upload failed!");
          });
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input name="title" ref={register} />
        <label>Image URL</label>
        <input name="image" ref={register} />
        <label>Know Before You Go</label>
        <input name="info" ref={register} />
        <label>Latitude</label>
        <input name="lat" ref={register} />
        <label>Longitude</label>
        <input name="lng" ref={register} />
        {/* <button
        type="button"
        onClick={() => {
          setValue("lastName", "luo"); // ✅
          setValue("firstName", true); // ❌: true is not string
          errors.bill; // ❌: property bill does not exist
        }}
      >
        SetValue
      </button> */}
        <input type="submit" />
      </form>
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
