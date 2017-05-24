/**
 * Created by smanoharan on 22/05/2017.
 */
import React, {PropTypes} from 'react';
import PopUpBox from './PopUpBox.jsx';
import ItemContainer from './ItemContainer.jsx';

export default class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            selectedPhoto: null
        };
        this.fetchPhotos(this.props.searchKey, this.props.maxCount);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.fetchPhotos(nextProps.searchKey, this.props.maxCount);
        }
    }


    getNodeAttribute(attributes, name) {
        const attributesArray = Array.prototype.slice.call(attributes);
        const attribute = attributesArray.filter((attr) => attr.name === name)[0];
        if (!attribute) {
            return null;
        }
        return attribute.value;
    }

    parsePhotosData(data) {
        const parsedData = (new window.DOMParser()).parseFromString(data, 'text/xml');
        const childNodes = parsedData.documentElement.childNodes[1].childNodes;
        const nodes = Array.prototype.slice.call(childNodes);
        const photoNodes = nodes.filter((node) => node.tagName === 'photo');
        const photos = photoNodes.map((node) => {
            const id = this.getNodeAttribute(node.attributes, 'id');
            const secret = this.getNodeAttribute(node.attributes, 'secret');
            const server = this.getNodeAttribute(node.attributes, 'server');
            const farm = this.getNodeAttribute(node.attributes, 'farm');
            const title = this.getNodeAttribute(node.attributes, 'title');

            return {
                id: id,
                title: title,
                url: `https://c1.staticflickr.com/${farm}/${server}/${id}_${secret}_b.jpg`
            };
        });

        return photos;
    }

    fetchPhotos(searchKey, maxCount) {
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=89d67241ccf87a60cf2b2b11b6217741&tags=${searchKey}&per_page=${maxCount}&format=rest`;

        window.fetch(url, {
            method: 'get',
            headers: {
                Accept: 'text/xml'
            }
        }).then((response) => {
            response.text().then((data) => {
                this.setState({
                    photos: this.parsePhotosData(data)
                });
            }).catch((e) => {
                console.error(e);
            });
        }).catch((e) => {
            console.error(e);
        });
    }


    getSelectedPhotoData() {
        const {photos, selectedPhoto} = this.state;

        if (selectedPhoto) {
            return photos.filter((photo) => photo.id === selectedPhoto)[0];
        }

        return null;
    }

    onSelectPhoto(photoId) {
        return () => {
            this.setState({
                selectedPhoto: photoId
            });
        };
    }


    render() {
        const {photos} = this.state;

        const selectedPhotoData = this.getSelectedPhotoData();

        return (
            <div>
                {photos.map((photo) =>
                    <ItemContainer
                        key={photo.id}
                        onSelect={this.onSelectPhoto(photo.id).bind(this)}
                        photo={photo}
                        />
                )}
                {selectedPhotoData ?
                    <PopUpBox
                        onClose={this.onSelectPhoto(null).bind(this)}
                        photo={selectedPhotoData} /> :
                    null}
            </div>
        );
    }
}

Items.propTypes = {
    searchKey: PropTypes.string,
    maxCount: PropTypes.number,
};
