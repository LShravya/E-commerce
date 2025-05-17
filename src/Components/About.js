import React from 'react';

function About() {
  const styles = {
    outerContainer: {
      background: 'rgb(33, 155, 169)',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    contentWrapper: {
      maxWidth: '900px',
      textAlign: 'center',
      fontFamily: '"Roboto", sans-serif',
      color: '#fff',
    },
    title: {
      fontSize: '40px',
      fontWeight: '700',
      marginBottom: '25px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      transition: 'transform 0.3s ease',
    },
    text: {
      fontSize: '18px',
      lineHeight: '1.8',
      marginBottom: '20px',
      letterSpacing: '0.5px',
    },
    bold: {
      fontWeight: '700',
      color: '#f9f9f9',
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.contentWrapper}>
        <h1
          style={styles.title}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          About ShopFusion
        </h1>
        <p style={styles.text}>
          Welcome to <span style={styles.bold}>ShopFusion</span>, your ultimate destination for high-quality clothing and essentials!
        </p>
        <p style={styles.text}>
          The unique feature added in this website is FashionSense AI and Voice Assistant.
        </p>
        <p style={styles.text}>
          ⭐️ <span style={styles.bold}>FashionSense AI</span> – This Fashion API analyzes a picture and provides a list of possible clothes and accessories that might be in the picture, along with their probabilities.
        </p>
        <p style={styles.text}>
          🗣️ <span style={styles.bold}>Voice Assistant</span> – This feature allows you to navigate between pages using voice commands.
        </p>
        <p style={styles.text}>
          Thank you for choosing <span style={styles.bold}>ShopFusion</span>. Happy Shopping! 🛍️
        </p>
        <p style={styles.text}>
          <span style={styles.bold}>Lankapalli Shravya</span>
        </p>
      </div>
    </div>
  );
}

export default About;
