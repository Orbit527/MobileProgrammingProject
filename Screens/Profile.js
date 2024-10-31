import {
  equalTo,
  onValue,
  orderByChild,
  push,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { database, firebaseAuth } from "../firebaseConfig.js";
import { styles } from "../StyleSheet.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

  const [user, setUser] = useState(null);

  const signIn = async () => {
    console.log("signIn");
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signUp = async () => {
    console.log("signUp");
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Check your email!");
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signOut = () => {
    firebaseAuth.signOut();
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("user:" + user);
      setUser(user);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Profile" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={{ marginBottom: 15 }}
            placeholder="Email"
            value={email}
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{ marginBottom: 15 }}
            placeholder="Password"
            value={password}
            mode="outlined"
            onChangeText={(text) => setPassword(text)}
          />
          <Button mode="contained" icon="login" onPress={() => signIn()}>
            Login
          </Button>
          <Button mode="contained" icon="login" onPress={() => signUp()}>
            Create Account
          </Button>
          <Button mode="contained" icon="login" onPress={() => signOut()}>
            Sign Out
          </Button>

          {user ? <Text>Logged in with: {user.email}</Text> : <Text>Not logged in</Text>}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
