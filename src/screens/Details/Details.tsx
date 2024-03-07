import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { View, Text } from "react-native";
import { fetchDetails } from "../../services";
import { DetailsCard } from "../../components";

type Details = {
  text: string;
  height: number;
  weight: number;
  types: [];
};

const Details = ({ route, navigation }: any) => {
  const { name, imgUrl, text } = route.params;

  const [data, setData] = useState<Details>({
    height: 0,
    weight: 0,
    types: [],
    text: "",
  });

  const getDetails = async () => {
    const results = await fetchDetails(name);
    setData(results);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <DetailsCard
        text={text}
        navigation={navigation}
        name={name}
        height={data.height}
        weight={data.weight}
        types={data.types}
        imgUrl={imgUrl}
      />
    </View>
  );
};

export default Details;
