import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles, { highlight } from "./styles";

export default function ArticleItem({
  article,
  onPress,
  searchWord,
  disabled,
}: {
  article: any;
  onPress?: () => void;
  searchWord?: string;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.85}
      style={[styles.card, disabled && styles.disabled]}
      disabled={disabled}
    >
      {article.image ? (
        <Image source={{ uri: article.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderIcon}>📰</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {highlight(article.title, searchWord)}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {highlight(article.author, searchWord)}
        </Text>
        <Text style={styles.date}>
          {article.publishedAt &&
            new Date(article.publishedAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
