import styles from "../styles/Home.module.css";

export default function SongDetail({ filteredSongList, handleClickToCopy }) {
  return filteredSongList.length !== 0 ? (
    filteredSongList.map((song) => (
      <tr
        className={styles.songRow}
        key={song.index}
        onClick={(e) => {
          handleClickToCopy(
            e.target.parentNode.firstChild.nodeName === "TD"
              ? e.target.parentNode.childNodes[1]
              : e.target.parentNode.parentNode.childNodes[1]
          );
        }}
      >
        <td className={styles.noWrapForce}>{song.artist}</td>
        <td
          className={styles.noWrapForce}
          id={song.paid ? `paid ${song.index}` : song.index}
        >
          {song.song_name}
        </td>

        {/** 
              <td className={styles.noWrapForce}>{song.language}</td>
        <td className={styles.noWrapForce}>{song.remarks}</td>
      */}
      </tr>
    ))
  ) : (
    <tr>
      <td className="display-6 text-center" colSpan="3" id="noSongInList">
        歌单里没有诶~隐藏歌单碰碰运气!
      </td>
    </tr>
  );
}
