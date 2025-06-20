import { StyleSheet, Text } from "react-native";
import React from "react";

function escapeRegExp(str: string) {
  // Escape special regex characters, including square brackets and backslash
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlight(text: string, searchWord?: string) {
  if (!searchWord || !text) return <Text>{text}</Text>;
  const escaped = escapeRegExp(searchWord);
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return (
    <Text>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        )
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    minHeight: 100,
  },
  disabled: {
    opacity: 0.5,
  },
  image: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
  },
  imagePlaceholder: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    color: "#bbb",
    fontSize: 28,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 6,
    color: "#222",
  },
  author: {
    color: "#888",
    fontSize: 14,
    marginBottom: 2,
  },
  date: {
    color: "#b0b0b0",
    fontSize: 12,
    marginTop: 2,
  },
  highlight: {
    backgroundColor: "#f3f3b3",
    fontWeight: "600",
    borderRadius: 4,
    paddingHorizontal: 2,
  },
});

export default styles;
