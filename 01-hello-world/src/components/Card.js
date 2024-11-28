export default function Card({ data }) {
  const styles = {
    card: {
      maxWidth: "400px",
      margin: "auto",
      border: "solid",
      marginTop: "1rem",
    },
    avatar: {
      background: `url(${data.image.path})`,
      height: "250px",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    title: {
      paddingTop: "0.3em",
      paddingBottom: "0.1em",
      margin: "0",
      textAlign: "left",
    },
    para: {
      textAlign: "left",
      marginTop: "0px",
    },
    skills: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    badge: {
      margin: ".2rem",
      border: "solid",
      borderWidth: "1px",
      padding: ".15rem 0.3rem",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.avatar}></div>
      <div style={{ padding: "0.5rem" }}>
        <h2 style={styles.title}>{data.name}</h2>
        <p style={styles.para}>{data.about}</p>
        <div style={styles.skills}>
          {data.skills.map((skill) => (
            <Skill data={skill} badge={styles.badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skill({ data, badge }) {
  return <div style={{ ...badge, background: data.background }}>{data.name}</div>;
}
