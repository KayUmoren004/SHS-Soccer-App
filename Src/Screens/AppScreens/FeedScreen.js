import React, { Component } from "react";

//Dependencies
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Text from "../../Components/Screen Components/Text";
import ViewMoreText from "react-native-view-more-text";
import firebase from "firebase";
import config from "../../Components/Config/firebase";
import { Divider } from "react-native-paper";
import Colors from "../../Components/Utils/Colors";
import styled from "styled-components";

//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

class FeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getFeed();
  }

  getFeed = () => {
    db.collection("feed")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        //console.log(data);
        this.setState({ feed: data, isFetching: false });
      });
  };

  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={{ color: Colors.red, fontWeight: "800" }}>
        View More
      </Text>
    );
  }

  renderViewLess(onPress) {
    return (
      <Text onPress={onPress} style={{ color: Colors.red, fontWeight: "800" }}>
        View Less
      </Text>
    );
  }

  renderPost = ({ item }) => (
    <PostContainer>
      <PostHeaderContainer>
        <Text bold medium color="#ffffff">
          {item.name}
        </Text>
        <Text medium semi color="#9bd1fa">
          {item.date}
        </Text>
      </PostHeaderContainer>

      <Divider
        style={{
          backgroundColor: "#fff",
          marginTop: 8,
          marginBottom: 8,
          paddingBottom: 4,
        }}
      />

      <Post>
        <ViewMoreText
          numberOfLines={5}
          renderViewLess={this.renderViewLess}
          renderViewMore={this.renderViewMore}
        >
          <Text margin="0 0 8px 0" color="#fff">
            {item.text}
          </Text>
        </ViewMoreText>

        <PostPhoto source={{ uri: item.image }} resizeMode="cover" />
        <PostDetails>
          <PostLikes>
            <TouchableOpacity>
              <Icon name="heart" size={24} color="#fff" />
            </TouchableOpacity>
            <Text tiny margin="0 0 0 8px" color="#fff">
              {item.likes}
            </Text>
          </PostLikes>
          <PostComments>
            <TouchableOpacity>
              <Icon name="message-square" size={24} color="#fff" />
            </TouchableOpacity>
            <Text tiny margin="0 0 0 8px" color="#fff">
              {item.comments}
            </Text>
          </PostComments>
        </PostDetails>
      </Post>
    </PostContainer>
  );

  render() {
    return (
      <View style={styles.Container}>
        <View>
          <FlatList
            data={this.state.feed}
            renderItem={this.renderPost}
            //onRefresh={() => this.onRefresh()}
            //refreshing={this.state.isFetching}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

export default FeedScreen;

const FeedContainer = styled.View``;

const StatusBar = styled.StatusBar``;

const Feed = styled.FlatList``;

const PostContainer = styled.View`
  margin: 0 0 10px 0;
  background-color: #000000;
  padding: 8px;
`;

const PostHeaderContainer = styled.View`
  align-items: center;
`;

const PostProfilePhoto = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 24px;
`;

const PostInfoContainer = styled.View`
  flex: 1;
  margin: 0 16px;
`;

const Options = styled.View``;

const Post = styled.View`
  margin-bottom: 10px;
`;

const PostPhoto = styled.Image`
  width: undefined;
  height: 150px;
  border-radius: 5px;
  margin-top: 10px;
`;

const PostDetails = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const PostLikes = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostComments = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
