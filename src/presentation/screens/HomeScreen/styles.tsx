import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 0,
  },
  card: {
    marginHorizontal: 0,
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
    backgroundColor: "#fafbfc",
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 18,
    color: "#bdbdbd",
    marginLeft: 10,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: "#222",
    backgroundColor: "transparent",
  },
  emptyStateContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#bdbdbd",
    marginBottom: 6,
    fontWeight: "400",
  },
  emptyStateIcon: {
    fontSize: 36,
    color: "#ededed",
  },
  list: {
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 8,
  },
});

export default styles;
