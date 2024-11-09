import {
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { firebaseAuth } from "../firebaseConfig.js";
import { styles } from "../Styles/StyleSheet.js";

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const auth = firebaseAuth;

  const [user, setUser] = useState(null);

  // from video: https://www.youtube.com/watch?v=ONAVmsGW6-M
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

  const signOut = () => {
    firebaseAuth.signOut();
  };

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
          {user ? (
            <View>
              <Text variant="titleLarge">Your Profile</Text>
              <Text variant="titleLarge" style={{ marginBottom: 25 }}>
                {user.email}
              </Text>

              <Button
                mode="contained"
                buttonColor="darkred"
                icon="logout"
                onPress={() => signOut()}
              >
                Log Out
              </Button>
            </View>
          ) : (
            <View>
              <Button
                mode="contained"
                icon="login"
                onPress={() => signIn()}
                style={{ marginBottom: 15 }}
              >
                Login
              </Button>

              <Text variant="titleLarge" style={{ marginBottom: 5 }}>
                Don't have an account?
              </Text>

              <Button
                icon="account-plus-outline"
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Register
              </Button>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
