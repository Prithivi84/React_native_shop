import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Rating } from "@kolking/react-native-rating";

export default function ProductDetailModal({ product, modalView }) {
  useEffect(() => {
    console.log("product", product);
  }, []);

  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          modalView();
        }}
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Entypo name="squared-cross" size={40} color="black" />
        <Text style={{ color: "gray", fontSize: 10 }}>Close Modal</Text>
      </Pressable>

      <View style={styles.modalContainer}>
        <View style={styles.modalImage}>
          <Image
            style={{ flex: 1, resizeMode: "contain" }}
            source={{ uri: product?.image }}
          />
        </View>

        <View style={styles.modalDetail}>
          <Text style={styles.modalTitle}>{product?.title}</Text>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Rs.{product?.price}
            </Text>
            <Rating size={20} rating={Math.round(product?.rating?.rate)} />
          </View>
          <View style={styles.description}>
            <Text style={{ fontSize: 15 }}>Description:</Text>
            <Text style={{ flex: 1, flexWrap: "wrap", fontSize: 15 }}>
              {product?.description}
            </Text>
          </View>
        </View>

        <View>
          {/* <Button
          title="+"
          onPress={() => dispatch(incrementQuantity(item.id))}
        />
        <Button
          title="-"
          onPress={() => dispatch(decrementQuantity(item.id))}
        /> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  modalDetail: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
    flex: 1,
    justifyContent: "center",
  },

  modalImage: {
    flex: 1,
    justifyContent: "center",
    width: 300,
    height: 300,
  },

  description: {
    width: "100%",
    flexDirection: "row",
    // flexWrap: "wrap",
    flex: 1,
    gap: 5,
    padding: 5,
  },

  dSize: {
    fontSize: 20,
  },
});
