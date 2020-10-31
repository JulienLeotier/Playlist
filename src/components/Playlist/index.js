import React, { Component } from 'react'
import { connect } from 'react-redux';
import './_style.scss';
import { currentSongData, setCurrentSongIndex, setPlayState, showPlaylist } from '../../actions';

class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPlaylist: 'show'
        }
    }
    playThisSong(index) {
        let { setCurrentSongIndex, setSongData, currentSongIndex, setPlayState, play, playlistData, setShowPlaylist } = this.props;
        if (index !== currentSongIndex && play === false) {
            setPlayState(true);
        }
        else if (currentSongIndex === index) {
            setPlayState(!play);
        }
        setCurrentSongIndex(index)
        setSongData(playlistData[index]);
        setShowPlaylist(false)
    }
    searchSongs = (e) => {
        let query = e.currentTarget.value.toLowerCase().trim();
        document.querySelectorAll('.song-list-row').forEach(element => {
            if (element.textContent.toLowerCase().includes(query))
                element.style.display = "flex";
            else
                element.style.display = "none";
        });
    }
    render() {
        let { playlistData, song_name, play, showPlaylist, setPlayState } = this.props;
        let showPlaylistClass;
        if (showPlaylist) {
            setPlayState(false);
            showPlaylistClass = 'show';
        } else {
            showPlaylistClass = ''
        }
        let songs_list = [];
        if (playlistData !== undefined && playlistData.length > 0) {
            songs_list = [];
            playlistData.forEach((element, index) => {
                songs_list.push(
                    <div key={index} data-index={index} className="flex vrtlCenter hrtlCenter song-list-row element options" onClick={(e) => this.playThisSong(index)}>
                        <div className="album-art">
                            <img alt={element.song} src={element.albumart} />
                        </div>
                        <div className="song-details">
                            <h2 className="song">{element.song}</h2>
                            <h4 className="artist">{element.author}</h4>
                        </div>
                        <div className="options">
                            {(song_name === element.song && play) && (<p>50</p>)}
                            {(song_name !== element.song || !play) && (<p>50</p>)}
                        </div>
                    </div>
                );
            });
        }
        return (
            <div id="playlist" className={`${showPlaylistClass}`}>
                <div id="label">
                    <h1>N'oubliez pas les paroles</h1>

                    {/* <input id="search" type="text" placeholder="&#xF002; Search from all songs" autoComplete="off" onKeyUp={(e) => { e.stopPropagation(); this.searchSongs(e); }}></input> */}
                </div>
                <div id="show-box">
                    <div id="show-list">
                        {(songs_list.length > 0) && (
                            <div className="song-list">
                                {songs_list}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    playlistData: state.playlist.playlistData,
    song_name: state.song.song_name,
    currentSongIndex: state.playlist.currentSongIndex,
    play: state.song.play,
    showPlaylist: state.playlist.showPlaylist
});
const mapDispatchToProps = (dispatch) => ({
    setSongData: data => dispatch(currentSongData(data)),
    setCurrentSongIndex: data => dispatch(setCurrentSongIndex(data)),
    setPlayState: data => dispatch(setPlayState(data)),
    setShowPlaylist: data => dispatch(showPlaylist(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);