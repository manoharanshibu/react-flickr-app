/**
 * Created by smanoharan on 23/05/2017.
 */
import React, {PropTypes} from 'react';
import './popup.css';

/**
 * PopUpItem
 */
export default class PopUpItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClose} = this.props;
    const {date, description, link, owner,
      ownerName, title, url} = this.props.photo;

    return (
      <div className="box" onClick={onClose}>
        <div className="box-container">
          <div className="box-title">
            {title}
          </div>
          <div className="box-description">
            {description}
          </div>
          {link ? (
            <a
              className="box-owner"
              href={link}>
              {link}
            </a>
          ) : null}
          {link && owner && date ? (
            <span> - {date}</span>
          ) : null}
        </div>
        <img
          alt={title}
          className="box-img"
          src={url} />
      </div>
    );
  }
}

PopUpItem.propTypes = {
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.description,
    link: PropTypes.string,
    owner: PropTypes.string,
    ownerName: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired
};
