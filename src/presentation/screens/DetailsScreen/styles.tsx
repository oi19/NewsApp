import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 8,
    color: "#222",
    textAlign: "center",
  },
  author: {
    color: "#888",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  date: {
    color: "#b0b0b0",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default styles;
