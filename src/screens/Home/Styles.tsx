import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    marginTop:20,
    width: "90%",
    height: 120,

  },
  title: { fontSize: 20, marginVertical: 4 },
  search: {
    width: "90%",
    height: 50,
    marginBottom: 50,
    marginTop: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 8,
  },
});

export default styles;
