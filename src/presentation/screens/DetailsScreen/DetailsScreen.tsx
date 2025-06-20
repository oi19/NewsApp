import React from "react";
import { View, Text, Image, Button, Linking, ScrollView } from "react-native";
import styles from "./styles";

export default function DetailsScreen({ route }) {
  const { article } = route.params;

  const onReadMorePressed = () => {
    Linking.openURL(article.url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>{article.author}</Text>
      <Text style={styles.date}>{article.publishedAt}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Button title="Read More" onPress={onReadMorePressed} />
    </ScrollView>
  );
}
