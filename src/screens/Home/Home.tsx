import React, { useState, useEffect } from "react";
import styles from "./Styles";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { fetchImage, fetchPokedex } from "../../services";
import logo from "../../../assets/logo.webp";

type PokeData = {
  count: number;
  next: string;
  previous: string;
  results: PokeResult[];
};

type PokeResult = {
  name: string;
  url: string;
};

const Home = ({ route, navigation }: any) => {
  const { text, name } = route.params || "";
  const [data, setData] = useState<PokeData>();
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<any>([]);

  const setPokedex = async () => {
    const result = await fetchPokedex();
    await setData(result);
    setLoading(false);
  };

  const setPokeImages = async () => {
    if (!data) return;
    const array: { name: string; img: string; text: string }[] = [];
    for (const pokemon of data.results) {
      const imgUrl = await fetchImage(pokemon.name);
      array.push({
        name: pokemon.name,
        img: imgUrl,
        text: "",
      });
    }
    setImages(array);
  };

  const filterPokeMon = () => {
    setLoading(true);
    let results = images.filter(
      (pokemon: { name: string; img: string; text: string }) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
        pokemon.text.toLowerCase().includes(search.toLowerCase())
    );
    setSearchList(results);
    setLoading(false);
  };

  const updatePokemon = () => {
    let updated = images.map((pokemon) => {
      if (pokemon.name.toLowerCase() === name.toLowerCase()) {
        return {
          ...pokemon,
          text: text,
        };
      }
      return pokemon;
    });
    setImages(updated);
  };

  const Item = React.memo(
    ({
      name,
      imgUrl,
      text,
    }: {
      name: string;
      imgUrl: string;
      text: string;
    }) => (
      <View
        key={name}
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details", {
              name: name,
              imgUrl: imgUrl,
              text: text,
            })
          }
        >
          <Image
            style={{
              width: 250,
              height: 250,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
            source={{ uri: imgUrl }}
          />
        </TouchableOpacity>
        <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
          {text ? text.toUpperCase() : name.toUpperCase()}
        </Text>
      </View>
    )
  );

  useEffect(() => {
    setLoading(true);
    setPokedex();
  }, []);

  useEffect(() => {
    setPokeImages();
  }, [data]);

  useEffect(() => {
    if (search.length > 0) {
      filterPokeMon();
    }
  }, [search]);

  useEffect(() => {
    if (text) {
      updatePokemon();
    }
  }, [text]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        style={styles.search}
        placeholder="Search by name"
      />
      {isLoading || images.length < 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
      {search.length > 0 ? (
        <FlatList
          data={searchList}
          initialNumToRender={7}
          renderItem={({ item }) => (
            <Item name={item.name} imgUrl={item.img} text={item.text} />
          )}
          keyExtractor={(item, idx) => String(idx)}
          snapToAlignment="center"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
          horizontal
        />
      ) : (
        <FlatList
          data={images}
          initialNumToRender={7}
          renderItem={({ item }) => (
            <Item name={item.name} imgUrl={item.img} text={item.text} />
          )}
          keyExtractor={(item, idx) => String(idx)}
          snapToAlignment="end"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
          horizontal
        />
      )}
    </View>
  );
};

export default Home;
