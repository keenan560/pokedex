import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 8,
    color: "#FFCC00",
  },
  img: {
    height: 250,
    width: 250,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 120,
    opacity: 0.8,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
  },

  edit: {
    width: "90%",
    height: 28,
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 8,
    color: "#FFCC00",
  },

  attr: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00ffcc",
  },

  typeText: {
    fontSize: 25,
    color: "#b3ff00",
    fontWeight: "bold",
  },
});

export default styles;
