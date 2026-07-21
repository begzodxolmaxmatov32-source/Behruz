import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', author: 'Sardor', text: 'Juda zo\'r kino ekan, hammaga tavsiya qilaman!', date: 'Bugun, 14:20' },
    { id: '2', author: 'Malika', text: 'Aktyorlar mahorati a\'lo darajada chiqibdi.', date: 'Kecha, 21:00' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Foydalanuvchi',
      text: newComment,
      date: 'Hozir',
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Video Player Section */}
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={'d9MyW72ELq0'} // YouTube Treyler Video ID
            onChangeState={(state) => {
              if (state === 'ended') setPlaying(false);
            }}
          />
        </View>

        {/* Movie Info */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Avatar: Suv Yo'li</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>2022</Text>
            <Text style={styles.badge}>3s 12m</Text>
            <Text style={styles.ratingBadge}>★ 7.8</Text>
          </View>
          <Text style={styles.description}>
            Jake Sully va Neytiri oila qurishadi va o'z uylarini himoya qilish uchun barcha imkoniyatlarni ishga solishadi. Ular Pandora bo'ylab sayohat qilib, yangi hududlar va suv olamini kashf etishadi.
          </Text>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsContainer}>
          <Text style={styles.sectionTitle}>Izohlar ({comments.length})</Text>

          {/* Add Comment Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Izoh qoldiring..."
              placeholderTextColor="#888"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <Text style={styles.sendButtonText}>Yuborish</Text>
            </TouchableOpacity>
          </View>

          {/* Comment List */}
          {comments.map((item) => (
            <View key={item.id} style={styles.commentCard}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{item.author}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  detailsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    color: '#aaa',
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    fontSize: 12,
  },
  ratingBadge: {
    color: '#ffd700',
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  commentsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  sendButton: {
    backgroundColor: '#e50914',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentCard: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  commentAuthor: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentDate: {
    color: '#666',
    fontSize: 12,
  },
  commentText: {
    color: '#ddd',
    fontSize: 13,
  },
});
