import React, { Component }from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';
export class Gallery extends Component {
    /** state: PropTypes ==> checked if the props passed the same shape and the same variable types
     * user: A string which is required
     * src: A string which is required
     * thumbnail: A string which is required
     * caption: An optional string
     * thumbnailWidth, thumbnailHeight: A required number for proptypes.
     * @type {{images: shim}}
     */
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired
            })
        ).isRequired
    }

    /**
     * First get all those images in props. Using the map function to create div components
     * Then using the wrapper style to crete a gridGallery from react-grid-gallery
     * @returns {*}
     */
    render() {
        console.log("Render function in Gallery.js script");
        const images = this.props.images.map((image) => {
            return {
                ...image,
                customOverlay: (
                    <div style={captionStyle}>
                        <div>{`${image.user}: ${image.caption}`}</div>
                    </div>
                ),
            };
        });

        return (
            <div style={wrapperStyle}>
                <GridGallery
                    backdropClosesModal
                    images={images}
                    enableImageSelection={false}/>
            </div>
        );
    }
}


const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
};

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};
