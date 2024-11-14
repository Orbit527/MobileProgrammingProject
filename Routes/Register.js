import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { firebaseAuth } from "../firebaseConfig.js";
import { styles } from "../Styles/StyleSheet.js";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const auth = firebaseAuth;

  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);

      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.BackAction onPress={() => navigation.navigate("Profile")} />
        <Appbar.Content title="Register" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <TextInput
          style={{ marginBottom: 15 }}
          placeholder="Email"
          value={email}
          mode="outlined"
          label="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{ marginBottom: 15 }}
          placeholder="Password"
          value={password}
          mode="outlined"
          secureTextEntry={passwordHidden}
          label="Password"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordHidden(!passwordHidden)}
            />
          }
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" icon="login" onPress={() => signUp()}>
          Create Account
        </Button>
      </View>
    </View>
  );
}
