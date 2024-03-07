import React, { useState, useEffect } from "react";
import styles from "./Styles";
import { Text, View, Image, TextInput } from "react-native";

type Details = {
  navigation: any;
  height: number;
  weight: number;
  types: any[];
  imgUrl: string;
  name: string;
  text: string;
};

const DetailsCard = ({
  navigation,
  name,
  height,
  weight,
  types,
  imgUrl,
  text,
}: Details) => {

  const [newName, setNewName] = useState<string>(text || name);
  const [edit, setEdit] = useState<boolean>(false);

  const renderTypes = () => {
    return types.map((type: any, idx) => (
      <Text key={idx} style={styles.typeText}>
        {" "}
        {type.type.name.toUpperCase()}
      </Text>
    ));
  };

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setEdit(false);
  };

  useEffect(() => {
    navigation.addListener("blur", () => {
      navigation.navigate("Home", {
        text: newName,
        name: name,
      });
    });
  }, [newName]);

  return (
    <View style={styles.container}>
      {!edit && (
        <Text onPress={() => setEdit(true)} style={styles.title}>
          {newName.toUpperCase()}
        </Text>
      )}
      {edit && (
        <TextInput
          style={styles.edit}
          cursorColor="#FFCC00"
          clearTextOnFocus
          value={newName.toUpperCase()}
          onChangeText={(e) => setNewName(e)}
          onSubmitEditing={(e) => handleNameChange(e)}
        />
      )}

      <Image style={styles.img} source={{ uri: imgUrl }} />
      <Text style={styles.text}>
        Height: <Text style={styles.attr}>{height}</Text>
      </Text>
      <Text style={styles.text}>
        Weight: <Text style={styles.attr}>{weight}</Text>
      </Text>
      <Text style={styles.text}>Types: {renderTypes()}</Text>
    </View>
  );
};

export default DetailsCard;
