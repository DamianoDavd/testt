import React, { useState, useEffect, useRef } from 'react';
import { db } from './elemental'; // Sesuaikan path
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import './CommentSection.css'; // Kita buat CSS sendiri

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const commentsEndRef = useRef(null);

  const commentsRef = collection(db, 'comments');

  // Ambil komentar secara real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const commentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date(),
      }));
      setComments(commentList);
    });

    return () => unsubscribe();
  }, []);

  // Scroll ke bawah otomatis
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // Kirim komentar
  const handleSend = async () => {
    if (!newComment.trim()) return;

    await addDoc(commentsRef, {
      text: newComment.trim(),
      timestamp: serverTimestamp(), // waktu dari server
    });

    setNewComment('');
  };

  // Format waktu
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    if (minutes > 0) return `${minutes} menit lalu`;
    return 'baru saja';
  };

  return (
    <div className="comment-section">
      <h3>Berikan Tanggapan Anda</h3>
      <p>Mengenai Program Adiwiyata</p>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong>Anonim</strong>
                <span className="comment-time">{formatTime(comment.timestamp)}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
        <div ref={commentsEndRef} />
      </div>

      <div className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ketik pesan..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Kirim</button>
      </div>
    </div>
  );
};

export default CommentSection;