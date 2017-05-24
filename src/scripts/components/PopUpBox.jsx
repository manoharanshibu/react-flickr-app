/**
 * Created by smanoharan on 23/05/2017.
 */
import React, {PropTypes} from 'react';
import PopUpItem from './PopUpItem.jsx';

/**
 * PopUpBox Container component
 */
export default class PopUpBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoInfo: {}
    };

    this.fetchPhotoInfo(this.props.photo.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps &&
      nextProps.photo.id &&
      this.props.photo.id !== nextProps.photo.id) {
      this.fetchPhotoInfo(nextProps.photo.id);
    }
  }

  getNodeAttribute(infoNodes, name, attribute) {
    const infoNode = infoNodes.filter((node) => node.tagName === name)[0];

    if (!infoNode || !infoNode.attributes ||
      !infoNode.attributes[attribute]) {
      return null;
    }

    return infoNode.attributes[attribute].nodeValue;
  }

  getNodeText(infoNodes, name) {
    const infoNode = infoNodes.filter((node) => node.tagName === name)[0];

    if (!infoNode || !infoNode.textContent) {
      return null;
    }

    return infoNode.textContent.replace(/(\r\n|\n|\r|\s)/gm, '');
  }

  parsePhotoInfo(data) {
    const parsedData =
      (new window.DOMParser()).parseFromString(data, 'text/xml');

    const childNodes = parsedData.documentElement.childNodes[1].childNodes;
    const nodes = Array.prototype.slice.call(childNodes);
    const infoNodes = nodes.filter((node) => Boolean(node.tagName));

    const photoInfo = {
      date: this.getNodeAttribute(infoNodes, 'dates', 1),
      description: this.getNodeText(infoNodes, 'description'),
      owner: this.getNodeAttribute(infoNodes, 'owner', 1),
      ownerName: this.getNodeAttribute(infoNodes, 'owner', 2),
      link: this.getNodeText(infoNodes, 'urls')
    };

    return photoInfo;
  }

  fetchPhotoInfo(photoId) {
    const galleryUrl =
      'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=a042a5f1babdcbda4e431eba7099d329&photo_id=' + photoId;

    window.fetch(galleryUrl, {
      method: 'get',
      headers: {
        Accept: 'text/xml'
      }
    }).then((response) => {
      response.text().then((data) => {
        this.setState({
          photoInfo: this.parsePhotoInfo(data)
        });
      }).catch((e) => {
        console.error(e);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  render() {
    const {onClose, photo} = this.props;
    const {photoInfo} = this.state;

    return (
      <PopUpItem
        onClose={onClose}
        photo={Object.assign(photo, photoInfo)} />
    );
  }
}

PopUpBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};