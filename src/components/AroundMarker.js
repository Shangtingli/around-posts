import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import blueMarkerUrl from '../assets/images/blue-marker.svg';

export class AroundMarker extends React.Component {
    state = {
        isOpen: false,
    }

    toggleOpen = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        });
    }

    render() {
        const { user, message, url, location, type } = this.props.post;
        const { lat, lon : lng } = location;
        const isVideoPost = type === 'video';
        /**Controls if the marker is blue or red **/
        const icon = !isVideoPost ? undefined : {
            url: blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41),
        }
        return (
            <Marker
                position={{ lat, lng }}
                onMouseOver={isVideoPost ? this.toggleOpen : undefined}
                onMouseOut={isVideoPost ? this.toggleOpen : undefined}
                onClick={isVideoPost ? undefined : this.toggleOpen}
                icon={icon}
            >
                {this.state.isOpen ? (
                    <InfoWindow onCloseClick={this.toggleOpen}>
                        <div>
                            {isVideoPost ?
                                <video src={url} className="around-marker-video" controls/>
                                :
                                <img src={url} alt={message} className="around-marker-image"/>
                            }

                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </Marker>
        );
    }
}
