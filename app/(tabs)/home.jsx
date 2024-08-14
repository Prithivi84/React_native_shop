import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

export default function home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    extract();
  }, []);

  const extract = () => {
    fetch("https://fakestoreapi.com/products")
      .then(async (res) => {
        // console.log(res.json().);
        const data = await res.json();
        // console.log(data);
        setProducts(data);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  return (
    <View>
      <Text>home</Text>
    </View>
  );
}
